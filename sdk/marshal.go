package main

import (
	"encoding/json"
	"fmt"
	"syscall/js"
)

func marshalStruct(obj any) (js.Value, error) {
	jsonData, err := json.Marshal(obj)
	if err != nil {
		return js.Null(), err
	}
	jsObject := js.Global().Get("JSON").Call("parse", string(jsonData))
	return jsObject, nil
}

func unmarshalStruct(jsValue js.Value, target any) error {
	jsonData := js.Global().Get("JSON").Call("stringify", jsValue).String()
	return json.Unmarshal([]byte(jsonData), target)
}

func unmarshalUint8Array(jsArray js.Value) ([]uint8, error) {
	if jsArray.Type() != js.TypeObject || jsArray.Get("constructor").Get("name").String() != "Uint8Array" {
		return nil, fmt.Errorf("expected Uint8Array")
	}
	length := jsArray.Length()
	goBytes := make([]byte, length)
	js.CopyBytesToGo(goBytes, jsArray)
	return goBytes, nil
}

func marshalUint8Array(bytes []byte) js.Value {
	jsArray := js.Global().Get("Uint8Array").New(len(bytes))
	js.CopyBytesToJS(jsArray, bytes)
	return jsArray
}
