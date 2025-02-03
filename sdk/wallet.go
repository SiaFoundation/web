package main

import (
	"bytes"
	"crypto/ed25519"
	"encoding/base64"
	"encoding/hex"
	"fmt"
	"syscall/js"

	"go.sia.tech/core/consensus"
	"go.sia.tech/core/types"
	"go.sia.tech/coreutils/wallet"
)

// encodeToBytes encodes a value to bytes.
func encodeToBytes(v types.EncoderTo) []byte {
	var buf bytes.Buffer
	e := types.NewEncoder(&buf)
	v.EncodeTo(e)
	e.Flush()
	return buf.Bytes()
}

// generateSeedPhrase returns a new seed phrase.
func generateSeedPhrase(this js.Value, args []js.Value) result {
	if err := checkArgs(args); err != nil {
		return resultErr(err)
	}

	return result(map[string]any{
		"phrase": wallet.NewSeedPhrase(),
	})
}

// generateKeyPair returns a new ed25519 key pair.
func generateKeyPair(this js.Value, args []js.Value) result {
	if err := checkArgs(args); err != nil {
		return resultErr(err)
	}

	pk := types.GeneratePrivateKey()
	return result(map[string]any{
		"privateKey": hex.EncodeToString(pk),
		"publicKey":  pk.PublicKey().String(),
	})
}

// keyPairFromSeedPhrase returns the key pair corresponding to the given seed phrase and index.
func keyPairFromSeedPhrase(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeString, js.TypeNumber); err != nil {
		return resultErr(err)
	}

	var seed [32]byte
	if err := wallet.SeedFromPhrase(&seed, args[0].String()); err != nil {
		return resultErr(err)
	}
	priv := wallet.KeyFromSeed(&seed, uint64(args[1].Int()))
	return result(map[string]any{
		"privateKey": hex.EncodeToString(priv),
		"publicKey":  priv.PublicKey().String(),
	})
}

// standardUnlockConditions returns the unlock conditions for a standard v1 unlockhash.
func standardUnlockConditions(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeString); err != nil {
		return resultErr(err)
	}

	var pub types.PublicKey
	if pub.UnmarshalText([]byte(args[0].String())) != nil {
		return resultErrStr("invalid public key")
	}
	uc := types.StandardUnlockConditions(pub)
	obj, err := marshalStruct(uc)
	if err != nil {
		return resultErrStr(fmt.Sprintf("error marshaling unlock conditions: %s", err))
	}
	return result(map[string]any{
		"unlockConditions": obj,
	})
}

// standardUnlockHash returns the v1 unlockhash corresponding to the given public key.
func standardUnlockHash(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeString); err != nil {
		return resultErr(err)
	}

	var pub types.PublicKey
	if pub.UnmarshalText([]byte(args[0].String())) != nil {
		return resultErrStr("invalid public key")
	}
	return result(map[string]any{
		"address": types.StandardUnlockHash(pub).String(),
	})
}

// addressFromUnlockConditions returns the address corresponding to the given unlock conditions.
func addressFromUnlockConditions(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var uc types.UnlockConditions
	if err := unmarshalStruct(args[0], &uc); err != nil {
		return resultErr(err)
	}

	return result(map[string]any{
		"address": uc.UnlockHash().String(),
	})
}

// addressFromSpendPolicy returns the address of a spend policy.
func addressFromSpendPolicy(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var sp types.SpendPolicy
	if err := unmarshalStruct(args[0], &sp); err != nil {
		return resultErr(err)
	}

	return result(map[string]any{
		"address": sp.Address().String(),
	})
}

// encodeTransaction returns the binary encoding of a transaction.
func encodeTransaction(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var txn types.Transaction
	if err := unmarshalStruct(args[0], &txn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding transaction: %s", err))
	}

	encoded := encodeToBytes(txn)
	return result(map[string]any{
		"encodedTransaction": marshalUint8Array(encoded),
	})
}

// signTransactionV1 returns the signature of a transaction.
func signTransactionV1(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject, js.TypeObject, js.TypeObject, js.TypeNumber, js.TypeString); err != nil {
		return resultErr(err)
	}

	var cs consensus.State
	if err := unmarshalStruct(args[0], &cs); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding consensus state: %s", err))
	}

	var cn consensus.Network
	if err := unmarshalStruct(args[1], &cn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding consensus network: %s", err))
	}

	var txn types.Transaction
	if err := unmarshalStruct(args[2], &txn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding transaction: %s", err))
	}
	cs.Network = &cn

	sigIndex := args[3].Int()

	buf, err := hex.DecodeString(args[4].String())
	if err != nil {
		return resultErrStr(fmt.Sprintf("error decoding private key: %s", err))
	} else if len(buf) != ed25519.PrivateKeySize {
		return resultErrStr(fmt.Sprintf("invalid private key length: %d", len(buf)))
	}
	privateKey := types.PrivateKey(buf)

	if sigIndex < 0 || sigIndex >= len(txn.Signatures) {
		return resultErrStr(fmt.Sprintf("signature index out of range: %d", sigIndex))
	}
	tsig := &txn.Signatures[sigIndex]
	var sigHash types.Hash256
	if tsig.CoveredFields.WholeTransaction {
		sigHash = cs.WholeSigHash(txn, tsig.ParentID, tsig.PublicKeyIndex, tsig.Timelock, tsig.CoveredFields.Signatures)
	} else {
		sigHash = cs.PartialSigHash(txn, tsig.CoveredFields)
	}
	sig := privateKey.SignHash(sigHash)
	return result(map[string]any{
		"signature": base64.StdEncoding.EncodeToString(sig[:]),
	})
}

// TransactionID returns the ID of a transaction.
func transactionID(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var txn types.Transaction
	if err := unmarshalStruct(args[0], &txn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding transaction: %s", err))
	}

	return result(map[string]any{
		"id": txn.ID().String(),
	})
}

// v2TransactionInputSigHash returns the input sigHash of a v2 transaction.
func v2TransactionInputSigHash(_ js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject, js.TypeObject, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var cs consensus.State
	if err := unmarshalStruct(args[0], &cs); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding consensus state: %s", err))
	}

	var cn consensus.Network
	if err := unmarshalStruct(args[1], &cn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding consensus network: %s", err))
	}

	var txn types.V2Transaction
	if err := unmarshalStruct(args[2], &txn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding transaction: %s", err))
	}
	cs.Network = &cn

	return result(map[string]any{
		"sigHash": cs.InputSigHash(txn).String(),
	})
}

// signHash returns the signature for a sig hash.
func signHash(_ js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeString, js.TypeString); err != nil {
		return resultErr(err)
	}

	buf, err := hex.DecodeString(args[0].String())
	if err != nil {
		return resultErrStr(fmt.Sprintf("error decoding private key: %s", err))
	} else if len(buf) != ed25519.PrivateKeySize {
		return resultErrStr(fmt.Sprintf("invalid private key length: %d", len(buf)))
	}
	privateKey := types.PrivateKey(buf)

	var sigHash types.Hash256
	if err := sigHash.UnmarshalText([]byte(args[1].String())); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding sig hash: %s", err))
	}

	sig := privateKey.SignHash(sigHash)
	return result(map[string]any{
		"signature": sig.String(),
	})
}

// v2TransactionID returns the ID of a transaction.
func v2TransactionID(_ js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var txn types.V2Transaction
	if err := unmarshalStruct(args[0], &txn); err != nil {
		return resultErrStr(fmt.Sprintf("error decoding transaction: %s", err))
	}

	return result(map[string]any{
		"id": txn.ID().String(),
	})
}
