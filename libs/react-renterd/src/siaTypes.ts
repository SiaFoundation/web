import {
  ChainIndex,
  FileContractRevision,
  Transaction,
  Currency,
  EncryptionKey,
  PublicKey,
  TransactionSignature,
} from '@siafoundation/types'

export type ConsensusState = {
  blockHeight: number
  synced: boolean
  lastBlockTime: string
}

export type ContractRevision = {
  revision: FileContractRevision
  signatures: TransactionSignature[]
}

export type HostSettings = {
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

export type HostPriceTable = {
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

export type Sector = {
  host: string
  root: string
}

export type Slab = {
  health: number
  key: EncryptionKey
  minShards: number
  // if no shards, then its a partial slab
  shards?: Sector[]
}

export type SlabSlice = {
  slab: Slab
  offset: number
  length: number
}

export type Obj = {
  name: string
  size: number
  health: number
  key: EncryptionKey
  eTag: string
  mimeType: string
  modTime: string
  slabs: SlabSlice[]
}

export type ContractSetSettings = {
  default: string
}

export type GougingSettings = {
  maxStoragePrice: string
  maxDownloadPrice: string
  maxUploadPrice: string
  maxContractPrice: string
  maxRPCPrice: string
  minMaxCollateral: string
  hostBlockHeightLeeway: number
  minPriceTableValidity: number
  minAccountExpiry: number
  minMaxEphemeralAccountBalance: string
  migrationSurchargeMultiplier: number
}

export type UploadPackingSettings = {
  enabled: boolean
}

export type RedundancySettings = {
  minShards: number
  totalShards: number
}

export type ContractSpending = {
  uploads: Currency
  downloads: Currency
  fundAccount: Currency
}

export type ContractState = 'pending' | 'active' | 'complete' | 'failed'

export type Contract = {
  id: string
  hostIP: string
  hostKey: string
  sets?: string[]
  proofHeight: number
  revisionHeight: number
  revisionNumber: number
  startHeight: number
  windowStart: number
  windowEnd: number
  renewedFrom: string
  spending: ContractSpending
  totalCost: Currency
  size: number
  state: ContractState
}

export type HostInteractions = {
  downtime: number
  failedInteractions: number
  lastScan?: string
  lastScanSuccess: boolean
  lostSectors: number
  secondToLastScanSuccess: boolean
  successfulInteractions: number
  totalScans: number
  uptime: number
}

export type Host = {
  publicKey: string
  netAddress: string
  knownSince: string
  lastAnnouncement: string
  interactions: HostInteractions
  scanned: boolean
  priceTable?: HostPriceTable
  settings?: HostSettings
}

export type SiacoinElement = {
  value: Currency
  address: string
  id: string
  maturityHeight: number
}

export type AutopilotWalletConfig = {
  defragThreshold: number
}

export type AutopilotHostsConfig = {
  allowRedundantIPs: boolean
  scoreOverrides: { [key: PublicKey]: number }
  maxDowntimeHours: number
  minRecentScanFailures: number
}

export type AutopilotContractsConfig = {
  set: string
  amount: number
  allowance: Currency
  period: number
  renewWindow: number
  download: number
  upload: number
  storage: number
  prune: boolean
}

export type AutopilotConfig = {
  wallet: AutopilotWalletConfig
  hosts: AutopilotHostsConfig
  contracts: AutopilotContractsConfig
}

export type WalletTransaction = {
  raw: Transaction
  index: ChainIndex
  id: string
  inflow: Currency
  outflow: Currency
  timestamp: string
}
