package main

import (
	"bytes"
	"syscall/js"

	proto4 "go.sia.tech/core/rhp/v4"
	"go.sia.tech/core/types"
)

func encodeRPCRequest(rpcID types.Specifier, data js.Value, req proto4.Object) result {
	if data.Type() != js.TypeUndefined {
		if err := unmarshalStruct(data, &req); err != nil {
			return resultErr(err)
		}
	}
	buf := bytes.NewBuffer(nil)
	if err := proto4.WriteRequest(buf, rpcID, req); err != nil {
		return resultErr(err)
	}
	return resultRPC(marshalUint8Array(buf.Bytes()))
}

func decodeRPCRequest(rpcJsData js.Value, res proto4.Object) result {
	rpcData, err := unmarshalUint8Array(rpcJsData)
	if err != nil {
		return resultErr(err)
	}
	err = proto4.ReadRequest(bytes.NewReader(rpcData), res)
	if err != nil {
		return resultErr(err)
	}
	d, err := marshalStruct(res)
	if err != nil {
		return resultErr(err)
	}
	return resultData(d)
}

func encodeRPCResponse(data js.Value, obj proto4.Object) result {
	if data.Type() != js.TypeUndefined {
		if err := unmarshalStruct(data, &obj); err != nil {
			return resultErr(err)
		}
	}
	buf := bytes.NewBuffer(nil)
	if err := proto4.WriteResponse(buf, obj); err != nil {
		return resultErr(err)
	}
	return resultRPC(marshalUint8Array(buf.Bytes()))
}

func decodeRPCResponse(rpcJsData js.Value, res proto4.Object) result {
	rpcData, err := unmarshalUint8Array(rpcJsData)
	if err != nil {
		return resultErr(err)
	}
	err = proto4.ReadResponse(bytes.NewReader(rpcData), res)
	if err != nil {
		return resultErr(err)
	}
	d, err := marshalStruct(res)
	if err != nil {
		return resultErr(err)
	}
	return resultData(d)
}
