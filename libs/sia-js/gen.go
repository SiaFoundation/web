package main

import (
	"os"

	"github.com/OneOfOne/struct2ts"
	"go.sia.tech/siad/modules"
	"go.sia.tech/siad/node/api"
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

	converter.Add(modules.ValuedTransaction{})
	converter.Add(modules.ProcessedTransaction{})
	converter.Add(api.ConsensusGET{})
	converter.Add(api.GatewayGET{})
	converter.Add(api.DaemonVersion{})
	converter.Add(api.WalletGET{})
	converter.Add(api.WalletInitPOST{})
	converter.Add(api.RenterContracts{})
	converter.Add(api.RenterGET{})
	converter.Add(api.RenterFuseInfo{})
	converter.Add(api.RenterBackupsGET{})
	converter.Add(api.RenterRecoveryStatusGET{})
	converter.Add(api.SiaConstants{})
	converter.Add(api.RenterFiles{})
	converter.Add(api.RenterFile{})
	converter.Add(api.RenterDirectory{})

	f, err := os.Create("libs/sia-js/src/types/gen.ts")
	check(err)
	defer f.Close()

	err = converter.RenderTo(f)
	f.Sync()
	check(err)
}
