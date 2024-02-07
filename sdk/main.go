package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	fmt.Println("WASM SDK: init")
	js.Global().Set("sdk", map[string]interface{}{
		"generateAccountID": js.FuncOf(generateAccountID),
		"rhp": map[string]interface{}{
			// test
			"encodeSettings": js.FuncOf(encodeSettings),
			"decodeSettings": js.FuncOf(decodeSettings),
			// // settings
			// "encodeSettingsRequest":  js.FuncOf(encodeSettingsRequest),
			// "decodeSettingsRequest":  js.FuncOf(decodeSettingsRequest),
			// "encodeSettingsResponse": js.FuncOf(encodeSettingsResponse),
			// "decodeSettingsResponse": js.FuncOf(decodeSettingsResponse),
			// // read sector
			// "encodeReadSectorRequest":  js.FuncOf(encodeReadSectorRequest),
			// "decodeReadSectorRequest":  js.FuncOf(decodeReadSectorRequest),
			// "encodeReadSectorResponse": js.FuncOf(encodeReadSectorResponse),
			// "decodeReadSectorResponse": js.FuncOf(decodeReadSectorResponse),
			// // write sector
			// "encodeWriteSectorRequest":  js.FuncOf(encodeWriteSectorRequest),
			// "decodeWriteSectorRequest":  js.FuncOf(decodeWriteSectorRequest),
			// "encodeWriteSectorResponse": js.FuncOf(encodeWriteSectorResponse),
			// "decodeWriteSectorResponse": js.FuncOf(decodeWriteSectorResponse),
		},
	})
	c := make(chan bool, 1)
	<-c
}
