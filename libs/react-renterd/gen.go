package main

import (
	"os"

	"github.com/OneOfOne/struct2ts"
	"go.sia.tech/renterd/autopilot"
	"go.sia.tech/renterd/bus"
	"go.sia.tech/renterd/hostdb"
	"go.sia.tech/renterd/wallet"
)

var missing = `
`

func check(e error) {
	if e != nil {
		panic(e)
	}
}

// GenerateTypes transforms Go structs to Typescript structs and writes them to a file.
func main() {
	converter := struct2ts.New(&struct2ts.Options{
		InterfaceOnly: true,
	})

	// renterd bus
	converter.Add(bus.ConsensusState{})
	converter.Add(bus.ContractAcquireRequest{})
	converter.Add(bus.ContractsIDAddRequest{})
	converter.Add(bus.ContractsIDRenewedRequest{})
	converter.Add(bus.ContractAcquireResponse{})
	converter.Add(bus.WalletFundRequest{})
	converter.Add(bus.WalletFundResponse{})
	converter.Add(bus.WalletSignRequest{})
	converter.Add(bus.WalletRedistributeRequest{})
	converter.Add(bus.WalletPrepareFormRequest{})
	converter.Add(bus.WalletPrepareRenewRequest{})
	converter.Add(bus.WalletPrepareRenewResponse{})
	converter.Add(bus.ObjectsResponse{})
	converter.Add(bus.AddObjectRequest{})
	converter.Add(bus.DownloadParams{})
	converter.Add(bus.UploadParams{})
	converter.Add(bus.MigrateParams{})
	converter.Add(bus.GougingSettings{})
	converter.Add(bus.RedundancySettings{})
	converter.Add(bus.Contract{})

	// renterd autopilot
	converter.Add(autopilot.Action{})
	converter.Add(autopilot.Config{})

	// renterd hostdb
	converter.Add(hostdb.Host{})
	converter.Add(hostdb.Interaction{})

	// renterd wallet
	converter.Add(wallet.Transaction{})
	converter.Add(wallet.SiacoinElement{})

	f, err := os.Create("libs/react-core/src/rawTypes.ts")
	check(err)
	defer f.Close()
	err = converter.RenderTo(f)
	if err != nil {
		panic(err)
	}
	f.WriteString(missing)
	f.Sync()
}
