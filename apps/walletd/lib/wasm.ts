import { Transaction } from '@siafoundation/react-core'
import { ConsensusState } from '@siafoundation/react-walletd'

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

export const getWalletdWasm = () => global.walletdWasm as WalletWASM
