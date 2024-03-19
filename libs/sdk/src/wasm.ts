import './utils/wasm_exec'
import wasm from './resources/sdk.wasm'

export async function initWASM(): Promise<void> {
  try {
    const go = new window.Go()
    const source = await wasm(go.importObject)
    await go.run(source.instance)
  } catch (e) {
    throw new Error(`failed to initialize WASM: ${(e as Error).message}`)
  }
}
