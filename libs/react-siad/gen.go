package main

import (
	"os"

	"github.com/OneOfOne/struct2ts"
)

var missing = `
`

func check(e error) {
	if e != nil {
		panic(e)
	}
}

// GenerateTypes transforms Go structs to Typescript structs and writes them to a file.
func GenerateTypes() {
	converter := struct2ts.New(&struct2ts.Options{
		InterfaceOnly: true,
	})


	f, err := os.Create("libs/react-siad/src/rawTypes.ts")
	check(err)
	defer f.Close()
	err = converter.RenderTo(f)
	if err != nil {
		panic(err)
	}
	f.WriteString(missing)
	f.Sync()
}
