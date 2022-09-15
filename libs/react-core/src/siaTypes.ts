export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type Hash = string
export type OutputID = string
export type EncryptionKey = string

// structs

// struct2ts:go.sia.tech/renterd/internal/consensus.ChainIndex
export interface ChainIndex {
  Height: number
  ID: string
}

// struct2ts:go.sia.tech/renterd/wallet.SiacoinElement
export interface SiacoinElement {
  value: Currency
  unlockhash: string
  ID: string
  MaturityHeight: number
}

// Renamed WalletTransaction, collision with siad Transaction
// struct2ts:go.sia.tech/renterd/wallet.Transaction
export interface WalletTransaction {
  Raw: Transaction
  Index: ChainIndex
  ID: string
  Inflow: Currency
  Outflow: Currency
  Timestamp: string
}

// struct2ts:go.sia.tech/siad/types.SiaPublicKey
export interface SiaPublicKey {
  algorithm: string
  key: string | null
}

// struct2ts:go.sia.tech/siad/types.UnlockConditions
export interface UnlockConditions {
  timelock: number
  publickeys: SiaPublicKey[] | null
  signaturesrequired: number
}

// struct2ts:go.sia.tech/siad/types.SiacoinInput
export interface SiacoinInput {
  parentid: string
  unlockconditions: UnlockConditions
}

// struct2ts:go.sia.tech/siad/types.SiacoinOutput
export interface SiacoinOutput {
  value: Currency
  unlockhash: string
}

// struct2ts:go.sia.tech/siad/types.FileContract
export interface FileContract {
  filesize: number
  filemerkleroot: string
  windowstart: number
  windowend: number
  payout: Currency
  validproofoutputs: SiacoinOutput[] | null
  missedproofoutputs: SiacoinOutput[] | null
  unlockhash: string
  revisionnumber: number
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
  newvalidproofoutputs: SiacoinOutput[] | null
  newmissedproofoutputs: SiacoinOutput[] | null
  newunlockhash: string
}

// struct2ts:go.sia.tech/siad/types.StorageProof
export interface StorageProof {
  parentid: string
  segment: string
  hashset: Hash[] | null
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
  signature: string | null
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

// struct2ts:go.sia.tech/renterd/api.WalletFundRequest
export interface WalletFundRequest {
  transaction: Transaction
  amount: Currency
}

// struct2ts:go.sia.tech/renterd/api.WalletFundResponse
export interface WalletFundResponse {
  transaction: Transaction
  toSign: OutputID[] | null
  dependsOn: Transaction[] | null
}

// struct2ts:go.sia.tech/renterd/api.WalletSignRequest
export interface WalletSignRequest {
  transaction: Transaction
  toSign: OutputID[] | null
  coveredFields: CoveredFields
}

// struct2ts:go.sia.tech/renterd/rhp/v2.HostSettings
export interface HostSettings {
  acceptingcontracts: boolean
  maxdownloadbatchsize: number
  maxduration: number
  maxrevisebatchsize: number
  netaddress: string
  remainingstorage: number
  sectorsize: number
  totalstorage: number
  unlockhash: string
  windowsize: number
  collateral: Currency
  maxcollateral: Currency
  baserpcprice: Currency
  contractprice: Currency
  downloadbandwidthprice: Currency
  sectoraccessprice: Currency
  storageprice: Currency
  uploadbandwidthprice: Currency
  ephemeralaccountexpiry: number
  maxephemeralaccountbalance: Currency
  revisionnumber: number
  version: string
  siamuxport: string
}

// struct2ts:go.sia.tech/renterd/api.WalletPrepareFormRequest
export interface WalletPrepareFormRequest {
  renterKey: string | null
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}

// struct2ts:go.sia.tech/renterd/api.WalletPrepareRenewRequest
export interface WalletPrepareRenewRequest {
  contract: FileContractRevision
  renterKey: string | null
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}

// struct2ts:go.sia.tech/renterd/api.WalletPrepareRenewResponse
export interface WalletPrepareRenewResponse {
  transactionSet: Transaction[] | null
  finalPayment: Currency
}

// struct2ts:go.sia.tech/renterd/api.RHPScanRequest
export interface RHPScanRequest {
  hostKey: string
  hostIP: string
}

// struct2ts:go.sia.tech/renterd/api.RHPPrepareFormRequest
export interface RHPPrepareFormRequest {
  renterKey: string | null
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}

// struct2ts:go.sia.tech/renterd/api.RHPPrepareFormResponse
export interface RHPPrepareFormResponse {
  contract: FileContract
  cost: Currency
}

// struct2ts:go.sia.tech/renterd/api.RHPFormRequest
export interface RHPFormRequest {
  renterKey: string | null
  hostKey: string
  hostIP: string
  transactionSet: Transaction[] | null
}

// struct2ts:go.sia.tech/renterd/rhp/v2.Contract
export interface Contract {
  Revision: FileContractRevision
  Signatures: TransactionSignature[]
}

// struct2ts:go.sia.tech/renterd/api.RHPFormResponse
export interface RHPFormResponse {
  contractID: string
  contract: Contract
  transactionSet: Transaction[] | null
}

// struct2ts:go.sia.tech/renterd/api.RHPPrepareRenewRequest
export interface RHPPrepareRenewRequest {
  contract: FileContractRevision
  renterKey: string | null
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}

// struct2ts:go.sia.tech/renterd/api.RHPPrepareRenewResponse
export interface RHPPrepareRenewResponse {
  contract: FileContract
  cost: Currency
  finalPayment: Currency
}

// struct2ts:go.sia.tech/renterd/api.RHPRenewRequest
export interface RHPRenewRequest {
  renterKey: string | null
  hostKey: string
  hostIP: string
  contractID: string
  transactionSet: Transaction[] | null
  finalPayment: Currency
}

// struct2ts:go.sia.tech/renterd/api.RHPRenewResponse
export interface RHPRenewResponse {
  contractID: string
  contract: Contract
  transactionSet: Transaction[] | null
}

// struct2ts:go.sia.tech/renterd/api.RHPFundRequest
export interface RHPFundRequest {
  contract: FileContractRevision
  renterKey: string | null
  hostKey: string
  hostIP: string
  account: string
  amount: Currency
}

// struct2ts:go.sia.tech/renterd/api.RHPPreparePaymentRequest
export interface RHPPreparePaymentRequest {
  account: string
  amount: Currency
  expiry: number
  accountKey: string | null
}

// struct2ts:go.sia.tech/renterd/rhp/v3.RegistryKey
export interface RegistryKey {
  PublicKey: string
  Tweak: string
}

// struct2ts:go.sia.tech/renterd/rhp/v3.PayByEphemeralAccountRequest
export interface PayByEphemeralAccountRequest {
  Account: string
  Expiry: number
  Amount: Currency
  Nonce: string
  Signature: string
  Priority: number
}

// struct2ts:go.sia.tech/renterd/api.RHPRegistryReadRequest
export interface RHPRegistryReadRequest {
  hostKey: string
  hostIP: string
  registryKey: RegistryKey
  payment: PayByEphemeralAccountRequest
}

// struct2ts:go.sia.tech/renterd/rhp/v3.RegistryValue
export interface RegistryValue {
  Data: string | null
  Revision: number
  Type: number
  Signature: string
}

// struct2ts:go.sia.tech/renterd/api.RHPRegistryUpdateRequest
export interface RHPRegistryUpdateRequest {
  hostKey: string
  hostIP: string
  registryKey: RegistryKey
  registryValue: RegistryValue
  payment: PayByEphemeralAccountRequest
}

// struct2ts:go.sia.tech/renterd/api.Contract
export interface Contract {
  hostKey: string
  hostIP: string
  id: string
  renterKey: string | null
}

// struct2ts:go.sia.tech/renterd/api.SlabsUploadRequest
export interface SlabsUploadRequest {
  minShards: number
  totalShards: number
  contracts: Contract[] | null
  currentHeight: number
}

// struct2ts:go.sia.tech/renterd/slab.Sector
export interface Sector {
  Host: string
  Root: string
}

// struct2ts:go.sia.tech/renterd/slab.Slice
export interface Slice {
  Key: EncryptionKey
  MinShards: number
  Shards: Sector[] | null
  Offset: number
  Length: number
}

// struct2ts:go.sia.tech/renterd/api.SlabsDownloadRequest
export interface SlabsDownloadRequest {
  slabs: Slice[] | null
  offset: number
  length: number
  contracts: Contract[] | null
}

// struct2ts:go.sia.tech/renterd/slab.Slab
export interface Slab {
  Key: EncryptionKey
  MinShards: number
  Shards: Sector[] | null
}

// struct2ts:go.sia.tech/renterd/api.SlabsDeleteRequest
export interface SlabsDeleteRequest {
  slabs: Slab[] | null
  contracts: Contract[] | null
}

// struct2ts:go.sia.tech/renterd/api.SlabsMigrateRequest
export interface SlabsMigrateRequest {
  slabs: Slab[] | null
  from: Contract[] | null
  to: Contract[] | null
  currentHeight: number
}
