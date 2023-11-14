import { Currency, Hash256 } from '@siafoundation/react-core'

export type BlockHeight = number
export type SiacoinOutputID = Hash256
export type SiafundOutputID = Hash256

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
}

export type ConsensusState = {
  index: ChainIndex
  prevTimestamps: string[]
  depth: string
  childTarget: string
  siafundPool: string

  // hardfork-related state
  oakTime: number
  oakTarget: string
  foundationPrimaryAddress: string
  foundationFailsafeAddress: string
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

export type SiacoinElement = SiacoinOutput & {
  ID: SiacoinOutputID
}

export type SiafundOutput = {
  value: number
  address: string
}

export type SiafundElement = SiafundOutput & {
  ID: SiafundOutputID
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
  payout: Currency
  validProofOutputs: SiacoinOutput[]
  missedProofOutputs: SiacoinOutput[]
  unlockHash: string
  revisionNumber: number
}

export type PoolTransaction = {
  ID: string
  Raw: Transaction
  Type: string
  Sent: Currency
  Received: Currency
  Locked: Currency
}

// events

type BaseEvent = {
  timestamp: string
  index: ChainIndex
}

// EventBlockReward represents a block reward.
type EventBlockReward = BaseEvent & {
  type: 'block reward'
  val: {
    outputID: string
    output: SiacoinOutput
    maturityHeight: number
  }
}

// EventFoundationSubsidy represents a Foundation subsidy.
type EventFoundationSubsidy = BaseEvent & {
  type: 'foundation subsidy'
  val: {
    outputID: string
    output: SiacoinOutput
    maturityHeight: number
  }
}

// EventSiacoinMaturation represents the maturation of a siacoin output.
type EventSiacoinMaturation = BaseEvent & {
  type: 'siacoin maturation'
  val: {
    outputID: string
    output: SiacoinOutput
    source: number
  }
}

// EventSiacoinTransfer represents the transfer of siacoins within a
// transaction.
type EventSiacoinTransfer = BaseEvent & {
  type: 'siacoin transfer'
  val: {
    transactionID: string
    inputs: SiacoinElement[]
    outputs: SiacoinElement[]
    fee: Currency
  }
}

// EventSiafundTransfer represents the transfer of siafunds within a
// transaction.
type EventSiafundTransfer = BaseEvent & {
  type: 'siafund transfer'
  val: {
    transactionID: string
    inputs: SiafundElement[]
    outputs: SiafundElement[]
    claimOutputID: string
    claimOutput: SiacoinOutput
  }
}

// EventFileContractFormation represents the formation of a file contract within
// a transaction.
type EventFileContractFormation = BaseEvent & {
  type: 'file contract formation'
  val: {
    transactionID: string
    contractID: string
    contract: FileContract
  }
}

// EventFileContractRevision represents the revision of a file contract within
// a transaction.
type EventFileContractRevision = BaseEvent & {
  type: 'file contract revision'
  val: {
    transactionID: string
    contractID: string
    oldContract: FileContract
    newContract: FileContract
  }
}

// EventFileContractResolutionValid represents the valid resolution of a file
// contract within a transaction.
type EventFileContractResolutionValid = BaseEvent & {
  type: 'file contract resolution (valid)'
  val: {
    transactionID: string
    contractID: string
    contract: FileContract
    outputID: string
    output: SiacoinOutput
    maturityHeight: number
  }
}

// EventFileContractResolutionMissed represents the expiration of a file
// contract.
type EventFileContractResolutionMissed = BaseEvent & {
  type: 'file contract resolution (missed)'
  val: {
    contract: FileContract
    outputID: string
    output: SiacoinOutput
    maturityHeight: number
  }
}

// EventHostAnnouncement represents a host announcement within a transaction.
type EventHostAnnouncement = BaseEvent & {
  type: 'host annoucement'
  val: {
    transactionID: string
    publicKey: string
    netAddress: string
  }
}

// EventTransaction represents a generic transaction.
type EventTransaction = BaseEvent & {
  type: 'transaction'
  val: {
    transactionID: string
    transaction: Transaction
  }
}

export type WalletEvent =
  | EventBlockReward
  | EventFoundationSubsidy
  | EventSiacoinMaturation
  | EventSiacoinTransfer
  | EventSiafundTransfer
  | EventFileContractFormation
  | EventFileContractRevision
  | EventFileContractResolutionValid
  | EventFileContractResolutionMissed
  | EventHostAnnouncement
  | EventTransaction
