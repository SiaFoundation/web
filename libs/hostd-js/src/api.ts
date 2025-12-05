import {
  AlertsDismissParams,
  AlertsDismissPayload,
  AlertsDismissResponse,
  AlertsParams,
  AlertsPayload,
  AlertsResponse,
  ConsensusTipParams,
  ConsensusTipPayload,
  ConsensusTipResponse,
  ConsensusTipStateParams,
  ConsensusTipStatePayload,
  ConsensusTipStateResponse,
  ContractsIntegrityCheckParams,
  ContractsIntegrityCheckPayload,
  ContractsIntegrityCheckResponse,
  ContractsParams,
  ContractsPayload,
  ContractsResponse,
  IndexTipParams,
  IndexTipPayload,
  IndexTipResponse,
  MetricsParams,
  MetricsPayload,
  MetricsPeriodParams,
  MetricsPeriodPayload,
  MetricsPeriodResponse,
  MetricsResponse,
  SettingsAnnounceParams,
  SettingsAnnouncePayload,
  SettingsAnnounceResponse,
  SettingsDdnsUpdateParams,
  SettingsDdnsUpdatePayload,
  SettingsDdnsUpdateResponse,
  SettingsParams,
  SettingsPayload,
  SettingsResponse,
  SettingsUpdateParams,
  SettingsUpdatePayload,
  SettingsUpdateResponse,
  HostStateParams,
  HostStatePayload,
  HostStateResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  SyncerPeersParams,
  SyncerPeersPayload,
  SyncerPeersResponse,
  SystemDirectoryCreateParams,
  SystemDirectoryCreatePayload,
  SystemDirectoryCreateResponse,
  SystemDirectoryParams,
  SystemDirectoryPayload,
  SystemDirectoryResponse,
  SystemBackupParams,
  SystemBackupPayload,
  SystemBackupResponse,
  TxPoolFeeParams,
  TxPoolFeePayload,
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
  VolumePayload,
  VolumeResizeParams,
  VolumeResizePayload,
  VolumeResizeResponse,
  VolumeResponse,
  VolumeUpdateParams,
  VolumeUpdatePayload,
  VolumeUpdateResponse,
  VolumesParams,
  VolumesPayload,
  VolumesResponse,
  WalletEventsParams,
  WalletEventsPayload,
  WalletEventsResponse,
  WalletParams,
  WalletPayload,
  WalletPendingParams,
  WalletPendingPayload,
  WalletPendingResponse,
  WalletResponse,
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
  alertsDismissRoute,
  alertsRoute,
  consensusTipRoute,
  consensusTipStateRoute,
  contractsIdIntegrityRoute,
  contractsRoute,
  indexTipRoute,
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
  walletEventsRoute,
  walletPendingRoute,
  walletRoute,
  walletSendRoute,
  V2ContractsParams,
  V2ContractsPayload,
  V2ContractsResponse,
  v2ContractsRoute,
} from '@siafoundation/hostd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Hostd({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    stateHost: buildRequestHandler<
      HostStateParams,
      HostStatePayload,
      HostStateResponse
    >(axios, 'get', hostStateRoute),
    consensusTip: buildRequestHandler<
      ConsensusTipParams,
      ConsensusTipPayload,
      ConsensusTipResponse
    >(axios, 'get', consensusTipRoute),
    consensusTipState: buildRequestHandler<
      ConsensusTipStateParams,
      ConsensusTipStatePayload,
      ConsensusTipStateResponse
    >(axios, 'get', consensusTipStateRoute),
    indexTip: buildRequestHandler<
      IndexTipParams,
      IndexTipPayload,
      IndexTipResponse
    >(axios, 'get', indexTipRoute),
    syncerPeers: buildRequestHandler<
      SyncerPeersParams,
      SyncerPeersPayload,
      SyncerPeersResponse
    >(axios, 'get', syncerPeersRoute),
    syncerConnect: buildRequestHandler<
      SyncerConnectParams,
      SyncerConnectPayload,
      SyncerConnectResponse
    >(axios, 'put', syncerPeersRoute),
    wallet: buildRequestHandler<WalletParams, WalletPayload, WalletResponse>(
      axios,
      'get',
      walletRoute,
    ),
    walletPending: buildRequestHandler<
      WalletPendingParams,
      WalletPendingPayload,
      WalletPendingResponse
    >(axios, 'get', walletPendingRoute),
    walletEvents: buildRequestHandler<
      WalletEventsParams,
      WalletEventsPayload,
      WalletEventsResponse
    >(axios, 'get', walletEventsRoute),
    walletSend: buildRequestHandler<
      WalletSendParams,
      WalletSendPayload,
      WalletSendResponse
    >(axios, 'post', walletSendRoute),
    txPoolFee: buildRequestHandler<
      TxPoolFeeParams,
      TxPoolFeePayload,
      TxPoolFeeResponse
    >(axios, 'get', tpoolFeeRoute),
    contracts: buildRequestHandler<
      ContractsParams,
      ContractsPayload,
      ContractsResponse
    >(axios, 'post', contractsRoute),
    contractsV2: buildRequestHandler<
      V2ContractsParams,
      V2ContractsPayload,
      V2ContractsResponse
    >(axios, 'post', v2ContractsRoute),
    contractsIntegrityCheck: buildRequestHandler<
      ContractsIntegrityCheckParams,
      ContractsIntegrityCheckPayload,
      ContractsIntegrityCheckResponse
    >(axios, 'put', contractsIdIntegrityRoute),
    metrics: buildRequestHandler<
      MetricsParams,
      MetricsPayload,
      MetricsResponse
    >(axios, 'get', metricsRoute),
    metricsPeriod: buildRequestHandler<
      MetricsPeriodParams,
      MetricsPeriodPayload,
      MetricsPeriodResponse
    >(axios, 'get', metricsIntervalRoute),
    settings: buildRequestHandler<
      SettingsParams,
      SettingsPayload,
      SettingsResponse
    >(axios, 'get', settingsRoute),
    settingsUpdate: buildRequestHandler<
      SettingsUpdateParams,
      SettingsUpdatePayload,
      SettingsUpdateResponse
    >(axios, 'patch', settingsRoute),
    settingsAnnounce: buildRequestHandler<
      SettingsAnnounceParams,
      SettingsAnnouncePayload,
      SettingsAnnounceResponse
    >(axios, 'post', settingsAnnounceRoute),
    settingsDdnsUpdate: buildRequestHandler<
      SettingsDdnsUpdateParams,
      SettingsDdnsUpdatePayload,
      SettingsDdnsUpdateResponse
    >(axios, 'put', settingsDdnsUpdateRoute),
    volumes: buildRequestHandler<
      VolumesParams,
      VolumesPayload,
      VolumesResponse
    >(axios, 'get', volumesRoute),
    volume: buildRequestHandler<VolumeParams, VolumePayload, VolumeResponse>(
      axios,
      'get',
      volumesIdRoute,
    ),
    volumeCreate: buildRequestHandler<
      VolumeCreateParams,
      VolumeCreatePayload,
      VolumeCreateResponse
    >(axios, 'post', volumesRoute),
    volumeUpdate: buildRequestHandler<
      VolumeUpdateParams,
      VolumeUpdatePayload,
      VolumeUpdateResponse
    >(axios, 'put', volumesIdRoute),
    volumeDelete: buildRequestHandler<
      VolumeDeleteParams,
      VolumeDeletePayload,
      VolumeDeleteResponse
    >(axios, 'delete', volumesIdRoute),
    volumeResize: buildRequestHandler<
      VolumeResizeParams,
      VolumeResizePayload,
      VolumeResizeResponse
    >(axios, 'put', volumesIdResizeRoute),
    volumeCancel: buildRequestHandler<
      VolumeCancelParams,
      VolumeCancelPayload,
      VolumeCancelResponse
    >(axios, 'delete', volumesIdCancelRoute),
    systemDirectory: buildRequestHandler<
      SystemDirectoryParams,
      SystemDirectoryPayload,
      SystemDirectoryResponse
    >(axios, 'get', systemDirRoute),
    systemDirectoryCreate: buildRequestHandler<
      SystemDirectoryCreateParams,
      SystemDirectoryCreatePayload,
      SystemDirectoryCreateResponse
    >(axios, 'put', systemDirRoute),
    alerts: buildRequestHandler<AlertsParams, AlertsPayload, AlertsResponse>(
      axios,
      'get',
      alertsRoute,
    ),
    alertsDismiss: buildRequestHandler<
      AlertsDismissParams,
      AlertsDismissPayload,
      AlertsDismissResponse
    >(axios, 'post', alertsDismissRoute),
    systemBackup: buildRequestHandler<
      SystemBackupParams,
      SystemBackupPayload,
      SystemBackupResponse
    >(axios, 'post', systemBackupRoute),
  }
}
