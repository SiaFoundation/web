import { Transaction, UnlockConditions } from '@siafoundation/react-walletd'
import { initWasmGo } from './wasm_exec_mod'

interface WalletWASM {
  newSeedPhrase: () => {
    phrase?: string
    error?: string
  }
  seedFromPhrase: (phrase: string) => {
    seed?: string
    error?: string
  }
  privateKeyFromSeed: (
    seed: string,
    index: number
  ) => {
    privateKey?: string
    error?: string
  }
  publicKeyFromSeed: (
    seed: string,
    index: number
  ) => {
    publicKey?: string
    error?: string
  }
  unlockConditionsFromSeed: (
    seed: string,
    index: number
  ) => {
    unlockConditions?: UnlockConditions
    error?: string
  }
  addressFromSeed: (
    seed: string,
    index: number
  ) => {
    address?: string
    error?: string
  }
  signTransaction: (
    cs: string, // ConsensusState
    cn: string, // ConsensusNetwork
    txn: string, // Transaction
    sigIndex: number,
    seed: string
  ) => {
    transaction?: Transaction
    error?: string
  }
}

export function getWalletWasm() {
  return global.walletWasm as WalletWASM
}

export async function loadWASM(): Promise<{ error?: string }> {
  if (!WebAssembly.instantiateStreaming) {
    // polyfill
    WebAssembly.instantiateStreaming = async (resp, importObject) => {
      const source = await (await resp).arrayBuffer()
      return await WebAssembly.instantiate(source, importObject)
    }
  }

  const Go = initWasmGo()
  const go = new Go()
  const wasm = fetch('/walletd.wasm')
  try {
    const result = await WebAssembly.instantiateStreaming(wasm, go.importObject)
    go.run(result.instance)
    return {}
  } catch (e) {
    console.log(e)
    return {
      error: e.message,
    }
  }
}
