export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type Hash = string
export type OutputID = string
export type EncryptionKey = string
export type FileContractID = string
export type PublicKey = string
export type TransactionID = string

export interface SiaPublicKey {
  Algorithm: string
  Key?: string
}

export interface UnlockConditions {
  Timelock: number
  PublicKeys?: SiaPublicKey[]
  SignaturesRequired: number
}

export interface FileContractRevision {
  ParentID: string
  UnlockConditions: UnlockConditions
  RevisionNumber: number
  Filesize: number
  FileMerkleRoot: string
  WindowStart: number
  WindowEnd: number
  ValidProofOutputs?: SiacoinOutput[]
  MissedProofOutputs?: SiacoinOutput[]
  UnlockHash: string
}

export interface CoveredFields {
  WholeTransaction: boolean
  SiacoinInputs?: number[]
  SiacoinOutputs?: number[]
  FileContracts?: number[]
  FileContractRevisions?: number[]
  StorageProofs?: number[]
  SiafundInputs?: number[]
  SiafundOutputs?: number[]
  MinerFees?: number[]
  ArbitraryData?: number[]
  Signatures?: number[]
}

export interface TransactionSignature {
  ParentID: string
  PublicKeyIndex: number
  Timelock: number
  CoveredFields: CoveredFields
  Signature?: string
}

export interface SiacoinInput {
  parentID: string
  unlockConditions: UnlockConditions
}

export type SiacoinOutput = {
  value: Currency
  address: string
}

export interface FileContract {
  Filesize: number
  FileMerkleRoot: string
  WindowStart: number
  WindowEnd: number
  Payout: Currency
  ValidProofOutputs?: SiacoinOutput[]
  MissedProofOutputs?: SiacoinOutput[]
  UnlockHash: string
  RevisionNumber: number
}

export interface StorageProof {
  ParentID: string
  Segment: string
  Hashset?: Hash[]
}

export interface SiafundInput {
  parentID: string
  unlockConditions: UnlockConditions
  claimUnlockHash: string
}

export interface SiafundOutput {
  value: number
  address: string
}

export interface Transaction {
  siacoinInputs?: SiacoinInput[]
  siacoinOutputs?: SiacoinOutput[]
  fileContracts?: FileContract[]
  fileContractRevisions?: FileContractRevision[]
  storageProofs?: StorageProof[]
  siafundInputs?: SiafundInput[]
  siafundOutputs?: SiafundOutput[]
  minerFees?: Currency[]
  arbitraryData?: string[]
  transactionSignatures?: TransactionSignature[]
}

export interface Block {
  ParentID: string
  Nonce: string
  Timestamp: number
  MinerPayouts?: SiacoinOutput[]
  Transactions?: Transaction[]
}

export interface ChainIndex {
  Height: number
  ID: string
}

export interface SiaPublicKey {
  Algorithm: string
  Key?: string
}

export interface UnlockConditions {
  Timelock: number
  PublicKeys?: SiaPublicKey[]
  SignaturesRequired: number
}
