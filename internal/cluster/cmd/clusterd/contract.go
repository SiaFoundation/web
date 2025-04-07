package main

import (
	"bytes"
	"math/bits"
	"sort"
	"time"

	"go.sia.tech/cluster/nodes"
	"go.sia.tech/core/consensus"
	proto2 "go.sia.tech/core/rhp/v2"
	"go.sia.tech/core/types"
	"go.sia.tech/coreutils"
	"go.sia.tech/coreutils/chain"
	"go.sia.tech/coreutils/testutil"
	"go.sia.tech/coreutils/wallet"
	"go.uber.org/zap"
)

// NOTE: due to a bug in the transaction validation code, calculating payouts
// is way harder than it needs to be. Tax is calculated on the post-tax
// contract payout (instead of the sum of the renter and host payouts). So the
// equation for the payout is:
//
//	   payout = renterPayout + hostPayout + payout*tax
//	∴  payout = (renterPayout + hostPayout) / (1 - tax)
//
// This would work if 'tax' were a simple fraction, but because the tax must
// be evenly distributed among siafund holders, 'tax' is actually a function
// that multiplies by a fraction and then rounds down to the nearest multiple
// of the siafund count. Thus, when inverting the function, we have to make an
// initial guess and then fix the rounding error.
func taxAdjustedPayout(target types.Currency) types.Currency {
	// compute initial guess as target * (1 / 1-tax); since this does not take
	// the siafund rounding into account, the guess will be up to
	// types.SiafundCount greater than the actual payout value.
	guess := target.Mul64(1000).Div64(961)

	// now, adjust the guess to remove the rounding error. We know that:
	//
	//   (target % types.SiafundCount) == (payout % types.SiafundCount)
	//
	// therefore, we can simply adjust the guess to have this remainder as
	// well. The only wrinkle is that, since we know guess >= payout, if the
	// guess remainder is smaller than the target remainder, we must subtract
	// an extra types.SiafundCount.
	//
	// for example, if target = 87654321 and types.SiafundCount = 10000, then:
	//
	//   initial_guess  = 87654321 * (1 / (1 - tax))
	//                  = 91211572
	//   target % 10000 =     4321
	//   adjusted_guess = 91204321

	mod64 := func(c types.Currency, v uint64) types.Currency {
		var r uint64
		if c.Hi < v {
			_, r = bits.Div64(c.Hi, c.Lo, v)
		} else {
			_, r = bits.Div64(0, c.Hi, v)
			_, r = bits.Div64(r, c.Lo, v)
		}
		return types.NewCurrency64(r)
	}
	sfc := (consensus.State{}).SiafundCount()
	tm := mod64(target, sfc)
	gm := mod64(guess, sfc)
	if gm.Cmp(tm) < 0 {
		guess = guess.Sub(types.NewCurrency64(sfc))
	}
	return guess.Add(tm).Sub(gm)
}

func mineBlocks(log *zap.Logger, cm *chain.Manager, n int) {
	for n > 0 {
		b, ok := coreutils.MineBlock(cm, types.VoidAddress, 5*time.Second)
		if !ok {
			continue
		} else if err := cm.AddBlocks([]types.Block{b}); err != nil {
			log.Panic("failed to add funding block", zap.Error(err))
		}
		n--
		log.Debug("mined block", zap.Stringer("index", cm.Tip()))
	}
}

func setupV1Contracts(log *zap.Logger, nm *nodes.Manager, w *wallet.SingleAddressWallet, ws *testutil.EphemeralWalletStore, cm *chain.Manager, pk types.PrivateKey, fundingBlock types.Block) FixtureV1ContractAddresses {
	addr := types.StandardUnlockHash(pk.PublicKey())
	uc := types.StandardUnlockConditions(pk.PublicKey())

	renterPrivateKey := types.GeneratePrivateKey()
	renterAddr := types.StandardUnlockHash(renterPrivateKey.PublicKey())
	hostPrivateKey := types.GeneratePrivateKey()
	hostAddr := types.StandardUnlockHash(hostPrivateKey.PublicKey())

	// create a storage contract
	renterPayout, hostPayout := types.Siacoins(5), types.Siacoins(5)
	contractPayout := taxAdjustedPayout(renterPayout.Add(hostPayout))

	// contract we will let expire
	fc1 := types.FileContract{
		// we could use joint unlock conditions with renter and host key, but
		// this is simpler
		UnlockHash:  uc.UnlockHash(),
		WindowStart: cm.Tip().Height + 1,
		WindowEnd:   cm.Tip().Height + 2,
		Payout:      contractPayout,
		ValidProofOutputs: []types.SiacoinOutput{
			{Value: renterPayout, Address: renterAddr},
			{Value: hostPayout, Address: hostAddr},
		},
		MissedProofOutputs: []types.SiacoinOutput{
			{Value: renterPayout, Address: renterAddr},
			{Value: hostPayout, Address: hostAddr},
			{Value: types.ZeroCurrency, Address: types.VoidAddress},
		},
	}

	// contract we will revise and prove
	fc2 := fc1
	fc2.WindowStart += 1
	fc2.WindowEnd += 1

	// contract we will renew
	fc3 := fc2
	fc3.WindowStart += 10000
	fc3.WindowEnd += 10000

	scID := fundingBlock.ID().MinerOutputID(0)
	txn := types.Transaction{
		SiacoinInputs: []types.SiacoinInput{
			{ParentID: scID, UnlockConditions: uc},
		},
		SiacoinOutputs: []types.SiacoinOutput{
			{Address: addr, Value: fundingBlock.MinerPayouts[0].Value.Sub(contractPayout.Mul64(3))}, // return the remainder to the wallet
		},
		FileContracts: []types.FileContract{fc1, fc2, fc3},
		Signatures: []types.TransactionSignature{
			{
				ParentID:       types.Hash256(scID),
				PublicKeyIndex: 0,
				Timelock:       0,
				CoveredFields:  types.CoveredFields{WholeTransaction: true},
			},
		},
	}
	sigHash := cm.TipState().WholeSigHash(txn, types.Hash256(scID), 0, 0, nil)
	sig := pk.SignHash(sigHash)
	txn.Signatures[0].Signature = sig[:]

	if _, err := cm.AddPoolTransactions([]types.Transaction{txn}); err != nil {
		log.Panic("Failed to add contract creation txn to pool", zap.Error(err))
	}
	mineBlocks(log, cm, 1)

	fc2ID := txn.FileContractID(1)
	fc2Rev := fc2
	fc2Rev.Filesize = 65
	fc2Rev.RevisionNumber++
	data := make([]byte, 2*proto2.LeafSize)
	data[0], data[proto2.LeafSize] = 1, 1
	fc2Rev.FileMerkleRoot, _ = proto2.ReaderRoot(bytes.NewReader(data))
	reviseTxn := types.Transaction{
		FileContractRevisions: []types.FileContractRevision{{
			ParentID:         fc2ID,
			UnlockConditions: uc,
			FileContract:     fc2Rev,
		}},
		Signatures: []types.TransactionSignature{
			{
				ParentID:       types.Hash256(fc2ID),
				PublicKeyIndex: 0,
				Timelock:       0,
				CoveredFields:  types.CoveredFields{WholeTransaction: true},
			},
		},
	}
	sigHash = cm.TipState().WholeSigHash(reviseTxn, types.Hash256(fc2ID), 0, 0, nil)
	sig = pk.SignHash(sigHash)
	reviseTxn.Signatures[0].Signature = sig[:]

	if _, err := cm.AddPoolTransactions([]types.Transaction{reviseTxn}); err != nil {
		log.Panic("Failed to add revision txn to pool", zap.Error(err))
	}
	mineBlocks(log, cm, 1)

	proveTxn := types.Transaction{
		StorageProofs: []types.StorageProof{{
			ParentID: fc2ID,
			Leaf:     [64]byte{1},
			Proof:    []types.Hash256{cm.TipState().StorageProofLeafHash([]byte{1})},
		}},
	}

	if _, err := cm.AddPoolTransactions([]types.Transaction{proveTxn}); err != nil {
		log.Panic("Failed to add proof txn to pool", zap.Error(err))
	}
	mineBlocks(log, cm, 1)

	scID = txn.SiacoinOutputID(0)
	fc3ID := txn.FileContractID(2)
	fc3Rev := fc3
	fc3Rev.RevisionNumber = types.MaxRevisionNumber
	renewalTxn := types.Transaction{
		SiacoinInputs: []types.SiacoinInput{{
			ParentID:         scID,
			UnlockConditions: uc,
		}},
		SiacoinOutputs: []types.SiacoinOutput{{
			Address: addr,
			Value:   txn.SiacoinOutputs[0].Value.Sub(fc3.Payout),
		}},
		FileContracts: []types.FileContract{fc3},
		FileContractRevisions: []types.FileContractRevision{{
			ParentID:         fc3ID,
			UnlockConditions: uc,
			FileContract:     fc3Rev,
		}},
		Signatures: []types.TransactionSignature{
			{
				ParentID:       types.Hash256(scID),
				PublicKeyIndex: 0,
				Timelock:       0,
				CoveredFields:  types.CoveredFields{WholeTransaction: true},
			},
			{
				ParentID:       types.Hash256(fc3ID),
				PublicKeyIndex: 0,
				Timelock:       0,
				CoveredFields:  types.CoveredFields{WholeTransaction: true},
			},
		},
	}
	for i := 0; i < len(renewalTxn.Signatures); i++ {
		sigHash := cm.TipState().WholeSigHash(renewalTxn, types.Hash256(renewalTxn.Signatures[i].ParentID), 0, 0, nil)
		sig := pk.SignHash(sigHash)
		renewalTxn.Signatures[i].Signature = sig[:]
	}

	if _, err := cm.AddPoolTransactions([]types.Transaction{renewalTxn}); err != nil {
		log.Panic("Failed to add renewal txn to pool", zap.Error(err))
	}
	mineBlocks(log, cm, 1)

	fc1ID, fc2ID, fc3ID := txn.FileContractID(0), txn.FileContractID(1), txn.FileContractID(2)
	return FixtureV1ContractAddresses{
		ExpiredContract: &types.FileContractElement{
			ID:           fc1ID,
			FileContract: fc1,
		},
		SuccessfulContract: &types.FileContractElement{
			ID:           fc2ID,
			FileContract: fc2Rev,
		},
		RenewedContract: &types.FileContractElement{
			ID:           fc3ID,
			FileContract: fc3,
		},
	}
}

func setupV2Contracts(log *zap.Logger, nm *nodes.Manager, w *wallet.SingleAddressWallet, ws *testutil.EphemeralWalletStore, cm *chain.Manager) FixtureV2ContractAddresses {
	renterPrivateKey := types.GeneratePrivateKey()
	renterAddr := types.StandardUnlockHash(renterPrivateKey.PublicKey())
	hostPrivateKey := types.GeneratePrivateKey()
	hostAddr := types.StandardUnlockHash(hostPrivateKey.PublicKey())

	// create a storage contract
	contractPayout := types.Siacoins(10)
	height := cm.Tip().Height
	// this contract will expire
	fc1 := types.V2FileContract{
		RevisionNumber:   0,
		Capacity:         4096,
		Filesize:         0,
		ProofHeight:      height + 1,
		ExpirationHeight: height + 2,
		RenterOutput:     types.SiacoinOutput{Address: renterAddr, Value: contractPayout},
		HostOutput:       types.SiacoinOutput{Address: hostAddr, Value: contractPayout},
		MissedHostValue:  types.ZeroCurrency,
		TotalCollateral:  contractPayout,
		RenterPublicKey:  renterPrivateKey.PublicKey(),
		HostPublicKey:    hostPrivateKey.PublicKey(),
	}
	fcOut := fc1.RenterOutput.Value.Add(fc1.HostOutput.Value).Add(cm.TipState().V2FileContractTax(fc1))

	// this contract will be revised and then resolved with storage proof
	fc2 := fc1
	fc2.ProofHeight += 1
	fc2.ExpirationHeight += 10
	fc2.RevisionNumber = 1

	// this contract will be renewed
	fc3 := fc1
	fc3.ProofHeight += 10000
	fc3.ExpirationHeight += 10000
	fc3.RevisionNumber = 2

	txn := types.V2Transaction{
		FileContracts: []types.V2FileContract{fc1, fc2, fc3},
	}
	for i := range txn.FileContracts {
		cs := cm.TipState()
		txn.FileContracts[i].RenterSignature = renterPrivateKey.SignHash(cs.ContractSigHash(txn.FileContracts[i]))
		txn.FileContracts[i].HostSignature = hostPrivateKey.SignHash(cs.ContractSigHash(txn.FileContracts[i]))
	}
	basis, toSign, err := w.FundV2Transaction(&txn, fcOut.Mul64(3), false)
	if err != nil {
		log.Panic("Failed to fund contract creation txn", zap.Error(err))
	}
	w.SignV2Inputs(&txn, toSign)

	if _, err := cm.AddV2PoolTransactions(basis, []types.V2Transaction{txn}); err != nil {
		log.Panic("Failed to add contract creation txn to pool", zap.Error(err))
	}
	tip := cm.Tip()
	mineBlocks(log, cm, 1)

	if err := syncWallet(cm, w, ws); err != nil {
		log.Panic("Failed to scan wallet", zap.Error(err))
	}

	_, applied, err := cm.UpdatesSince(tip, 1000)
	if err != nil {
		log.Panic("Failed to retrieve chain updates", zap.Error(err))
	}

	// get the confirmed file contract element
	var fces []types.V2FileContractElement
	for _, fce := range applied[0].V2FileContractElementDiffs() {
		fces = append(fces, fce.V2FileContractElement)
	}
	if len(fces) != 3 {
		log.Panic("Wrong number of contracts in block, expected 3, got", zap.Int("len", len(fces)))
	}
	// sort by revision number so fc[0] = fc1, fc[1] = fc2, ...
	sort.Slice(fces, func(i, j int) bool {
		return fces[i].V2FileContract.RevisionNumber < fces[j].V2FileContract.RevisionNumber
	})
	for _, cau := range applied[1:] {
		for i := range fces {
			cau.UpdateElementProof(&fces[i].StateElement)
		}
	}

	fc2Rev := fc2
	fc2Rev.Filesize = 65
	fc2Rev.RevisionNumber++
	data := make([]byte, 2*proto2.LeafSize)
	data[0], data[proto2.LeafSize] = 1, 1
	fc2Rev.FileMerkleRoot, _ = proto2.ReaderRoot(bytes.NewReader(data))
	reviseTxn := types.V2Transaction{
		FileContractRevisions: []types.V2FileContractRevision{{
			Parent:   fces[1],
			Revision: fc2Rev,
		}},
	}
	for i := range reviseTxn.FileContractRevisions {
		cs := cm.TipState()
		reviseTxn.FileContractRevisions[i].Revision.RenterSignature = renterPrivateKey.SignHash(cs.ContractSigHash(reviseTxn.FileContractRevisions[i].Revision))
		reviseTxn.FileContractRevisions[i].Revision.HostSignature = hostPrivateKey.SignHash(cs.ContractSigHash(reviseTxn.FileContractRevisions[i].Revision))
	}

	if _, err := cm.AddV2PoolTransactions(basis, []types.V2Transaction{reviseTxn}); err != nil {
		log.Panic("Failed to add revision txn to pool", zap.Error(err))
	}

	tip = cm.Tip()
	mineBlocks(log, cm, 1)

	if err := syncWallet(cm, w, ws); err != nil {
		log.Panic("Failed to scan wallet", zap.Error(err))
	}

	_, applied, err = cm.UpdatesSince(tip, 1000)
	if err != nil {
		log.Panic("Failed to retrieve chain updates", zap.Error(err))
	}

	for _, cau := range applied {
		for i := range fces {
			cau.UpdateElementProof(&fces[i].StateElement)
		}
	}
	// for some reason just updating the proofs results in
	// "file contract renewal parent not in accumulator"
	for _, diff := range applied[len(applied)-1].V2FileContractElementDiffs() {
		fces[1].StateElement = diff.V2FileContractElement.StateElement
		fces[1].V2FileContract = *diff.Revision
	}
	cie := applied[len(applied)-1].ChainIndexElement()

	proveTxn := types.V2Transaction{
		FileContractResolutions: []types.V2FileContractResolution{
			{
				Parent:     fces[0],
				Resolution: new(types.V2FileContractExpiration),
			},
			{
				Parent: fces[1],
				Resolution: &types.V2StorageProof{
					ProofIndex: cie,
					Leaf:       [64]byte{1},
					Proof:      []types.Hash256{cm.TipState().StorageProofLeafHash([]byte{1})},
				},
			},
		},
	}

	if _, err := cm.AddV2PoolTransactions(basis, []types.V2Transaction{proveTxn}); err != nil {
		log.Panic("Failed to add proof and expiration txn to pool", zap.Error(err))
	}

	tip = cm.Tip()
	mineBlocks(log, cm, 1)

	if err := syncWallet(cm, w, ws); err != nil {
		log.Panic("Failed to scan wallet", zap.Error(err))
	}

	_, applied, err = cm.UpdatesSince(tip, 1000)
	if err != nil {
		log.Panic("Failed to retrieve chain updates", zap.Error(err))
	}
	for _, cau := range applied {
		for i := range fces {
			cau.UpdateElementProof(&fces[i].StateElement)
		}
	}

	fc3FinalRev := fc3
	fc3FinalRev.RevisionNumber = types.MaxRevisionNumber
	fc3NewContract := fc3
	fc3NewContract.RevisionNumber++
	renewal := &types.V2FileContractRenewal{
		NewContract:       fc3NewContract,
		FinalRenterOutput: fc3FinalRev.RenterOutput,
		FinalHostOutput:   fc3FinalRev.HostOutput,
		RenterRollover:    types.ZeroCurrency,
		HostRollover:      types.ZeroCurrency,
	}
	{
		cs := cm.TipState()
		renewal.RenterSignature = renterPrivateKey.SignHash(cs.RenewalSigHash(*renewal))
		renewal.HostSignature = hostPrivateKey.SignHash(cs.RenewalSigHash(*renewal))
		renewal.NewContract.RenterSignature = renterPrivateKey.SignHash(cs.ContractSigHash(renewal.NewContract))
		renewal.NewContract.HostSignature = hostPrivateKey.SignHash(cs.ContractSigHash(renewal.NewContract))
	}
	renewalTxn := types.V2Transaction{
		FileContractResolutions: []types.V2FileContractResolution{{
			Parent:     fces[2],
			Resolution: renewal,
		}},
	}
	basis, toSign, err = w.FundV2Transaction(&renewalTxn, fcOut, false)
	if err != nil {
		log.Panic("Failed to fund renewal txn", zap.Error(err))
	}
	w.SignV2Inputs(&renewalTxn, toSign)

	if _, err := cm.AddV2PoolTransactions(basis, []types.V2Transaction{renewalTxn}); err != nil {
		log.Panic("Failed to add renewal txn to pool", zap.Error(err))
	}

	tip = cm.Tip()
	mineBlocks(log, cm, 1)

	if err := syncWallet(cm, w, ws); err != nil {
		log.Panic("Failed to scan wallet", zap.Error(err))
	}

	_, applied, err = cm.UpdatesSince(tip, 1000)
	if err != nil {
		log.Panic("Failed to retrieve chain updates", zap.Error(err))
	}
	for _, cau := range applied {
		for i := range fces {
			cau.UpdateElementProof(&fces[i].StateElement)
		}
	}

	return FixtureV2ContractAddresses{
		ExpiredContract:    &fces[0],
		SuccessfulContract: &fces[1],
		RenewedContract:    &fces[2],
	}
}
