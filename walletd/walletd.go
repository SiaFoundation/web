package walletd

import (
	"embed"
	"io/fs"
	"net/http"

	"go.sia.tech/web/ui"
)

//go:embed all:assets/*
var assets embed.FS

// Handler returns an http.Handler that serves the walletd UI.
func Handler() http.Handler {
	fs, err := fs.Sub(assets, "assets")
	if err != nil {
		panic(err)
	}
	return ui.Handler(fs)
}
