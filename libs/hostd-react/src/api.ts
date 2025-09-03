import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  usePostSwr,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
  usePutSwr,
  useDeleteFunc,
  delay,
  usePatchFunc,
} from '@siafoundation/react-core'
import useSWR from 'swr'
import {
  AlertsDismissParams,
  AlertsDismissPayload,
  AlertsDismissResponse,
  AlertsParams,
  AlertsResponse,
  ContractsIntegrityCheckParams,
  ContractsIntegrityCheckPayload,
  ContractsIntegrityCheckResponse,
  ContractsParams,
  ContractsPayload,
  ContractsResponse,
  SettingsPinnedResponse,
  SettingsPinnedUpdateParams,
  SettingsPinnedUpdatePayload,
  SettingsPinnedUpdateResponse,
  MetricsParams,
  MetricsPeriodParams,
  MetricsPeriodResponse,
  MetricsResponse,
  SettingsAnnounceParams,
  SettingsAnnouncePayload,
  SettingsAnnounceResponse,
  SettingsDdnsUpdateParams,
  SettingsDdnsUpdatePayload,
  SettingsDdnsUpdateResponse,
  SettingsParams,
  SettingsResponse,
  SettingsUpdateParams,
  SettingsUpdatePayload,
  SettingsUpdateResponse,
  HostStateParams,
  HostStateResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  SyncerPeersParams,
  SyncerPeersResponse,
  SystemDirectoryCreateParams,
  SystemDirectoryCreatePayload,
  SystemDirectoryCreateResponse,
  SystemDirectoryParams,
  SystemDirectoryResponse,
  SystemBackupParams,
  SystemBackupPayload,
  SystemBackupResponse,
  TxPoolFeeParams,
  TxPoolFeeResponse,
  VolumeCancelParams,
  VolumeCancelPayload,
  VolumeCancelResponse,
  VolumeCreateParams,
  VolumeCreatePayload,
  VolumeCreateResponse,
  VolumeDeleteParams,
  VolumeDeletePayload,
  VolumeDeleteResponse,
  VolumeParams,
  VolumeResizeParams,
  VolumeResizePayload,
  VolumeResizeResponse,
  VolumeResponse,
  VolumeUpdateParams,
  VolumeUpdatePayload,
  VolumeUpdateResponse,
  VolumesParams,
  VolumesResponse,
  WalletParams,
  WalletPendingParams,
  WalletPendingResponse,
  WalletResponse,
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
  alertsDismissRoute,
  alertsRoute,
  contractsIdIntegrityRoute,
  contractsRoute,
  metricsIntervalRoute,
  metricsRoute,
  settingsAnnounceRoute,
  settingsDdnsUpdateRoute,
  settingsRoute,
  hostStateRoute,
  syncerPeersRoute,
  systemDirRoute,
  systemBackupRoute,
  tpoolFeeRoute,
  volumesIdCancelRoute,
  volumesIdResizeRoute,
  volumesIdRoute,
  volumesRoute,
  walletPendingRoute,
  walletRoute,
  walletSendRoute,
  ConsensusNetworkParams,
  ConsensusNetworkResponse,
  consensusNetworkRoute,
  IndexTipParams,
  IndexTipResponse,
  indexTipRoute,
  ConsensusTipParams,
  ConsensusTipResponse,
  ConsensusTipStateResponse,
  ConsensusTipStateParams,
  consensusTipStateRoute,
  consensusTipRoute,
  WalletEventsParams,
  WalletEventsResponse,
  walletEventsRoute,
  V2ContractsParams,
  V2ContractsPayload,
  V2ContractsResponse,
  v2ContractsRoute,
} from '@siafoundation/hostd-types'
import { getBlockHeightFromGenesis } from '@siafoundation/units'

// state

export function useHostState(
  args?: HookArgsSwr<HostStateParams, HostStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: hostStateRoute,
  })
}

export function useConsensusTip(
  args?: HookArgsSwr<ConsensusTipParams, ConsensusTipResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusTipRoute,
  })
}

export function useConsensusTipState(
  args?: HookArgsSwr<ConsensusTipStateParams, ConsensusTipStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusTipStateRoute,
  })
}

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusNetworkRoute,
  })
}

export function useIndexTip(
  args?: HookArgsSwr<IndexTipParams, IndexTipResponse>,
) {
  return useGetSwr({
    ...args,
    route: indexTipRoute,
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

// syncer

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>,
) {
  return useGetSwr({
    ...args,
    route: syncerPeersRoute,
  })
}

export function useSyncerConnect(
  args?: HookArgsCallback<
    SyncerConnectParams,
    SyncerConnectPayload,
    SyncerConnectResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      route: syncerPeersRoute,
    },
    async (mutate) => {
      mutate((key) => key === syncerPeersRoute)
    },
  )
}

// wallet

export function useWallet(args?: HookArgsSwr<WalletParams, WalletResponse>) {
  return useGetSwr({
    ...args,
    route: walletRoute,
  })
}

export function useWalletEvents(
  args?: HookArgsSwr<WalletEventsParams, WalletEventsResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletEventsRoute,
  })
}

export function useWalletPending(
  args?: HookArgsSwr<WalletPendingParams, WalletPendingResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletPendingRoute,
  })
}

export function useWalletSend(
  args?: HookArgsCallback<
    WalletSendParams,
    WalletSendPayload,
    WalletSendResponse
  >,
) {
  return usePostFunc({ ...args, route: walletSendRoute }, async (mutate) => {
    await delay(2_000)
    mutate((key) => {
      return (
        // key.startsWith(txPoolTransactionsRoute) ||
        key.startsWith(walletPendingRoute)
      )
    })
  })
}

// txpool

export function useTxPoolFee(
  args?: HookArgsSwr<TxPoolFeeParams, TxPoolFeeResponse>,
) {
  return useGetSwr({
    ...args,
    route: tpoolFeeRoute,
  })
}

// contracts

export function useContracts(
  args: HookArgsWithPayloadSwr<
    ContractsParams,
    ContractsPayload,
    ContractsResponse
  >,
) {
  return usePostSwr({
    ...args,
    route: contractsRoute,
  })
}

export function useContractsV2(
  args: HookArgsWithPayloadSwr<
    V2ContractsParams,
    V2ContractsPayload,
    V2ContractsResponse
  >,
) {
  return usePostSwr({
    ...args,
    route: v2ContractsRoute,
  })
}

export function useContractsIntegrityCheck(
  args?: HookArgsCallback<
    ContractsIntegrityCheckParams,
    ContractsIntegrityCheckPayload,
    ContractsIntegrityCheckResponse
  >,
) {
  return usePutFunc({ ...args, route: contractsIdIntegrityRoute })
}

// metrics

export function useMetrics(args?: HookArgsSwr<MetricsParams, MetricsResponse>) {
  return useGetSwr({
    ...args,
    route: metricsRoute,
  })
}

export function useMetricsPeriod(
  args?: HookArgsSwr<MetricsPeriodParams, MetricsPeriodResponse>,
) {
  return useGetSwr({
    ...args,
    route: metricsIntervalRoute,
  })
}

// settings

export function useSettings(
  args?: HookArgsSwr<SettingsParams, SettingsResponse>,
) {
  return useGetSwr({
    ...args,
    route: settingsRoute,
  })
}

export function useSettingsUpdate(
  args?: HookArgsCallback<
    SettingsUpdateParams,
    SettingsUpdatePayload,
    SettingsUpdateResponse
  >,
) {
  return usePatchFunc({ ...args, route: settingsRoute }, async (mutate) => {
    await mutate((key) => {
      return key.startsWith(settingsRoute) || key.startsWith(hostStateRoute)
    })
  })
}

export function useSettingsAnnounce(
  args?: HookArgsCallback<
    SettingsAnnounceParams,
    SettingsAnnouncePayload,
    SettingsAnnounceResponse
  >,
) {
  return usePostFunc({ ...args, route: settingsAnnounceRoute })
}

export function useSettingsDdnsUpdate(
  args?: HookArgsWithPayloadSwr<
    SettingsDdnsUpdateParams,
    SettingsDdnsUpdatePayload,
    SettingsDdnsUpdateResponse
  >,
) {
  return usePutSwr({ ...args, payload: {}, route: settingsDdnsUpdateRoute })
}

const settingsPinnedRoute = '/settings/pinned'
export function useSettingsPinned(
  args?: HookArgsSwr<SettingsParams, SettingsPinnedResponse>,
) {
  return useGetSwr({
    ...args,
    route: settingsPinnedRoute,
  })
}

export function useSettingsPinnedUpdate(
  args?: HookArgsCallback<
    SettingsPinnedUpdateParams,
    SettingsPinnedUpdatePayload,
    SettingsPinnedUpdateResponse
  >,
) {
  return usePutFunc({ ...args, route: settingsPinnedRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(settingsPinnedRoute)
    })
  })
}

// volumes

export function useVolumes(args?: HookArgsSwr<VolumesParams, VolumesResponse>) {
  return useGetSwr({ ...args, route: volumesRoute })
}

export function useVolume(args?: HookArgsSwr<VolumeParams, VolumeResponse>) {
  return useGetSwr({ ...args, route: volumesIdRoute })
}

export function useVolumeCreate(
  args?: HookArgsCallback<
    VolumeCreateParams,
    VolumeCreatePayload,
    VolumeCreateResponse
  >,
) {
  return usePostFunc({ ...args, route: volumesRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(volumesRoute)
    })
  })
}

export function useVolumeUpdate(
  args?: HookArgsCallback<
    VolumeUpdateParams,
    VolumeUpdatePayload,
    VolumeUpdateResponse
  >,
) {
  return usePutFunc({ ...args, route: volumesIdRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(volumesRoute)
    })
  })
}

export function useVolumeDelete(
  args?: HookArgsCallback<
    VolumeDeleteParams,
    VolumeDeletePayload,
    VolumeDeleteResponse
  >,
) {
  return useDeleteFunc({ ...args, route: volumesIdRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(volumesRoute)
    })
  })
}

export function useVolumeResize(
  args?: HookArgsCallback<
    VolumeResizeParams,
    VolumeResizePayload,
    VolumeResizeResponse
  >,
) {
  return usePutFunc(
    { ...args, route: volumesIdResizeRoute },
    async (mutate) => {
      await delay(10_000)
      mutate((key) => {
        return key.startsWith(volumesRoute)
      })
    },
  )
}

export function useVolumeCancel(
  args?: HookArgsCallback<
    VolumeCancelParams,
    VolumeCancelPayload,
    VolumeCancelResponse
  >,
) {
  return useDeleteFunc(
    { ...args, route: volumesIdCancelRoute },
    async (mutate) => {
      await delay(3_000)
      mutate((key) => {
        return key.startsWith(volumesRoute)
      })
    },
  )
}

export function useSystemDirectory(
  args: HookArgsSwr<SystemDirectoryParams, SystemDirectoryResponse>,
) {
  return useGetSwr({ ...args, route: systemDirRoute })
}

export function useSystemDirectoryCreate(
  args?: HookArgsCallback<
    SystemDirectoryCreateParams,
    SystemDirectoryCreatePayload,
    SystemDirectoryCreateResponse
  >,
) {
  return usePutFunc({ ...args, route: systemDirRoute })
}

// alerts

export function useAlerts(args?: HookArgsSwr<AlertsParams, AlertsResponse>) {
  return useGetSwr({ ...args, route: alertsRoute })
}

export function useAlertsDismiss(
  args?: HookArgsCallback<
    AlertsDismissParams,
    AlertsDismissPayload,
    AlertsDismissResponse
  >,
) {
  return usePostFunc({ ...args, route: alertsDismissRoute }, async (mutate) => {
    mutate((key) => {
      return key.startsWith(alertsRoute)
    })
  })
}

// backup

export function useSystemBackup(
  args?: HookArgsCallback<
    SystemBackupParams,
    SystemBackupPayload,
    SystemBackupResponse
  >,
) {
  return usePostFunc({ ...args, route: systemBackupRoute })
}
