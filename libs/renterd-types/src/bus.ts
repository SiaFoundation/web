import {
  Currency,
  PublicKey,
  Transaction,
  FileContractRevision,
  OutputID,
  CoveredFields,
  FileContractID,
  Block,
} from '@siafoundation/types'
import {
  ConsensusState,
  Contract,
  ContractRevision,
  Host,
  HostSettings,
  Obj,
  PartialSlab,
  SiacoinElement,
  SlabSlice,
  WalletTransaction,
} from './types'

// state

type BuildState = {
  network: 'Mainnet' | 'Zen Testnet'
  version: string
  commit: string
  OS: string
  buildTime: number
}

export type BusStateParams = void
export type BusStateResponse = BuildState & {
  startTime: number
}

// consensus

export type ConsensusStateParams = void
export type ConsensusStateResponse = ConsensusState

export type ConsensusAcceptBlockParams = void
export type ConsensusAcceptBlockPayload = Block
export type ConsensusAcceptBlockResponse = void

// syncer

export type SyncerPeersParams = void
export type SyncerPeersResponse = string[]

export type SyncerConnectParams = void
export type SyncerConnectPayload = string
export type SyncerConnectResponse = never

export type SyncerAddressParams = void
export type SyncerAddressResponse = string

// txpool

export type TxPoolFeeParams = void
export type TxPoolFeeResponse = Currency

export type TxPoolTransactionsParams = void
export type TxPoolTransactionsResponse = Transaction[]

export type TxPoolBroadcastParams = void
export type TxPoolBroadcastPayload = Transaction[]
export type TxPoolBroadcastResponse = unknown

// wallet

export type WalletParams = void
export type WalletResponse = {
  scanHeight: number
  address: string
  confirmed: string
  unconfirmed: string
  spendable: string
}

export type WalletAddressesParams = void
export type WalletAddressesResponse = string[]

export type WalletTransactionsParams = {
  offset?: number
  limit?: number
}
export type WalletTransactionsResponse = WalletTransaction[]

export type WalletUtxoParams = void
export type WalletUtxoResponse = SiacoinElement[]

export type WalletFundParams = void
export type WalletFundPayload = {
  transaction: Transaction
  amount: Currency
}
export type WalletFundResponse = {
  transaction: Transaction
  toSign?: OutputID[]
  dependsOn?: Transaction[]
}

export type WalletSignParams = void
export type WalletSignPayload = {
  transaction: Transaction
  toSign?: OutputID[]
  coveredFields: CoveredFields
}
export type WalletSignResponse = Transaction

export type WalletRedistributeParams = void
export type WalletRedistributePayload = {
  amount: Currency
  outputs: number
}
export type WalletRedistributeResponse = Transaction

export type WalletDiscardParams = void
export type WalletDiscardPayload = Transaction
export type WalletDiscardResponse = never

export type WalletPrepareFormParams = void
export type WalletPrepareFormPayload = {
  renterKey?: string
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  hostCollateral: Currency
  endHeight: number
  hostSettings: HostSettings
}
export type WalletPrepareFormResponse = Transaction[]

export type WalletPrepareRenewParams = void
export type WalletPrepareRenewPayload = {
  contract: FileContractRevision
  renterKey?: string
  hostKey: string
  renterFunds: Currency
  renterAddress: string
  endHeight: number
  hostSettings: HostSettings
}
export type WalletPrepareRenewResponse = {
  transactionSet?: Transaction[]
  finalPayment: Currency
}

export type WalletPendingParams = void
export type WalletPendingResponse = Transaction[]

// hosts

export type HostsParams = {
  offset?: number
  limit?: number
}
export type HostsResponse = Host[]

export type HostsSearchParams = void
export type HostsSearchFilterMode = 'all' | 'allowed' | 'blocked'
export type HostsUsabilityMode = 'all' | 'usable' | 'unusable'
export type HostsSearchPayload = {
  filterMode: HostsSearchFilterMode
  usabilityMode?: HostsUsabilityMode
  addressContains?: string
  keyIn?: string[]
  offset?: number
  limit?: number
}
export type HostsSearchResponse = Host[]

export type HostParams = { hostKey: string }
export type HostResponse = Host

export type HostInteractionParams = { hostKey: string }
export type HostInteractionPayload = {
  timestamp: string
  type: string
  result?: string
}
export type HostInteractionResponse = never

export type HostsBlocklistParams = void
export type HostsBlocklistResponse = string[]

export type HostsAllowlistParams = void
export type HostsAllowlistResponse = PublicKey[]

export type HostsAllowlistUpdateParams = void
export type HostsAllowlistUpdatePayload = {
  add: string[]
  remove: string[]
}
export type HostsAllowlistUpdateResponse = void

export type HostsBlocklistUpdateParams = void
export type HostsBlocklistUpdatePayload = {
  add: string[]
  remove: string[]
}
export type HostsBlocklistUpdateResponse = void

export type HostResetLostSectorCountParams = {
  publicKey: string
}
export type HostResetLostSectorCountPayload = void
export type HostResetLostSectorCountResponse = void

// accounts

export type AccountResetDriftParams = { id: string }
export type AccountResetDriftPayload = void
export type AccountResetDriftResponse = void

// contracts

export type ContractsParams = void
export type ContractsResponse = Contract[]

export type ContractAcquireParams = {
  id: string
}
export type ContractAcquirePayload = {
  Duration: number
}
export type ContractAcquireResponse = {
  locked: boolean
}

export type ContractsReleaseParams = {
  id: string
}
export type ContractsReleasePayload = void
export type ContractsReleaseResponse = never

export type ContractParams = {
  id: string
}
export type ContractResponse = Contract

export type ContractsAddParams = {
  id: string
}
export type ContractsAddPayload = {
  contract: ContractRevision
  startHeight: number
  totalCost: Currency
}
export type ContractsAddResponse = Contract

export type ContractRenewedParams = {
  id: string
}
export type ContractRenewedPayload = {
  contract: ContractRevision
  renewedFrom: string
  startHeight: number
  totalCost: Currency
}
export type ContractRenewedResponse = Contract

export type ContractDeleteParams = {
  id: string
}
export type ContractDeletePayload = void
export type ContractDeleteResponse = never

export type ContractSetsParams = void
export type ContractSetsResponse = string[]

export type ContractSetUpdateParams = {
  name: string
}
export type ContractSetUpdatePayload = string[]
export type ContractSetUpdateResponse = never

// objects

export type Bucket = {
  name: string
  createdAt: string
  policy: {
    publicReadAccess: boolean
  }
}

export type BucketsParams = void
export type BucketsResponse = Bucket[]

export type BucketParams = { name: string }
export type BucketResponse = Bucket

export type BucketCreateParams = void
export type BucketCreatePayload = { name: string }
export type BucketCreateResponse = never

export type BucketPolicy = {
  publicReadAccess: boolean
}

export type BucketPolicyUpdateParams = { name: string }
export type BucketPolicyUpdatePayload = { policy: BucketPolicy }
export type BucketPolicyUpdateResponse = never

export type BucketDeleteParams = { name: string }
export type BucketDeletePayload = void
export type BucketDeleteResponse = never

export type ObjEntry = {
  name: string
  size: number
  health: number
}

export type ObjectDirectoryParams = {
  key: string
  bucket: string
  limit?: number
  prefix?: string
  offset?: number
  sortBy?: 'name' | 'health' | 'size'
  sortDir?: 'asc' | 'desc'
}
export type ObjectDirectoryResponse = { hasMore: boolean; entries: ObjEntry[] }

export type ObjectListParams = void
export type ObjectListPayload = {
  bucket: string
  limit?: number
  prefix?: string
  marker?: string
  sortBy?: 'name' | 'health' | 'size'
  sortDir?: 'asc' | 'desc'
}
export type ObjectListResponse = {
  hasMore: boolean
  nextMarker: string
  objects: ObjEntry[]
}

export type ObjectParams = { key: string; bucket: string }
export type ObjectResponse = { object: Obj }

export type ObjectSearchParams = {
  key: string
  bucket: string
  offset: number
  limit: number
}
export type ObjectSearchResponse = ObjEntry[]

export type ObjectAddParams = { key: string; bucket: string }
export type ObjectAddPayload = {
  object: Obj
  usedContracts: { [key: PublicKey]: FileContractID }
}
export type ObjectAddResponse = never

export type ObjectRenameParams = void
export type ObjectRenamePayload = {
  force: boolean
  bucket: string
  from: string
  to: string
  mode: 'single' | 'multi'
}
export type ObjectRenameResponse = never

export type ObjectDeleteParams = {
  key: string
  bucket: string
  batch?: boolean
}
export type ObjectDeletePayload = void
export type ObjectDeleteResponse = never

export type ObjectsStatsParams = void
export type ObjectsStatsResponse = {
  numObjects: number // number of objects
  numUnfinishedObjects: number // number of unfinished objects
  minHealth: number // minimum health across all objects
  totalObjectsSize: number // size of all objects
  totalUnfinishedObjectsSize: number // size of all unfinished objects
  totalSectorsSize: number // uploaded size of all objects
  totalUploadedSize: number // uploaded size of all objects including redundant sectors
}

export type Setting = Record<string, unknown> | string

export type SettingsParams = void
export type SettingsResponse = string[]

export type SettingParams = { key: string }
export type SettingResponse<T extends Setting> = T

export type SettingUpdateParams = { key: string }
export type SettingUpdatePayload = Setting
export type SettingUpdateResponse = void

// alerts

export type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'

export type Alert = {
  id: string
  severity: AlertSeverity
  message: string
  timestamp: string
  data: {
    account?: string
    host?: string
    key?: string
  }
}

export type AlertsParams = {
  limit: number
  offset: number
  severity?: AlertSeverity
}

export type AlertsResponse = {
  alerts?: Alert[]
  hasMore: boolean
  totals: Record<AlertSeverity, number>
}

export type AlertsDismissParams = void
export type AlertsDismissPayload = string[]
export type AlertsDismissResponse = void

// slabs

export type SlabObjectsParams = { key: string }
export type SlabObjectsResponse = ObjEntry[]

// metrics

export type MetricsParams = {
  start: string
  interval: number
  n: number
}

export type ContractMetric = {
  timestamp: string
  contractID: string
  hostKey: string
  remainingCollateral: string
  remainingFunds: string
  revisionNumber: number
  uploadSpending: string
  downloadSpending: string
  fundAccountSpending: string
  deleteSpending: string
  listSpending: string
}

export type ContractMetricsParams = MetricsParams & {
  contractID?: string
  hostKey?: string
}
export type ContractMetricsResponse = ContractMetric[]

export type ContractSetMetric = {
  contracts: number
  name: string
  timestamp: string
}

export type ContractSetMetricsParams = MetricsParams & {
  name: string
}
export type ContractSetMetricsResponse = ContractSetMetric[]

export type ContractSetChurnMetric = {
  direction: string
  contractID: string
  name: string
  reason: string
  timestamp: string
}

export type ContractSetChurnMetricsParams = MetricsParams & {
  name: string
  direction?: string
  reason?: string
}
export type ContractSetChurnMetricsResponse = ContractSetChurnMetric[]

export type WalletMetric = {
  timestamp: string
  confirmed: string
  spendable: string
  unconfirmed: string
}

export type WalletMetricsParams = MetricsParams
export type WalletMetricsResponse = WalletMetric[]

// export type PerformanceMetric = {
//   action: string
//   hostKey: string
//   origin: string
//   duration: number
//   timestamp: string
// }

// export type PerformanceMetricsParams = MetricsParams & {
//   action: string
//   hostKey: string
//   origin: string
// }

// multipart

export type MultipartUploadCreateParams = void
export type MultipartUploadCreatePayload = {
  path: string
  bucket: string
  generateKey: boolean
  key?: string
}
export type MultipartUploadCreateResponse = {
  uploadID: string
}

export type MultipartUploadCompletePart = {
  partNumber: number
  eTag: string
}

export type MultipartUploadCompleteParams = void
export type MultipartUploadCompletePayload = {
  path: string
  bucket: string
  uploadID: string
  parts: MultipartUploadCompletePart[]
}
export type MultipartUploadCompleteResponse = void

export type MultipartUploadAbortParams = void
export type MultipartUploadAbortPayload = {
  path: string
  bucket: string
  uploadID: string
}
export type MultipartUploadAbortResponse = void

export type MultipartUploadListPartsParams = void
export type MultipartUploadListPartsPayload = {
  bucket: string
  path: string
  uploadID: string
  partNumberMarker?: number
  limit?: number
}
export type MultipartUploadListPartsResponse = {
  hasMore: boolean
  nextMarker?: number
  parts: {
    partNumber: number
    lastModified: string
    eTag: string
    size: number
  }[]
}

export type MultipartUploadListUploadsParams = void
export type MultipartUploadListUploadsPayload = {
  bucket: string
  prefix?: string
  pathMarker?: string
  uploadIDMarker?: string
  limit?: number
}
export type MultipartUploadListUploadsResponse = {
  hasMore: boolean
  nextMarker: string
  nextUploadIDMarker: string
  uploads?: {
    path: string
    uploadID: string
    createdAt: string
  }[]
}

export type MultipartUploadAddPartParams = void
export type MultipartUploadAddPartPayload = {
  path: string
  bucket: string
  uploadID: string
  eTag: string
  partNumber: number
  contractSet?: string
  partialSlabs?: PartialSlab[]
  slices?: SlabSlice[]
  usedContracts?: Contract[]
}
export type MultipartUploadAddPartResponse = void
