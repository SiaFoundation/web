package main

import (
	"encoding/hex"
	"syscall/js"

	"go.sia.tech/core/rhp/v4"
	"go.sia.tech/web/sdk/utils"
)

func generateAccountID(this js.Value, args []js.Value) interface{} {
	if err := utils.CheckArgs(args); err != nil {
		return map[string]any{
			"error": err.Error(),
		}
	}

	id := rhp.GenerateAccountID()
	data := hex.EncodeToString(id[:])

	return map[string]any{
		"accountID": data,
		"error":     nil,
	}
}
