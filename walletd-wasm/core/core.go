package core

import (
	"go.sia.tech/core/consensus"
	"go.sia.tech/core/types"
	"go.sia.tech/core/wallet"
)

func SeedFromPhrase(phrase string) (*[32]byte, error) {
	var seed [32]byte
	return &seed, wallet.SeedFromPhrase(&seed, phrase)
}

// TODO: might need to convert this to a string, check what needs to be called before String()
func KeyFromSeed(seed *[32]byte, index uint64) types.PrivateKey {
	return wallet.KeyFromSeed(seed, index)
}

func AddressFromSeed(seed *[32]byte, index uint64) string {
	return KeyFromSeed(seed, index).PublicKey().StandardUnlockConditions().UnlockHash().String()
}

func SignTransaction(cs consensus.State, txn types.Transaction, sigIndex int, key types.PrivateKey) types.Transaction {
	tsig := &txn.Signatures[sigIndex]
	var sigHash types.Hash256
	if tsig.CoveredFields.WholeTransaction {
		sigHash = cs.WholeSigHash(txn, tsig.ParentID, tsig.PublicKeyIndex, tsig.Timelock, tsig.CoveredFields.Signatures)
	} else {
		sigHash = cs.PartialSigHash(txn, tsig.CoveredFields)
	}
	sig := key.SignHash(sigHash)
	tsig.Signature = sig[:]
	return txn
}
