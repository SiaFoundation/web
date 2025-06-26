package main

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"time"

	"go.sia.tech/cluster/nodes"
	proto2 "go.sia.tech/core/rhp/v2"
	proto4 "go.sia.tech/core/rhp/v4"
	"go.sia.tech/core/types"
	"go.sia.tech/coreutils/chain"
	"go.sia.tech/explored/api"
	"go.uber.org/zap"
)

func mineBlock(nm *nodes.Manager, e *api.Client, w *swallet) error {
	if err := nm.MineBlocks(context.Background(), 1, types.VoidAddress); err != nil {
		return err
	}
	if err := w.Sync(); err != nil {
		return err
	}
	if e != nil {
		for {
			tip, err := e.Tip()
			if err != nil {
				return err
			}
			if tip == w.cm.Tip() {
				break
			}
			time.Sleep(100 * time.Millisecond)
		}
	}
	return nil
}

// setupV1Contracts creates three contracts
// The first we let expire and thus it resolves unsuccessful.
// The second we revise to have a nonzero filesize and file merkle root, which
// we then resolve successfully by submitting a storage proof in the subsequent
// block.
// The third we "renew" by revising to max revision number and creating a new
// contract in the same transaction.  Neither contract reaches its proof
// height, which is set to be at a very high height.
func setupV1Contracts(nm *nodes.Manager, w *swallet, cm *chain.Manager) error {
	prepareContract := func(endHeight uint64) types.FileContract {
		rk := types.GeneratePrivateKey().PublicKey()
		rAddr := types.StandardUnlockHash(rk)
		hk := types.GeneratePrivateKey().PublicKey()
		hs := proto2.HostSettings{
			WindowSize: 1,
			Address:    types.StandardUnlockHash(hk),
		}
		sc := types.Siacoins(1)
		fc := proto2.PrepareContractFormation(rk, hk, sc.Mul64(5), sc.Mul64(5), endHeight, hs, rAddr)
		fc.UnlockHash = w.Address()
		return fc
	}

	broadcastContract := func(fc types.FileContract) (types.FileContractID, error) {
		txn := types.Transaction{FileContracts: []types.FileContract{fc}}
		toSign, err := w.FundTransaction(&txn, fc.Payout, true)
		if err != nil {
			return types.FileContractID{}, err
		}
		w.SignTransaction(&txn, toSign, types.CoveredFields{WholeTransaction: true})

		var txns []types.Transaction
		txns = append(txns, cm.UnconfirmedParents(txn)...)
		txns = append(txns, txn)
		if _, err := cm.AddPoolTransactions(txns); err != nil {
			return types.FileContractID{}, fmt.Errorf("failed to add contract creation txn to pool: %w", err)
		}
		return txn.FileContractID(0), nil
	}

	bh := cm.Tip().Height

	// prepare contract we let expire
	fc1 := prepareContract(bh + 1)
	fc1.ValidProofOutputs[0].Value = fc1.ValidProofOutputs[0].Value.Sub(types.Siacoins(1))
	fc1.ValidProofOutputs[1].Value = fc1.ValidProofOutputs[1].Value.Add(types.Siacoins(1))
	_, err := broadcastContract(fc1)
	if err != nil {
		return err
	}

	// prepare contract we will revise and prove
	fc2 := prepareContract(bh + 2)
	fc2ID, err := broadcastContract(fc2)
	if err != nil {
		return err
	}

	// prepare contract we will renew
	fc3 := prepareContract(bh + 1000)
	fc3ID, err := broadcastContract(fc3)
	if err != nil {
		return err
	}

	// mine block to form contracts
	if err := mineBlock(nm, nil, w); err != nil {
		return err
	}

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
	if err := mineBlock(nm, nil, w); err != nil {
		return err
	}

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
	if err := mineBlock(nm, nil, w); err != nil {
		return err
	}

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
	toSign, err := w.FundTransaction(&renewalTxn, fc3.Payout, false)
	if err != nil {
		return fmt.Errorf("Failed to fund renewal transaction: %w", err)
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
		return fmt.Errorf("Failed to add renewal txn to pool: %w", err)
	}
	if err := mineBlock(nm, nil, w); err != nil {
		return err
	}

	return nil
}

// setupV2Contracts creates three contracts
// The first we let expire and submit a resolution to resolve it as expired.
// The second we revise to have a nonzero filesize and file merkle root, which
// we then resolve successfully by submitting a storage proof in the subsequent
// block.
// The third we renew by submitting a renewal resolution.  Neither contract
// reaches its proof height, which is set to be at a very high height.
func setupV2Contracts(nm *nodes.Manager, e *api.Client, w *swallet, cm *chain.Manager) error {
	renterPrivateKey := types.GeneratePrivateKey()
	renterAddr := types.StandardUnlockHash(renterPrivateKey.PublicKey())
	hostPrivateKey := types.GeneratePrivateKey()
	hostAddr := types.StandardUnlockHash(hostPrivateKey.PublicKey())

	prepareContract := func(proofHeight uint64) types.V2FileContract {
		fc, _ := proto4.NewContract(proto4.HostPrices{}, proto4.RPCFormContractParams{
			ProofHeight:     proofHeight,
			Allowance:       types.Siacoins(5),
			RenterAddress:   renterAddr,
			Collateral:      types.Siacoins(5),
			RenterPublicKey: renterPrivateKey.PublicKey(),
		}, hostPrivateKey.PublicKey(), hostAddr)
		fc.ExpirationHeight = fc.ProofHeight + 1
		return fc
	}

	broadcastContract := func(fc types.V2FileContract) (types.FileContractID, error) {
		sigHash := cm.TipState().ContractSigHash(fc)
		fc.RenterSignature = renterPrivateKey.SignHash(sigHash)
		fc.HostSignature = hostPrivateKey.SignHash(sigHash)

		txn := types.V2Transaction{FileContracts: []types.V2FileContract{fc}}

		fcOut := fc.RenterOutput.Value.Add(fc.HostOutput.Value).Add(cm.TipState().V2FileContractTax(fc))
		basis, toSign, err := w.FundV2Transaction(&txn, fcOut, true)
		if err != nil {
			return types.FileContractID{}, fmt.Errorf("Failed to fund contract creation txn: %w", err)
		}
		w.SignV2Inputs(&txn, toSign)

		basis, txns, err := cm.V2TransactionSet(basis, txn)
		if err != nil {
			return types.FileContractID{}, fmt.Errorf("Failed to get v2 transaction set: %w", err)
		}

		if _, err := cm.AddV2PoolTransactions(basis, txns); err != nil {
			return types.FileContractID{}, fmt.Errorf("failed to add contract creation txn to pool: %w", err)
		}
		return txn.V2FileContractID(txn.ID(), 0), nil
	}

	height := cm.Tip().Height

	// this contract will expire
	fc1 := prepareContract(height + 1)
	fc1.MissedHostValue = fc1.MissedHostValue.Sub(types.Siacoins(1))
	fc1ID, err := broadcastContract(fc1)
	if err != nil {
		return err
	}

	// this contract will be revised and then resolved with storage proof
	fc2 := prepareContract(height + 2)
	fc2.Capacity = proto4.SectorSize
	fc2ID, err := broadcastContract(fc2)
	if err != nil {
		return err
	}

	// this contract will be renewed
	fc3 := prepareContract(height + 10000)
	fc3ID, err := broadcastContract(fc3)
	if err != nil {
		return err
	}

	if err := mineBlock(nm, e, w); err != nil {
		return err
	}

	fc2Rev := fc2
	fc2Rev.Filesize = 65
	fc2Rev.RevisionNumber++
	data := make([]byte, 2*proto2.LeafSize)
	data[0], data[proto2.LeafSize] = 1, 1
	fc2Rev.FileMerkleRoot, _ = proto2.ReaderRoot(bytes.NewReader(data))

	fce2, err := e.V2Contract(fc2ID)
	if err != nil {
		return fmt.Errorf("Failed to retrieve contract element: %w", err)
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

	if _, err := cm.AddV2PoolTransactions(cm.Tip(), []types.V2Transaction{reviseTxn}); err != nil {
		return fmt.Errorf("Failed to add revision txn to pool: %w", err)
	}

	tip := cm.Tip()
	if err := mineBlock(nm, e, w); err != nil {
		return err
	}

	_, applied, err := cm.UpdatesSince(tip, 1000)
	cie := applied[len(applied)-1].ChainIndexElement()

	fce1, err := e.V2Contract(fc1ID)
	if err != nil {
		return fmt.Errorf("Failed to retrieve contract element: %w", err)
	}
	fce2, err = e.V2Contract(fc2ID)
	if err != nil {
		return fmt.Errorf("Failed to retrieve contract element: %w", err)
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

	if _, err := cm.AddV2PoolTransactions(cm.Tip(), []types.V2Transaction{proveTxn}); err != nil {
		return fmt.Errorf("Failed to add proof and expiration txn to pool: %w", err)
	}

	tip = cm.Tip()
	if err := mineBlock(nm, e, w); err != nil {
		return err
	}

	fc3FinalRev := fc3
	fc3FinalRev.RevisionNumber = types.MaxRevisionNumber
	renewal, _ := proto4.RenewContract(fc3FinalRev, proto4.HostPrices{}, proto4.RPCRenewContractParams{
		ProofHeight: fc3FinalRev.ProofHeight,
		Allowance:   fc3FinalRev.RenterOutput.Value,
		Collateral:  fc3FinalRev.HostOutput.Value,
	})
	fcOut := (renewal.NewContract.RenterOutput.Value).Add(renewal.NewContract.HostOutput.Value).Add(cm.TipState().V2FileContractTax(renewal.NewContract)).Sub(renewal.RenterRollover).Sub(renewal.HostRollover)
	{
		cs := cm.TipState()
		renewal.RenterSignature = renterPrivateKey.SignHash(cs.RenewalSigHash(renewal))
		renewal.HostSignature = hostPrivateKey.SignHash(cs.RenewalSigHash(renewal))
		renewal.NewContract.RenterSignature = renterPrivateKey.SignHash(cs.ContractSigHash(renewal.NewContract))
		renewal.NewContract.HostSignature = hostPrivateKey.SignHash(cs.ContractSigHash(renewal.NewContract))
	}
	fce3, err := e.V2Contract(fc3ID)
	if err != nil {
		return fmt.Errorf("Failed to retrieve contract element: %w", err)
	}
	renewalTxn := types.V2Transaction{
		FileContractResolutions: []types.V2FileContractResolution{{
			Parent:     fce3.V2FileContractElement,
			Resolution: &renewal,
		}},
	}
	basis, toSign, err := w.FundV2Transaction(&renewalTxn, fcOut, false)
	if err != nil {
		return fmt.Errorf("Failed to fund renewal txn: %w", (err))
	}
	w.SignV2Inputs(&renewalTxn, toSign)

	if _, err := cm.AddV2PoolTransactions(basis, []types.V2Transaction{renewalTxn}); err != nil {
		return fmt.Errorf("Failed to add renewal txn to pool: %w", (err))
	}

	tip = cm.Tip()
	if err := mineBlock(nm, e, w); err != nil {
		return err
	}

	return nil
}
