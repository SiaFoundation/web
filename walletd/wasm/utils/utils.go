package utils

import (
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"
	"reflect"
	"strings"
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

func HexStringToByte32Array(str string) [32]byte {
	// The length of the hexString should be 64 to fit in [32]byte.
	// If the hexString is shorter, you need to pad it with zeroes.

	// You should ensure that hexString length is exactly 64 characters long.
	// This step is necessary only if your hex string is shorter than expected.
	if len(str) < 64 {
		fmt.Println("WARNING: not 64 characters")
		str = str + strings.Repeat("0", 64-len(str))
	}

	byteArray, err := hex.DecodeString(str)
	if err != nil {
		log.Fatal(err)
	}

	var byte32Array [32]byte
	copy(byte32Array[:], byteArray[:32])

	return byte32Array
}

func HexStringToByteArray(str string) []byte {
	// if len(str) < 64 {
	// 	fmt.Println("WARNING: not 64 characters")
	// 	str = str + strings.Repeat("0", 64-len(str))
	// }

	byteArray, err := hex.DecodeString(str)
	if err != nil {
		log.Fatal(err)
	}

	return byteArray
}

func InterfaceToJSON(obj interface{}) (con map[string]interface{}, err error) {
	buf, err := json.Marshal(obj)

	if err != nil {
		return
	}

	err = json.Unmarshal(buf, &con)

	return
}

func EncodeJSON(w io.Writer, v interface{}) error {
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
	return EncodeJSON(os.Stdout, v)
}
