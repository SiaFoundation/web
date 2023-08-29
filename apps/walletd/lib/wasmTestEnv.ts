import { initWasmGo } from './wasm_exec_mod'
import fs from 'fs'

export async function loadWASMTestEnv(): Promise<{ error?: string }> {
  const Go = initWasmGo()
  const go = new Go()
  const wasm = fs.readFileSync('apps/walletd/public/walletd.wasm')
  try {
    const result = await WebAssembly.instantiate(wasm, go.importObject)
    go.run(result.instance)
    return {}
  } catch (e) {
    console.log(e)
    return {
      error: e.message,
    }
  }
}
