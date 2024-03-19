package main

import (
	"syscall/js"
)

type result = map[string]any

func resultErr(err error) result {
	return map[string]any{"error": err.Error()}
}

func resultErrStr(err string) result {
	return map[string]any{"error": err}
}

func resultRPC(rpc js.Value) result {
	return map[string]any{"rpc": rpc}
}

func resultData(data any) result {
	return map[string]any{"data": data}
}
