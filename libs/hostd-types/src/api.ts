import {
  FileContractID,
  PublicKey,
  Currency,
  TransactionID,
  ChainIndex,
} from '@siafoundation/types'
import { Contract, ContractStatus, WalletTransaction } from './types'

// state

export type StateHostParams = void
export type StateHostResponse = {
  name?: string
  publicKey: string
  walletAddress: string
  network: 'Mainnet' | 'Zen Testnet'
  version: string
  commit: string
  os: string
  startTime: string
  buildTime: string
  lastAnnouncement?: {
    index: ChainIndex
    publicKey: string
    address: string
  }
}

export type StateConsensusParams = void
export type StateConsensusResponse = {
  chainIndex: {
    height: number
    id: string
  }
  synced: boolean
}

// syncer

type Peer = {
  address: string
  version: string
}

export type SyncerPeersParams = void
export type SyncerPeersResponse = Peer[]

export type SyncerConnectParams = void
export type SyncerConnectPayload = { address: string }
export type SyncerConnectResponse = never

// wallet

export type WalletParams = void
export type WalletResponse = {
  scanHeight: number
  address: string
  spendable: string
  confirmed: string
  unconfirmed: string
}

export type WalletTransactionsParams = { limit?: number; offset?: number }
export type WalletTransactionsResponse = WalletTransaction[]

export type WalletPendingParams = void
export type WalletPendingResponse = WalletTransaction[]

export type WalletSendParams = void
export type WalletSendPayload = {
  amount: string
  address: string
}
export type WalletSendResponse = TransactionID

// txpool

export type TxPoolFeeParams = void
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
export type ContractsIntegrityCheckPaylaod = void
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

// Data is a collection of metrics related to data usage.
type Data = {
  // Ingress returns the number of bytes received by the host.
  ingress: number
  // Egress returns the number of bytes sent by the host.
  egress: number
}

// Contracts is a collection of metrics related to contracts.
type Contracts = {
  pending: number
  active: number
  rejected: number
  failed: number
  successful: number
  lockedCollateral: string
  riskedCollateral: string
}

// Pricing is a collection of metrics related to the host's pricing settings.
type Pricing = {
  contractPrice: string
  ingressPrice: string
  egressPrice: string
  baseRPCPrice: string
  sectorAccessPrice: string
  storagePrice: string
  collateralMultiplier: number
}

// Registry is a collection of metrics related to the host's registry.
type Registry = {
  entries: number
  maxEntries: number

  reads: number
  writes: number
}

// Storage is a collection of metrics related to storage.
type Storage = {
  totalSectors: number
  physicalSectors: number
  contractSectors: number
  tempSectors: number
  reads: number
  writes: number
}

// RevenueMetrics is a collection of metrics related to revenue.
type RevenueMetrics = {
  potential: Revenue
  earned: Revenue
}

// DataMetrics is a collection of metrics related to data usage.
type DataMetrics = {
  rhp: Data
}

export type Metrics = {
  revenue: RevenueMetrics
  pricing: Pricing
  contracts: Contracts
  storage: Storage
  registry: Registry
  data: DataMetrics
  balance: string
  timestamp: string
}

export type MetricsParams = { timestamp: string }
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

export type SettingsParams = void
export type SettingsResponse = HostSettings

export type SettingsUpdateParams = void
export type SettingsUpdatePayload = Partial<HostSettings>
export type SettingsUpdateResponse = HostSettings

export type SettingsAnnounceParams = void
export type SettingsAnnouncePayload = void
export type SettingsAnnounceResponse = void

export type SettingsDdnsUpdateParams = void
export type SettingsDdnsUpdatePayload = void
export type SettingsDdnsUpdateResponse = void

export type SettingsDdnsParams = void
export type SettingsDdnsPayload = void
export type SettingsDdnsResponse = void

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
export type VolumesResponse = VolumeMeta[]

export type VolumeParams = { id: string }
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
export type SystemDirectoryResponse = {
  path: string
  totalBytes: number
  freeBytes: number
  directories: string[]
}

export type SystemDirectoryCreateParams = void
export type SystemDirectoryCreatePayload = { path: string }
export type SystemDirectoryCreateResponse = void

// logs

type LogEntry = {
  timestamp: string
  level: string
  name: string
  caller: string
  message: string
  fields: Record<string, unknown>
}

export type LogsSearchParams = void
export type LogsSearchPayload = {
  names?: string[]
  callers?: string[]
  levels?: string[]
  before?: string
  after?: string
  limit?: number
  offset?: number
}
export type LogsSearchResponse = { count: number; entries: LogEntry[] }

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
export type AlertsResponse = Alert[]

export type AlertsDismissParams = void
export type AlertsDismissPayload = string[]
export type AlertsDismissResponse = void
