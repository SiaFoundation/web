package main

import (
	"bytes"
	"syscall/js"

	"go.sia.tech/core/rhp/v4"
)

func encodeRPCRequest(data js.Value, req rhp.Request) result {
	if data.Type() != js.TypeUndefined {
		if err := unmarshalStruct(data, &req); err != nil {
			return resultErr(err)
		}
	}
	buf := bytes.NewBuffer(nil)
	if err := rhp.WriteRequest(buf, req); err != nil {
		return resultErr(err)
	}
	return resultRPC(marshalUint8Array(buf.Bytes()))
}

func decodeRPCRequest(rpcJsData js.Value, res rhp.Request) result {
	rpcData, err := unmarshalUint8Array(rpcJsData)
	if err != nil {
		return resultErr(err)
	}
	err = rhp.ReadRequest(bytes.NewReader(rpcData), res)
	if err != nil {
		return resultErr(err)
	}
	d, err := marshalStruct(res)
	if err != nil {
		return resultErr(err)
	}
	return resultData(d)
}

func encodeRPCResponse(data js.Value, req rhp.Object) result {
	if data.Type() != js.TypeUndefined {
		if err := unmarshalStruct(data, &req); err != nil {
			return resultErr(err)
		}
	}
	buf := bytes.NewBuffer(nil)
	if err := rhp.WriteResponse(buf, req); err != nil {
		return resultErr(err)
	}
	return resultRPC(marshalUint8Array(buf.Bytes()))
}

func decodeRPCResponse(rpcJsData js.Value, res rhp.Object) result {
	rpcData, err := unmarshalUint8Array(rpcJsData)
	if err != nil {
		return resultErr(err)
	}
	err = rhp.ReadResponse(bytes.NewReader(rpcData), res)
	if err != nil {
		return resultErr(err)
	}
	d, err := marshalStruct(res)
	if err != nil {
		return resultErr(err)
	}
	return resultData(d)
}
