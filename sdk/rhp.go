package main

import (
	"encoding/hex"
	"syscall/js"

	proto4 "go.sia.tech/core/rhp/v4"
)

func generateAccount(this js.Value, args []js.Value) result {
	if err := checkArgs(args); err != nil {
		return resultErr(err)
	}

	pk, a := proto4.GenerateAccount()

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
	var r proto4.RPCSettingsRequest
	return encodeRPCRequest(proto4.RPCSettingsID, js.Undefined(), &r)
}

func decodeSettingsRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCSettingsRequest
	return decodeRPCRequest(args[0], &r)
}

func encodeSettingsResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCSettingsResponse
	return encodeRPCResponse(args[0], &r)
}

func decodeSettingsResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCSettingsResponse
	return decodeRPCResponse(args[0], &r)
}

// read sector

func encodeReadSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var r proto4.RPCReadSectorRequest
	return encodeRPCRequest(proto4.RPCReadSectorID, args[0], &r)
}

func decodeReadSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCReadSectorRequest
	return decodeRPCRequest(args[0], &r)
}

func encodeReadSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCReadSectorResponse
	return encodeRPCResponse(args[0], &r)
}

func decodeReadSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCReadSectorResponse
	return decodeRPCResponse(args[0], &r)
}

// write sector

func encodeWriteSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCWriteSectorRequest
	return encodeRPCRequest(proto4.RPCWriteSectorID, args[0], &r)
}

func decodeWriteSectorRequest(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCWriteSectorRequest
	return decodeRPCRequest(args[0], &r)
}

func encodeWriteSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}

	var r proto4.RPCWriteSectorResponse
	return encodeRPCResponse(args[0], &r)
}

func decodeWriteSectorResponse(this js.Value, args []js.Value) result {
	if err := checkArgs(args, js.TypeObject); err != nil {
		return resultErr(err)
	}
	var r proto4.RPCWriteSectorResponse
	return decodeRPCResponse(args[0], &r)
}
