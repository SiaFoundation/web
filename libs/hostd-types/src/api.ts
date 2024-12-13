import {
  FileContractID,
  PublicKey,
  Currency,
  TransactionID,
  ChainIndex,
  WalletEvent,
} from '@siafoundation/types'
import { Contract, ContractStatus, WalletTransaction } from './types'

export const hostStateRoute = '/state'
export const consensusNetworkRoute = '/consensus/network'
export const consensusTipRoute = '/consensus/tip'
export const consensusTipStateRoute = '/consensus/tipstate'
export const indexTipRoute = '/index/tip'
export const syncerPeersRoute = '/syncer/peers'
export const walletRoute = '/wallet'
export const walletEventsRoute = '/wallet/events'
export const walletPendingRoute = '/wallet/pending'
export const walletSendRoute = '/wallet/send'
export const tpoolFeeRoute = '/tpool/fee'
export const contractsRoute = '/contracts'
export const contractsIdIntegrityRoute = '/contracts/:id/integrity'
export const metricsRoute = '/metrics'
export const metricsIntervalRoute = '/metrics/:interval'
export const settingsRoute = '/settings'
export const settingsAnnounceRoute = '/settings/announce'
export const settingsDdnsUpdateRoute = '/settings/ddns/update'
export const volumesRoute = '/volumes'
export const volumesIdRoute = '/volumes/:id'
export const volumesIdResizeRoute = '/volumes/:id/resize'
export const volumesIdCancelRoute = '/volumes/:id/cancel'
export const systemDirRoute = '/system/dir'
export const alertsRoute = '/alerts'
export const alertsDismissRoute = '/alerts/dismiss'

// state

export type HostStateParams = void
export type HostStatePayload = void
export type HostStateResponse = {
  name?: string
  publicKey: string
  version: string
  commit: string
  os: string
  startTime: string
  buildTime: string
  explorer: {
    enabled: boolean
    url: string
  }
  lastAnnouncement?: {
    index: ChainIndex
    publicKey: string
    address: string
  }
}

export type ConsensusNetworkParams = void
export type ConsensusNetworkPayload = void
export type ConsensusNetworkResponse = {
  name: 'mainnet' | 'zen'
  initialCoinbase: string
  minimumCoinbase: string
  initialTarget: string
  hardforkDevAddr: {
    height: number
    oldAddress: string
    newAddress: string
  }
  hardforkTax: {
    height: number
  }
  hardforkStorageProof: {
    height: number
  }
  hardforkOak: {
    height: number
    fixHeight: number
    genesisTimestamp: string
  }
  hardforkASIC: {
    height: number
    oakTime: number
    oakTarget: string
  }
  hardforkFoundation: {
    height: number
    primaryAddress: string
    failsafeAddress: string
  }
  hardforkV2: {
    allowHeight: number
    requireHeight: number
  }
}

export type ConsensusTipParams = void
export type ConsensusTipPayload = void
export type ConsensusTipResponse = ChainIndex

export type ConsensusTipStateParams = void
export type ConsensusTipStatePayload = void
export type ConsensusTipStateResponse = {
  index: ChainIndex
  prevTimestamps: string[]
  depth: string
  childTarget: string
  siafundPool: string
  oakTime: number
  oakTarget: string
  foundationPrimaryAddress: string
  foundationFailsafeAddress: string
  totalWork: string
  difficulty: string
  oakWork: string
  elements: {
    numLeaves: number
    trees: string[]
  }
  attestations: number
}

export type IndexTipParams = void
export type IndexTipPayload = void
export type IndexTipResponse = ChainIndex

// syncer

type Peer = {
  address: string
  inbound: boolean
  version: string
  firstSeen?: string
  connectedSince?: string
  syncedBlocks?: number
  syncDuration?: number
}

export type SyncerPeersParams = void
export type SyncerPeersPayload = void
export type SyncerPeersResponse = Peer[]

export type SyncerConnectParams = void
export type SyncerConnectPayload = { address: string }
export type SyncerConnectResponse = never

// wallet

export type WalletParams = void
export type WalletPayload = void
export type WalletResponse = {
  spendable: string
  confirmed: string
  unconfirmed: string
  immature: string
  address: string
}

export type WalletTransactionsParams = { limit?: number; offset?: number }
export type WalletTransactionsPayload = void
export type WalletTransactionsResponse = WalletTransaction[]

export type WalletEventsParams = { limit?: number; offset?: number }
export type WalletEventsPayload = void
export type WalletEventsResponse = WalletEvent[]

export type WalletPendingParams = void
export type WalletPendingPayload = void
export type WalletPendingResponse = WalletEvent[]

export type WalletSendParams = void
export type WalletSendPayload = {
  amount: string
  address: string
  subtractMinerFee?: boolean
}
export type WalletSendResponse = TransactionID

// txpool

export type TxPoolFeeParams = void
export type TxPoolFeePayload = void
export type TxPoolFeeResponse = Currency

// contracts

export type ContractFilterSortField =
  | 'status'
  | 'negotiationHeight'
  | 'expirationHeight'

export type ContractsParams = void
export type ContractsPayload = {
  // filters
  statuses?: ContractStatus[]
  contractIDs?: FileContractID[]
  renewedFrom?: FileContractID[]
  renewedTo?: FileContractID[]
  renterKey?: PublicKey[]

  minNegotiationHeight?: number
  maxNegotiationHeight?: number

  minExpirationHeight?: number
  maxExpirationHeight?: number

  // pagination
  limit?: number
  offset?: number

  // sorting
  sortField?: ContractFilterSortField
  sortDesc?: boolean
}

export type ContractsResponse = {
  contracts: Contract[]
  count: number
}

export type ContractsIntegrityCheckParams = { id: string }
export type ContractsIntegrityCheckPayload = void
export type ContractsIntegrityCheckResponse = void

// metrics

// Revenue is a collection of metrics related to revenue.
type Revenue = {
  rpc: string
  storage: string
  ingress: string
  egress: string
  registryRead: string
  registryWrite: string
}

type DataRHPMetrics = {
  // Ingress returns the number of bytes received by the host.
  ingress: number
  // Egress returns the number of bytes sent by the host.
  egress: number
}

type ContractMetrics = {
  active: number
  rejected: number
  failed: number
  renewed: number
  finalized: number
  successful: number
  lockedCollateral: string
  riskedCollateral: string
}

type PricingMetrics = {
  contractPrice: string
  ingressPrice: string
  egressPrice: string
  baseRPCPrice: string
  sectorAccessPrice: string
  storagePrice: string
  collateralMultiplier: number
}

type RegistryMetrics = {
  entries: number
  maxEntries: number

  reads: number
  writes: number
}

type StorageMetrics = {
  totalSectors: number
  physicalSectors: number
  lostSectors: number
  contractSectors: number
  tempSectors: number
  reads: number
  writes: number
  sectorCacheHits: number
  sectorCacheMisses: number
}

type RevenueMetrics = {
  potential: Revenue
  earned: Revenue
}

type DataMetrics = {
  rhp: DataRHPMetrics
}

type AccountMetrics = {
  active: number
  balance: string
}

type WalletMetrics = {
  balance: string
  immatureBalance: string
}

export type Metrics = {
  accounts: AccountMetrics
  revenue: RevenueMetrics
  pricing: PricingMetrics
  contracts: ContractMetrics
  storage: StorageMetrics
  registry: RegistryMetrics
  data: DataMetrics
  wallet: WalletMetrics
  timestamp: string
}

export type MetricsParams = { timestamp: string }
export type MetricsPayload = void
export type MetricsResponse = Metrics

type Interval =
  | '5m'
  | '15m'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'

export type MetricsPeriodParams = {
  interval: Interval
  start: string
  periods?: number
}
export type MetricsPeriodPayload = void
export type MetricsPeriodResponse = Metrics[]

// settings

// DuckDNS
export type DNSDuckDNSOptions = {
  token: string
}

// No-IP
export type DNSNoIPOptions = {
  email: string
  password: string
}

// AWS
export type DNSAWSOptions = {
  id: string
  secret: string
  zoneID: string
}

// Cloudflare
export type DNSCloudflareOptions = {
  token: string
  zoneID: string
}

export type DNSProvider = '' | 'route53' | 'noip' | 'duckdns' | 'cloudflare'

type DNSSettings = {
  provider: DNSProvider
  ipv4: boolean
  ipv6: boolean
  options:
    | DNSDuckDNSOptions
    | DNSNoIPOptions
    | DNSAWSOptions
    | DNSCloudflareOptions
}

export type HostSettings = {
  // Host settings
  acceptingContracts: boolean
  netAddress: string
  maxContractDuration: number

  // Pricing
  contractPrice: Currency
  baseRPCPrice: Currency
  sectorAccessPrice: Currency

  collateralMultiplier: number
  maxCollateral: Currency

  storagePrice: Currency
  egressPrice: Currency
  ingressPrice: Currency

  priceTableValidity: number

  // RHP3 settings
  accountExpiry: number
  maxAccountBalance: Currency

  // Bandwidth limiter settings
  ingressLimit: number
  egressLimit: number

  // DNS settings
  ddns: DNSSettings

  revision: number
}

export type HostSettingsPinned = {
  currency: string
  threshold: number
  storage: {
    pinned: boolean
    value: number
  }
  ingress: {
    pinned: boolean
    value: number
  }
  egress: {
    pinned: boolean
    value: number
  }
  maxCollateral: {
    pinned: boolean
    value: number
  }
}

export type SettingsParams = void
export type SettingsPayload = void
export type SettingsResponse = HostSettings

export type SettingsPinnedParams = void
export type SettingsPinnedPayload = void
export type SettingsPinnedResponse = HostSettingsPinned

export type SettingsPinnedUpdateParams = void
export type SettingsPinnedUpdatePayload = HostSettingsPinned
export type SettingsPinnedUpdateResponse = void

export type SettingsUpdateParams = void
export type SettingsUpdatePayload = Partial<HostSettings>
export type SettingsUpdateResponse = HostSettings

export type SettingsAnnounceParams = void
export type SettingsAnnouncePayload = void
export type SettingsAnnounceResponse = void

export type SettingsDdnsUpdateParams = void
export type SettingsDdnsUpdatePayload = void
export type SettingsDdnsUpdateResponse = void

// volumes

export type Volume = {
  id: number
  localPath: string
  usedSectors: number
  totalSectors: number
  readOnly: boolean
  available: boolean
}

export type VolumeStatus =
  | 'unavailable'
  | 'creating'
  | 'resizing'
  | 'removing'
  | 'ready'

export type VolumeStats = {
  failedReads: number
  failedWrites: number
  successfulReads: number
  successfulWrites: number
  status: VolumeStatus
  errors: string[]
}

export type VolumeMeta = Volume & VolumeStats

export type VolumesParams = void
export type VolumesPayload = void
export type VolumesResponse = VolumeMeta[]

export type VolumeParams = { id: string }
export type VolumePayload = void
export type VolumeResponse = VolumeMeta

export type VolumeCreateParams = void
export type VolumeCreatePayload = { localPath: string; maxSectors: number }
export type VolumeCreateResponse = Volume

export type VolumeUpdateParams = { id: number }
export type VolumeUpdatePayload = { readOnly: boolean }
export type VolumeUpdateResponse = void

export type VolumeDeleteParams = { id: number; force?: boolean }
export type VolumeDeletePayload = void
export type VolumeDeleteResponse = void

export type VolumeResizeParams = { id: number }
export type VolumeResizePayload = { maxSectors: number }
export type VolumeResizeResponse = void

export type VolumeCancelParams = { id: number }
export type VolumeCancelPayload = void
export type VolumeCancelResponse = void

export type SystemDirectoryParams = {
  path: string
}
export type SystemDirectoryPayload = void
export type SystemDirectoryResponse = {
  path: string
  totalBytes: number
  freeBytes: number
  directories: string[]
}
export type SystemDirectoryCreateParams = void
export type SystemDirectoryCreatePayload = { path: string }
export type SystemDirectoryCreateResponse = void

// alerts

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'

export type Alert = {
  id: string
  severity: AlertSeverity
  message: string
  data: {
    contractID?: number
    blockHeight?: number
    resolution?: string
    volume?: string
    volumeID?: number

    elapsed?: number
    error?: string

    checked?: number
    missing?: number
    corrupt?: number
    total?: number

    oldSectors?: number
    currentSectors?: number
    targetSectors?: number
    migratedSectors?: number

    migrated?: number
    target?: number

    force?: boolean
  }
  timestamp: string
}

export type AlertsParams = void
export type AlertsPayload = void
export type AlertsResponse = Alert[]

export type AlertsDismissParams = void
export type AlertsDismissPayload = string[]
export type AlertsDismissResponse = void
