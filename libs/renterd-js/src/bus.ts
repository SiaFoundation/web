import {
  AccountResetDriftParams,
  AccountResetDriftPayload,
  AccountResetDriftResponse,
  AlertsDismissParams,
  AlertsDismissPayload,
  AlertsDismissResponse,
  AlertsParams,
  AlertsPayload,
  AlertsResponse,
  BucketCreateParams,
  BucketCreatePayload,
  BucketCreateResponse,
  BucketDeleteParams,
  BucketDeletePayload,
  BucketDeleteResponse,
  BucketParams,
  BucketPayload,
  BucketPolicyUpdateParams,
  BucketPolicyUpdatePayload,
  BucketPolicyUpdateResponse,
  BucketResponse,
  BucketsParams,
  BucketsPayload,
  BucketsResponse,
  BusStateParams,
  BusStatePayload,
  BusStateResponse,
  ConsensusAcceptBlockParams,
  ConsensusAcceptBlockPayload,
  ConsensusAcceptBlockResponse,
  ConsensusStateParams,
  ConsensusStatePayload,
  ConsensusStateResponse,
  ContractAcquireParams,
  ContractAcquirePayload,
  ContractAcquireResponse,
  ContractDeleteParams,
  ContractDeletePayload,
  ContractDeleteResponse,
  ContractMetricsParams,
  ContractMetricsPayload,
  ContractMetricsResponse,
  ContractParams,
  ContractPayload,
  ContractRenewedParams,
  ContractRenewedPayload,
  ContractRenewedResponse,
  ContractResponse,
  ContractSetChurnMetricsParams,
  ContractSetChurnMetricsPayload,
  ContractSetChurnMetricsResponse,
  ContractSetMetricsParams,
  ContractSetMetricsPayload,
  ContractSetMetricsResponse,
  ContractSetUpdateParams,
  ContractSetUpdatePayload,
  ContractSetUpdateResponse,
  ContractSetsParams,
  ContractSetsPayload,
  ContractSetsResponse,
  ContractsAddParams,
  ContractsAddPayload,
  ContractsAddResponse,
  ContractsParams,
  ContractsPayload,
  ContractsReleaseParams,
  ContractsReleasePayload,
  ContractsReleaseResponse,
  ContractsResponse,
  HostInteractionParams,
  HostInteractionPayload,
  HostInteractionResponse,
  HostParams,
  HostPayload,
  HostResetLostSectorCountParams,
  HostResetLostSectorCountPayload,
  HostResetLostSectorCountResponse,
  HostResponse,
  HostsAllowlistParams,
  HostsAllowlistPayload,
  HostsAllowlistResponse,
  HostsAllowlistUpdateParams,
  HostsAllowlistUpdatePayload,
  HostsAllowlistUpdateResponse,
  HostsBlocklistParams,
  HostsBlocklistPayload,
  HostsBlocklistResponse,
  HostsBlocklistUpdateParams,
  HostsBlocklistUpdatePayload,
  HostsBlocklistUpdateResponse,
  HostsParams,
  HostsPayload,
  HostsResponse,
  HostsSearchParams,
  HostsSearchPayload,
  HostsSearchResponse,
  MultipartUploadAbortParams,
  MultipartUploadAbortPayload,
  MultipartUploadAbortResponse,
  MultipartUploadAddPartParams,
  MultipartUploadAddPartPayload,
  MultipartUploadAddPartResponse,
  MultipartUploadCompleteParams,
  MultipartUploadCompletePayload,
  MultipartUploadCompleteResponse,
  MultipartUploadCreateParams,
  MultipartUploadCreatePayload,
  MultipartUploadCreateResponse,
  MultipartUploadListPartsParams,
  MultipartUploadListPartsPayload,
  MultipartUploadListPartsResponse,
  MultipartUploadListUploadsParams,
  MultipartUploadListUploadsPayload,
  MultipartUploadListUploadsResponse,
  ObjectAddParams,
  ObjectAddPayload,
  ObjectAddResponse,
  ObjectDeleteParams,
  ObjectDeletePayload,
  ObjectDeleteResponse,
  ObjectDirectoryParams,
  ObjectDirectoryPayload,
  ObjectDirectoryResponse,
  ObjectListParams,
  ObjectListPayload,
  ObjectListResponse,
  ObjectParams,
  ObjectPayload,
  ObjectRenameParams,
  ObjectRenamePayload,
  ObjectRenameResponse,
  ObjectResponse,
  ObjectSearchParams,
  ObjectSearchPayload,
  ObjectSearchResponse,
  ObjectsStatsParams,
  ObjectsStatsPayload,
  ObjectsStatsResponse,
  Setting,
  SettingParams,
  SettingPayload,
  SettingResponse,
  SettingUpdateParams,
  SettingUpdatePayload,
  SettingUpdateResponse,
  SettingsParams,
  SettingsPayload,
  SettingsResponse,
  SlabObjectsParams,
  SlabObjectsPayload,
  SlabObjectsResponse,
  SyncerAddressParams,
  SyncerAddressPayload,
  SyncerAddressResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  SyncerPeersParams,
  SyncerPeersPayload,
  SyncerPeersResponse,
  TxPoolBroadcastParams,
  TxPoolBroadcastPayload,
  TxPoolBroadcastResponse,
  TxPoolFeeParams,
  TxPoolFeePayload,
  TxPoolFeeResponse,
  TxPoolTransactionsParams,
  TxPoolTransactionsPayload,
  TxPoolTransactionsResponse,
  WalletAddressesParams,
  WalletAddressesPayload,
  WalletAddressesResponse,
  WalletDiscardParams,
  WalletDiscardPayload,
  WalletDiscardResponse,
  WalletFundParams,
  WalletFundPayload,
  WalletFundResponse,
  WalletMetricsParams,
  WalletMetricsPayload,
  WalletMetricsResponse,
  WalletParams,
  WalletPayload,
  WalletPendingParams,
  WalletPendingPayload,
  WalletPendingResponse,
  WalletPrepareFormParams,
  WalletPrepareFormPayload,
  WalletPrepareFormResponse,
  WalletPrepareRenewParams,
  WalletPrepareRenewPayload,
  WalletPrepareRenewResponse,
  WalletRedistributeParams,
  WalletRedistributePayload,
  WalletRedistributeResponse,
  WalletResponse,
  WalletSignParams,
  WalletSignPayload,
  WalletSignResponse,
  WalletTransactionsParams,
  WalletTransactionsPayload,
  WalletTransactionsResponse,
  WalletUtxoParams,
  WalletUtxoPayload,
  WalletUtxoResponse,
  busAccountIdResetdriftRoute,
  busAlertsDismissRoute,
  busAlertsRoute,
  busBucketNamePolicyRoute,
  busBucketNameRoute,
  busBucketsRoute,
  busConsensusAcceptblockRoute,
  busConsensusStateRoute,
  busContractIdAcquireRoute,
  busContractIdNewRoute,
  busContractIdReleaseRoute,
  busContractIdRenewedRoute,
  busContractIdRoute,
  busContractsRoute,
  busContractsSetsRoute,
  busContractsSetsSetRoute,
  busHostHostKeyRoute,
  busHostPublicKeyResetlostsectorsRoute,
  busHostsAllowlistRoute,
  busHostsBlocklistRoute,
  busHostsHostKeyRoute,
  busHostsRoute,
  busMetricChurnRoute,
  busMetricContractRoute,
  busMetricContractsetRoute,
  busMetricWalletRoute,
  busMultipartAbortRoute,
  busMultipartCompleteRoute,
  busMultipartCreateRoute,
  busMultipartListpartsRoute,
  busMultipartListuploadsRoute,
  busMultipartPartRoute,
  busObjectsKeyRoute,
  busObjectsListRoute,
  busObjectsRenameRoute,
  busSearchHostsRoute,
  busSearchObjectsRoute,
  busSettingKeyRoute,
  busSettingsRoute,
  busSlabKeyObjectsRoute,
  busStateRoute,
  busStatsObjectsRoute,
  busSyncerAddrRoute,
  busSyncerConnectRoute,
  busSyncerPeersRoute,
  busTxpoolBroadcastRoute,
  busTxpoolFeeRoute,
  busTxpoolTransactionsRoute,
  busWalletAddressesRoute,
  busWalletDiscardRoute,
  busWalletFundRoute,
  busWalletOutputsRoute,
  busWalletPendingRoute,
  busWalletPrepareFormRoute,
  busWalletRedistributeRoute,
  busWalletRoute,
  busWalletSignRoute,
  busWalletTransactionsRoute,
} from '@siafoundation/renterd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Bus({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    busState: buildRequestHandler<
      BusStateParams,
      BusStatePayload,
      BusStateResponse
    >(axios, 'get', busStateRoute),
    consensusState: buildRequestHandler<
      ConsensusStateParams,
      ConsensusStatePayload,
      ConsensusStateResponse
    >(axios, 'get', busConsensusStateRoute),
    consensusAcceptBlock: buildRequestHandler<
      ConsensusAcceptBlockParams,
      ConsensusAcceptBlockPayload,
      ConsensusAcceptBlockResponse
    >(axios, 'post', busConsensusAcceptblockRoute),
    syncerPeers: buildRequestHandler<
      SyncerPeersParams,
      SyncerPeersPayload,
      SyncerPeersResponse
    >(axios, 'get', busSyncerPeersRoute),
    syncerConnect: buildRequestHandler<
      SyncerConnectParams,
      SyncerConnectPayload,
      SyncerConnectResponse
    >(axios, 'post', busSyncerConnectRoute),
    syncerAddress: buildRequestHandler<
      SyncerAddressParams,
      SyncerAddressPayload,
      SyncerAddressResponse
    >(axios, 'get', busSyncerAddrRoute),
    txPoolFee: buildRequestHandler<
      TxPoolFeeParams,
      TxPoolFeePayload,
      TxPoolFeeResponse
    >(axios, 'get', busTxpoolFeeRoute),
    txPoolTransactions: buildRequestHandler<
      TxPoolTransactionsParams,
      TxPoolTransactionsPayload,
      TxPoolTransactionsResponse
    >(axios, 'get', busTxpoolTransactionsRoute),
    txPoolBroadcast: buildRequestHandler<
      TxPoolBroadcastParams,
      TxPoolBroadcastPayload,
      TxPoolBroadcastResponse
    >(axios, 'post', busTxpoolBroadcastRoute),
    wallet: buildRequestHandler<WalletParams, WalletPayload, WalletResponse>(
      axios,
      'get',
      busWalletRoute
    ),
    walletAddresses: buildRequestHandler<
      WalletAddressesParams,
      WalletAddressesPayload,
      WalletAddressesResponse
    >(axios, 'get', busWalletAddressesRoute),
    walletTransactions: buildRequestHandler<
      WalletTransactionsParams,
      WalletTransactionsPayload,
      WalletTransactionsResponse
    >(axios, 'get', busWalletTransactionsRoute),
    walletUtxos: buildRequestHandler<
      WalletUtxoParams,
      WalletUtxoPayload,
      WalletUtxoResponse
    >(axios, 'get', busWalletOutputsRoute),
    walletFund: buildRequestHandler<
      WalletFundParams,
      WalletFundPayload,
      WalletFundResponse
    >(axios, 'post', busWalletFundRoute),
    walletSign: buildRequestHandler<
      WalletSignParams,
      WalletSignPayload,
      WalletSignResponse
    >(axios, 'post', busWalletSignRoute),
    walletRedistribute: buildRequestHandler<
      WalletRedistributeParams,
      WalletRedistributePayload,
      WalletRedistributeResponse
    >(axios, 'post', busWalletRedistributeRoute),
    walletDiscard: buildRequestHandler<
      WalletDiscardParams,
      WalletDiscardPayload,
      WalletDiscardResponse
    >(axios, 'post', busWalletDiscardRoute),
    walletPrepareForm: buildRequestHandler<
      WalletPrepareFormParams,
      WalletPrepareFormPayload,
      WalletPrepareFormResponse
    >(axios, 'post', busWalletPrepareFormRoute),
    walletPrepareRenew: buildRequestHandler<
      WalletPrepareRenewParams,
      WalletPrepareRenewPayload,
      WalletPrepareRenewResponse
    >(axios, 'post', '/bus/wallet/prepare/form'),
    walletPending: buildRequestHandler<
      WalletPendingParams,
      WalletPendingPayload,
      WalletPendingResponse
    >(axios, 'get', busWalletPendingRoute),
    hosts: buildRequestHandler<HostsParams, HostsPayload, HostsResponse>(
      axios,
      'get',
      busHostsRoute
    ),
    hostsSearch: buildRequestHandler<
      HostsSearchParams,
      HostsSearchPayload,
      HostsSearchResponse
    >(axios, 'post', busSearchHostsRoute),
    host: buildRequestHandler<HostParams, HostPayload, HostResponse>(
      axios,
      'get',
      busHostHostKeyRoute
    ),
    hostsInteractionAdd: buildRequestHandler<
      HostInteractionParams,
      HostInteractionPayload,
      HostInteractionResponse
    >(axios, 'post', busHostsHostKeyRoute),
    hostsBlocklist: buildRequestHandler<
      HostsBlocklistParams,
      HostsBlocklistPayload,
      HostsBlocklistResponse
    >(axios, 'get', busHostsBlocklistRoute),
    hostsAllowlist: buildRequestHandler<
      HostsAllowlistParams,
      HostsAllowlistPayload,
      HostsAllowlistResponse
    >(axios, 'get', busHostsAllowlistRoute),
    hostsAllowlistUpdate: buildRequestHandler<
      HostsAllowlistUpdateParams,
      HostsAllowlistUpdatePayload,
      HostsAllowlistUpdateResponse
    >(axios, 'put', busHostsAllowlistRoute),
    hostsBlocklistUpdate: buildRequestHandler<
      HostsBlocklistUpdateParams,
      HostsBlocklistUpdatePayload,
      HostsBlocklistUpdateResponse
    >(axios, 'put', busHostsBlocklistRoute),
    hostResetLostSectorCount: buildRequestHandler<
      HostResetLostSectorCountParams,
      HostResetLostSectorCountPayload,
      HostResetLostSectorCountResponse
    >(axios, 'post', busHostPublicKeyResetlostsectorsRoute),
    accountResetDrift: buildRequestHandler<
      AccountResetDriftParams,
      AccountResetDriftPayload,
      AccountResetDriftResponse
    >(axios, 'post', busAccountIdResetdriftRoute),
    contracts: buildRequestHandler<
      ContractsParams,
      ContractsPayload,
      ContractsResponse
    >(axios, 'get', busContractsRoute),
    contractsAcquire: buildRequestHandler<
      ContractAcquireParams,
      ContractAcquirePayload,
      ContractAcquireResponse
    >(axios, 'post', busContractIdAcquireRoute),
    contractsRelease: buildRequestHandler<
      ContractsReleaseParams,
      ContractsReleasePayload,
      ContractsReleaseResponse
    >(axios, 'post', busContractIdReleaseRoute),
    contract: buildRequestHandler<
      ContractParams,
      ContractPayload,
      ContractResponse
    >(axios, 'get', busContractIdRoute),
    contractAdd: buildRequestHandler<
      ContractsAddParams,
      ContractsAddPayload,
      ContractsAddResponse
    >(axios, 'post', busContractIdNewRoute),
    contractRenew: buildRequestHandler<
      ContractRenewedParams,
      ContractRenewedPayload,
      ContractRenewedResponse
    >(axios, 'post', busContractIdRenewedRoute),
    contractDelete: buildRequestHandler<
      ContractDeleteParams,
      ContractDeletePayload,
      ContractDeleteResponse
    >(axios, 'delete', busContractIdRoute),
    contractSets: buildRequestHandler<
      ContractSetsParams,
      ContractSetsPayload,
      ContractSetsResponse
    >(axios, 'get', busContractsSetsRoute),
    contractSetUpdate: buildRequestHandler<
      ContractSetUpdateParams,
      ContractSetUpdatePayload,
      ContractSetUpdateResponse
    >(axios, 'put', busContractsSetsSetRoute),
    buckets: buildRequestHandler<
      BucketsParams,
      BucketsPayload,
      BucketsResponse
    >(axios, 'get', busBucketsRoute),
    bucket: buildRequestHandler<BucketParams, BucketPayload, BucketResponse>(
      axios,
      'get',
      busBucketNameRoute
    ),
    bucketCreate: buildRequestHandler<
      BucketCreateParams,
      BucketCreatePayload,
      BucketCreateResponse
    >(axios, 'post', busBucketsRoute),
    bucketPolicyUpdate: buildRequestHandler<
      BucketPolicyUpdateParams,
      BucketPolicyUpdatePayload,
      BucketPolicyUpdateResponse
    >(axios, 'put', busBucketNamePolicyRoute),
    bucketDelete: buildRequestHandler<
      BucketDeleteParams,
      BucketDeletePayload,
      BucketDeleteResponse
    >(axios, 'delete', busBucketNameRoute),
    objectDirectory: buildRequestHandler<
      ObjectDirectoryParams,
      ObjectDirectoryPayload,
      ObjectDirectoryResponse
    >(axios, 'get', busObjectsKeyRoute),
    objectList: buildRequestHandler<
      ObjectListParams,
      ObjectListPayload,
      ObjectListResponse
    >(axios, 'post', busObjectsListRoute),
    object: buildRequestHandler<ObjectParams, ObjectPayload, ObjectResponse>(
      axios,
      'get',
      busObjectsKeyRoute
    ),
    objectSearch: buildRequestHandler<
      ObjectSearchParams,
      ObjectSearchPayload,
      ObjectSearchResponse
    >(axios, 'get', busSearchObjectsRoute),
    objectAdd: buildRequestHandler<
      ObjectAddParams,
      ObjectAddPayload,
      ObjectAddResponse
    >(axios, 'put', busObjectsKeyRoute),
    objectRename: buildRequestHandler<
      ObjectRenameParams,
      ObjectRenamePayload,
      ObjectRenameResponse
    >(axios, 'post', busObjectsRenameRoute),
    objectDelete: buildRequestHandler<
      ObjectDeleteParams,
      ObjectDeletePayload,
      ObjectDeleteResponse
    >(axios, 'delete', busObjectsKeyRoute),
    objectStats: buildRequestHandler<
      ObjectsStatsParams,
      ObjectsStatsPayload,
      ObjectsStatsResponse
    >(axios, 'get', busStatsObjectsRoute),
    settings: buildRequestHandler<
      SettingsParams,
      SettingsPayload,
      SettingsResponse
    >(axios, 'get', busSettingsRoute),
    setting: buildRequestHandler<
      SettingParams,
      SettingPayload,
      SettingResponse<Setting>
    >(axios, 'get', busSettingKeyRoute),
    settingUpdate: buildRequestHandler<
      SettingUpdateParams,
      SettingUpdatePayload,
      SettingUpdateResponse
    >(axios, 'put', busSettingKeyRoute),
    alerts: buildRequestHandler<AlertsParams, AlertsPayload, AlertsResponse>(
      axios,
      'get',
      busAlertsRoute
    ),
    alertsDismiss: buildRequestHandler<
      AlertsDismissParams,
      AlertsDismissPayload,
      AlertsDismissResponse
    >(axios, 'post', busAlertsDismissRoute),
    slabObjects: buildRequestHandler<
      SlabObjectsParams,
      SlabObjectsPayload,
      SlabObjectsResponse
    >(axios, 'get', busSlabKeyObjectsRoute),
    contractMetrics: buildRequestHandler<
      ContractMetricsParams,
      ContractMetricsPayload,
      ContractMetricsResponse
    >(axios, 'get', busMetricContractRoute),
    contractSetMetrics: buildRequestHandler<
      ContractSetMetricsParams,
      ContractSetMetricsPayload,
      ContractSetMetricsResponse
    >(axios, 'get', busMetricContractsetRoute),
    contractSetChurnMetrics: buildRequestHandler<
      ContractSetChurnMetricsParams,
      ContractSetChurnMetricsPayload,
      ContractSetChurnMetricsResponse
    >(axios, 'get', busMetricChurnRoute),
    walletMetrics: buildRequestHandler<
      WalletMetricsParams,
      WalletMetricsPayload,
      WalletMetricsResponse
    >(axios, 'get', busMetricWalletRoute),
    multipartUploadCreate: buildRequestHandler<
      MultipartUploadCreateParams,
      MultipartUploadCreatePayload,
      MultipartUploadCreateResponse
    >(axios, 'post', busMultipartCreateRoute),
    multipartUploadComplete: buildRequestHandler<
      MultipartUploadCompleteParams,
      MultipartUploadCompletePayload,
      MultipartUploadCompleteResponse
    >(axios, 'post', busMultipartCompleteRoute),
    multipartUploadAbort: buildRequestHandler<
      MultipartUploadAbortParams,
      MultipartUploadAbortPayload,
      MultipartUploadAbortResponse
    >(axios, 'post', busMultipartAbortRoute),
    multipartUploadListParts: buildRequestHandler<
      MultipartUploadListPartsParams,
      MultipartUploadListPartsPayload,
      MultipartUploadListPartsResponse
    >(axios, 'post', busMultipartListpartsRoute),
    multipartUploadListUploads: buildRequestHandler<
      MultipartUploadListUploadsParams,
      MultipartUploadListUploadsPayload,
      MultipartUploadListUploadsResponse
    >(axios, 'post', busMultipartListuploadsRoute),
    multipartUploadAddPart: buildRequestHandler<
      MultipartUploadAddPartParams,
      MultipartUploadAddPartPayload,
      MultipartUploadAddPartResponse
    >(axios, 'post', busMultipartPartRoute),
  }
}
