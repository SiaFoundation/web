import { getSDK } from './sdk'
import { initWASMTest } from './wasmTest'

export async function initSDKTest() {
  await initWASMTest()
  return getSDK()
}
