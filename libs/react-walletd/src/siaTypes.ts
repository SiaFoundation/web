import { Currency, Hash256 } from '@siafoundation/react-core'

export type BlockHeight = number
export type SiacoinOutputID = Hash256
export type SiafundOutputID = Hash256
export type Address = string

// TODO: synchronize with other daemons and react-core

export type ChainIndex = {
  height: number
  ID: string
}

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

export type UnlockConditions = {
  timelock: number
  publicKeys?: string[]
  signaturesRequired: number
}

export type SiacoinInput = {
  parentID: string
  unlockConditions: UnlockConditions
}

export type SiacoinOutput = {
  value: string
  address: string
}

export type SiafundInput = {
  parentID: string
  unlockConditions: UnlockConditions
  claimAddress: string
}

export type SiafundOutput = {
  value: number
  address: string
}

export type SiacoinElement = {
  id: string
  leafIndex: number
  merkleProof: string[] | null
  siacoinOutput: SiacoinOutput
  maturityHeight: number
}

export type SiafundElement = {
  id: string
  leafIndex: number
  merkleProof: string[] | null
  siafundOutput: SiafundOutput
  claimStart: string
}

export type SiafundElementAndClaim = {
  siafundElement: SiafundElement
  claimElement: SiacoinElement
}

export type TransactionSignature = {
  parentID: string
  publicKeyIndex: number
  timelock: number
  coveredFields: CoveredFields
  signature?: string
}

export type CoveredFields = {
  wholeTransaction: boolean
  siacoinInputs?: number[]
  siacoinOutputs?: number[]
  fileContracts?: number[]
  fileContractRevisions?: number[]
  storageProofs?: number[]
  siafundInputs?: number[]
  siafundOutputs?: number[]
  minerFees?: number[]
  arbitraryData?: number[]
  signatures?: number[]
}

export interface Transaction {
  siacoinInputs?: SiacoinInput[]
  siacoinOutputs?: SiacoinOutput[]
  siafundInputs?: SiafundInput[]
  siafundOutputs?: SiafundOutput[]
  minerFees?: Currency[]
  arbitraryData?: string[]
  signatures?: TransactionSignature[]
}

export type FileContract = {
  filesize: number
  fileMerkleRoot: string
  windowStart: number
  windowEnd: number
  payout: string
  validProofOutputs: SiacoinOutput[]
  missedProofOutputs: SiacoinOutput[]
  unlockHash: string
  revisionNumber: number
}

export type FileContractElement = {
  id: string
  leafIndex: number
  merkleProof: string[] | null
  fileContract: FileContract
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
