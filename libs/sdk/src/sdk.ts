import { WebTransportClient } from './transport'
import type { WasmApi } from './types'

export type SDK = WasmApi & {
  WebTransportClient: typeof WebTransportClient
}

export function getWasmApi(): WasmApi {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return (globalThis as any).sia as WasmApi
}

export function getSDK(): SDK {
  const wasmApi = getWasmApi()
  if (wasmApi === undefined) {
    throw new Error('The Sia SDK has not been initialized')
  }
  return {
    ...wasmApi,
    WebTransportClient,
  }
}
