import './utils/wasm_exec_tinygo'
import wasm from './resources/sdk.wasm'
import { SDK } from './types'

export function getSDK() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (global as any).sdk as SDK
}

export async function initSDK(): Promise<{ sdk?: SDK; error?: string }> {
  try {
    const go = new window.Go()
    const source = await wasm(go.importObject)
    await go.run(source.instance)
    return {
      sdk: getSDK(),
    }
  } catch (e) {
    console.log(e)
    return {
      error: (e as Error).message,
    }
  }
}
