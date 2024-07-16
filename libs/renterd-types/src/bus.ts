import type {
  Block,
  CoveredFields,
  Currency,
  FileContractID,
  FileContractRevision,
  OutputID,
  PublicKey,
  Transaction,
} from '@siafoundation/types'
import type {
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

export const busStateRoute = '/bus/state'
export const busConsensusStateRoute = '/bus/consensus/state'
export const busConsensusAcceptblockRoute = '/bus/consensus/acceptblock'
export const busSyncerPeersRoute = '/bus/syncer/peers'
export const busSyncerConnectRoute = '/bus/syncer/connect'
export const busSyncerAddrRoute = '/bus/syncer/addr'
export const busTxpoolTransactionsRoute = '/bus/txpool/transactions'
export const busTxpoolBroadcastRoute = '/bus/txpool/broadcast'
export const busTxpoolFeeRoute = '/bus/txpool/fee'
export const busWalletRoute = '/bus/wallet'
export const busWalletAddressesRoute = '/bus/wallet/addresses'
export const busWalletTransactionsRoute = '/bus/wallet/transactions'
export const busWalletOutputsRoute = '/bus/wallet/outputs'
export const busWalletFundRoute = '/bus/wallet/fund'
export const busWalletSignRoute = '/bus/wallet/sign'
export const busWalletRedistributeRoute = '/bus/wallet/redistribute'
export const busWalletDiscardRoute = '/bus/wallet/discard'
export const busWalletPrepareFormRoute = '/bus/wallet/prepare/form'
export const busWalletPrepareRenewRoute = '/bus/wallet/prepare/renew'
export const busWalletPendingRoute = '/bus/wallet/pending'
export const busHostsRoute = '/bus/hosts'
export const busSearchHostsRoute = '/bus/search/hosts'
export const busHostHostKeyRoute = '/bus/host/:hostKey'
export const busHostsHostKeyRoute = '/bus/hosts/:hostKey'
export const busHostsBlocklistRoute = '/bus/hosts/blocklist'
export const busHostsAllowlistRoute = '/bus/hosts/allowlist'
export const busHostPublicKeyResetlostsectorsRoute =
  '/bus/host/:publicKey/resetlostsectors'
export const busAccountIdResetdriftRoute = '/bus/account/:id/resetdrift'
export const busContractsRoute = '/bus/contracts'
export const busContractIdAcquireRoute = '/bus/contract/:id/acquire'
export const busContractIdReleaseRoute = '/bus/contract/:id/release'
export const busContractRoute = '/bus/contract'
export const busContractIdRoute = '/bus/contract/:id'
export const busContractIdNewRoute = '/bus/contract/:id/new'
export const busContractIdRenewedRoute = '/bus/contract/:id/renewed'
export const busContractIdSize = '/bus/contract/:id/size'
export const busContractsSetsRoute = '/bus/contracts/sets'
export const busContractsSetsSetRoute = '/bus/contracts/sets/:set'
export const busContractsPrunableRoute = '/bus/contracts/prunable'
export const busBucketRoute = '/bus/bucket'
export const busBucketsRoute = '/bus/buckets'
export const busBucketNameRoute = '/bus/bucket/:name'
export const busBucketNamePolicyRoute = '/bus/bucket/:name/policy'
export const busObjectsRoute = '/bus/objects'
export const busObjectsKeyRoute = '/bus/objects/:key'
export const busObjectsListRoute = '/bus/objects/list'
export const busSearchObjectsRoute = '/bus/search/objects'
export const busObjectsRenameRoute = '/bus/objects/rename'
export const busStatsObjectsRoute = '/bus/stats/objects'
export const busSettingRoute = '/bus/setting'
export const busSettingsRoute = '/bus/settings'
export const busSettingKeyRoute = '/bus/setting/:key'
export const busAlertsRoute = '/bus/alerts'
export const busAlertsDismissRoute = '/bus/alerts/dismiss'
export const busSlabKeyObjectsRoute = '/bus/slab/:key/objects'
export const busMetricContractRoute = '/bus/metric/contract'
export const busMetricContractsetRoute = '/bus/metric/contractset'
export const busMetricChurnRoute = '/bus/metric/churn'
export const busMetricWalletRoute = '/bus/metric/wallet'
export const busMultipartRoute = '/bus/multipart'
export const busMultipartCreateRoute = '/bus/multipart/create'
export const busMultipartCompleteRoute = '/bus/multipart/complete'
export const busMultipartAbortRoute = '/bus/multipart/abort'
export const busMultipartListpartsRoute = '/bus/multipart/listparts'
export const busMultipartListuploadsRoute = '/bus/multipart/listuploads'
export const busMultipartPartRoute = '/bus/multipart/part'

// state

type BuildState = {
  network: 'Mainnet' | 'Zen Testnet'
  version: string
  commit: string
  OS: string
  buildTime: number
}

export type BusStateParams = void
export type BusStatePayload = void
export type BusStateResponse = BuildState & {
  startTime: number
}

// consensus

export type ConsensusStateParams = void
export type ConsensusStatePayload = void
export type ConsensusStateResponse = ConsensusState

export type ConsensusAcceptBlockParams = void
export type ConsensusAcceptBlockPayload = Block
export type ConsensusAcceptBlockResponse = void

// syncer

export type SyncerPeersParams = void
export type SyncerPeersPayload = void
export type SyncerPeersResponse = string[]

export type SyncerConnectParams = void
export type SyncerConnectPayload = string
export type SyncerConnectResponse = void

export type SyncerAddressParams = void
export type SyncerAddressPayload = void
export type SyncerAddressResponse = string

// txpool

export type TxPoolFeeParams = void
export type TxPoolFeePayload = void
export type TxPoolFeeResponse = Currency

export type TxPoolTransactionsParams = void
export type TxPoolTransactionsPayload = void
export type TxPoolTransactionsResponse = Transaction[]

export type TxPoolBroadcastParams = void
export type TxPoolBroadcastPayload = Transaction[]
export type TxPoolBroadcastResponse = unknown

// wallet

export type WalletParams = void
export type WalletPayload = void
export type WalletResponse = {
  scanHeight: number
  address: string
  confirmed: string
  unconfirmed: string
  spendable: string
}

export type WalletAddressesParams = void
export type WalletAddressesPayload = void
export type WalletAddressesResponse = string[]

export type WalletTransactionsParams = {
  offset?: number
  limit?: number
}
export type WalletTransactionsPayload = void
export type WalletTransactionsResponse = WalletTransaction[]

export type WalletUtxoParams = void
export type WalletUtxoPayload = void
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
export type WalletDiscardResponse = void

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
export type WalletPendingPayload = void
export type WalletPendingResponse = Transaction[]

// hosts

export type HostsParams = {
  offset?: number
  limit?: number
}
export type HostsPayload = void
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
export type HostPayload = Host
export type HostResponse = Host

export type HostInteractionParams = { hostKey: string }
export type HostInteractionPayload = {
  timestamp: string
  type: string
  result?: string
}
export type HostInteractionResponse = void

export type HostsBlocklistParams = void
export type HostsBlocklistPayload = void
export type HostsBlocklistResponse = string[]

export type HostsAllowlistParams = void
export type HostsAllowlistPayload = void
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
export type ContractsPayload = void
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
export type ContractsReleaseResponse = void

export type ContractParams = {
  id: string
}
export type ContractPayload = void
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
export type ContractDeleteResponse = void

export type ContractSetsParams = void
export type ContractSetsPayload = void
export type ContractSetsResponse = string[]

export type ContractSetUpdateParams = {
  name: string
}
export type ContractSetUpdatePayload = string[]
export type ContractSetUpdateResponse = void

export type ContractSizeParams = {
  id: string
}
export type ContractSizePayload = void
export type ContractSizeResponse = {
  prunable: number
  size: number
}

export type ContractsPrunableParams = void
export type ContractsPrunablePayload = void
export type ContractsPrunableResponse = {
  contracts: {
    id: string
    prunable: number
    size: number
  }[]
  totalPrunable: number
  totalSize: number
}

// objects

export type Bucket = {
  name: string
  createdAt: string
  policy: {
    publicReadAccess: boolean
  }
}

export type BucketsParams = void
export type BucketsPayload = void
export type BucketsResponse = Bucket[]

export type BucketParams = { name: string }
export type BucketPayload = void
export type BucketResponse = Bucket

export type BucketCreateParams = void
export type BucketCreatePayload = { name: string }
export type BucketCreateResponse = void

export type BucketPolicy = {
  publicReadAccess: boolean
}

export type BucketPolicyUpdateParams = { name: string }
export type BucketPolicyUpdatePayload = { policy: BucketPolicy }
export type BucketPolicyUpdateResponse = void

export type BucketDeleteParams = { name: string }
export type BucketDeletePayload = void
export type BucketDeleteResponse = void

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
export type ObjectDirectoryPayload = void
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
export type ObjectPayload = void
export type ObjectResponse = { object: Obj }

export type ObjectSearchParams = {
  key: string
  bucket: string
  offset: number
  limit: number
}
export type ObjectSearchPayload = void
export type ObjectSearchResponse = ObjEntry[]

export type ObjectAddParams = { key: string; bucket: string }
export type ObjectAddPayload = {
  object: Obj
  usedContracts: { [key: PublicKey]: FileContractID }
}
export type ObjectAddResponse = void

export type ObjectRenameParams = void
export type ObjectRenamePayload = {
  force: boolean
  bucket: string
  from: string
  to: string
  mode: 'single' | 'multi'
}
export type ObjectRenameResponse = void

export type ObjectDeleteParams = {
  key: string
  bucket: string
  batch?: boolean
}
export type ObjectDeletePayload = void
export type ObjectDeleteResponse = void

export type ObjectsStatsParams = void
export type ObjectsStatsPayload = void
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
export type SettingsPayload = void
export type SettingsResponse = string[]

export type SettingParams = { key: string }
export type SettingPayload = void
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
export type AlertsPayload = void
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
export type SlabObjectsPayload = void
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
export type ContractMetricsPayload = void
export type ContractMetricsResponse = ContractMetric[]

export type ContractSetMetric = {
  contracts: number
  name: string
  timestamp: string
}

export type ContractSetMetricsParams = MetricsParams & {
  name: string
}
export type ContractSetMetricsPayload = void
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
export type ContractSetChurnMetricsPayload = void
export type ContractSetChurnMetricsResponse = ContractSetChurnMetric[]

export type WalletMetric = {
  timestamp: string
  confirmed: string
  spendable: string
  unconfirmed: string
}

export type WalletMetricsParams = MetricsParams
export type WalletMetricsPayload = void
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
