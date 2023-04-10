export type ID = string
export type Hash256 = string
export type Signature = string
export type Currency = string
export type Hash = string
export type OutputID = string
export type EncryptionKey = string
export type FileContractID = string
export type PublicKey = string

// structs
// struct2ts:go.sia.tech/renterd/bus.ConsensusState
export interface ConsensusState {
  BlockHeight: number
  Synced: boolean
}

// struct2ts:go.sia.tech/renterd/bus.ContractAcquireRequest
export interface ContractAcquireRequest {
  Duration: number
}

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

// struct2ts:go.sia.tech/renterd/rhp/v2.ContractRevision
export interface ContractRevision {
  Revision: FileContractRevision
  Signatures: TransactionSignature[]
}

// struct2ts:go.sia.tech/renterd/bus.ContractsIDAddRequest
export interface ContractsIDAddRequest {
  contract: ContractRevision
  startHeight: number
  totalCost: Currency
}

// struct2ts:go.sia.tech/renterd/bus.ContractsIDRenewedRequest
export interface ContractsIDRenewedRequest {
  contract: ContractRevision
  renewedFrom: string
  startHeight: number
  totalCost: Currency
}

// struct2ts:go.sia.tech/renterd/bus.ContractAcquireResponse
export interface ContractAcquireResponse {
  locked: boolean
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

// struct2ts:go.sia.tech/renterd/bus.WalletFundRequest
export interface WalletFundRequest {
  transaction: Transaction
  amount: Currency
}

// struct2ts:go.sia.tech/renterd/bus.WalletFundResponse
export interface WalletFundResponse {
  transaction: Transaction
  toSign?: OutputID[]
  dependsOn?: Transaction[]
}

// struct2ts:go.sia.tech/renterd/bus.WalletSignRequest
export interface WalletSignRequest {
  transaction: Transaction
  toSign?: OutputID[]
  coveredFields: CoveredFields
}

// struct2ts:go.sia.tech/renterd/bus.WalletRedistributeRequest
export interface WalletRedistributeRequest {
  amount: Currency
  outputs: number
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

// struct2ts:go.sia.tech/renterd/bus.WalletPrepareFormRequest
export interface WalletPrepareFormRequest {
  renterKey?: string
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}

// struct2ts:go.sia.tech/renterd/bus.WalletPrepareRenewRequest
export interface WalletPrepareRenewRequest {
  contract: FileContractRevision
  renterKey?: string
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  endHeight: number
  hostSettings: HostSettings
}

// struct2ts:go.sia.tech/renterd/bus.WalletPrepareRenewResponse
export interface WalletPrepareRenewResponse {
  transactionSet?: Transaction[]
  finalPayment: Currency
}

// struct2ts:go.sia.tech/renterd/object.Sector
export interface Sector {
  Host: string
  Root: string
}

// struct2ts:go.sia.tech/renterd/object.SlabSlice
export interface SlabSlice {
  Key: EncryptionKey
  MinShards: number
  Shards?: Sector[]
  Offset: number
  Length: number
}

// struct2ts:go.sia.tech/renterd/object.Object
export interface Obj {
  Key: EncryptionKey
  Slabs?: SlabSlice[]
}

// struct2ts:go.sia.tech/renterd/bus.ObjectsResponse
export interface ObjectsResponse {
  entries?: string[]
  object?: Obj
}

// struct2ts:go.sia.tech/renterd/bus.AddObjectRequest
export interface AddObjectRequest {
  object: Obj
  usedContracts: { [key: PublicKey]: FileContractID }
}

// struct2ts:go.sia.tech/renterd/bus.DownloadParams
export interface DownloadParams {
  ContractSet: string
}

// struct2ts:go.sia.tech/renterd/bus.UploadParams
export interface UploadParams {
  CurrentHeight: number
  MinShards: number
  TotalShards: number
  ContractSet: string
}

// struct2ts:go.sia.tech/renterd/bus.MigrateParams
export interface MigrateParams {
  CurrentHeight: number
  FromContracts: string
  ToContracts: string
}

// struct2ts:go.sia.tech/renterd/bus.GougingSettings
export interface GougingSettings {
  MaxRPCPrice: Currency
  MaxContractPrice: Currency
  MaxDownloadPrice: Currency
  MaxUploadPrice: Currency
}

// struct2ts:go.sia.tech/renterd/bus.RedundancySettings
export interface RedundancySettings {
  MinShards: number
  TotalShards: number
}

// struct2ts:go.sia.tech/renterd/bus.ContractSpending
export interface ContractSpending {
  uploads: Currency
  downloads: Currency
  fundAccount: Currency
}

// struct2ts:go.sia.tech/renterd/bus.Contract
export interface Contract {
  id: string
  hostIP: string
  hostKey: string
  proofHeight: number
  revisionHeight: number
  revisionNumber: number
  startHeight: number
  windowStart: number
  windowEnd: number
  renewedFrom: string
  spending: ContractSpending
  totalCost: Currency
}

// struct2ts:go.sia.tech/siad/types.Block
export interface Block {
  parentid: string
  nonce: string
  timestamp: number
  minerpayouts?: SiacoinOutput[]
  transactions?: Transaction[]
}

// struct2ts:go.sia.tech/renterd/internal/consensus.ChainIndex
export interface ChainIndex {
  Height: number
  ID: string
}

// struct2ts:go.sia.tech/renterd/hostdb.Announcement
export interface Announcement {
  Index: ChainIndex
  Timestamp: Date
  NetAddress: string
}

// struct2ts:go.sia.tech/renterd/hostdb.Interaction
export interface Interaction {
  Timestamp: Date
  Type: string
  Result?: string
}

// struct2ts:go.sia.tech/renterd/hostdb.Host
export interface Host {
  public_key: string
  netAddress: string
  knownSince: string
  Announcements?: Announcement[]
  interactions: {
    Downtime: number
    FailedInteractions: number
    LastScan: string
    LastScanSuccess: boolean
    SecondToLastScanSuccess: boolean
    SuccessfulInteractions: number
    TotalScans: number
    Uptime: number
  }
  priceTable?: {
    accountbalancecost: string
    collateralcost: string
    contractprice: string
    downloadbandwidthcost: string
    dropsectorsbasecost: string
    dropsectorsunitcost: string
    expiry: string // date
    fundaccountcost: string
    hassectorbasecost: string
    hostblockheight: number
    initbasecost: string
    latestrevisioncost: string
    maxcollateral: string
    maxduration: number
    memorytimecost: string
    readbasecost: string
    readlengthcost: string
    registryentriesleft: number
    registryentriestotal: number
    renewcontractcost: string
    revisionbasecost: string
    subscriptionmemorycost: string
    subscriptionnotificationcost: string
    swapsectorcost: string
    txnfeemaxrecommended: string
    txnfeeminrecommended: string
    uid: string
    updatepricetablecost: string
    uploadbandwidthcost: string
    validity: number
    windowsize: number
    writebasecost: string
    writelengthcost: string
    writestorecost: string
  }
  settings?: {
    acceptingcontracts: boolean
    baserpcprice: string
    collateral: string
    contractprice: string
    downloadbandwidthprice: string
    ephemeralaccountexpiry: number
    maxcollateral: string
    maxdownloadbatchsize: number
    maxduration: number
    maxephemeralaccountbalance: string
    maxrevisebatchsize: number
    netaddress: string
    remainingstorage: number
    revisionnumber: number
    sectoraccessprice: string
    sectorsize: number
    siamuxport: string
    storageprice: string
    totalstorage: number
    unlockhash: string
    uploadbandwidthprice: string
    version: string
    windowsize: number
  }
}

// struct2ts:go.sia.tech/renterd/wallet.Transaction
export interface WalletTransaction {
  Raw: Transaction
  Index: ChainIndex
  ID: string
  Inflow: Currency
  Outflow: Currency
  Timestamp: Date
}

// struct2ts:go.sia.tech/renterd/wallet.SiacoinElement
export interface SiacoinElement {
  value: Currency
  unlockhash: string
  ID: string
  MaturityHeight: number
}

// struct2ts:go.sia.tech/renterd/autopilot.Action
export interface Action {
  Timestamp: Date
  Type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Action: any
}

// struct2ts:go.sia.tech/renterd/autopilot.WalletConfig
export interface WalletConfig {
  DefragThreshold: number
}

// struct2ts:go.sia.tech/renterd/autopilot.HostsConfig
export interface HostsConfig {
  Blacklist?: string[]
  IgnoreRedundantIPs: boolean
  ScoreOverrides: { [key: PublicKey]: number }
  Whitelist?: string[]
}

// struct2ts:go.sia.tech/renterd/autopilot.ContractsConfig
export interface ContractsConfig {
  set: string
  amount: number
  allowance: Currency
  period: number
  renewWindow: number
  download: number
  upload: number
  storage: number
}

// struct2ts:go.sia.tech/renterd/autopilot.Config
export interface Config {
  wallet: WalletConfig
  hosts: HostsConfig
  contracts: ContractsConfig
}
