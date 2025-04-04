package main

import (
	"fmt"
	"math"

	"go.sia.tech/core/types"
	"go.sia.tech/coreutils/chain"
	"go.sia.tech/coreutils/testutil"
	"go.sia.tech/coreutils/wallet"
)

func syncWallet(cm *chain.Manager, w *wallet.SingleAddressWallet, ws *testutil.EphemeralWalletStore) error {
	index, err := ws.Tip()
	if err != nil {
		return err
	}
	reverted, applied, err := cm.UpdatesSince(index, math.MaxInt)
	if err != nil {
		return err
	}
	return ws.UpdateChainState(func(tx wallet.UpdateTx) error {
		return w.UpdateChainState(tx, reverted, applied)
	})
}

func setupWallet(cm *chain.Manager, pk types.PrivateKey) (*wallet.SingleAddressWallet, *testutil.EphemeralWalletStore, error) {
	ws := testutil.NewEphemeralWalletStore()
	sw, err := wallet.NewSingleAddressWallet(pk, cm, ws)
	if err != nil {
		return nil, nil, fmt.Errorf("failed to create renter wallet: %w", err)
	}
	defer sw.Close()

	if err := syncWallet(cm, sw, ws); err != nil {
		return nil, nil, fmt.Errorf("failed to scan wallet: %w", err)
	}
	return sw, ws, nil
}
