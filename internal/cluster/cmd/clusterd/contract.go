package main

import (
	"bytes"
	"context"
	"time"

	"go.sia.tech/cluster/nodes"
	proto2 "go.sia.tech/core/rhp/v2"
	"go.sia.tech/core/types"
	"go.sia.tech/coreutils/chain"
	"go.sia.tech/explored/api"
	"go.uber.org/zap"
)

func mineBlocks(log *zap.Logger, nm *nodes.Manager, e *api.Client, w *swallet) {
	if err := nm.MineBlocks(context.Background(), 1, types.VoidAddress); err != nil {
		log.Panic("failed to mine blocks", zap.Error(err))
	}
	if err := w.Sync(); err != nil {
		log.Panic("Failed to scan wallet", zap.Error(err))
	}
	if e != nil {
		for {
			tip, err := e.Tip()
			if err != nil {
				log.Panic("Failed to get explorer tip", zap.Error(err))
			}
			if tip == w.cm.Tip() {
				break
			}
			time.Sleep(100 * time.Millisecond)
		}
	}
}

func setupV1Contracts(log *zap.Logger, nm *nodes.Manager, w *swallet, cm *chain.Manager) {
	renterPrivateKey := types.GeneratePrivateKey()
	renterAddr := types.StandardUnlockHash(renterPrivateKey.PublicKey())
	hostPrivateKey := types.GeneratePrivateKey()
	hostAddr := types.StandardUnlockHash(hostPrivateKey.PublicKey())

	// create a storage contract
	renterPayout, hostPayout := types.Siacoins(5), types.Siacoins(5)

	// contract we will let expire
	fc1 := proto2.PrepareContractFormation(renterPrivateKey.PublicKey(), hostPrivateKey.PublicKey(), renterPayout, hostPayout, cm.Tip().Height+1, proto2.HostSettings{
		WindowSize: 1,
		Address:    hostAddr,
	}, renterAddr)
	fc1.UnlockHash = w.Address()
	contractPayout := fc1.Payout

	// contract we will revise and prove
	fc2 := fc1
	fc2.WindowStart += 1
	fc2.WindowEnd += 1

	// contract we will renew
	fc3 := fc2
	fc3.WindowStart += 10000
	fc3.WindowEnd += 10000

	txn := types.Transaction{
		FileContracts: []types.FileContract{fc1, fc2, fc3},
	}
	toSign, err := w.FundTransaction(&txn, contractPayout.Mul64(3), false)
	if err != nil {
		log.Panic("Failed to fund contract creation transaction", zap.Error(err))
	}
	w.SignTransaction(&txn, toSign, types.CoveredFields{WholeTransaction: true})

	if _, err := cm.AddPoolTransactions([]types.Transaction{txn}); err != nil {
		log.Panic("Failed to add contract creation txn to pool", zap.Error(err))
	}
	mineBlocks(log, nm, nil, w)

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
			UnlockConditions: w.UnlockConditions(),
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
	sigHash := cm.TipState().WholeSigHash(reviseTxn, types.Hash256(fc2ID), 0, 0, nil)
	sig := w.SignHash(sigHash)
	reviseTxn.Signatures[0].Signature = sig[:]

	if _, err := cm.AddPoolTransactions([]types.Transaction{reviseTxn}); err != nil {
		log.Panic("Failed to add revision txn to pool", zap.Error(err))
	}
	mineBlocks(log, nm, nil, w)

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
	mineBlocks(log, nm, nil, w)

	fc3ID := txn.FileContractID(2)
	fc3Rev := fc3
	fc3Rev.RevisionNumber = types.MaxRevisionNumber
	renewalTxn := types.Transaction{
		FileContracts: []types.FileContract{fc3},
		FileContractRevisions: []types.FileContractRevision{{
			ParentID:         fc3ID,
			UnlockConditions: w.UnlockConditions(),
			FileContract:     fc3Rev,
		}},
	}
	toSign, err = w.FundTransaction(&renewalTxn, fc3.Payout, false)
	if err != nil {
		log.Panic("Failed to fund renewal transaction", zap.Error(err))
	}
	w.SignTransaction(&renewalTxn, toSign, types.CoveredFields{WholeTransaction: true})
	{
		// sign FCR
		sigHash := cm.TipState().WholeSigHash(renewalTxn, types.Hash256(fc3ID), 0, 0, nil)
		sig := w.SignHash(sigHash)
		renewalTxn.Signatures = append(renewalTxn.Signatures, types.TransactionSignature{
			ParentID:       types.Hash256(fc3ID),
			PublicKeyIndex: 0,
			Timelock:       0,
			CoveredFields:  types.CoveredFields{WholeTransaction: true},
			Signature:      sig[:],
		})
	}

	if _, err := cm.AddPoolTransactions([]types.Transaction{renewalTxn}); err != nil {
		log.Panic("Failed to add renewal txn to pool", zap.Error(err))
	}
	mineBlocks(log, nm, nil, w)
}

func setupV2Contracts(log *zap.Logger, nm *nodes.Manager, e *api.Client, w *swallet, cm *chain.Manager) {
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
	mineBlocks(log, nm, e, w)

	fc2Rev := fc2
	fc2Rev.Filesize = 65
	fc2Rev.RevisionNumber++
	data := make([]byte, 2*proto2.LeafSize)
	data[0], data[proto2.LeafSize] = 1, 1
	fc2Rev.FileMerkleRoot, _ = proto2.ReaderRoot(bytes.NewReader(data))

	fce2, err := e.V2Contract(txn.V2FileContractID(txn.ID(), 1))
	if err != nil {
		log.Panic("Failed to retrieve contract element", zap.Error(err))
	}
	reviseTxn := types.V2Transaction{
		FileContractRevisions: []types.V2FileContractRevision{{
			Parent:   fce2.V2FileContractElement,
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

	tip := cm.Tip()
	mineBlocks(log, nm, e, w)

	_, applied, err := cm.UpdatesSince(tip, 1000)
	cie := applied[len(applied)-1].ChainIndexElement()

	fce1, err := e.V2Contract(txn.V2FileContractID(txn.ID(), 0))
	if err != nil {
		log.Panic("Failed to retrieve contract element", zap.Error(err))
	}
	fce2, err = e.V2Contract(txn.V2FileContractID(txn.ID(), 1))
	if err != nil {
		log.Panic("Failed to retrieve contract element", zap.Error(err))
	}
	proveTxn := types.V2Transaction{
		FileContractResolutions: []types.V2FileContractResolution{
			{
				Parent:     fce1.V2FileContractElement,
				Resolution: new(types.V2FileContractExpiration),
			},
			{
				Parent: fce2.V2FileContractElement,
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
	mineBlocks(log, nm, e, w)

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
	fce3, err := e.V2Contract(txn.V2FileContractID(txn.ID(), 2))
	if err != nil {
		log.Panic("Failed to retrieve contract element", zap.Error(err))
	}
	renewalTxn := types.V2Transaction{
		FileContractResolutions: []types.V2FileContractResolution{{
			Parent:     fce3.V2FileContractElement,
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
	mineBlocks(log, nm, e, w)
}
