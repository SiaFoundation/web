import {
  ChainIndex,
  CoveredFields,
  FileContractRevision,
  SiacoinOutput,
  Transaction,
  Currency,
  OutputID,
  EncryptionKey,
  FileContractID,
  PublicKey,
} from '@siafoundation/react-core'

export interface ConsensusState {
  BlockHeight: number
  Synced: boolean
}

export interface ContractAcquireRequest {
  Duration: number
}

export interface TransactionSignature {
  ParentID: string
  PublicKeyIndex: number
  Timelock: number
  CoveredFields: CoveredFields
  Signature?: string
}

export interface ContractRevision {
  Revision: FileContractRevision
  Signatures: TransactionSignature[]
}

export interface ContractsIDAddRequest {
  contract: ContractRevision
  startHeight: number
  totalCost: Currency
}

export interface ContractsIDRenewedRequest {
  contract: ContractRevision
  renewedFrom: string
  startHeight: number
  totalCost: Currency
}

export interface ContractAcquireResponse {
  locked: boolean
}

export interface WalletFundRequest {
  transaction: Transaction
  amount: Currency
}

export interface WalletFundResponse {
  transaction: Transaction
  toSign?: OutputID[]
  dependsOn?: Transaction[]
}

export interface WalletSignRequest {
  transaction: Transaction
  toSign?: OutputID[]
  coveredFields: CoveredFields
}

export interface WalletRedistributeRequest {
  amount: Currency
  outputs: number
}

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

export interface WalletPrepareFormRequest {
  renterKey?: string
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}

export interface WalletPrepareRenewRequest {
  contract: FileContractRevision
  renterKey?: string
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  endHeight: number
  hostSettings: HostSettings
}

export interface WalletPrepareRenewResponse {
  transactionSet?: Transaction[]
  finalPayment: Currency
}

export interface Sector {
  Host: string
  Root: string
}

export interface SlabSlice {
  Key: EncryptionKey
  MinShards: number
  Shards?: Sector[]
  Offset: number
  Length: number
}

export interface Obj {
  Key: EncryptionKey
  Slabs?: SlabSlice[]
}

export interface ObjectsResponse {
  entries?: string[]
  object?: Obj
}

export interface AddObjectRequest {
  object: Obj
  usedContracts: { [key: PublicKey]: FileContractID }
}

export interface DownloadParams {
  ContractSet: string
}

export interface UploadParams {
  CurrentHeight: number
  MinShards: number
  TotalShards: number
  ContractSet: string
}

export interface MigrateParams {
  CurrentHeight: number
  FromContracts: string
  ToContracts: string
}

export interface GougingSettings {
  MaxRPCPrice: Currency
  MaxContractPrice: Currency
  MaxDownloadPrice: Currency
  MaxUploadPrice: Currency
}

export interface RedundancySettings {
  MinShards: number
  TotalShards: number
}

export interface ContractSpending {
  uploads: Currency
  downloads: Currency
  fundAccount: Currency
}

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

export interface Block {
  parentid: string
  nonce: string
  timestamp: number
  minerpayouts?: SiacoinOutput[]
  transactions?: Transaction[]
}

export interface Announcement {
  Index: ChainIndex
  Timestamp: string
  NetAddress: string
}

export interface Interaction {
  Timestamp: string
  Type: string
  Result?: string
}

export interface Host {
  publicKey: string
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
  scanned: boolean
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

export interface SiacoinElement {
  Value: Currency
  Address: string
  ID: string
  MaturityHeight: number
}

export interface Action {
  Timestamp: string
  Type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Action: any
}

export interface WalletConfig {
  DefragThreshold: number
}

export interface HostsConfig {
  Blacklist?: string[]
  IgnoreRedundantIPs: boolean
  ScoreOverrides: { [key: PublicKey]: number }
  Whitelist?: string[]
}

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

export interface Config {
  wallet: WalletConfig
  hosts: HostsConfig
  contracts: ContractsConfig
}

export interface WalletTransaction {
  Raw: Transaction
  Index: ChainIndex
  ID: string
  Inflow: Currency
  Outflow: Currency
  Timestamp: string
}
