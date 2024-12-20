import { CurrencyId } from '@siafoundation/react-core'
import {
  ChainIndex,
  Currency,
  EncryptionKey,
  FileContractRevision,
  HostSettings,
  HostPriceTable,
  PublicKey,
  Transaction,
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

export type Sector = {
  host: string
  root: string
}

export type Slab = {
  health: number
  encryptionKey: EncryptionKey
  minShards: number
  // if no shards, then its a partial slab
  shards?: Sector[]
}

export type SlabSlice = {
  slab: Slab
  offset: number
  length: number
}

export type ObjectObject = {
  encryptionKey: EncryptionKey
  slabs?: SlabSlice[]
}

export type ObjectMetadata = {
  bucket: string
  key: string
  size: number
  health: number
  eTag?: string
  modTime: string
  mimeType?: string
}

export type ObjectUserMetadata = Record<string, string>

export type Obj = ObjectMetadata &
  ObjectObject & {
    metadata: ObjectUserMetadata
  }

// Settings

export type SettingsGouging = {
  maxStoragePrice: string
  maxDownloadPrice: string
  maxUploadPrice: string
  maxContractPrice: string
  maxRPCPrice: string
  hostBlockHeightLeeway: number
  minPriceTableValidity: number
  minAccountExpiry: number
  minMaxEphemeralAccountBalance: string
}

export type SettingsUploadPacking = {
  enabled: boolean
  slabBufferMaxSizeSoft: number
}

export type SettingsRedundancy = {
  minShards: number
  totalShards: number
}

export type SettingsUpload = {
  packing: SettingsUploadPacking
  redundancy: SettingsRedundancy
}

export type SettingsS3Authentication = {
  v4Keypairs: {
    [key: string]: string
  }
}

export type SettingsS3 = {
  authentication: SettingsS3Authentication
}

export type Pin = {
  pinned: boolean
  value: number
}

export type GougingSettingsPins = {
  maxStorage: Pin
  maxDownload: Pin
  maxUpload: Pin
}

// SettingsPinned holds the configuration for pinning certain settings to
// a specific currency (e.g., USD). It uses a Forex API to fetch the current
// exchange rate, allowing users to set prices in USD instead of SC.
export type SettingsPinned = {
  // Currency is the external three-letter currency code.
  currency: CurrencyId | ''

  // Threshold is a percentage between 0 and 1 that determines when the
  // pinned settings are updated based on the exchange rate at the time.
  threshold: number

  // GougingSettingsPins contains the pinned settings for the gouging
  // settings.
  gougingSettingsPins: GougingSettingsPins
}

// Contracts

export type ContractSpending = {
  deletions: Currency
  fundAccount: Currency
  sectorRoots: Currency
  uploads: Currency
}

export type ContractState = 'pending' | 'active' | 'complete' | 'failed'

export type ContractUsability = 'good' | 'bad'

export type Contract = {
  id: string
  usability: ContractUsability
  hostKey: string
  proofHeight: number
  revisionHeight: number
  revisionNumber: number
  startHeight: number
  windowStart: number
  windowEnd: number
  renewedFrom: string
  spending: ContractSpending
  initialRenterFunds: Currency
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
  blocked: boolean
  storedData: number
  resolvedAddresses?: string[]
  subnets?: string[]
  checks?: HostAutopilotChecks
}

export type HostAutopilotChecks = {
  score: number
  usable: boolean
  scoreBreakdown: {
    age: number
    collateral: number
    interactions: number
    storageRemaining: number
    prices: number
    uptime: number
    version: number
  }
  gougingBreakdown: {
    contractErr?: string
    downloadErr?: string
    gougingErr?: string
    uploadErr?: string
    pruneErr?: string
  }
  usabilityBreakdown: {
    blocked: boolean
    gouging: boolean
    lowScore: boolean
    notAcceptingContracts: boolean
    notAnnounced: boolean
    notCompletingScan: boolean
    offline: boolean
    redundantIP: boolean
  }
}

export type SiacoinElement = {
  value: Currency
  address: string
  id: string
  maturityHeight: number
}

export type AutopilotHostsConfig = {
  scoreOverrides: { [key: PublicKey]: number }
  maxDowntimeHours: number
  maxConsecutiveScanFailures: number
  minProtocolVersion: string
}

export type AutopilotContractsConfig = {
  amount: number
  period: number
  renewWindow: number
  download: number
  upload: number
  storage: number
  prune: boolean
}

export type AutopilotConfig = {
  enabled: boolean
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
