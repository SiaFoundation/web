import {
  AlertsDismissParams,
  AlertsDismissPayload,
  AlertsDismissResponse,
  AlertsParams,
  AlertsPayload,
  AlertsResponse,
  ContractsIntegrityCheckParams,
  ContractsIntegrityCheckPayload,
  ContractsIntegrityCheckResponse,
  ContractsParams,
  ContractsPayload,
  ContractsResponse,
  LogsSearchParams,
  LogsSearchPayload,
  LogsSearchResponse,
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
  StateConsensusParams,
  StateConsensusPayload,
  StateConsensusResponse,
  StateHostParams,
  StateHostPayload,
  StateHostResponse,
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
  WalletParams,
  WalletPayload,
  WalletPendingParams,
  WalletPendingPayload,
  WalletPendingResponse,
  WalletResponse,
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
  WalletTransactionsParams,
  WalletTransactionsPayload,
  WalletTransactionsResponse,
  alertsDismissRoute,
  alertsRoute,
  contractsIdIntegrityRoute,
  contractsRoute,
  logEntriesRoute,
  metricsIntervalRoute,
  metricsRoute,
  settingsAnnounceRoute,
  settingsDdnsUpdateRoute,
  settingsRoute,
  stateConsensusRoute,
  stateHostRoute,
  syncerPeersRoute,
  systemDirRoute,
  tpoolFeeRoute,
  volumesIdCancelRoute,
  volumesIdResizeRoute,
  volumesIdRoute,
  volumesRoute,
  walletPendingRoute,
  walletRoute,
  walletSendRoute,
  walletTransactionsRoute,
} from '@siafoundation/hostd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Hostd({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    stateHost: buildRequestHandler<
      StateHostParams,
      StateHostPayload,
      StateHostResponse
    >(axios, 'get', stateHostRoute),
    stateConsensus: buildRequestHandler<
      StateConsensusParams,
      StateConsensusPayload,
      StateConsensusResponse
    >(axios, 'get', stateConsensusRoute),
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
      walletRoute
    ),
    walletTransactions: buildRequestHandler<
      WalletTransactionsParams,
      WalletTransactionsPayload,
      WalletTransactionsResponse
    >(axios, 'get', walletTransactionsRoute),
    walletPending: buildRequestHandler<
      WalletPendingParams,
      WalletPendingPayload,
      WalletPendingResponse
    >(axios, 'get', walletPendingRoute),
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
      volumesIdRoute
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
    logsSearch: buildRequestHandler<
      LogsSearchParams,
      LogsSearchPayload,
      LogsSearchResponse
    >(axios, 'post', logEntriesRoute),
    alerts: buildRequestHandler<AlertsParams, AlertsPayload, AlertsResponse>(
      axios,
      'get',
      alertsRoute
    ),
    alertsDismiss: buildRequestHandler<
      AlertsDismissParams,
      AlertsDismissPayload,
      AlertsDismissResponse
    >(axios, 'post', alertsDismissRoute),
  }
}
