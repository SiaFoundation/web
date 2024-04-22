package walletd

import (
	"io/fs"
	"testing"

	"go.sia.tech/web/internal/nextjs"
)

func TestRouter(t *testing.T) {
	err := fs.WalkDir(assets, ".", func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			t.Fatal(err)
		}
		t.Log(path)
		return nil
	})
	if err != nil {
		t.Fatal(err)
	}

	assetFS, err := fs.Sub(assets, "assets")
	if err != nil {
		t.Fatal(err)
	}
	_, err = nextjs.NewRouter(assetFS.(fs.ReadDirFS))
	if err != nil {
		t.Fatal(err)
	}
}
