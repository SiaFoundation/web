// This file is copied from go.sia.tech/cluster/cmd/clusterd/main.go
// in order to manage the daemon dependencies locally. This file should be
// updated to match the upstream version when necessary.
package main

import (
	"context"
	"flag"
	"fmt"
	"net"
	"net/http"
	"os"
	"os/signal"
	"path/filepath"
	"sync"
	"time"

	"go.sia.tech/cluster/api"
	"go.sia.tech/cluster/nodes"
	"go.sia.tech/core/gateway"
	"go.sia.tech/core/types"
	"go.sia.tech/coreutils"
	"go.sia.tech/coreutils/chain"
	"go.sia.tech/coreutils/syncer"
	"go.sia.tech/coreutils/testutil"
	eapi "go.sia.tech/explored/api"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func main() {
	var (
		dir      string
		apiAddr  string
		logLevel string
		network  string

		siafundAddr string

		renterdCount  int
		hostdCount    int
		walletdCount  int
		exploredCount int
	)

	flag.StringVar(&dir, "dir", "", "directory to store renter data")
	flag.StringVar(&apiAddr, "api", ":3001", "API address")
	flag.StringVar(&logLevel, "log", "info", "logging level")
	flag.StringVar(&network, "network", "v1", "network to use (v1, v2 or transition)")
	flag.StringVar(&siafundAddr, "siafund", "", "address to send siafunds to")

	flag.IntVar(&renterdCount, "renterd", 0, "number of renter daemons to run")
	flag.IntVar(&hostdCount, "hostd", 0, "number of host daemons to run")
	flag.IntVar(&walletdCount, "walletd", 0, "number of wallet daemons to run")
	flag.IntVar(&exploredCount, "explored", 0, "number of explored daemons to run")
	flag.Parse()

	cfg := zap.NewProductionEncoderConfig()
	cfg.TimeKey = "" // prevent duplicate timestamps
	cfg.EncodeTime = zapcore.RFC3339TimeEncoder
	cfg.EncodeDuration = zapcore.StringDurationEncoder
	cfg.EncodeLevel = zapcore.CapitalColorLevelEncoder

	cfg.StacktraceKey = ""
	cfg.CallerKey = ""
	encoder := zapcore.NewConsoleEncoder(cfg)

	level, err := zap.ParseAtomicLevel(logLevel)
	if err != nil {
		fmt.Printf("invalid log level %q", level)
		os.Exit(1)
	}

	log := zap.New(zapcore.NewCore(encoder, zapcore.Lock(os.Stdout), level))
	defer log.Sync()

	zap.RedirectStdLog(log)

	if hostdCount == 0 && renterdCount == 0 && walletdCount == 0 {
		log.Panic("no nodes to run")
	}

	ctx, cancel := signal.NotifyContext(context.Background(), os.Interrupt)
	defer cancel()

	dir, err = os.MkdirTemp(dir, "sia-cluster-*")
	if err != nil {
		log.Panic("failed to create temp dir", zap.Error(err))
	}
	defer func() {
		if err := os.RemoveAll(dir); err != nil {
			log.Error("failed to remove temp dir", zap.Error(err))
		} else {
			log.Debug("removed temp dir", zap.String("dir", dir))
		}
	}()

	// use modified Zen testnet
	n, genesis := chain.TestnetZen()
	n.InitialTarget = types.BlockID{0xFF}
	n.HardforkDevAddr.Height = 1
	n.HardforkTax.Height = 1
	n.HardforkStorageProof.Height = 1
	n.HardforkOak.Height = 1
	n.HardforkASIC.Height = 1
	n.HardforkFoundation.Height = 1

	if siafundAddr != "" {
		// if the siafund address is set, send the siafunds to it
		var addr types.Address
		if err := addr.UnmarshalText([]byte(siafundAddr)); err != nil {
			log.Panic("failed to parse siafund address", zap.Error(err))
		}
		genesis.Transactions[0].SiafundOutputs[0].Address = addr
	}

	switch network {
	case "v1":
		n.HardforkV2.AllowHeight = 10000 // ideally unattainable
		n.HardforkV2.RequireHeight = 12000
	case "v2":
		n.HardforkV2.AllowHeight = 2
		n.HardforkV2.RequireHeight = 3
	case "transition":
		n.HardforkV2.AllowHeight = 400
		n.HardforkV2.RequireHeight = 500
	default:
		log.Fatal("invalid network", zap.String("network", network))
	}

	apiListener, err := net.Listen("tcp", apiAddr)
	if err != nil {
		log.Panic("failed to listen on api address", zap.Error(err))
	}
	defer apiListener.Close()

	bdb, err := coreutils.OpenBoltChainDB(filepath.Join(dir, "consensus.db"))
	if err != nil {
		log.Panic("failed to open bolt db", zap.Error(err))
	}
	defer bdb.Close()

	dbstore, tipState, err := chain.NewDBStore(bdb, n, genesis)
	if err != nil {
		log.Panic("failed to create dbstore", zap.Error(err))
	}
	cm := chain.NewManager(dbstore, tipState)

	syncerListener, err := net.Listen("tcp", ":0")
	if err != nil {
		log.Panic("failed to listen on api address", zap.Error(err))
	}
	defer syncerListener.Close()

	_, port, err := net.SplitHostPort(syncerListener.Addr().String())
	s := syncer.New(syncerListener, cm, testutil.NewEphemeralPeerStore(), gateway.Header{
		GenesisID:  genesis.ID(),
		UniqueID:   gateway.GenerateUniqueID(),
		NetAddress: "127.0.0.1:" + port,
	}, syncer.WithLogger(log.Named("syncer")), syncer.WithMaxInboundPeers(10000), syncer.WithBanDuration(time.Second), syncer.WithPeerDiscoveryInterval(5*time.Second), syncer.WithSyncInterval(5*time.Second)) // essentially no limit on inbound peers
	if err != nil {
		log.Panic("failed to create syncer", zap.Error(err))
	}
	defer s.Close()
	go s.Run()

	nm := nodes.NewManager(dir, cm, s, nodes.WithSharedConsensus(true))
	server := &http.Server{
		Handler:     api.Handler(cm, s, nm, log.Named("api")),
		ReadTimeout: 5 * time.Second,
	}
	defer server.Close()
	go server.Serve(apiListener)

	var wg sync.WaitGroup
	for i := 0; i < hostdCount; i++ {
		wg.Add(1)
		ready := make(chan struct{}, 1)
		go func() {
			defer wg.Done()
			if err := nm.StartHostd(ctx, types.GeneratePrivateKey(), ready); err != nil {
				log.Panic("hostd failed to start", zap.Error(err))
			}
		}()
		<-ready
	}

	for i := 0; i < renterdCount; i++ {
		wg.Add(1)
		ready := make(chan struct{}, 1)
		go func() {
			defer wg.Done()
			if err := nm.StartRenterd(ctx, types.GeneratePrivateKey(), ready); err != nil {
				log.Panic("renterd failed to start", zap.Error(err))
			}
		}()
		<-ready
	}

	for i := 0; i < walletdCount; i++ {
		wg.Add(1)
		ready := make(chan struct{}, 1)
		go func() {
			defer wg.Done()
			if err := nm.StartWalletd(ctx, ready); err != nil {
				log.Panic("walletd failed to start", zap.Error(err))
			}
		}()
		<-ready
	}

	pk := types.GeneratePrivateKey()
	for i := 0; i < exploredCount; i++ {
		wg.Add(1)
		ready := make(chan struct{}, 1)
		go func() {
			defer wg.Done()
			if err := nm.StartExplored(ctx, ready, "sia is cool"); err != nil {
				cancel()
				log.Error("explored failed to start", zap.Error(err))
			}
		}()
		<-ready

		if err := nm.MineBlocks(context.Background(), 1, types.StandardUnlockHash(pk.PublicKey())); err != nil {
			log.Panic("failed to mine funding block", zap.Error(err))
		}
	}

	if err := nm.MineBlocks(context.Background(), 144, types.VoidAddress); err != nil {
		log.Panic("failed to mine blocks", zap.Error(err))
	}

	if exploredCount > 0 {
		w, err := newWallet(cm, pk)
		if err != nil {
			log.Panic("Failed to setup wallet", zap.Error(err))
		}
		defer w.Close()

		var e *eapi.Client
		for _, n := range nm.Nodes() {
			if n.Type == nodes.NodeTypeExplored {
				e = eapi.NewClient(n.APIAddress+"/api", n.Password)
			}
		}
		if e == nil {
			log.Panic("Failed to find explored node")
		}

		switch network {
		case "v1":
			err = setupV1Contracts(nm, w, cm)
		case "v2":
			err = setupV2Contracts(nm, e, w, cm)
		case "transition":
			err = setupV1Contracts(nm, w, cm)
		default:
			err = fmt.Errorf("invalid network provided: %s", network)
		}
		if err != nil {
			log.Panic("Failed to set up contracts", zap.Error(err))
		}
		log.Info("Set up contracts")
	}

	<-ctx.Done()
	wg.Wait()
	log.Info("shutdown complete")
}
