import { Transaction } from '@siafoundation/react-core'
import { ConsensusState } from '@siafoundation/react-walletd'
import { initWasmGo } from './wasm_exec_mod'

interface WalletWASM {
  keyFromSeed: (
    seed: string,
    index: number
  ) => {
    privateKey?: string
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
    cs: ConsensusState,
    txn: Transaction,
    sigIndex: number,
    key: string
  ) => {
    transaction?: Transaction
    error?: string
  }
}

export function getWalletdWasm() {
  return global.walletdWasm as WalletWASM
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
