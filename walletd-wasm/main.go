package main

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"syscall/js"

	"go.sia.tech/core/consensus"
	"go.sia.tech/core/types"
	"go.sia.tech/web/walletd-wasm/core"
)

func main() {
	fmt.Println("walletd WASM: init")
	js.Global().Set("walletdWasm", map[string]interface{}{
		"signTransaction": js.FuncOf(signTransaction),
		"keyFromSeed":     js.FuncOf(keyFromSeed),
		"addressFromSeed": js.FuncOf(addressFromSeed),
	})
	c := make(chan bool, 1)
	<-c
}

func checkArgs(args []js.Value, argTypes ...js.Type) error {
	if len(args) != len(argTypes) {
		return fmt.Errorf("incorrect number of arguments - expected: %d, got: %d", len(argTypes), len(args))
	}

	for i, arg := range args {
		if arg.Type() != argTypes[i] {
			return fmt.Errorf("incorrect argument %d - expected: %s, got: %s", i, argTypes[i], arg.Type())
		}
	}

	return nil
}

func hexStringToByte32Array(str string) [32]byte {
	// The length of the hexString should be 64 to fit in [32]byte.
	// If the hexString is shorter, you need to pad it with zeroes.

	// You should ensure that hexString length is exactly 64 characters long.
	// This step is necessary only if your hex string is shorter than expected.
	if len(str) < 64 {
		fmt.Println("WARNING: not 64 characters")
		str = str + strings.Repeat("0", 64-len(str))
	}

	byteArray, err := hex.DecodeString(str)
	if err != nil {
		log.Fatal(err)
	}

	var byte32Array [32]byte
	copy(byte32Array[:], byteArray[:32])

	return byte32Array
}

func hexStringToByteArray(str string) []byte {
	// if len(str) < 64 {
	// 	fmt.Println("WARNING: not 64 characters")
	// 	str = str + strings.Repeat("0", 64-len(str))
	// }

	byteArray, err := hex.DecodeString(str)
	if err != nil {
		log.Fatal(err)
	}

	return byteArray
}

func keyFromSeed(this js.Value, args []js.Value) interface{} {
	if err := checkArgs(args, js.TypeString, js.TypeNumber); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	seed := hexStringToByte32Array(args[0].String())
	index := uint64(args[1].Int())
	privateKey := core.KeyFromSeed(&seed, index)
	return map[string]any{
		"privateKey": privateKey,
	}
}

func addressFromSeed(this js.Value, args []js.Value) interface{} {
	if err := checkArgs(args, js.TypeString, js.TypeNumber); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	seed := hexStringToByte32Array(args[0].String())
	index := uint64(args[1].Int())
	address := core.AddressFromSeed(&seed, index)
	return map[string]any{
		"address": address,
	}
}

func signTransaction(this js.Value, args []js.Value) interface{} {
	if err := checkArgs(args, js.TypeObject, js.TypeObject, js.TypeNumber, js.TypeString); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	jsonCs := args[0].String()
	jsonTxn := args[1].String()
	sigIndex := args[2].Int()
	key := types.PrivateKey(hexStringToByteArray(args[3].String()))

	cs := consensus.State{}
	if err := json.Unmarshal([]byte(jsonCs), &cs); err != nil {
		return map[string]any{
			"error": fmt.Sprintf("error decoding consensus state: %s", err),
		}
	}

	txn := types.Transaction{}
	if err := json.Unmarshal([]byte(jsonTxn), &txn); err != nil {
		return map[string]any{
			"error": fmt.Sprintf("error decoding transaction: %s", err),
		}
	}

	signedTxn := core.SignTransaction(cs, txn, sigIndex, key)
	return map[string]any{
		"transaction": signedTxn,
	}
}
