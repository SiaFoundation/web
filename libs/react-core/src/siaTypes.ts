export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type Hash = string
export type OutputID = string
export type EncryptionKey = string
export type FileContractID = string
export type PublicKey = string

// struct2ts:go.sia.tech/siad/types.SiaPublicKey
export interface SiaPublicKey {
  algorithm: string
  key?: string
}

// struct2ts:go.sia.tech/siad/types.UnlockConditions
export interface UnlockConditions {
  timelock: number
  publickeys?: SiaPublicKey[]
  signaturesrequired: number
}

// struct2ts:go.sia.tech/siad/types.SiacoinOutput
export interface SiacoinOutput {
  value: Currency
  unlockhash: string
}

// struct2ts:go.sia.tech/siad/types.FileContractRevision
export interface FileContractRevision {
  parentid: string
  unlockconditions: UnlockConditions
  newrevisionnumber: number
  newfilesize: number
  newfilemerkleroot: string
  newwindowstart: number
  newwindowend: number
  newvalidproofoutputs?: SiacoinOutput[]
  newmissedproofoutputs?: SiacoinOutput[]
  newunlockhash: string
}

// struct2ts:go.sia.tech/siad/types.CoveredFields
export interface CoveredFields {
  wholetransaction: boolean
  siacoininputs?: string
  siacoinoutputs?: string
  filecontracts?: string
  filecontractrevisions?: string
  storageproofs?: string
  siafundinputs?: string
  siafundoutputs?: string
  minerfees?: string
  arbitrarydata?: string
  transactionsignatures?: string
}

// struct2ts:go.sia.tech/siad/types.TransactionSignature
export interface TransactionSignature {
  parentid: string
  publickeyindex: number
  timelock: number
  coveredfields: CoveredFields
  signature?: string
}

// struct2ts:go.sia.tech/siad/types.SiacoinInput
export interface SiacoinInput {
  parentid: string
  unlockconditions: UnlockConditions
}

// struct2ts:go.sia.tech/siad/types.FileContract
export interface FileContract {
  filesize: number
  filemerkleroot: string
  windowstart: number
  windowend: number
  payout: Currency
  validproofoutputs?: SiacoinOutput[]
  missedproofoutputs?: SiacoinOutput[]
  unlockhash: string
  revisionnumber: number
}

// struct2ts:go.sia.tech/siad/types.StorageProof
export interface StorageProof {
  parentid: string
  segment: string
  hashset?: Hash[]
}

// struct2ts:go.sia.tech/siad/types.SiafundInput
export interface SiafundInput {
  parentid: string
  unlockconditions: UnlockConditions
  claimunlockhash: string
}

// struct2ts:go.sia.tech/siad/types.SiafundOutput
export interface SiafundOutput {
  value: Currency
  unlockhash: string
  claimstart: Currency
}

// struct2ts:go.sia.tech/siad/types.Transaction
export interface Transaction {
  siacoininputs?: SiacoinInput[]
  siacoinoutputs?: SiacoinOutput[]
  filecontracts?: FileContract[]
  filecontractrevisions?: FileContractRevision[]
  storageproofs?: StorageProof[]
  siafundinputs?: SiafundInput[]
  siafundoutputs?: SiafundOutput[]
  minerfees?: Currency[]
  arbitrarydata?: string[]
  transactionsignatures?: TransactionSignature[]
}

// struct2ts:go.sia.tech/siad/types.Block
export interface Block {
  parentid: string
  nonce: string
  timestamp: number
  minerpayouts?: SiacoinOutput[]
  transactions?: Transaction[]
}
