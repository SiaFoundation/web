import './utils/wasm_exec'
import fs from 'fs'
import { join } from 'path'

export async function initWASMTest(): Promise<void> {
  try {
    const wasm = fs.readFileSync(join(__dirname, 'resources/sdk.wasm'))
    const go = new window.Go()
    const source = (await WebAssembly.instantiate(
      wasm,
      go.importObject,
    )) as unknown as WebAssembly.WebAssemblyInstantiatedSource
    go.run(source.instance)
  } catch (e) {
    throw new Error(`failed to initialize WASM: ${(e as Error).message}`)
  }
}
