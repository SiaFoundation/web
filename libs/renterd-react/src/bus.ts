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
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
  delay,
} from '@siafoundation/react-core'
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
} from '@siafoundation/renterd-types'

// state

export const busStateKey = '/bus/state'

export function useBusState(
  args?: HookArgsSwr<BusStateParams, BusStateResponse>
) {
  return useGetSwr({
    ...args,
    route: busStateKey,
  })
}

// consensus

export function useConsensusState(
  args?: HookArgsSwr<ConsensusStateParams, ConsensusStateResponse>
) {
  return useGetSwr({
    ...args,
    route: '/bus/consensus/state',
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
      if (state.data?.network === 'Zen Testnet') {
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
  return usePostFunc({ ...args, route: '/bus/consensus/acceptblock' })
}

// syncer

const syncerPeers = '/bus/syncer/peers'

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>
) {
  return useGetSwr({
    ...args,
    route: syncerPeers,
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
      route: '/bus/syncer/connect',
    },
    async (mutate) => {
      mutate((key) => key === syncerPeers)
    }
  )
}

export function useSyncerAddress(
  args?: HookArgsSwr<SyncerAddressParams, SyncerAddressResponse>
) {
  return useGetSwr({ ...args, route: '/bus/syncer/addr' })
}

// txpool

export function useTxPoolFee(
  args?: HookArgsSwr<TxPoolFeeParams, TxPoolFeeResponse>
) {
  return useGetSwr({ ...args, route: '/bus/txpool/fee' })
}

const txPoolTransactionsRoute = '/bus/txpool/transactions'
export function useTxPoolTransactions(
  args?: HookArgsSwr<TxPoolTransactionsParams, TxPoolTransactionsResponse>
) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
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
      route: '/bus/txpool/broadcast',
    },
    async (mutate) => {
      await delay(2_000)
      mutate((key) => {
        return (
          key.startsWith(txPoolTransactionsRoute) ||
          key.startsWith(walletPendingRoute)
        )
      })
    }
  )
}

// wallet

export function useWallet(args?: HookArgsSwr<WalletParams, WalletResponse>) {
  return useGetSwr({ ...args, route: '/bus/wallet' })
}

export function useWalletAddresses(
  args?: HookArgsSwr<WalletAddressesParams, WalletAddressesResponse>
) {
  return useGetSwr({ ...args, route: '/bus/wallet/addresses' })
}

export function useWalletTransactions(
  args: HookArgsSwr<WalletTransactionsParams, WalletTransactionsResponse>
) {
  return useGetSwr({
    ...args,
    route: '/bus/wallet/transactions',
  })
}

export function useWalletUtxos(
  args?: HookArgsSwr<WalletUtxoParams, WalletUtxoResponse>
) {
  return useGetSwr({ ...args, route: '/bus/wallet/outputs' })
}

export function useWalletFund(
  args?: HookArgsCallback<
    WalletFundParams,
    WalletFundPayload,
    WalletFundResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/fund' })
}

export function useWalletSign(
  args?: HookArgsCallback<
    WalletSignParams,
    WalletSignPayload,
    WalletSignResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/sign' })
}

export function useWalletRedistribute(
  args?: HookArgsCallback<
    WalletRedistributeParams,
    WalletRedistributePayload,
    WalletRedistributeResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/redistribute' })
}

export function useWalletDiscard(
  args?: HookArgsCallback<
    WalletDiscardParams,
    WalletDiscardPayload,
    WalletDiscardResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/discard' })
}

export function useWalletPrepareForm(
  args?: HookArgsCallback<
    WalletPrepareFormParams,
    WalletPrepareFormPayload,
    WalletPrepareFormResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/prepare/form' })
}

export function useWalletPrepareRenew(
  args?: HookArgsCallback<
    WalletPrepareRenewParams,
    WalletPrepareRenewPayload,
    WalletPrepareRenewResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/prepare/form' })
}

const walletPendingRoute = '/bus/wallet/pending'
export function useWalletPending(
  args?: HookArgsSwr<WalletPendingParams, WalletPendingResponse>
) {
  return useGetSwr({ ...args, route: walletPendingRoute })
}

export function useHosts(args: HookArgsSwr<HostsParams, HostsResponse>) {
  return useGetSwr({
    ...args,
    route: '/bus/hosts',
  })
}

const hostsSearchRoute = '/bus/search/hosts'
export function useHostsSearch(
  args: HookArgsWithPayloadSwr<
    HostsSearchParams,
    HostsSearchPayload,
    HostsSearchResponse
  >
) {
  return usePostSwr({
    ...args,
    route: hostsSearchRoute,
  })
}

export function useHost(args: HookArgsSwr<HostParams, HostResponse>) {
  return useGetSwr({ ...args, route: '/bus/host/:hostKey' })
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
    route: '/bus/hosts/:hostKey',
  })
}
const hostsBlocklistRoute = '/bus/hosts/blocklist'
export function useHostsBlocklist(
  args?: HookArgsSwr<HostsBlocklistParams, HostsBlocklistResponse>
) {
  return useGetSwr({ ...args, route: hostsBlocklistRoute })
}

const hostsAllowlistRoute = '/bus/hosts/allowlist'
export function useHostsAllowlist(
  args?: HookArgsSwr<HostsAllowlistParams, HostsAllowlistResponse>
) {
  return useGetSwr({ ...args, route: hostsAllowlistRoute })
}

export function useHostsAllowlistUpdate(
  args?: HookArgsCallback<
    HostsAllowlistUpdateParams,
    HostsAllowlistUpdatePayload,
    HostsAllowlistUpdateResponse
  >
) {
  return usePutFunc(
    { ...args, route: '/bus/hosts/allowlist' },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          hostsSearchRoute,
          hostsAllowlistRoute,
          contractsActiveRoute,
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
    { ...args, route: '/bus/hosts/blocklist' },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          hostsSearchRoute,
          hostsBlocklistRoute,
          contractsActiveRoute,
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
    route: '/bus/host/:publicKey/resetlostsectors',
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
    route: '/bus/account/:id/resetdrift',
  })
}

// contracts

const contractsActiveRoute = '/bus/contracts'
export function useContracts(
  args?: HookArgsSwr<ContractsParams, ContractsResponse>
) {
  return useGetSwr({ ...args, route: contractsActiveRoute })
}

export function useContractsAcquire(
  args: HookArgsCallback<
    ContractAcquireParams,
    ContractAcquirePayload,
    ContractAcquireResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/contract/:id/acquire' })
}

export function useContractsRelease(
  args: HookArgsCallback<
    ContractsReleaseParams,
    ContractsReleasePayload,
    ContractsReleaseResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/contract/:id/release' })
}

export function useContract(
  args: HookArgsSwr<ContractParams, ContractResponse>
) {
  return useGetSwr({ ...args, route: '/bus/contract/:id' })
}

export function useContractAdd(
  args: HookArgsCallback<
    ContractsAddParams,
    ContractsAddPayload,
    ContractsAddResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/contract/:id/new' })
}

export function useContractRenew(
  args: HookArgsCallback<
    ContractRenewedParams,
    ContractRenewedPayload,
    ContractRenewedResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/contract/:id/renewed' })
}

export function useContractDelete(
  args?: HookArgsCallback<
    ContractDeleteParams,
    ContractDeletePayload,
    ContractDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: '/bus/contract/:id' },
    async (mutate) => {
      mutate((key) => key.startsWith('/bus/contract'))
    }
  )
}

export function useContractSets(
  args?: HookArgsSwr<ContractSetsParams, ContractSetsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/contracts/sets' })
}

export function useContractSetUpdate(
  args: HookArgsCallback<
    ContractSetUpdateParams,
    ContractSetUpdatePayload,
    ContractSetUpdateResponse
  >
) {
  return usePutFunc({ ...args, route: '/bus/contracts/sets/:set' })
}

// objects

export function useBuckets(args?: HookArgsSwr<BucketsParams, BucketsResponse>) {
  return useGetSwr({ ...args, route: '/bus/buckets' })
}

export function useBucket(args: HookArgsSwr<BucketParams, BucketResponse>) {
  return useGetSwr({ ...args, route: '/bus/bucket/:name' })
}

export function useBucketCreate(
  args?: HookArgsCallback<
    BucketCreateParams,
    BucketCreatePayload,
    BucketCreateResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/buckets' }, async (mutate) => {
    mutate((key) => key.startsWith('/bus/buckets'))
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
    { ...args, route: '/bus/bucket/:name/policy' },
    async (mutate) => {
      mutate((key) => key.startsWith('/bus/bucket'))
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
    { ...args, route: '/bus/bucket/:name' },
    async (mutate) => {
      mutate((key) => key.startsWith('/bus/bucket'))
    }
  )
}

export function useObjectDirectory(
  args: HookArgsSwr<ObjectDirectoryParams, ObjectDirectoryResponse>
) {
  return useGetSwr({ ...args, route: '/bus/objects/:key' })
}

export function useObjectList(
  args: HookArgsWithPayloadSwr<
    ObjectListParams,
    ObjectListPayload,
    ObjectListResponse
  >
) {
  return usePostSwr({ ...args, route: '/bus/objects/list' })
}

export function useObject(args: HookArgsSwr<ObjectParams, ObjectResponse>) {
  return useGetSwr({ ...args, route: '/bus/objects/:key' })
}

export function useObjectSearch(
  args: HookArgsSwr<ObjectSearchParams, ObjectSearchResponse>
) {
  return useGetSwr({ ...args, route: '/bus/search/objects' })
}

export function useObjectAdd(
  args: HookArgsCallback<ObjectAddParams, ObjectAddPayload, ObjectAddResponse>
) {
  return usePutFunc({ ...args, route: '/bus/objects/:key' })
}

export function useObjectRename(
  args?: HookArgsCallback<
    ObjectRenameParams,
    ObjectRenamePayload,
    ObjectRenameResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/objects/rename' })
}

export function useObjectDelete(
  args?: HookArgsCallback<
    ObjectDeleteParams,
    ObjectDeletePayload,
    ObjectDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: '/bus/objects/:key' },
    async (mutate) => {
      mutate((key) => key.startsWith('/bus/objects/'))
    }
  )
}

export function useObjectStats(
  args?: HookArgsSwr<ObjectsStatsParams, ObjectsStatsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/stats/objects' })
}

type Setting = Record<string, unknown> | string

export function useSettings(
  args?: HookArgsSwr<SettingsParams, SettingsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/settings' })
}

export function useSetting<T extends Setting>(
  args: HookArgsSwr<SettingParams, SettingResponse<T>>
) {
  return useGetSwr({ ...args, route: '/bus/setting/:key' })
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
      route: '/bus/setting/:key',
    },
    async (mutate, args) => {
      mutate((key) => key.startsWith(`/bus/setting/${args.params.key}`))
    }
  )
}

const alertsRoute = '/bus/alerts'
// params are required because omitting them returns a deprecated response structure
export function useAlerts(args: HookArgsSwr<AlertsParams, AlertsResponse>) {
  return useGetSwr({ ...args, route: alertsRoute })
}

export function useAlertsDismiss(
  args?: HookArgsCallback<
    AlertsDismissParams,
    AlertsDismissPayload,
    AlertsDismissResponse
  >
) {
  return usePostFunc(
    { ...args, route: '/bus/alerts/dismiss' },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(alertsRoute)
      })
    }
  )
}

// slabs

export function useSlabObjects(
  args: HookArgsSwr<SlabObjectsParams, SlabObjectsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/slab/:key/objects' })
}

// metrics

export function useMetricsContract(
  args: HookArgsSwr<ContractMetricsParams, ContractMetricsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/metric/contract' })
}

export function useMetricsContractSet(
  args: HookArgsSwr<ContractSetMetricsParams, ContractSetMetricsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/metric/contractset' })
}

export function useMetricsContractSetChurn(
  args: HookArgsSwr<
    ContractSetChurnMetricsParams,
    ContractSetChurnMetricsResponse
  >
) {
  return useGetSwr({ ...args, route: '/bus/metric/churn' })
}

export function useMetricsWallet(
  args: HookArgsSwr<WalletMetricsParams, WalletMetricsResponse>
) {
  return useGetSwr({ ...args, route: '/bus/metric/wallet' })
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
    { ...args, route: '/bus/multipart/create' },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith('/bus/multipart')
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
    { ...args, route: '/bus/multipart/complete' },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith('/bus/multipart')
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
    { ...args, route: '/bus/multipart/abort' },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith('/bus/multipart')
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
    route: '/bus/multipart/listparts',
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
    route: '/bus/multipart/listuploads',
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
    { ...args, route: '/bus/multipart/part' },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith('/bus/multipart/listparts')
      })
    }
  )
}
