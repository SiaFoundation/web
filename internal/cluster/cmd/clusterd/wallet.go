package main

import (
	"fmt"
	"math"

	"go.sia.tech/core/types"
	"go.sia.tech/coreutils/chain"
	"go.sia.tech/coreutils/testutil"
	"go.sia.tech/coreutils/wallet"
)

type swallet struct {
	*wallet.SingleAddressWallet
	ws *testutil.EphemeralWalletStore

	cm *chain.Manager
}

func (w *swallet) Sync() error {
	index, err := w.ws.Tip()
	if err != nil {
		return err
	}
	reverted, applied, err := w.cm.UpdatesSince(index, math.MaxInt)
	if err != nil {
		return err
	}
	return w.ws.UpdateChainState(func(tx wallet.UpdateTx) error {
		return w.UpdateChainState(tx, reverted, applied)
	})
}

func newWallet(cm *chain.Manager, pk types.PrivateKey) (*swallet, error) {
	ws := testutil.NewEphemeralWalletStore()
	sw, err := wallet.NewSingleAddressWallet(pk, cm, ws)
	if err != nil {
		return nil, fmt.Errorf("failed to create wallet: %w", err)
	}
	w := &swallet{
		SingleAddressWallet: sw,
		ws:                  ws,
		cm:                  cm,
	}
	return w, w.Sync()
}
