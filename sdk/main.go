package main

import (
	"syscall/js"
)

func main() {
	js.Global().Set("sia", map[string]any{
		"rhp": map[string]any{
			"generateAccount": jsFunc(generateAccount),
			// settings
			"encodeSettingsRequest":  jsFunc(encodeSettingsRequest),
			"decodeSettingsRequest":  jsFunc(decodeSettingsRequest),
			"encodeSettingsResponse": jsFunc(encodeSettingsResponse),
			"decodeSettingsResponse": jsFunc(decodeSettingsResponse),
			// read sector
			"encodeReadSectorRequest":  jsFunc(encodeReadSectorRequest),
			"decodeReadSectorRequest":  jsFunc(decodeReadSectorRequest),
			"encodeReadSectorResponse": jsFunc(encodeReadSectorResponse),
			"decodeReadSectorResponse": jsFunc(decodeReadSectorResponse),
			// write sector
			"encodeWriteSectorRequest":  jsFunc(encodeWriteSectorRequest),
			"decodeWriteSectorRequest":  jsFunc(decodeWriteSectorRequest),
			"encodeWriteSectorResponse": jsFunc(encodeWriteSectorResponse),
			"decodeWriteSectorResponse": jsFunc(decodeWriteSectorResponse),
		},
		"wallet": map[string]any{
			"generateSeedPhrase":          jsFunc(generateSeedPhrase),
			"generateKeyPair":             jsFunc(generateKeyPair),
			"keyPairFromSeedPhrase":       jsFunc(keyPairFromSeedPhrase),
			"standardUnlockConditions":    jsFunc(standardUnlockConditions),
			"standardUnlockHash":          jsFunc(standardUnlockHash),
			"addressFromUnlockConditions": jsFunc(addressFromUnlockConditions),
			"addressFromSpendPolicy":      jsFunc(addressFromSpendPolicy),
			"encodeTransaction":           jsFunc(encodeTransaction),
			"transactionId":               jsFunc(transactionID),
			"v2TransactionId":             jsFunc(v2TransactionID),
			"signTransactionV1":           jsFunc(signTransactionV1),
			"v2TransactionInputSigHash":   jsFunc(v2TransactionInputSigHash),
			"signHash":                    jsFunc(signHash),
		},
	})
	c := make(chan bool, 1)
	<-c
}

func jsFunc(method func(js.Value, []js.Value) map[string]any) js.Func {
	return js.FuncOf(func(this js.Value, args []js.Value) any {
		return method(this, args)
	})
}
