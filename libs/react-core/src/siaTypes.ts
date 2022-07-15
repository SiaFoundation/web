export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string

// struct2ts:go.sia.tech/siad/v2/api/siad.WalletBalanceResponse
export interface WalletBalanceResponse {
  siacoins: Currency
  siafunds: number
}

// struct2ts:go.sia.tech/siad/v2/wallet.AddressInfo
export interface AddressInfo {
  index: number
  description: string
}

// struct2ts:go.sia.tech/core/types.ElementID
export interface ElementID {
  Source: number[]
  Index: number
}

// struct2ts:go.sia.tech/core/types.SiacoinElement
export interface SiacoinElement {
  ID: ElementID
  LeafIndex: number
  MerkleProof: Hash256[] | null
  Value: Currency
  Address: number[]
  MaturityHeight: number
}

// struct2ts:go.sia.tech/core/types.SiafundElement
export interface SiafundElement {
  ID: ElementID
  LeafIndex: number
  MerkleProof: Hash256[] | null
  Value: number
  Address: number[]
  ClaimStart: Currency
}

// struct2ts:go.sia.tech/siad/v2/api/siad.WalletUTXOsResponse
export interface WalletUTXOsResponse {
  siacoins: SiacoinElement[] | null
  siafunds: SiafundElement[] | null
}

// struct2ts:go.sia.tech/core/types.SiacoinInput
export interface SiacoinInput {
  Parent: SiacoinElement
  SpendPolicy: any
  Signatures: Signature[] | null
}

// struct2ts:go.sia.tech/core/types.SiacoinOutput
export interface SiacoinOutput {
  Value: Currency
  Address: number[]
}

// struct2ts:go.sia.tech/core/types.SiafundInput
export interface SiafundInput {
  Parent: SiafundElement
  ClaimAddress: number[]
  SpendPolicy: any
  Signatures: Signature[] | null
}

// struct2ts:go.sia.tech/core/types.SiafundOutput
export interface SiafundOutput {
  Value: number
  Address: number[]
}

// struct2ts:go.sia.tech/core/types.FileContract
export interface FileContract {
  Filesize: number
  FileMerkleRoot: number[]
  WindowStart: number
  WindowEnd: number
  RenterOutput: SiacoinOutput
  HostOutput: SiacoinOutput
  MissedHostValue: Currency
  TotalCollateral: Currency
  RenterPublicKey: number[]
  HostPublicKey: number[]
  RevisionNumber: number
  RenterSignature: number[]
  HostSignature: number[]
}

// struct2ts:go.sia.tech/core/types.FileContractElement
export interface FileContractElement {
  ID: ElementID
  LeafIndex: number
  MerkleProof: Hash256[] | null
  Filesize: number
  FileMerkleRoot: number[]
  WindowStart: number
  WindowEnd: number
  RenterOutput: SiacoinOutput
  HostOutput: SiacoinOutput
  MissedHostValue: Currency
  TotalCollateral: Currency
  RenterPublicKey: number[]
  HostPublicKey: number[]
  RevisionNumber: number
  RenterSignature: number[]
  HostSignature: number[]
}

// struct2ts:go.sia.tech/core/types.FileContractRevision
export interface FileContractRevision {
  Parent: FileContractElement
  Revision: FileContract
}

// struct2ts:go.sia.tech/core/types.FileContractRenewal
export interface FileContractRenewal {
  FinalRevision: FileContract
  InitialRevision: FileContract
  RenterRollover: Currency
  HostRollover: Currency
  RenterSignature: number[]
  HostSignature: number[]
}

// struct2ts:go.sia.tech/core/types.ChainIndex
export interface ChainIndex {
  Height: number
  ID: number[]
}

// struct2ts:go.sia.tech/core/types.StorageProof
export interface StorageProof {
  WindowStart: ChainIndex
  WindowProof: Hash256[] | null
  Leaf: number[]
  Proof: Hash256[] | null
}

// struct2ts:go.sia.tech/core/types.FileContractResolution
export interface FileContractResolution {
  Parent: FileContractElement
  Renewal: FileContractRenewal
  StorageProof: StorageProof
  Finalization: FileContract
}

// struct2ts:go.sia.tech/core/types.Attestation
export interface Attestation {
  PublicKey: number[]
  Key: string
  Value: number[] | null
  Signature: number[]
}

// struct2ts:go.sia.tech/core/types.Transaction
export interface Transaction {
  SiacoinInputs: SiacoinInput[] | null
  SiacoinOutputs: SiacoinOutput[] | null
  SiafundInputs: SiafundInput[] | null
  SiafundOutputs: SiafundOutput[] | null
  FileContracts: FileContract[] | null
  FileContractRevisions: FileContractRevision[] | null
  FileContractResolutions: FileContractResolution[] | null
  Attestations: Attestation[] | null
  ArbitraryData: number[] | null
  NewFoundationAddress: number[]
  MinerFee: Currency
}

// struct2ts:go.sia.tech/siad/v2/api/siad.TxpoolBroadcastRequest
export interface TxpoolBroadcastRequest {
  dependsOn: Transaction[] | null
  transaction: Transaction
}

// struct2ts:go.sia.tech/siad/v2/wallet.Transaction
export interface WalletTransaction {
  Raw: Transaction
  Index: ChainIndex
  ID: ID
  Inflow: Currency
  Outflow: Currency
  Timestamp: Date
}

// struct2ts:go.sia.tech/siad/v2/api/siad.SyncerPeerResponse
export interface SyncerPeerResponse {
  netAddress: string
}

// struct2ts:go.sia.tech/siad/v2/api/siad.SyncerConnectRequest
export interface SyncerConnectRequest {
  netAddress: string
}

// struct2ts:go.sia.tech/core/types.Work
export interface Work {
  NumHashes: number[]
}

// struct2ts:go.sia.tech/siad/v2/api/siad.ConsensusTipResponse
export interface ConsensusTipResponse {
  Index: ChainIndex
  TotalWork: Work
  Difficulty: Work
  OakWork: Work
  OakTime: number
  SiafundPool: Currency
  FoundationAddress: number[]
}
