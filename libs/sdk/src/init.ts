import { getSDK } from './sdk'
import { initWASM } from './wasm'

export async function initSDK() {
  await initWASM()
  return getSDK()
}
