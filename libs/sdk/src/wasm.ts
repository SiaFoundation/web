import './utils/wasm_exec.js'
import wasm from './resources/sdk.wasm'

export async function initWASM(): Promise<void> {
  try {
    // globalThis works in both browser and non-browser environments. I could
    // not figure out how to extend the type of the globalThis namespace, this
    // silences the ts error.
    // @ts-expect-error Property 'Go' does not exist on type 'typeof globalThis'.
    const go = new globalThis.Go()
    const source = await wasm(go.importObject)
    go.run(source.instance)
  } catch (e) {
    throw new Error(`failed to initialize WASM: ${(e as Error).message}`)
  }
}
