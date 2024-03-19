import { WebTransportClient } from './transport'
import { WASM } from './types'

export function getSDK() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const wasm = (global as any).sia as WASM
  return {
    rhp: wasm.rhp,
    wallet: wasm.wallet,
    WebTransportClient,
  }
}
