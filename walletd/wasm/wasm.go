package main

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"syscall/js"

	"go.sia.tech/core/consensus"
	"go.sia.tech/core/types"
	"go.sia.tech/web/walletd/wasm/core"
	"go.sia.tech/web/walletd/wasm/utils"
)

func main() {
	fmt.Println("wallet WASM: init")
	js.Global().Set("walletWasm", map[string]interface{}{
		"newSeedPhrase":               js.FuncOf(newSeedPhrase),
		"seedFromPhrase":              js.FuncOf(seedFromPhrase),
		"privateKeyFromSeed":          js.FuncOf(privateKeyFromSeed),
		"unlockConditionsFromSeed":    js.FuncOf(unlockConditionsFromSeed),
		"publicKeyAndAddressFromSeed": js.FuncOf(publicKeyAndAddressFromSeed),
		"encodeTransaction":           js.FuncOf(encodeTransaction),
		"signTransaction":             js.FuncOf(signTransaction),
	})
	c := make(chan bool, 1)
	<-c
}

func newSeedPhrase(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	return map[string]any{
		"phrase": core.NewSeedPhrase(),
		"error":  nil,
	}
}

func seedFromPhrase(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeString); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	phrase := args[0].String()
	seed, err := core.SeedFromPhrase(phrase)

	if err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	seedHex := hex.EncodeToString(seed[:])
	return map[string]any{
		"seed":  seedHex,
		"error": err,
	}
}

func privateKeyFromSeed(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeString, js.TypeNumber); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	seed := utils.HexStringToByte32Array(args[0].String())
	index := uint64(args[1].Int())
	privateKey := core.PrivateKeyFromSeed(&seed, index)
	return map[string]any{
		"privateKey": hex.EncodeToString(privateKey),
	}
}

func unlockConditionsFromSeed(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeString, js.TypeNumber); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	seed := utils.HexStringToByte32Array(args[0].String())
	index := uint64(args[1].Int())
	unlockConditions := core.UnlockConditionsFromSeed(&seed, index)

	data, err := utils.InterfaceToJSON(unlockConditions)
	if err != nil {
		return map[string]any{
			"error": err,
		}
	}
	return map[string]any{
		"unlockConditions": data,
	}
}

func publicKeyAndAddressFromSeed(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeString, js.TypeNumber); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	seed := utils.HexStringToByte32Array(args[0].String())
	index := uint64(args[1].Int())
	publicKey, address := core.PublicKeyAndAddressFromSeed(&seed, index)
	return map[string]any{
		"publicKey": publicKey,
		"address":   address,
	}
}

func encodeTransaction(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeString); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	jsonTxn := args[0].String()

	var txn types.Transaction

	if err := json.Unmarshal([]byte(jsonTxn), &txn); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	encoded := core.EncodeTransaction(txn)

	return map[string]any{
		"encodedTransaction": utils.BytesToInterface(encoded),
	}
}

func signTransaction(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeString, js.TypeString, js.TypeString, js.TypeNumber, js.TypeString); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	jsonCs := args[0].String()
	jsonCn := args[1].String()
	jsonTxn := args[2].String()
	sigIndex := args[3].Int()
	seed := utils.HexStringToByteArray(args[4].String())

	var cs consensus.State
	if err := json.Unmarshal([]byte(jsonCs), &cs); err != nil {
		return map[string]any{
			"error": fmt.Sprintf("error decoding consensus state: %s", err),
		}
	}

	var cn consensus.Network
	if err := json.Unmarshal([]byte(jsonCn), &cn); err != nil {
		return map[string]any{
			"error": fmt.Sprintf("error decoding consensus network: %s", err),
		}
	}

	var txn types.Transaction
	if err := json.Unmarshal([]byte(jsonTxn), &txn); err != nil {
		return map[string]any{
			"error": fmt.Sprintf("error decoding transaction: %s", err),
		}
	}
	cs.Network = &cn

	signedTxn := core.SignTransaction(cs, txn, sigIndex, seed)
	data, err := utils.InterfaceToJSON(signedTxn)
	if err != nil {
		return map[string]any{
			"error": err,
		}
	}
	return map[string]any{
		"transaction": data,
	}
}
