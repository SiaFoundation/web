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
  throttle,
} from '@siafoundation/react-core'
import { getBlockHeightFromGenesis } from '@siafoundation/units'
import {
  AlertsDismissParams,
  AlertsDismissPayload,
  AlertsDismissResponse,
  AlertsParams,
  AlertsResponse,
  AutopilotConfigParams,
  AutopilotConfigResponse,
  AutopilotConfigUpdateParams,
  AutopilotConfigUpdatePayload,
  AutopilotConfigUpdateResponse,
  busAutopilotRoute,
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
  ObjectsRemoveParams,
  ObjectsRemovePayload,
  ObjectsRemoveResponse,
  ObjectsParams,
  ObjectsResponse,
  ObjectParams,
  ObjectRenameParams,
  ObjectRenamePayload,
  ObjectRenameResponse,
  ObjectResponse,
  ObjectsStatsParams,
  ObjectsStatsResponse,
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
  TxPoolRecommendedFeeParams,
  TxPoolRecommendedFeeResponse,
  TxPoolTransactionsParams,
  TxPoolTransactionsResponse,
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
  busHostHostKeyRoute,
  busHostPublicKeyResetlostsectorsRoute,
  busHostsAllowlistRoute,
  busHostsBlocklistRoute,
  busHostsHostKeyRoute,
  busObjectsRoute,
  busObjectKeyRoute,
  busObjectsRenameRoute,
  busHostsRoute,
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
  busWalletPrepareRenewRoute,
  busWalletRedistributeRoute,
  busWalletRoute,
  busAlertsRoute,
  busAlertsDismissRoute,
  busSlabKeyObjectsRoute,
  busMetricContractRoute,
  busMetricWalletRoute,
  busMultipartCreateRoute,
  busMultipartRoute,
  busMultipartCompleteRoute,
  busMultipartAbortRoute,
  busMultipartListpartsRoute,
  busMultipartListuploadsRoute,
  busMultipartPartRoute,
  ContractsPrunableParams,
  ContractsPrunableResponse,
  busContractsPrunableRoute,
  ContractSizeParams,
  ContractSizeResponse,
  busContractIdSize,
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
  busWalletSendRoute,
  WalletEventsParams,
  WalletEventsResponse,
  busWalletEventsRoute,
  busObjectsPrefixRoute,
  busSettingsGougingRoute,
  busSettingsPinnedRoute,
  busSettingsS3Route,
  busSettingsUploadRoute,
  busSystemBackupRoute,
  SettingsGougingParams,
  SettingsGougingResponse,
  SettingsPinnedParams,
  SettingsS3Response,
  SettingsS3Params,
  SettingsUploadResponse,
  SettingsUploadParams,
  SettingsGougingUpdateResponse,
  SettingsGougingUpdatePayload,
  SettingsGougingUpdateParams,
  SettingsPinnedUpdateParams,
  SettingsPinnedUpdatePayload,
  SettingsPinnedUpdateResponse,
  SettingsS3UpdateParams,
  SettingsS3UpdatePayload,
  SettingsS3UpdateResponse,
  SettingsUploadUpdateParams,
  SettingsUploadUpdatePayload,
  SettingsUploadUpdateResponse,
  SettingsPinnedResponse,
  busObjectsRemoveRoute,
  ConsensusNetworkParams,
  ConsensusNetworkResponse,
  busConsensusNetworkRoute,
  HostScanParams,
  HostScanPayload,
  HostScanResponse,
  busHostHostKeyScanRoute,
  Host,
  autopilotStateRoute,
  AuthTokenParams,
  AuthTokenPayload,
  AuthTokenResponse,
  authRoute,
  ContractsFormParams,
  ContractsFormPayload,
  ContractsFormResponse,
  busContractsFormRoute,
  SystemBackupParams,
  SystemBackupPayload,
  SystemBackupResponse,
} from '@siafoundation/renterd-types'

// state

export function useBusState(
  args?: HookArgsSwr<BusStateParams, BusStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: busStateRoute,
  })
}

// consensus

export function useConsensusState(
  args?: HookArgsSwr<ConsensusStateParams, ConsensusStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: busConsensusStateRoute,
  })
}

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>,
) {
  return useGetSwr({
    ...args,
    route: busConsensusNetworkRoute,
  })
}

export function useEstimatedNetworkBlockHeight(): number {
  const state = useConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const res = useSWR(
    state,
    () => getBlockHeightFromGenesis(state.data?.hardforkOak.genesisTimestamp),
    {
      refreshInterval: 60_000,
      keepPreviousData: true,
    },
  )
  return res.data || 0
}

export function useConsensusAcceptBlock(
  args?: HookArgsCallback<
    ConsensusAcceptBlockParams,
    ConsensusAcceptBlockPayload,
    ConsensusAcceptBlockResponse
  >,
) {
  return usePostFunc({ ...args, route: busConsensusAcceptblockRoute })
}

// syncer

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>,
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
  >,
) {
  return usePostFunc(
    {
      ...args,
      route: busSyncerConnectRoute,
    },
    async (mutate) => {
      mutate((key) => key === busSyncerPeersRoute)
    },
  )
}

export function useSyncerAddress(
  args?: HookArgsSwr<SyncerAddressParams, SyncerAddressResponse>,
) {
  return useGetSwr({ ...args, route: busSyncerAddrRoute })
}

// txpool

export function useTxPoolRecommendedFee(
  args?: HookArgsSwr<TxPoolRecommendedFeeParams, TxPoolRecommendedFeeResponse>,
) {
  return useGetSwr({ ...args, route: busTxpoolRecommendedFeeRoute })
}

export function useTxPoolTransactions(
  args?: HookArgsSwr<TxPoolTransactionsParams, TxPoolTransactionsResponse>,
) {
  return useGetSwr({ ...args, route: busTxpoolTransactionsRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<
    TxPoolBroadcastParams,
    TxPoolBroadcastPayload,
    TxPoolBroadcastResponse
  >,
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
    },
  )
}

// wallet

export function useWallet(args?: HookArgsSwr<WalletParams, WalletResponse>) {
  return useGetSwr({ ...args, route: busWalletRoute })
}

export function useWalletEvents(
  args: HookArgsSwr<WalletEventsParams, WalletEventsResponse>,
) {
  return useGetSwr({
    ...args,
    route: busWalletEventsRoute,
  })
}

export function useWalletPending(
  args?: HookArgsSwr<WalletPendingParams, WalletPendingResponse>,
) {
  return useGetSwr({ ...args, route: busWalletPendingRoute })
}

export function useWalletSend(
  args?: HookArgsCallback<
    WalletSendParams,
    WalletSendPayload,
    WalletSendResponse
  >,
) {
  return usePostFunc({ ...args, route: busWalletSendRoute }, async (mutate) => {
    await delay(2_000)
    mutate((key) => {
      return (
        key.startsWith(busTxpoolTransactionsRoute) ||
        key.startsWith(busWalletPendingRoute)
      )
    })
  })
}

export function useWalletRedistribute(
  args?: HookArgsCallback<
    WalletRedistributeParams,
    WalletRedistributePayload,
    WalletRedistributeResponse
  >,
) {
  return usePostFunc({ ...args, route: busWalletRedistributeRoute })
}

export function useWalletPrepareForm(
  args?: HookArgsCallback<
    WalletPrepareFormParams,
    WalletPrepareFormPayload,
    WalletPrepareFormResponse
  >,
) {
  return usePostFunc({ ...args, route: busWalletPrepareFormRoute })
}

export function useWalletPrepareRenew(
  args?: HookArgsCallback<
    WalletPrepareRenewParams,
    WalletPrepareRenewPayload,
    WalletPrepareRenewResponse
  >,
) {
  return usePostFunc({ ...args, route: busWalletPrepareRenewRoute })
}

// host

export function useHosts(
  args: HookArgsWithPayloadSwr<HostsParams, HostsPayload, HostsResponse>,
) {
  return usePostSwr({
    ...args,
    route: busHostsRoute,
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
  >,
) {
  return usePostFunc({
    ...args,
    route: busHostsHostKeyRoute,
  })
}

export function useHostsBlocklist(
  args?: HookArgsSwr<HostsBlocklistParams, HostsBlocklistResponse>,
) {
  return useGetSwr({ ...args, route: busHostsBlocklistRoute })
}

export function useHostsAllowlist(
  args?: HookArgsSwr<HostsAllowlistParams, HostsAllowlistResponse>,
) {
  return useGetSwr({ ...args, route: busHostsAllowlistRoute })
}

export function useHostsAllowlistUpdate(
  args?: HookArgsCallback<
    HostsAllowlistUpdateParams,
    HostsAllowlistUpdatePayload,
    HostsAllowlistUpdateResponse
  >,
) {
  return usePutFunc(
    { ...args, route: busHostsAllowlistRoute },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          busHostsRoute,
          busHostsAllowlistRoute,
          busContractsRoute,
        ]
        return !!matches.find((match) => key.startsWith(match))
      })
    },
  )
}

export function useHostsBlocklistUpdate(
  args?: HookArgsCallback<
    HostsBlocklistUpdateParams,
    HostsBlocklistUpdatePayload,
    HostsBlocklistUpdateResponse
  >,
) {
  return usePutFunc(
    { ...args, route: busHostsBlocklistRoute },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          busHostsRoute,
          busHostsBlocklistRoute,
          busContractsRoute,
        ]
        return !!matches.find((match) => key.startsWith(match))
      })
    },
  )
}

export function useHostResetLostSectorCount(
  args?: HookArgsCallback<
    HostResetLostSectorCountParams,
    HostResetLostSectorCountPayload,
    HostResetLostSectorCountResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: busHostPublicKeyResetlostsectorsRoute,
  })
}

export function useHostScan(
  args?: HookArgsCallback<HostScanParams, HostScanPayload, HostScanResponse>,
) {
  return usePostFunc(
    { ...args, route: busHostHostKeyScanRoute },
    async (mutate, { params: { hostkey } }, response) => {
      // Fetching immediately after the response returns stale data so
      // we optimistically update without triggering revalidation,
      // and then revalidate after a 5s delay. The list revalidation
      // is debounced so if the user rescans multiple hosts in quick
      // succession the list is optimistically updated n times followed
      // by a single network revalidate.
      mutate<Host[]>(
        (key) => key.startsWith(busHostsRoute),
        (data) =>
          data?.map((h) => {
            if (h.publicKey === hostkey) {
              return {
                ...h,
                host: {
                  ...h,
                  interactions: {
                    ...h.interactions,
                    lastScan: new Date().toISOString(),
                    lastScanSuccess: !response.data.scanError,
                  },
                  settings: response.data.settings,
                },
              }
            }
            return h
          }),
        false,
      )
      throttle(busHostsRoute, 5_000, () => {
        mutate((key) => key.startsWith(busHostsRoute))
      })
    },
  )
}

// contracts

export function useContracts(
  args?: HookArgsSwr<ContractsParams, ContractsResponse>,
) {
  return useGetSwr({ ...args, route: busContractsRoute })
}

export function useContractsAcquire(
  args: HookArgsCallback<
    ContractAcquireParams,
    ContractAcquirePayload,
    ContractAcquireResponse
  >,
) {
  return usePostFunc({ ...args, route: busContractIdAcquireRoute })
}

export function useContractsRelease(
  args: HookArgsCallback<
    ContractsReleaseParams,
    ContractsReleasePayload,
    ContractsReleaseResponse
  >,
) {
  return usePostFunc({ ...args, route: busContractIdReleaseRoute })
}

export function useContract(
  args: HookArgsSwr<ContractParams, ContractResponse>,
) {
  return useGetSwr({ ...args, route: busContractIdRoute })
}

export function useContractsForm(
  args: HookArgsCallback<
    ContractsFormParams,
    ContractsFormPayload,
    ContractsFormResponse
  >,
) {
  return usePostFunc(
    { ...args, route: busContractsFormRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busContractsRoute))
    },
  )
}

export function useContractAdd(
  args: HookArgsCallback<
    ContractsAddParams,
    ContractsAddPayload,
    ContractsAddResponse
  >,
) {
  return usePostFunc({ ...args, route: busContractIdNewRoute })
}

export function useContractRenew(
  args: HookArgsCallback<
    ContractRenewedParams,
    ContractRenewedPayload,
    ContractRenewedResponse
  >,
) {
  return usePostFunc({ ...args, route: busContractIdRenewedRoute })
}

export function useContractDelete(
  args?: HookArgsCallback<
    ContractDeleteParams,
    ContractDeletePayload,
    ContractDeleteResponse
  >,
) {
  return useDeleteFunc(
    { ...args, route: busContractIdRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busContractRoute))
    },
  )
}

export function useContractSize(
  args?: HookArgsSwr<ContractSizeParams, ContractSizeResponse>,
) {
  return useGetSwr({ ...args, route: busContractIdSize })
}

export function useContractsPrunable(
  args?: HookArgsSwr<ContractsPrunableParams, ContractsPrunableResponse>,
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
  >,
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
  >,
) {
  return usePutFunc(
    { ...args, route: busBucketNamePolicyRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busBucketRoute))
    },
  )
}

export function useBucketDelete(
  args?: HookArgsCallback<
    BucketDeleteParams,
    BucketDeletePayload,
    BucketDeleteResponse
  >,
) {
  return useDeleteFunc(
    { ...args, route: busBucketNameRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busBucketRoute))
    },
  )
}

export function useObjects(args: HookArgsSwr<ObjectsParams, ObjectsResponse>) {
  return useGetSwr({ ...args, route: busObjectsPrefixRoute })
}

export function useObject(args: HookArgsSwr<ObjectParams, ObjectResponse>) {
  return useGetSwr({ ...args, route: busObjectKeyRoute })
}

export function useObjectAdd(
  args: HookArgsCallback<ObjectAddParams, ObjectAddPayload, ObjectAddResponse>,
) {
  return usePutFunc({ ...args, route: busObjectKeyRoute })
}

export function useObjectsRename(
  args?: HookArgsCallback<
    ObjectRenameParams,
    ObjectRenamePayload,
    ObjectRenameResponse
  >,
) {
  return usePostFunc({ ...args, route: busObjectsRenameRoute })
}

export function useObjectsRemove(
  args?: HookArgsCallback<
    ObjectsRemoveParams,
    ObjectsRemovePayload,
    ObjectsRemoveResponse
  >,
) {
  return usePostFunc(
    { ...args, route: busObjectsRemoveRoute },
    async (mutate) => {
      mutate((key) => key.startsWith(busObjectsRoute))
    },
  )
}

export function useObjectStats(
  args?: HookArgsSwr<ObjectsStatsParams, ObjectsStatsResponse>,
) {
  return useGetSwr({ ...args, route: busStatsObjectsRoute })
}

export function useSettingsGouging(
  args?: HookArgsSwr<SettingsGougingParams, SettingsGougingResponse>,
) {
  return useGetSwr({ ...args, route: busSettingsGougingRoute })
}

export function useSettingsPinned(
  args?: HookArgsSwr<SettingsPinnedParams, SettingsPinnedResponse>,
) {
  return useGetSwr({ ...args, route: busSettingsPinnedRoute })
}

export function useSettingsS3(
  args?: HookArgsSwr<SettingsS3Params, SettingsS3Response>,
) {
  return useGetSwr({ ...args, route: busSettingsS3Route })
}

export function useSettingsUpload(
  args?: HookArgsSwr<SettingsUploadParams, SettingsUploadResponse>,
) {
  return useGetSwr({ ...args, route: busSettingsUploadRoute })
}

export function useSettingsGougingUpdate(
  args?: HookArgsCallback<
    SettingsGougingUpdateParams,
    SettingsGougingUpdatePayload,
    SettingsGougingUpdateResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      route: busSettingsGougingRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(busSettingsGougingRoute))
    },
  )
}

export function useSettingsPinnedUpdate(
  args?: HookArgsCallback<
    SettingsPinnedUpdateParams,
    SettingsPinnedUpdatePayload,
    SettingsPinnedUpdateResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      route: busSettingsPinnedRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(busSettingsPinnedRoute))
    },
  )
}

export function useSettingsS3Update(
  args?: HookArgsCallback<
    SettingsS3UpdateParams,
    SettingsS3UpdatePayload,
    SettingsS3UpdateResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      route: busSettingsS3Route,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(busSettingsS3Route))
    },
  )
}

export function useSettingsUploadUpdate(
  args?: HookArgsCallback<
    SettingsUploadUpdateParams,
    SettingsUploadUpdatePayload,
    SettingsUploadUpdateResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      route: busSettingsUploadRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(busSettingsUploadRoute))
    },
  )
}

// params are required because omitting them returns a deprecated response structure
export function useAlerts(args?: HookArgsSwr<AlertsParams, AlertsResponse>) {
  return useGetSwr({ ...args, route: busAlertsRoute })
}

export function useAlertsDismiss(
  args?: HookArgsCallback<
    AlertsDismissParams,
    AlertsDismissPayload,
    AlertsDismissResponse
  >,
) {
  return usePostFunc(
    { ...args, route: busAlertsDismissRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busAlertsRoute)
      })
    },
  )
}

// slabs

export function useSlabObjects(
  args: HookArgsSwr<SlabObjectsParams, SlabObjectsResponse>,
) {
  return useGetSwr({ ...args, route: busSlabKeyObjectsRoute })
}

// metrics

export function useMetricsContract(
  args: HookArgsSwr<ContractMetricsParams, ContractMetricsResponse>,
) {
  return useGetSwr({ ...args, route: busMetricContractRoute })
}

export function useMetricsWallet(
  args: HookArgsSwr<WalletMetricsParams, WalletMetricsResponse>,
) {
  return useGetSwr({ ...args, route: busMetricWalletRoute })
}

// multipart

export function useMultipartUploadCreate(
  args?: HookArgsCallback<
    MultipartUploadCreateParams,
    MultipartUploadCreatePayload,
    MultipartUploadCreateResponse
  >,
) {
  return usePostFunc(
    { ...args, route: busMultipartCreateRoute },
    async (mutate) => {
      throttle(busMultipartRoute, 3_000, () => {
        mutate((key) => {
          return key.startsWith(busMultipartRoute)
        })
      })
    },
  )
}

export function useMultipartUploadComplete(
  args?: HookArgsCallback<
    MultipartUploadCompleteParams,
    MultipartUploadCompletePayload,
    MultipartUploadCompleteResponse
  >,
) {
  return usePostFunc(
    { ...args, route: busMultipartCompleteRoute },
    async (mutate, args, response) => {
      throttle(busMultipartRoute, 3_000, () => {
        mutate((key) => {
          return key.startsWith(busMultipartRoute)
        })
      })
    },
  )
}

export function useMultipartUploadAbort(
  args?: HookArgsCallback<
    MultipartUploadAbortParams,
    MultipartUploadAbortPayload,
    MultipartUploadAbortResponse
  >,
) {
  return usePostFunc(
    { ...args, route: busMultipartAbortRoute },
    async (mutate) => {
      throttle(
        busMultipartRoute,
        200,
        () => {
          mutate((key) => {
            return key.startsWith(busMultipartRoute)
          })
        },
        'trailing',
      )
    },
  )
}

export function useMultipartUploadListParts(
  args: HookArgsWithPayloadSwr<
    MultipartUploadListPartsParams,
    MultipartUploadListPartsPayload,
    MultipartUploadListPartsResponse
  >,
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
  >,
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
  >,
) {
  return usePostFunc(
    { ...args, route: busMultipartPartRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(busMultipartListpartsRoute)
      })
    },
  )
}

// autopilot

export function useAutopilotConfig(
  args?: HookArgsSwr<AutopilotConfigParams, AutopilotConfigResponse>,
) {
  return useGetSwr({
    ...args,
    route: busAutopilotRoute,
  })
}

export function useAutopilotConfigUpdate(
  args?: HookArgsCallback<
    AutopilotConfigUpdateParams,
    AutopilotConfigUpdatePayload,
    AutopilotConfigUpdateResponse
  >,
) {
  return usePutFunc({ ...args, route: busAutopilotRoute }, async (mutate) => {
    mutate((key) => key === busAutopilotRoute)
    // Might need a delay before revalidating status which returns whether
    // or not autopilot is configured.
    const func = async () => {
      await delay(1000)
      mutate((key) => key === autopilotStateRoute)
    }
    func()
  })
}

export function useAuthToken(
  args?: HookArgsCallback<AuthTokenParams, AuthTokenPayload, AuthTokenResponse>,
) {
  return usePostFunc({ ...args, route: authRoute })
}

// backup

export function useSystemBackup(
  args?: HookArgsCallback<
    SystemBackupParams,
    SystemBackupPayload,
    SystemBackupResponse
  >,
) {
  return usePostFunc({ ...args, route: busSystemBackupRoute })
}
