import {
  type AccountResetDriftParams,
  type AccountResetDriftPayload,
  type AccountResetDriftResponse,
  type AlertsDismissParams,
  type AlertsDismissPayload,
  type AlertsDismissResponse,
  type AlertsParams,
  type AlertsPayload,
  type AlertsResponse,
  type BucketCreateParams,
  type BucketCreatePayload,
  type BucketCreateResponse,
  type BucketDeleteParams,
  type BucketDeletePayload,
  type BucketDeleteResponse,
  type BucketParams,
  type BucketPayload,
  type BucketPolicyUpdateParams,
  type BucketPolicyUpdatePayload,
  type BucketPolicyUpdateResponse,
  type BucketResponse,
  type BucketsParams,
  type BucketsPayload,
  type BucketsResponse,
  type BusStateParams,
  type BusStatePayload,
  type BusStateResponse,
  type ConsensusAcceptBlockParams,
  type ConsensusAcceptBlockPayload,
  type ConsensusAcceptBlockResponse,
  type ConsensusStateParams,
  type ConsensusStatePayload,
  type ConsensusStateResponse,
  type ContractAcquireParams,
  type ContractAcquirePayload,
  type ContractAcquireResponse,
  type ContractDeleteParams,
  type ContractDeletePayload,
  type ContractDeleteResponse,
  type ContractMetricsParams,
  type ContractMetricsPayload,
  type ContractMetricsResponse,
  type ContractParams,
  type ContractPayload,
  type ContractRenewedParams,
  type ContractRenewedPayload,
  type ContractRenewedResponse,
  type ContractResponse,
  type ContractSetChurnMetricsParams,
  type ContractSetChurnMetricsPayload,
  type ContractSetChurnMetricsResponse,
  type ContractSetMetricsParams,
  type ContractSetMetricsPayload,
  type ContractSetMetricsResponse,
  type ContractSetSettings,
  type ContractSetUpdateParams,
  type ContractSetUpdatePayload,
  type ContractSetUpdateResponse,
  type ContractSetsParams,
  type ContractSetsPayload,
  type ContractSetsResponse,
  type ContractSizeParams,
  type ContractSizePayload,
  type ContractSizeResponse,
  type ContractsAddParams,
  type ContractsAddPayload,
  type ContractsAddResponse,
  type ContractsParams,
  type ContractsPayload,
  type ContractsPrunableParams,
  type ContractsPrunablePayload,
  type ContractsPrunableResponse,
  type ContractsReleaseParams,
  type ContractsReleasePayload,
  type ContractsReleaseResponse,
  type ContractsResponse,
  type GougingSettings,
  type HostInteractionParams,
  type HostInteractionPayload,
  type HostInteractionResponse,
  type HostParams,
  type HostPayload,
  type HostResetLostSectorCountParams,
  type HostResetLostSectorCountPayload,
  type HostResetLostSectorCountResponse,
  type HostResponse,
  type HostsAllowlistParams,
  type HostsAllowlistPayload,
  type HostsAllowlistResponse,
  type HostsAllowlistUpdateParams,
  type HostsAllowlistUpdatePayload,
  type HostsAllowlistUpdateResponse,
  type HostsBlocklistParams,
  type HostsBlocklistPayload,
  type HostsBlocklistResponse,
  type HostsBlocklistUpdateParams,
  type HostsBlocklistUpdatePayload,
  type HostsBlocklistUpdateResponse,
  type HostsParams,
  type HostsPayload,
  type HostsResponse,
  type HostsSearchParams,
  type HostsSearchPayload,
  type HostsSearchResponse,
  type MultipartUploadAbortParams,
  type MultipartUploadAbortPayload,
  type MultipartUploadAbortResponse,
  type MultipartUploadAddPartParams,
  type MultipartUploadAddPartPayload,
  type MultipartUploadAddPartResponse,
  type MultipartUploadCompleteParams,
  type MultipartUploadCompletePayload,
  type MultipartUploadCompleteResponse,
  type MultipartUploadCreateParams,
  type MultipartUploadCreatePayload,
  type MultipartUploadCreateResponse,
  type MultipartUploadListPartsParams,
  type MultipartUploadListPartsPayload,
  type MultipartUploadListPartsResponse,
  type MultipartUploadListUploadsParams,
  type MultipartUploadListUploadsPayload,
  type MultipartUploadListUploadsResponse,
  type ObjectAddParams,
  type ObjectAddPayload,
  type ObjectAddResponse,
  type ObjectDeleteParams,
  type ObjectDeletePayload,
  type ObjectDeleteResponse,
  type ObjectDirectoryParams,
  type ObjectDirectoryPayload,
  type ObjectDirectoryResponse,
  type ObjectListParams,
  type ObjectListPayload,
  type ObjectListResponse,
  type ObjectParams,
  type ObjectPayload,
  type ObjectRenameParams,
  type ObjectRenamePayload,
  type ObjectRenameResponse,
  type ObjectResponse,
  type ObjectSearchParams,
  type ObjectSearchPayload,
  type ObjectSearchResponse,
  type ObjectsStatsParams,
  type ObjectsStatsPayload,
  type ObjectsStatsResponse,
  type RedundancySettings,
  type S3AuthenticationSettings,
  type SettingParams,
  type SettingPayload,
  type SettingResponse,
  type SettingUpdateParams,
  type SettingUpdatePayload,
  type SettingUpdateResponse,
  type SettingsParams,
  type SettingsPayload,
  type SettingsResponse,
  type SlabObjectsParams,
  type SlabObjectsPayload,
  type SlabObjectsResponse,
  type SyncerAddressParams,
  type SyncerAddressPayload,
  type SyncerAddressResponse,
  type SyncerConnectParams,
  type SyncerConnectPayload,
  type SyncerConnectResponse,
  type SyncerPeersParams,
  type SyncerPeersPayload,
  type SyncerPeersResponse,
  type TxPoolBroadcastParams,
  type TxPoolBroadcastPayload,
  type TxPoolBroadcastResponse,
  type TxPoolFeeParams,
  type TxPoolFeePayload,
  type TxPoolFeeResponse,
  type TxPoolTransactionsParams,
  type TxPoolTransactionsPayload,
  type TxPoolTransactionsResponse,
  type UploadPackingSettings,
  type WalletAddressesParams,
  type WalletAddressesPayload,
  type WalletAddressesResponse,
  type WalletDiscardParams,
  type WalletDiscardPayload,
  type WalletDiscardResponse,
  type WalletFundParams,
  type WalletFundPayload,
  type WalletFundResponse,
  type WalletMetricsParams,
  type WalletMetricsPayload,
  type WalletMetricsResponse,
  type WalletParams,
  type WalletPayload,
  type WalletPendingParams,
  type WalletPendingPayload,
  type WalletPendingResponse,
  type WalletPrepareFormParams,
  type WalletPrepareFormPayload,
  type WalletPrepareFormResponse,
  type WalletPrepareRenewParams,
  type WalletPrepareRenewPayload,
  type WalletPrepareRenewResponse,
  type WalletRedistributeParams,
  type WalletRedistributePayload,
  type WalletRedistributeResponse,
  type WalletResponse,
  type WalletSignParams,
  type WalletSignPayload,
  type WalletSignResponse,
  type WalletTransactionsParams,
  type WalletTransactionsPayload,
  type WalletTransactionsResponse,
  type WalletUtxoParams,
  type WalletUtxoPayload,
  type WalletUtxoResponse,
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
import type { AxiosRequestConfig } from 'axios'

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
      busWalletRoute,
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
      busHostsRoute,
    ),
    hostsSearch: buildRequestHandler<
      HostsSearchParams,
      HostsSearchPayload,
      HostsSearchResponse
    >(axios, 'post', busSearchHostsRoute),
    host: buildRequestHandler<HostParams, HostPayload, HostResponse>(
      axios,
      'get',
      busHostHostKeyRoute,
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
      busBucketNameRoute,
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
      busObjectsKeyRoute,
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
    setting: function setting<Data extends Record<string, unknown>>({
      params,
      config,
    }: {
      params: SettingParams
      config?: AxiosRequestConfig<SettingPayload>
    }) {
      return buildRequestHandler<
        SettingParams,
        SettingPayload,
        SettingResponse<Data>
      >(
        axios,
        'get',
        busSettingKeyRoute,
      )({ params, config })
    },
    settingGouging: ({ config }: { config?: AxiosRequestConfig } = {}) => {
      return buildRequestHandler<
        SettingParams,
        SettingPayload,
        SettingResponse<GougingSettings>
      >(
        axios,
        'get',
        busSettingKeyRoute,
      )({
        params: {
          key: 'gouging',
        },
        config,
      })
    },
    settingRedundancy: ({ config }: { config?: AxiosRequestConfig } = {}) => {
      return buildRequestHandler<
        SettingParams,
        SettingPayload,
        SettingResponse<RedundancySettings>
      >(
        axios,
        'get',
        busSettingKeyRoute,
      )({
        params: {
          key: 'redundancy',
        },
        config,
      })
    },
    settingContractSet: ({ config }: { config?: AxiosRequestConfig } = {}) => {
      return buildRequestHandler<
        SettingParams,
        SettingPayload,
        SettingResponse<ContractSetSettings>
      >(
        axios,
        'get',
        busSettingKeyRoute,
      )({
        params: {
          key: 'contractset',
        },
        config,
      })
    },
    settingUploadPacking: ({
      config,
    }: { config?: AxiosRequestConfig } = {}) => {
      return buildRequestHandler<
        SettingParams,
        SettingPayload,
        SettingResponse<UploadPackingSettings>
      >(
        axios,
        'get',
        busSettingKeyRoute,
      )({
        params: {
          key: 'uploadpacking',
        },
        config,
      })
    },
    settingS3Authentication: ({
      config,
    }: { config?: AxiosRequestConfig } = {}) => {
      return buildRequestHandler<
        SettingParams,
        SettingPayload,
        SettingResponse<S3AuthenticationSettings>
      >(
        axios,
        'get',
        busSettingKeyRoute,
      )({
        params: {
          key: 's3authentication',
        },
        config,
      })
    },
    settingUpdate: buildRequestHandler<
      SettingUpdateParams,
      SettingUpdatePayload,
      SettingUpdateResponse
    >(axios, 'put', busSettingKeyRoute),
    alerts: buildRequestHandler<AlertsParams, AlertsPayload, AlertsResponse>(
      axios,
      'get',
      busAlertsRoute,
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
