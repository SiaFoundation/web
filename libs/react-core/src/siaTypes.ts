export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type Hash = string
export type OutputID = string
export type EncryptionKey = string
export type FileContractID = string
export type PublicKey = string

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
  ParentID: string
  UnlockConditions: UnlockConditions
}

export type SiacoinOutput = {
  Value: Currency
  Address: string
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
  ParentID: string
  UnlockConditions: UnlockConditions
  ClaimUnlockHash: string
}

export interface SiafundOutput {
  Value: number
  Address: string
}

export interface Transaction {
  SiacoinInputs?: SiacoinInput[]
  SiacoinOutputs?: SiacoinOutput[]
  FileContracts?: FileContract[]
  FileContractRevisions?: FileContractRevision[]
  StorageProofs?: StorageProof[]
  SiafundInputs?: SiafundInput[]
  SiafundOutputs?: SiafundOutput[]
  MinerFees?: Currency[]
  ArbitraryData?: string[]
  TransactionSignatures?: TransactionSignature[]
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
