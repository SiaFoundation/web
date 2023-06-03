import { Currency, Transaction } from '@siafoundation/react-core'

// TODO: synchronize with other daemons and react-core

export type ChainIndex = {
  height: number
  ID: string
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

// events

// EventBlockReward represents a block reward.
type EventBlockReward = {
  OutputID: string
  Output: SiacoinOutput
  MaturityHeight: number
}

// EventFoundationSubsidy represents a Foundation subsidy.
type EventFoundationSubsidy = {
  OutputID: string
  Output: SiacoinOutput
  MaturityHeight: number
}

// EventSiacoinMaturation represents the maturation of a siacoin output.
type EventSiacoinMaturation = {
  OutputID: string
  Output: SiacoinOutput
  Source: number
}

// EventSiacoinTransfer represents the transfer of siacoins within a
// transaction.
type EventSiacoinTransfer = {
  TransactionID: string
  Inputs: SiacoinElement[]
  Outputs: SiacoinElement[]
  Fee: Currency
}

// EventSiafundTransfer represents the transfer of siafunds within a
// transaction.
type EventSiafundTransfer = {
  TransactionID: string
  Inputs: SiafundElement[]
  Outputs: SiafundElement[]
  ClaimOutputID: string
  ClaimOutput: SiacoinOutput
}

// EventFileContractFormation represents the formation of a file contract within
// a transaction.
type EventFileContractFormation = {
  TransactionID: string
  ContractID: string
  Contract: FileContract
}

// EventFileContractRevision represents the revision of a file contract within
// a transaction.
type EventFileContractRevision = {
  TransactionID: string
  ContractID: string
  OldContract: FileContract
  NewContract: FileContract
}

// EventFileContractResolutionValid represents the valid resolution of a file
// contract within a transaction.
type EventFileContractResolutionValid = {
  TransactionID: string
  ContractID: string
  Contract: FileContract
  OutputID: string
  Output: SiacoinOutput
  MaturityHeight: number
}

// EventFileContractResolutionMissed represents the expiration of a file
// contract.
type EventFileContractResolutionMissed = {
  Contract: FileContract
  OutputID: string
  Output: SiacoinOutput
  MaturityHeight: number
}

// EventHostAnnouncement represents a host announcement within a transaction.
type EventHostAnnouncement = {
  TransactionID: string
  PublicKey: string
  NetAddress: string
}

// EventTransaction represents a generic transaction.
type EventTransaction = {
  TransactionID: string
  Transaction: Transaction
}

export type Event = {
  timestamp: string
  index: ChainIndex
  type: string
  val:
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
}
