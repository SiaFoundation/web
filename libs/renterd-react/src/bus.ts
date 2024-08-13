import useSWR from 'swr'
import {
  useDeleteFunc,
  useGetSwr,
  usePostSwr,
  usePutFunc,
  usePostFunc,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
  delay,
} from '@siafoundation/react-core'
import {
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
} from '@siafoundation/units'
import {
  AccountResetDriftParams,
  AccountResetDriftPayload,
  AccountResetDriftResponse,
  AlertsDismissParams,
  AlertsDismissPayload,
  AlertsDismissResponse,
  AlertsParams,
  AlertsResponse,
  BucketCreateParams,
  BucketCreatePayload,
  BucketCreateResponse,
  BucketDeleteParams,
  BucketDeletePayload,
  BucketDeleteResponse,
  BucketParams,
  BucketPolicyUpdateParams,
  BucketPolicyUpdatePayload,
  BucketPolicyUpdateResponse,
  BucketResponse,
  BucketsParams,
  BucketsResponse,
  BusStateParams,
  BusStateResponse,
  ConsensusAcceptBlockParams,
  ConsensusAcceptBlockPayload,
  ConsensusAcceptBlockResponse,
  ConsensusStateParams,
  ConsensusStateResponse,
  ContractAcquireParams,
  ContractAcquirePayload,
  ContractAcquireResponse,
  ContractDeleteParams,
  ContractDeletePayload,
  ContractDeleteResponse,
  ContractMetricsParams,
  ContractMetricsResponse,
  ContractParams,
  ContractRenewedParams,
  ContractRenewedPayload,
  ContractRenewedResponse,
  ContractResponse,
  ContractSetChurnMetricsParams,
  ContractSetChurnMetricsResponse,
  ContractSetMetricsParams,
  ContractSetMetricsResponse,
  ContractSetUpdateParams,
  ContractSetUpdatePayload,
  ContractSetUpdateResponse,
  ContractSetsParams,
  ContractSetsResponse,
  ContractsAddParams,
  ContractsAddPayload,
  ContractsAddResponse,
  ContractsParams,
  ContractsReleaseParams,
  ContractsReleasePayload,
  ContractsReleaseResponse,
  ContractsResponse,
  HostInteractionParams,
  HostInteractionPayload,
  HostInteractionResponse,
  HostParams,
  HostResetLostSectorCountParams,
  HostResetLostSectorCountPayload,
  HostResetLostSectorCountResponse,
  HostResponse,
  HostsAllowlistParams,
  HostsAllowlistResponse,
  HostsAllowlistUpdateParams,
  HostsAllowlistUpdatePayload,
  HostsAllowlistUpdateResponse,
  HostsBlocklistParams,
  HostsBlocklistResponse,
  HostsBlocklistUpdateParams,
  HostsBlocklistUpdatePayload,
  HostsBlocklistUpdateResponse,
  HostsParams,
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
  ObjectDirectoryResponse,
  ObjectListParams,
  ObjectListPayload,
  ObjectListResponse,
  ObjectParams,
  ObjectRenameParams,
  ObjectRenamePayload,
  ObjectRenameResponse,
  ObjectResponse,
  ObjectSearchParams,
  ObjectSearchResponse,
  ObjectsStatsParams,
  ObjectsStatsResponse,
  SettingParams,
  SettingResponse,
  SettingUpdateParams,
  SettingUpdatePayload,
  SettingUpdateResponse,
  SettingsParams,
  SettingsResponse,
  SlabObjectsParams,
  SlabObjectsResponse,
  SyncerAddressParams,
  SyncerAddressResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  SyncerPeersParams,
  SyncerPeersResponse,
  TxPoolBroadcastParams,
  TxPoolBroadcastPayload,
  TxPoolBroadcastResponse,
  TxPoolFeeParams,
  TxPoolFeeResponse,
  TxPoolTransactionsParams,
  TxPoolTransactionsResponse,
  WalletAddressesParams,
  WalletAddressesResponse,
  WalletDiscardParams,
  WalletDiscardPayload,
  WalletDiscardResponse,
  WalletFundParams,
  WalletFundPayload,
  WalletFundResponse,
  WalletMetricsParams,
  WalletMetricsResponse,
  WalletParams,
  WalletPendingParams,
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
  WalletTransactionsResponse,
  WalletUtxoParams,
  WalletUtxoResponse,
  busAccountIdResetdriftRoute,
  busBucketRoute,
  busBucketNamePolicyRoute,
  busBucketNameRoute,
  busBucketsRoute,
  busConsensusAcceptblockRoute,
  busConsensusStateRoute,
  busContractRoute,
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
  busObjectsRoute,
  busObjectsKeyRoute,
  busObjectsListRoute,
  busObjectsRenameRoute,
  busSearchHostsRoute,
  busSearchObjectsRoute,
  busSettingKeyRoute,
  busSettingsRoute,
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
  busWalletPrepareRenewRoute,
  busWalletRedistributeRoute,
  busWalletRoute,
  busWalletSignRoute,
  busWalletTransactionsRoute,
  busAlertsRoute,
  busAlertsDismissRoute,
  busSlabKeyObjectsRoute,
  busMetricContractRoute,
  busMetricContractsetRoute,
  busMetricChurnRoute,
  busMetricWalletRoute,
  busMultipartCreateRoute,
  busMultipartRoute,
  busMultipartCompleteRoute,
  busMultipartAbortRoute,
  busMultipartListpartsRoute,
  busMultipartListuploadsRoute,
  busMultipartPartRoute,
  GougingSettings,
  ContractSetSettings,
  RedundancySettings,
  S3AuthenticationSettings,
  UploadPackingSettings,
  ContractsPrunableParams,
  ContractsPrunableResponse,
  busContractsPrunableRoute,
  ContractSizeParams,
  ContractSizeResponse,
  busContractIdSize,
  PricePinSettings,
} from '@siafoundation/renterd-types'

// state

export function useBusState(
  args?: HookArgsSwr<BusStateParams, BusStateResponse>
) {
  return useGetSwr({
    ...args,
    route: busStateRoute,
  })
}

// consensus

export function useConsensusState(
  args?: HookArgsSwr<ConsensusStateParams, ConsensusStateResponse>
) {
  return useGetSwr({
    ...args,
    route: busConsensusStateRoute,
  })
}

export function useEstimatedNetworkBlockHeight(): number {
  const state = useBusState({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const res = useSWR(
    state,
    () => {
      if (state.data?.network === 'zen') {
        return getTestnetZenBlockHeight()
      }
      return getMainnetBlockHeight()
    },
    {
      refreshInterval: 60_000,
      keepPreviousData: true,
    }
  )
  return res.data || 0
}

export function useConsensusAcceptBlock(
  args?: HookArgsCallback<
    ConsensusAcceptBlockParams,
    ConsensusAcceptBlockPayload,
    ConsensusAcceptBlockResponse
  >
) {
  return usePostFunc({ ...args, route: busConsensusAcceptblockRoute })
}

// syncer

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>
) {
  return useGetSwr({
    ...args,
    route: busSyncerPeersRoute,
  })
}

export function useSyncerConnect(
  args?: HookArgsCallback<
    SyncerConnectParams,
    SyncerConnectPayload,
    SyncerConnectResponse
  >
) {
  return usePostFunc(
    {
      ...args,
      route: busSyncerConnectRoute,
    },
    async (mutate) => {
      mutate((key) => key === busSyncerPeersRoute)
    }
  )
}

export function useSyncerAddress(
  args?: HookArgsSwr<SyncerAddressParams, SyncerAddressResponse>
) {
  return useGetSwr({ ...args, route: busSyncerAddrRoute })
}

// txpool

export function useTxPoolFee(
  args?: HookArgsSwr<TxPoolFeeParams, TxPoolFeeResponse>
) {
  return useGetSwr({ ...args, route: busTxpoolFeeRoute })
}

export function useTxPoolTransactions(
  args?: HookArgsSwr<TxPoolTransactionsParams, TxPoolTransactionsResponse>
) {
  return useGetSwr({ ...args, route: busTxpoolTransactionsRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<
    TxPoolBroadcastParams,
    TxPoolBroadcastPayload,
    TxPoolBroadcastResponse
  >
) {
  return usePostFunc(
    {
      ...args,
      route: busTxpoolBroadcastRoute,
    },
    async (mutate) => {
      await delay(2_000)
      mutate((key) => {
        return (
          key.startsWith(busTxpoolTransactionsRoute) ||
          key.startsWith(busWalletPendingRoute)
        )
      })
    }
  )
}

// wallet

export function useWallet(args?: HookArgsSwr<WalletParams, WalletResponse>) {
  return useGetSwr({ ...args, route: busWalletRoute })
}

export function useWalletAddresses(
  args?: HookArgsSwr<WalletAddressesParams, WalletAddressesResponse>
) {
  return useGetSwr({ ...args, route: busWalletAddressesRoute })
}

export function useWalletTransactions(
  args: HookArgsSwr<WalletTransactionsParams, WalletTransactionsResponse>
) {
  return useGetSwr({
    ...args,
    route: busWalletTransactionsRoute,
  })
}

export function useWalletUtxos(
  args?: HookArgsSwr<WalletUtxoParams, WalletUtxoResponse>
) {
  return useGetSwr({ ...args, route: busWalletOutputsRoute })
}

export function useWalletFund(
  args?: HookArgsCallback<
    WalletFundParams,
    WalletFundPayload,
    WalletFundResponse
  >
) {
  return usePostFunc({ ...args, route: busWalletFundRoute })
}

export function useWalletSign(
  args?: HookArgsCallback<
    WalletSignParams,
    WalletSignPayload,
    WalletSignResponse
  >
) {
  return usePostFunc({ ...args, route: busWalletSignRoute })
}

export function useWalletRedistribute(
  args?: HookArgsCallback<
    WalletRedistributeParams,
    WalletRedistributePayload,
    WalletRedistributeResponse
  >
) {
  return usePostFunc({ ...args, route: busWalletRedistributeRoute })
}

export function useWalletDiscard(
  args?: HookArgsCallback<
    WalletDiscardParams,
    WalletDiscardPayload,
    WalletDiscardResponse
  >
) {
  return usePostFunc({ ...args, route: busWalletDiscardRoute })
}

export function useWalletPrepareForm(
  args?: HookArgsCallback<
    WalletPrepareFormParams,
    WalletPrepareFormPayload,
    WalletPrepareFormResponse
  >
) {
  return usePostFunc({ ...args, route: busWalletPrepareFormRoute })
}

export function useWalletPrepareRenew(
  args?: HookArgsCallback<
    WalletPrepareRenewParams,
    WalletPrepareRenewPayload,
    WalletPrepareRenewResponse
  >
) {
  return usePostFunc({ ...args, route: busWalletPrepareRenewRoute })
}

export function useWalletPending(
  args?: HookArgsSwr<WalletPendingParams, WalletPendingResponse>
) {
  return useGetSwr({ ...args, route: busWalletPendingRoute })
}

export function useHosts(args: HookArgsSwr<HostsParams, HostsResponse>) {
  return useGetSwr({
    ...args,
    route: busHostsRoute,
  })
}

export function useHostsSearch(
  args: HookArgsWithPayloadSwr<
    HostsSearchParams,
    HostsSearchPayload,
    HostsSearchResponse
  >
) {
  return usePostSwr({
    ...args,
    route: busSearchHostsRoute,
  })
}

export function useHost(args: HookArgsSwr<HostParams, HostResponse>) {
  return useGetSwr({ ...args, route: busHostHostKeyRoute })
}

export function useHostsInteractionAdd(
  args: HookArgsCallback<
    HostInteractionParams,
    HostInteractionPayload,
    HostInteractionResponse
  >
) {
  return usePostFunc({
    ...args,
    route: busHostsHostKeyRoute,
  })
}

export function useHostsBlocklist(
  args?: HookArgsSwr<HostsBlocklistParams, HostsBlocklistResponse>
) {
  return useGetSwr({ ...args, route: busHostsBlocklistRoute })
}

export function useHostsAllowlist(
  args?: HookArgsSwr<HostsAllowlistParams, HostsAllowlistResponse>
) {
  return useGetSwr({ ...args, route: busHostsAllowlistRoute })
}

export function useHostsAllowlistUpdate(
  args?: HookArgsCallback<
    HostsAllowlistUpdateParams,
    HostsAllowlistUpdatePayload,
    HostsAllowlistUpdateResponse
  >
) {
  return usePutFunc(
    { ...args, route: busHostsAllowlistRoute },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          busSearchHostsRoute,
          busHostsAllowlistRoute,
          busContractsRoute,
        ]
        return !!matches.find((match) => key.startsWith(match))
      })
    }
  )
}

export function useHostsBlocklistUpdate(
  args?: HookArgsCallback<
    HostsBlocklistUpdateParams,
    HostsBlocklistUpdatePayload,
    HostsBlocklistUpdateResponse
  >
) {
  return usePutFunc(
    { ...args, route: busHostsBlocklistRoute },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          busSearchHostsRoute,
          busHostsBlocklistRoute,
          busContractsRoute,
        ]
        return !!matches.find((match) => key.startsWith(match))
      })
    }
  )
}

export function useHostResetLostSectorCount(
  args?: HookArgsCallback<
    HostResetLostSectorCountParams,
    HostResetLostSectorCountPayload,
    HostResetLostSectorCountResponse
  >
) {
  return usePostFunc({
    ...args,
    route: busHostPublicKeyResetlostsectorsRoute,
  })
}

// accounts

export function useAccountResetDrift(
  args?: HookArgsCallback<
    AccountResetDriftParams,
    AccountResetDriftPayload,
    AccountResetDriftResponse
  >
) {
  return usePostFunc({
    ...args,
    route: busAccountIdResetdriftRoute,
  })
}

// contracts

export function useContracts(
  args?: HookArgsSwr<ContractsParams, ContractsResponse>
) {
  return useGetSwr({ ...args, route: busContractsRoute })
}

export function useContractsAcquire(
  args: HookArgsCallback<
    ContractAcquireParams,
    ContractAcquirePayload,
    ContractAcquireResponse
  >
) {
  return usePostFunc({ ...args, route: busContractIdAcquireRoute })
}

export function useContractsRelease(
  args: HookArgsCallback<
    ContractsReleaseParams,
    ContractsReleasePayload,
    ContractsReleaseResponse
  >
) {
  return usePostFunc({ ...args, route: busContractIdReleaseRoute })
}

export function useContract(
  args: HookArgsSwr<ContractParams, ContractResponse>
) {
  return useGetSwr({ ...args, route: busContractIdRoute })
}

export function useContractAdd(
  args: HookArgsCallback<
    ContractsAddParams,
    ContractsAddPayload,
    ContractsAddResponse
  >
) {
  return usePostFunc({ ...args, route: busContractIdNewRoute })
}

export function useContractRenew(
  args: HookArgsCallback<
    ContractRenewedParams,
    ContractRenewedPayload,
    ContractRenewedResponse
  >
) {
  return usePostFunc({ ...args, route: busContractIdRenewedRoute })
}

export function useContractDelete(
  args?: HookArgsCallback<
    ContractDeleteParams,
    ContractDeletePayload,
    ContractDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: busContractIdRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busContractRoute))
    }
  )
}

export function useContractSize(
  args?: HookArgsSwr<ContractSizeParams, ContractSizeResponse>
) {
  return useGetSwr({ ...args, route: busContractIdSize })
}

export function useContractSets(
  args?: HookArgsSwr<ContractSetsParams, ContractSetsResponse>
) {
  return useGetSwr({ ...args, route: busContractsSetsRoute })
}

export function useContractSetUpdate(
  args: HookArgsCallback<
    ContractSetUpdateParams,
    ContractSetUpdatePayload,
    ContractSetUpdateResponse
  >
) {
  return usePutFunc({ ...args, route: busContractsSetsSetRoute })
}

export function useContractsPrunable(
  args?: HookArgsSwr<ContractsPrunableParams, ContractsPrunableResponse>
) {
  return useGetSwr({ ...args, route: busContractsPrunableRoute })
}

// objects

export function useBuckets(args?: HookArgsSwr<BucketsParams, BucketsResponse>) {
  return useGetSwr({ ...args, route: busBucketsRoute })
}

export function useBucket(args: HookArgsSwr<BucketParams, BucketResponse>) {
  return useGetSwr({ ...args, route: busBucketNameRoute })
}

export function useBucketCreate(
  args?: HookArgsCallback<
    BucketCreateParams,
    BucketCreatePayload,
    BucketCreateResponse
  >
) {
  return usePostFunc({ ...args, route: busBucketsRoute }, async (mutate) => {
    mutate((key) => key.startsWith(busBucketsRoute))
  })
}

export function useBucketPolicyUpdate(
  args?: HookArgsCallback<
    BucketPolicyUpdateParams,
    BucketPolicyUpdatePayload,
    BucketPolicyUpdateResponse
  >
) {
  return usePutFunc(
    { ...args, route: busBucketNamePolicyRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busBucketRoute))
    }
  )
}

export function useBucketDelete(
  args?: HookArgsCallback<
    BucketDeleteParams,
    BucketDeletePayload,
    BucketDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: busBucketNameRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busBucketRoute))
    }
  )
}

export function useObjectDirectory(
  args: HookArgsSwr<ObjectDirectoryParams, ObjectDirectoryResponse>
) {
  return useGetSwr({ ...args, route: busObjectsKeyRoute })
}

export function useObjectList(
  args: HookArgsWithPayloadSwr<
    ObjectListParams,
    ObjectListPayload,
    ObjectListResponse
  >
) {
  return usePostSwr({ ...args, route: busObjectsListRoute })
}

export function useObject(args: HookArgsSwr<ObjectParams, ObjectResponse>) {
  return useGetSwr({ ...args, route: busObjectsKeyRoute })
}

export function useObjectSearch(
  args: HookArgsSwr<ObjectSearchParams, ObjectSearchResponse>
) {
  return useGetSwr({ ...args, route: busSearchObjectsRoute })
}

export function useObjectAdd(
  args: HookArgsCallback<ObjectAddParams, ObjectAddPayload, ObjectAddResponse>
) {
  return usePutFunc({ ...args, route: busObjectsKeyRoute })
}

export function useObjectRename(
  args?: HookArgsCallback<
    ObjectRenameParams,
    ObjectRenamePayload,
    ObjectRenameResponse
  >
) {
  return usePostFunc({ ...args, route: busObjectsRenameRoute })
}

export function useObjectDelete(
  args?: HookArgsCallback<
    ObjectDeleteParams,
    ObjectDeletePayload,
    ObjectDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: busObjectsKeyRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busObjectsRoute))
    }
  )
}

export function useObjectStats(
  args?: HookArgsSwr<ObjectsStatsParams, ObjectsStatsResponse>
) {
  return useGetSwr({ ...args, route: busStatsObjectsRoute })
}

type Setting = Record<string, unknown> | string

export function useSettings(
  args?: HookArgsSwr<SettingsParams, SettingsResponse>
) {
  return useGetSwr({ ...args, route: busSettingsRoute })
}

export function useSetting<T extends Setting>(
  args: HookArgsSwr<SettingParams, SettingResponse<T>>
) {
  return useGetSwr({ ...args, route: busSettingKeyRoute })
}

export function useSettingGouging(args?: HookArgsSwr<void, GougingSettings>) {
  return useSetting<GougingSettings>({
    ...args,
    params: { key: 'gouging' },
  })
}

export function useSettingContractSet(
  args?: HookArgsSwr<void, ContractSetSettings>
) {
  return useSetting<ContractSetSettings>({
    ...args,
    params: { key: 'contractset' },
  })
}

export function useSettingRedundancy(
  args?: HookArgsSwr<void, RedundancySettings>
) {
  return useSetting<RedundancySettings>({
    ...args,
    params: { key: 'redundancy' },
  })
}

export function useSettingS3Authentication(
  args?: HookArgsSwr<void, S3AuthenticationSettings>
) {
  return useSetting<S3AuthenticationSettings>({
    ...args,
    params: { key: 's3authentication' },
  })
}

export function useSettingUploadPacking(
  args?: HookArgsSwr<void, UploadPackingSettings>
) {
  return useSetting<UploadPackingSettings>({
    ...args,
    params: { key: 'uploadpacking' },
  })
}

export function useSettingPricePinning(
  args?: HookArgsSwr<void, PricePinSettings>
) {
  return useSetting<PricePinSettings>({
    ...args,
    params: { key: 'pricepinning' },
  })
}

export function useSettingUpdate(
  args?: HookArgsCallback<
    SettingUpdateParams,
    SettingUpdatePayload,
    SettingUpdateResponse
  >
) {
  return usePutFunc(
    {
      ...args,
      route: busSettingKeyRoute,
    },
    async (mutate, args) => {
      mutate((key) =>
        key.startsWith(busSettingKeyRoute.replace(':key', args.params.key))
      )
    }
  )
}

// params are required because omitting them returns a deprecated response structure
export function useAlerts(args: HookArgsSwr<AlertsParams, AlertsResponse>) {
  return useGetSwr({ ...args, route: busAlertsRoute })
}

export function useAlertsDismiss(
  args?: HookArgsCallback<
    AlertsDismissParams,
    AlertsDismissPayload,
    AlertsDismissResponse
  >
) {
  return usePostFunc(
    { ...args, route: busAlertsDismissRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busAlertsRoute)
      })
    }
  )
}

// slabs

export function useSlabObjects(
  args: HookArgsSwr<SlabObjectsParams, SlabObjectsResponse>
) {
  return useGetSwr({ ...args, route: busSlabKeyObjectsRoute })
}

// metrics

export function useMetricsContract(
  args: HookArgsSwr<ContractMetricsParams, ContractMetricsResponse>
) {
  return useGetSwr({ ...args, route: busMetricContractRoute })
}

export function useMetricsContractSet(
  args: HookArgsSwr<ContractSetMetricsParams, ContractSetMetricsResponse>
) {
  return useGetSwr({ ...args, route: busMetricContractsetRoute })
}

export function useMetricsContractSetChurn(
  args: HookArgsSwr<
    ContractSetChurnMetricsParams,
    ContractSetChurnMetricsResponse
  >
) {
  return useGetSwr({ ...args, route: busMetricChurnRoute })
}

export function useMetricsWallet(
  args: HookArgsSwr<WalletMetricsParams, WalletMetricsResponse>
) {
  return useGetSwr({ ...args, route: busMetricWalletRoute })
}

// multipart

export function useMultipartUploadCreate(
  args?: HookArgsCallback<
    MultipartUploadCreateParams,
    MultipartUploadCreatePayload,
    MultipartUploadCreateResponse
  >
) {
  return usePostFunc(
    { ...args, route: busMultipartCreateRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busMultipartRoute)
      })
    }
  )
}

export function useMultipartUploadComplete(
  args?: HookArgsCallback<
    MultipartUploadCompleteParams,
    MultipartUploadCompletePayload,
    MultipartUploadCompleteResponse
  >
) {
  return usePostFunc(
    { ...args, route: busMultipartCompleteRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busMultipartRoute)
      })
    }
  )
}

export function useMultipartUploadAbort(
  args?: HookArgsCallback<
    MultipartUploadAbortParams,
    MultipartUploadAbortPayload,
    MultipartUploadAbortResponse
  >
) {
  return usePostFunc(
    { ...args, route: busMultipartAbortRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busMultipartRoute)
      })
    }
  )
}

export function useMultipartUploadListParts(
  args: HookArgsWithPayloadSwr<
    MultipartUploadListPartsParams,
    MultipartUploadListPartsPayload,
    MultipartUploadListPartsResponse
  >
) {
  return usePostSwr({
    ...args,
    route: busMultipartListpartsRoute,
  })
}

export function useMultipartUploadListUploads(
  args: HookArgsWithPayloadSwr<
    MultipartUploadListUploadsParams,
    MultipartUploadListUploadsPayload,
    MultipartUploadListUploadsResponse
  >
) {
  return usePostSwr({
    ...args,
    route: busMultipartListuploadsRoute,
  })
}

export function useMultipartUploadAddPart(
  args?: HookArgsCallback<
    MultipartUploadAddPartParams,
    MultipartUploadAddPartPayload,
    MultipartUploadAddPartResponse
  >
) {
  return usePostFunc(
    { ...args, route: busMultipartPartRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busMultipartListpartsRoute)
      })
    }
  )
}
