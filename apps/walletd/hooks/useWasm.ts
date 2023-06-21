import { useEffect } from 'react'
import { initWasmGo } from './wasm_exec'

export function useWasm() {
  useEffect(() => {
    const Go = initWasmGo()
    const go = new Go()
    WebAssembly.instantiateStreaming(
      fetch('/walletd.wasm'),
      go.importObject
    ).then((result) => {
      go.run(result.instance)
    })
  }, [])
}
