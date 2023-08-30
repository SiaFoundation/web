package core

import (
	"bytes"

	"go.sia.tech/core/consensus"
	"go.sia.tech/core/types"
	"go.sia.tech/core/wallet"
)

func NewSeedPhrase() string {
	return wallet.NewSeedPhrase()
}

func SeedFromPhrase(phrase string) (*[32]byte, error) {
	var seed [32]byte
	return &seed, wallet.SeedFromPhrase(&seed, phrase)
}

func PrivateKeyFromSeed(seed *[32]byte, index uint64) types.PrivateKey {
	return wallet.KeyFromSeed(seed, index)
}

func PublicKeyFromSeed(seed *[32]byte, index uint64) string {
	return wallet.KeyFromSeed(seed, index).PublicKey().String()
}

func PublicKeyAndAddressFromSeed(seed *[32]byte, index uint64) (string, string) {
	pk := wallet.KeyFromSeed(seed, index).PublicKey()
	publicKey := pk.String()
	address := pk.StandardUnlockConditions().UnlockHash().String()
	return publicKey, address
}

func encodeToBytes(v types.EncoderTo) []byte {
	var buf bytes.Buffer
	e := types.NewEncoder(&buf)
	v.EncodeTo(e)
	e.Flush()
	return buf.Bytes()
}

func EncodeTransaction(txn types.Transaction) []byte {
	return encodeToBytes(txn)
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

func UnlockConditionsFromSeed(seed *[32]byte, index uint64) types.UnlockConditions {
	return wallet.KeyFromSeed(seed, index).PublicKey().StandardUnlockConditions()
}
