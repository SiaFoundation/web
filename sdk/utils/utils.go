package utils

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"reflect"
	"syscall/js"
)

func CheckArgs(args []js.Value, argTypes ...js.Type) error {
	if len(args) != len(argTypes) {
		return fmt.Errorf("incorrect number of arguments - expected: %d, got: %d", len(argTypes), len(args))
	}

	for i, arg := range args {
		if arg.Type() != argTypes[i] {
			return fmt.Errorf("incorrect argument %d - expected: %s, got: %s", i, argTypes[i], arg.Type())
		}
	}

	return nil
}

func encodeJSON(w io.Writer, v interface{}) error {
	// encode nil slices as [] instead of null
	if val := reflect.ValueOf(v); val.Kind() == reflect.Slice && val.Len() == 0 {
		_, err := w.Write([]byte("[]\n"))
		return err
	}
	enc := json.NewEncoder(w)
	enc.SetIndent("", "  ")
	return enc.Encode(v)
}

func PrintStruct(v interface{}) error {
	return encodeJSON(os.Stdout, v)
}
