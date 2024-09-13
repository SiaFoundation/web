import {
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
  ContractSizeParams,
  ContractSizePayload,
  ContractSizeResponse,
  ContractsAddParams,
  ContractsAddPayload,
  ContractsAddResponse,
  ContractsParams,
  ContractsPayload,
  ContractsPrunableParams,
  ContractsPrunablePayload,
  ContractsPrunableResponse,
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
  ObjectListParams,
  ObjectListPayload,
  ObjectListResponse,
  ObjectParams,
  ObjectPayload,
  ObjectRenameParams,
  ObjectRenamePayload,
  ObjectRenameResponse,
  ObjectResponse,
  ObjectsStatsParams,
  ObjectsStatsPayload,
  ObjectsStatsResponse,
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
  TxPoolRecommendedFeeParams,
  TxPoolRecommendedFeePayload,
  TxPoolRecommendedFeeResponse,
  TxPoolTransactionsParams,
  TxPoolTransactionsPayload,
  TxPoolTransactionsResponse,
  WalletMetricsParams,
  WalletMetricsPayload,
  WalletMetricsResponse,
  WalletParams,
  WalletPayload,
  WalletEventsParams,
  WalletEventsPayload,
  WalletEventsResponse,
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
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
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
  busContractIdSize,
  busContractsPrunableRoute,
  busContractsRoute,
  busContractsSetsRoute,
  busContractsSetsSetRoute,
  busHostHostKeyRoute,
  busHostPublicKeyResetlostsectorsRoute,
  busHostsAllowlistRoute,
  busHostsBlocklistRoute,
  busHostsHostKeyRoute,
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
  busObjectsRenameRoute,
  busHostsRoute,
  busSlabKeyObjectsRoute,
  busStateRoute,
  busStatsObjectsRoute,
  busSyncerAddrRoute,
  busSyncerConnectRoute,
  busSyncerPeersRoute,
  busTxpoolBroadcastRoute,
  busTxpoolRecommendedFeeRoute,
  busTxpoolTransactionsRoute,
  busWalletPendingRoute,
  busWalletPrepareFormRoute,
  busWalletRedistributeRoute,
  busWalletRoute,
  busWalletSendRoute,
  busAutopilotsRoute,
  AutopilotsParams,
  AutopilotsPayload,
  AutopilotsResponse,
  busWalletEventsRoute,
  busListObjectsPrefixRoute,
  SettingsGougingParams,
  SettingsGougingPayload,
  SettingsGougingResponse,
  SettingsGougingUpdateParams,
  SettingsGougingUpdatePayload,
  SettingsGougingUpdateResponse,
  SettingsPinnedParams,
  SettingsPinnedPayload,
  SettingsPinnedResponse,
  SettingsPinnedUpdateParams,
  SettingsPinnedUpdatePayload,
  SettingsPinnedUpdateResponse,
  SettingsS3Params,
  SettingsS3Payload,
  SettingsS3Response,
  SettingsS3UpdateParams,
  SettingsS3UpdatePayload,
  SettingsS3UpdateResponse,
  SettingsUploadParams,
  SettingsUploadPayload,
  SettingsUploadResponse,
  SettingsUploadUpdateParams,
  SettingsUploadUpdatePayload,
  SettingsUploadUpdateResponse,
  busSettingsGougingRoute,
  busSettingsPinnedRoute,
  busSettingsS3Route,
  busSettingsUploadRoute,
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
    autopilots: buildRequestHandler<
      AutopilotsParams,
      AutopilotsPayload,
      AutopilotsResponse
    >(axios, 'get', busAutopilotsRoute),
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
      TxPoolRecommendedFeeParams,
      TxPoolRecommendedFeePayload,
      TxPoolRecommendedFeeResponse
    >(axios, 'get', busTxpoolRecommendedFeeRoute),
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
    walletEvents: buildRequestHandler<
      WalletEventsParams,
      WalletEventsPayload,
      WalletEventsResponse
    >(axios, 'get', busWalletEventsRoute),
    walletPending: buildRequestHandler<
      WalletPendingParams,
      WalletPendingPayload,
      WalletPendingResponse
    >(axios, 'get', busWalletPendingRoute),
    walletSend: buildRequestHandler<
      WalletSendParams,
      WalletSendPayload,
      WalletSendResponse
    >(axios, 'post', busWalletSendRoute),
    walletRedistribute: buildRequestHandler<
      WalletRedistributeParams,
      WalletRedistributePayload,
      WalletRedistributeResponse
    >(axios, 'post', busWalletRedistributeRoute),
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
    hosts: buildRequestHandler<HostsParams, HostsPayload, HostsResponse>(
      axios,
      'post',
      busHostsRoute
    ),
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
    contractSize: buildRequestHandler<
      ContractSizeParams,
      ContractSizePayload,
      ContractSizeResponse
    >(axios, 'get', busContractIdSize),
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
    contractsPrunable: buildRequestHandler<
      ContractsPrunableParams,
      ContractsPrunablePayload,
      ContractsPrunableResponse
    >(axios, 'get', busContractsPrunableRoute),
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
    objectList: buildRequestHandler<
      ObjectListParams,
      ObjectListPayload,
      ObjectListResponse
    >(axios, 'get', busListObjectsPrefixRoute),
    object: buildRequestHandler<ObjectParams, ObjectPayload, ObjectResponse>(
      axios,
      'get',
      busObjectsKeyRoute
    ),
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
    settingsGouging: buildRequestHandler<
      SettingsGougingParams,
      SettingsGougingPayload,
      SettingsGougingResponse
    >(axios, 'get', busSettingsGougingRoute),
    settingsPinned: buildRequestHandler<
      SettingsPinnedParams,
      SettingsPinnedPayload,
      SettingsPinnedResponse
    >(axios, 'get', busSettingsPinnedRoute),
    settingsS3: buildRequestHandler<
      SettingsS3Params,
      SettingsS3Payload,
      SettingsS3Response
    >(axios, 'get', busSettingsS3Route),
    settingsUpload: buildRequestHandler<
      SettingsUploadParams,
      SettingsUploadPayload,
      SettingsUploadResponse
    >(axios, 'get', busSettingsUploadRoute),
    settingsGougingUpdate: buildRequestHandler<
      SettingsGougingUpdateParams,
      SettingsGougingUpdatePayload,
      SettingsGougingUpdateResponse
    >(axios, 'put', busSettingsGougingRoute),
    settingsPinnedUpdate: buildRequestHandler<
      SettingsPinnedUpdateParams,
      SettingsPinnedUpdatePayload,
      SettingsPinnedUpdateResponse
    >(axios, 'put', busSettingsPinnedRoute),
    settingsS3Update: buildRequestHandler<
      SettingsS3UpdateParams,
      SettingsS3UpdatePayload,
      SettingsS3UpdateResponse
    >(axios, 'put', busSettingsS3Route),
    settingsUploadUpdate: buildRequestHandler<
      SettingsUploadUpdateParams,
      SettingsUploadUpdatePayload,
      SettingsUploadUpdateResponse
    >(axios, 'put', busSettingsUploadRoute),
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
