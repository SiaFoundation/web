package main

import (
	"os"

	"github.com/OneOfOne/struct2ts"
	"go.sia.tech/siad/types"
)

var missing = `
`

func check(e error) {
	if e != nil {
		panic(e)
	}
}

// GenerateTypes transforms Go structs to Typescript structs and writes them to a file.
func main() {
	converter := struct2ts.New(&struct2ts.Options{
		InterfaceOnly: true,
	})

	// siad types
	converter.Add(types.Transaction{})
	converter.Add(types.Block{})

	f, err := os.Create("libs/react-core/src/rawTypes.ts")
	check(err)
	defer f.Close()
	err = converter.RenderTo(f)
	if err != nil {
		panic(err)
	}
	f.WriteString(missing)
	f.Sync()
}
