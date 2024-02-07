package encode

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"syscall/js"

	"go.sia.tech/core/types"
)

func MarshalStruct(obj interface{}) (js.Value, error) {
	jsonData, err := json.Marshal(obj)
	if err != nil {
		return js.Null(), err
	}
	jsObject := js.Global().Get("JSON").Call("parse", string(jsonData))
	return jsObject, nil
}

func UnmarshalStruct(jsValue js.Value, target interface{}) error {
	jsonSettings := js.Global().Get("JSON").Call("stringify", jsValue).String()
	return json.Unmarshal([]byte(jsonSettings), target)
}

func UnmarshalUint8Array(jsArray js.Value) ([]uint8, error) {
	if jsArray.Type() != js.TypeObject || jsArray.Get("constructor").Get("name").String() != "Uint8Array" {
		return nil, fmt.Errorf("expected Uint8Array")
	}
	length := jsArray.Length()
	goBytes := make([]byte, length)
	js.CopyBytesToGo(goBytes, jsArray)
	return goBytes, nil
}

func MarshalUint8Array(bytes []byte) js.Value {
	jsArray := js.Global().Get("Uint8Array").New(len(bytes))
	js.CopyBytesToJS(jsArray, bytes)
	return jsArray
}

type Encodable interface {
	EncodeTo(encoder *types.Encoder)
}

func EncodeRPC(encodable Encodable) (js.Value, error) {
	var buffer bytes.Buffer
	encoder := types.NewEncoder(&buffer)
	encodable.EncodeTo(encoder)
	if err := encoder.Flush(); err != nil {
		return js.Null(), err
	}
	encoded := buffer.Bytes()
	return MarshalUint8Array(encoded), nil
}

type Decodable interface {
	DecodeFrom(decoder *types.Decoder)
}

func DecodeRPC(encodedData []byte, decodable Decodable) (js.Value, error) {
	buffer := bytes.NewBuffer(encodedData)
	lr := io.LimitedReader{R: buffer, N: int64(len(encodedData))}
	decoder := types.NewDecoder(lr)
	// TODO: add error handling
	decodable.DecodeFrom(decoder)
	return MarshalStruct(decodable)
}
