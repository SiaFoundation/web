import {
  Currency,
  ChainIndex,
  Transaction,
  Address,
  SiacoinElement,
  SiafundElementAndClaim,
  SiafundElement,
  FileContractElement,
} from '@siafoundation/types'

export type GatewayPeer = {
  addr: string
  inbound: boolean
  version: string

  firstSeen: string
  connectedSince: string
  syncedBlocks: number
  syncDuration: number
}

export type PoolTransaction = {
  id: string
  raw: Transaction
  type: string
  sent: Currency
  received: Currency
  locked: Currency
}

export type WalletEventTransaction = {
  timestamp: string
  index: ChainIndex
  relevant: Address[]
  type: 'transaction'
  val: {
    // transactionID: string
    // transaction: Transaction
    id: string
    siacoinInputs: SiacoinElement[]
    siacoinOutputs: SiacoinElement[]
    siafundInputs: SiafundElementAndClaim[]
    siafundOutputs: SiafundElement[]
    fileContracts: FileContractElement[]
    v2FileContracts: null
    hostAnnouncements: null
    fee: number
  }
}

export type WalletEventMissedFileContract = {
  timestamp: string
  index: ChainIndex
  relevant: Address[]
  type: 'missed file contract'
  val: {
    fileContract: FileContractElement
    missedOutputs: SiacoinElement[]
  }
}

export type WalletEventMinerPayout = {
  timestamp: string
  index: ChainIndex
  relevant: Address[]
  type: 'miner payout'
  val: {
    siacoinOutput: SiacoinElement
  }
}

export type WalletEvent =
  | WalletEventTransaction
  | WalletEventMissedFileContract
  | WalletEventMinerPayout
