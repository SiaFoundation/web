import {
  Currency,
  PublicKey,
  Transaction,
  FileContractRevision,
  FileContractID,
  Block,
  TransactionID,
  WalletEvent,
} from '@siafoundation/types'
import {
  Autopilot,
  ConsensusState,
  Contract,
  ContractRevision,
  Host,
  HostSettings,
  Obj,
  ObjectMetadata,
  SettingsGouging,
  SettingsPinned,
  SettingsS3,
  SettingsUpload,
  SlabSlice,
} from './types'

export const busStateRoute = '/bus/state'
export const busAutopilotsRoute = '/bus/autopilots'
export const busConsensusStateRoute = '/bus/consensus/state'
export const busConsensusAcceptblockRoute = '/bus/consensus/acceptblock'
export const busSyncerPeersRoute = '/bus/syncer/peers'
export const busSyncerConnectRoute = '/bus/syncer/connect'
export const busSyncerAddrRoute = '/bus/syncer/addr'
export const busTxpoolTransactionsRoute = '/bus/txpool/transactions'
export const busTxpoolBroadcastRoute = '/bus/txpool/broadcast'
export const busTxpoolRecommendedFeeRoute = '/bus/txpool/recommendedfee'
export const busWalletRoute = '/bus/wallet'
export const busWalletEventsRoute = '/bus/wallet/events'
export const busWalletPendingRoute = '/bus/wallet/pending'
export const busWalletRedistributeRoute = '/bus/wallet/redistribute'
export const busWalletSendRoute = '/bus/wallet/send'
export const busWalletPrepareFormRoute = '/bus/wallet/prepare/form'
export const busWalletPrepareRenewRoute = '/bus/wallet/prepare/renew'
export const busHostsRoute = '/bus/hosts'
export const busHostHostKeyRoute = '/bus/host/:hostKey'
export const busHostsHostKeyRoute = '/bus/hosts/:hostKey'
export const busHostsBlocklistRoute = '/bus/hosts/blocklist'
export const busHostsAllowlistRoute = '/bus/hosts/allowlist'
export const busHostPublicKeyResetlostsectorsRoute =
  '/bus/host/:publicKey/resetlostsectors'
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
export const busListObjectsRoute = '/bus/listobjects'
export const busListObjectsPrefixRoute = '/bus/listobjects/:prefix'
export const busObjectsKeyRoute = '/bus/objects/:key'
export const busObjectsRenameRoute = '/bus/objects/rename'
export const busStatsObjectsRoute = '/bus/stats/objects'
export const busSettingRoute = '/bus/setting'
export const busSettingsGougingRoute = '/bus/settings/gouging'
export const busSettingsPinnedRoute = '/bus/settings/pinned'
export const busSettingsS3Route = '/bus/settings/s3'
export const busSettingsUploadRoute = '/bus/settings/upload'
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
  network: 'mainnet' | 'zen' | 'anagami'
  version: string
  commit: string
  OS: string
  buildTime: number
  explorer: {
    enabled: boolean
    url: string
  }
}

export type BusStateParams = void
export type BusStatePayload = void
export type BusStateResponse = BuildState & {
  startTime: number
}

// autopilots

export type AutopilotsParams = void
export type AutopilotsPayload = void
export type AutopilotsResponse = Autopilot[]

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

export type TxPoolRecommendedFeeParams = void
export type TxPoolRecommendedFeePayload = void
export type TxPoolRecommendedFeeResponse = Currency

export type TxPoolTransactionsParams = void
export type TxPoolTransactionsPayload = void
export type TxPoolTransactionsResponse = Transaction[]

export type TxPoolBroadcastParams = void
export type TxPoolBroadcastPayload = Transaction[]
export type TxPoolBroadcastResponse = unknown

// wallet

export type WalletParams = void
export type WalletPayload = void
export type WalletBalance = {
  confirmed: string
  unconfirmed: string
  spendable: string
  immature: string
}
export type WalletResponse = WalletBalance & {
  scanHeight: number
  address: string
}

export type WalletEventsParams = {
  limit?: number
  offset?: number
}
export type WalletEventsPayload = void
export type WalletEventsResponse = WalletEvent[]

export type WalletPendingParams = void
export type WalletPendingPayload = void
export type WalletPendingResponse = WalletEvent[]

export type WalletSendParams = void
export type WalletSendPayload = {
  address: string
  amount: Currency
  subtractMinerFee?: boolean
  useUnconfirmed?: boolean
}
export type WalletSendResponse = TransactionID

export type WalletRedistributeParams = void
export type WalletRedistributePayload = {
  amount: Currency
  outputs: number
}
export type WalletRedistributeResponse = Transaction

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

// hosts

export type HostsParams = void
export type HostsFilterMode = 'all' | 'allowed' | 'blocked'
export type HostsUsabilityMode = 'all' | 'usable' | 'unusable'
export type HostsPayload = {
  autopilotID?: string
  filterMode: HostsFilterMode
  usabilityMode?: HostsUsabilityMode
  addressContains?: string
  keyIn?: string[]
  offset?: number
  limit?: number
  maxLastScan?: string
}
export type HostsResponse = Host[]

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

export type ObjectListParams = {
  prefix?: string
  bucket: string
  delimiter?: string
  limit?: number
  marker?: string
  sortBy?: 'name' | 'health' | 'size'
  sortDir?: 'asc' | 'desc'
  substring?: string
}
export type ObjectListPayload = void
export type ObjectListResponse = {
  hasMore: boolean
  nextMarker: string
  objects?: ObjectMetadata[]
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
export type ObjectSearchResponse = ObjectMetadata[]

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
export type SlabObjectsResponse = ObjectMetadata[]

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
  key: string
  bucket: string
  mimeType?: string
  metadata?: Record<string, string>
  disableClientSideEncryption?: boolean
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
  key: string
  bucket: string
  uploadID: string
  parts: MultipartUploadCompletePart[]
}
export type MultipartUploadCompleteResponse = void

export type MultipartUploadAbortParams = void
export type MultipartUploadAbortPayload = {
  key: string
  bucket: string
  uploadID: string
}
export type MultipartUploadAbortResponse = void

export type MultipartUploadListPartsParams = void
export type MultipartUploadListPartsPayload = {
  bucket: string
  key: string
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
  keyMarker?: string
  uploadIDMarker?: string
  limit?: number
}
export type MultipartUploadListItem = {
  bucket: string
  key: string
  encryptionKey: string
  uploadID: string
  createdAt: string
}
export type MultipartUploadListUploadsResponse = {
  hasMore: boolean
  nextMarker: string
  nextUploadIDMarker: string
  uploads?: MultipartUploadListItem[]
}

export type MultipartUploadAddPartParams = void
export type MultipartUploadAddPartPayload = {
  key: string
  bucket: string
  uploadID: string
  eTag: string
  partNumber: number
  contractSet?: string
  partialSlabs?: SlabSlice[]
  slices?: SlabSlice[]
  usedContracts?: Contract[]
}
export type MultipartUploadAddPartResponse = void

// Settings

export type SettingsGougingParams = void
export type SettingsGougingPayload = void
export type SettingsGougingResponse = SettingsGouging

export type SettingsPinnedParams = void
export type SettingsPinnedPayload = void
export type SettingsPinnedResponse = SettingsPinned

export type SettingsS3Params = void
export type SettingsS3Payload = void
export type SettingsS3Response = SettingsS3

export type SettingsUploadParams = void
export type SettingsUploadPayload = void
export type SettingsUploadResponse = SettingsUpload

export type SettingsGougingUpdateParams = void
export type SettingsGougingUpdatePayload = SettingsGouging
export type SettingsGougingUpdateResponse = void

export type SettingsPinnedUpdateParams = void
export type SettingsPinnedUpdatePayload = SettingsPinned
export type SettingsPinnedUpdateResponse = void

export type SettingsS3UpdateParams = void
export type SettingsS3UpdatePayload = SettingsS3
export type SettingsS3UpdateResponse = void

export type SettingsUploadUpdateParams = void
export type SettingsUploadUpdatePayload = SettingsUpload
export type SettingsUploadUpdateResponse = void
