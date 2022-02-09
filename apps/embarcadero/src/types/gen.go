package main

import (
	"os"

	"github.com/OneOfOne/struct2ts"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func main() {
	converter := struct2ts.New(&struct2ts.Options{
		InterfaceOnly: true,
	})

	// converter.Add(embarcadero.Foo{})

	f, err := os.Create("apps/embarcadero/src/types/gen.ts")
	check(err)
	defer f.Close()

	err = converter.RenderTo(f)
	f.Sync()
	check(err)
}
