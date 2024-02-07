package main

import (
	"syscall/js"

	"go.sia.tech/core/rhp/v4"
	"go.sia.tech/web/sdk/encode"
	"go.sia.tech/web/sdk/utils"
)

// settings test

func encodeSettings(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
		return map[string]any{"error": err.Error()}
	}

	var r rhp.HostSettings
	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
		return map[string]any{"error": err.Error()}
	}

	rpc, err := encode.EncodeRPC(&r)
	if err != nil {
		return map[string]any{"error": err.Error()}
	}

	return map[string]any{"rpc": rpc}
}

func decodeSettings(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
		return map[string]any{"error": err.Error()}
	}

	hsRpc, err := encode.UnmarshalUint8Array(args[0])
	if err != nil {
		return map[string]any{"error": err.Error()}
	}

	var r rhp.HostSettings
	data, err := encode.DecodeRPC(hsRpc, &r)
	if err != nil {
		return map[string]any{"error": err.Error()}
	}

	return map[string]any{"data": data}
}

// settings

// func encodeSettingsRequest(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCSettingsRequest
// 	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	rpc, err := encode.EncodeRPC(&r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"rpc": rpc}
// }

// func decodeSettingsRequest(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	hsRpc, err := encode.UnmarshalUint8Array(args[0])
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCSettingsRequest
// 	data, err := encode.DecodeRPC(hsRpc, &r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"data": data}
// }

// func encodeSettingsResponse(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCSettingsResponse
// 	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	rpc, err := encode.EncodeRPC(&r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"rpc": rpc}
// }

// func decodeSettingsResponse(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	hsRpc, err := encode.UnmarshalUint8Array(args[0])
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCSettingsResponse
// 	data, err := encode.DecodeRPC(hsRpc, &r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"data": data}
// }

// // read sector

// func encodeReadSectorRequest(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCReadSectorRequest
// 	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	rpc, err := encode.EncodeRPC(&r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"rpc": rpc}
// }

// func decodeReadSectorRequest(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	hsRpc, err := encode.UnmarshalUint8Array(args[0])
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCReadSectorRequest
// 	data, err := encode.DecodeRPC(hsRpc, &r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"data": data}
// }

// func encodeReadSectorResponse(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCReadSectorResponse
// 	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	rpc, err := encode.EncodeRPC(&r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"rpc": rpc}
// }

// func decodeReadSectorResponse(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	hsRpc, err := encode.UnmarshalUint8Array(args[0])
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCReadSectorResponse
// 	data, err := encode.DecodeRPC(hsRpc, &r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"data": data}
// }

// // write sector

// func encodeWriteSectorRequest(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCWriteSectorRequest
// 	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	rpc, err := encode.EncodeRPC(&r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"rpc": rpc}
// }

// func decodeWriteSectorRequest(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	hsRpc, err := encode.UnmarshalUint8Array(args[0])
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCWriteSectorRequest
// 	data, err := encode.DecodeRPC(hsRpc, &r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"data": data}
// }

// func encodeWriteSectorResponse(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCWriteSectorResponse
// 	if err := encode.UnmarshalStruct(args[0], &r); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	rpc, err := encode.EncodeRPC(&r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"rpc": rpc}
// }

// func decodeWriteSectorResponse(this js.Value, args []js.Value) interface{} {
// 	if err := utils.CheckArgs(args, js.TypeObject); err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	hsRpc, err := encode.UnmarshalUint8Array(args[0])
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	var r rhp.RPCWriteSectorResponse
// 	data, err := encode.DecodeRPC(hsRpc, &r)
// 	if err != nil {
// 		return map[string]any{"error": err.Error()}
// 	}

// 	return map[string]any{"data": data}
// }
