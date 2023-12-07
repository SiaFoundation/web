import {
  Currency,
  ChainIndex,
  Transaction,
  Address,
  SiacoinElement,
  SiafundElementAndClaim,
  SiafundElement,
  FileContractElement,
} from '@siafoundation/react-core'

export type ConsensusNetwork = {
  name: 'mainnet' | 'zen'
  initialCoinbase: Currency
  minimumCoinbase: Currency
  initialTarget: string
  hardforkDevAddr: {
    height: number
    oldAddress: string
    newAddress: string
  }
  hardforkTax: {
    height: number
  }
  hardforkStorageProof: {
    height: number
  }
  hardforkOak: {
    height: number
    fixHeight: number
    genesisTimestamp: string
  }
  hardforkASIC: {
    height: number
    oakTime: number
    oakTarget: string
  }
  hardforkFoundation: {
    height: number
    primaryAddress: string
    failsafeAddress: string
  }
  hardforkV2: {
    allowHeight: number
    requireHeight: number
  }
}

export type ConsensusState = {
  index: ChainIndex
  prevTimestamps: string[]
  depth: string
  childTarget: string
  siafundPool: string
  oakTime: number
  oakTarget: string
  foundationPrimaryAddress: string
  foundationFailsafeAddress: string
  totalWork: string
  difficulty: string
  oakWork: string
  elements: {
    numLeaves: number
    trees: string[]
  }
  attestations: number
}

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
