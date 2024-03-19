package main

import (
	"encoding/hex"
	"syscall/js"

	"go.sia.tech/core/rhp/v4"
)

func generateAccount(this js.Value, args []js.Value) result {
	if err := checkArgs(args); err != nil {
		return resultErr(err)
	}

	pk, a := rhp.GenerateAccount()

	privateKey := hex.EncodeToString(pk)
	account := hex.EncodeToString(a[:])

	return result(map[string]any{
		"privateKey": privateKey,
		"account":    account,
	})
}

// settings

func encodeSettingsRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCSettingsRequest
	return encodeRPCRequest(js.Undefined(), &r)
}

func decodeSettingsRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCSettingsRequest
	return decodeRPCRequest(args[0], &r)
}

func encodeSettingsResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCSettingsResponse
	return encodeRPCResponse(args[0], &r)
}

func decodeSettingsResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCSettingsResponse
	return decodeRPCResponse(args[0], &r)
}

// read sector

func encodeReadSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var r rhp.RPCReadSectorRequest
	return encodeRPCRequest(args[0], &r)
}

func decodeReadSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCReadSectorRequest
	return decodeRPCRequest(args[0], &r)
}

func encodeReadSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCReadSectorResponse
	return encodeRPCResponse(args[0], &r)
}

func decodeReadSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCReadSectorResponse
	return decodeRPCResponse(args[0], &r)
}

// write sector

func encodeWriteSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCWriteSectorRequest
	return encodeRPCRequest(args[0], &r)
}

func decodeWriteSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCWriteSectorRequest
	return decodeRPCRequest(args[0], &r)
}

func encodeWriteSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var r rhp.RPCWriteSectorResponse
	return encodeRPCResponse(args[0], &r)
}

func decodeWriteSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r rhp.RPCWriteSectorResponse
	return decodeRPCResponse(args[0], &r)
}
