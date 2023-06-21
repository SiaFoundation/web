import { Currency, Transaction } from '@siafoundation/react-core'

export type BlockHeight = number

// TODO: synchronize with other daemons and react-core

export type ChainIndex = {
  height: number
  ID: string
}

export type ConsensusState = {
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

export type SiacoinOutput = {
  value: string
  address: string
}

export type SiacoinElement = SiacoinOutput & {
  ID: string
}

export type SiafundOutput = {
  value: number
  address: string
}

export type SiafundElement = SiafundOutput & {
  ID: string
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
  Timestamp: string
  Index: ChainIndex
}

// EventBlockReward represents a block reward.
type EventBlockReward = BaseEvent & {
  Type: 'block reward'
  Val: {
    OutputID: string
    Output: SiacoinOutput
    MaturityHeight: number
  }
}

// EventFoundationSubsidy represents a Foundation subsidy.
type EventFoundationSubsidy = BaseEvent & {
  Type: 'foundation subsidy'
  Val: {
    OutputID: string
    Output: SiacoinOutput
    MaturityHeight: number
  }
}

// EventSiacoinMaturation represents the maturation of a siacoin output.
type EventSiacoinMaturation = BaseEvent & {
  Type: 'siacoin maturation'
  Val: {
    OutputID: string
    Output: SiacoinOutput
    Source: number
  }
}

// EventSiacoinTransfer represents the transfer of siacoins within a
// transaction.
type EventSiacoinTransfer = BaseEvent & {
  Type: 'siacoin transfer'
  Val: {
    TransactionID: string
    Inputs: SiacoinElement[]
    Outputs: SiacoinElement[]
    Fee: Currency
  }
}

// EventSiafundTransfer represents the transfer of siafunds within a
// transaction.
type EventSiafundTransfer = BaseEvent & {
  Type: 'siafund transfer'
  Val: {
    TransactionID: string
    Inputs: SiafundElement[]
    Outputs: SiafundElement[]
    ClaimOutputID: string
    ClaimOutput: SiacoinOutput
  }
}

// EventFileContractFormation represents the formation of a file contract within
// a transaction.
type EventFileContractFormation = BaseEvent & {
  Type: 'file contract formation'
  Val: {
    TransactionID: string
    ContractID: string
    Contract: FileContract
  }
}

// EventFileContractRevision represents the revision of a file contract within
// a transaction.
type EventFileContractRevision = BaseEvent & {
  Type: 'file contract revision'
  Val: {
    TransactionID: string
    ContractID: string
    OldContract: FileContract
    NewContract: FileContract
  }
}

// EventFileContractResolutionValid represents the valid resolution of a file
// contract within a transaction.
type EventFileContractResolutionValid = BaseEvent & {
  Type: 'file contract resolution (valid)'
  Val: {
    TransactionID: string
    ContractID: string
    Contract: FileContract
    OutputID: string
    Output: SiacoinOutput
    MaturityHeight: number
  }
}

// EventFileContractResolutionMissed represents the expiration of a file
// contract.
type EventFileContractResolutionMissed = BaseEvent & {
  Type: 'file contract resolution (missed)'
  Val: {
    Contract: FileContract
    OutputID: string
    Output: SiacoinOutput
    MaturityHeight: number
  }
}

// EventHostAnnouncement represents a host announcement within a transaction.
type EventHostAnnouncement = BaseEvent & {
  Type: 'host annoucement'
  Val: {
    TransactionID: string
    PublicKey: string
    NetAddress: string
  }
}

// EventTransaction represents a generic transaction.
type EventTransaction = BaseEvent & {
  Type: 'transaction'
  Val: {
    TransactionID: string
    Transaction: Transaction
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
