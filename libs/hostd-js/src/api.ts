import {
  type AlertsDismissParams,
  type AlertsDismissPayload,
  type AlertsDismissResponse,
  type AlertsParams,
  type AlertsPayload,
  type AlertsResponse,
  type ContractsIntegrityCheckParams,
  type ContractsIntegrityCheckPayload,
  type ContractsIntegrityCheckResponse,
  type ContractsParams,
  type ContractsPayload,
  type ContractsResponse,
  type LogsSearchParams,
  type LogsSearchPayload,
  type LogsSearchResponse,
  type MetricsParams,
  type MetricsPayload,
  type MetricsPeriodParams,
  type MetricsPeriodPayload,
  type MetricsPeriodResponse,
  type MetricsResponse,
  type SettingsAnnounceParams,
  type SettingsAnnouncePayload,
  type SettingsAnnounceResponse,
  type SettingsDdnsUpdateParams,
  type SettingsDdnsUpdatePayload,
  type SettingsDdnsUpdateResponse,
  type SettingsParams,
  type SettingsPayload,
  type SettingsResponse,
  type SettingsUpdateParams,
  type SettingsUpdatePayload,
  type SettingsUpdateResponse,
  type StateConsensusParams,
  type StateConsensusPayload,
  type StateConsensusResponse,
  type StateHostParams,
  type StateHostPayload,
  type StateHostResponse,
  type SyncerConnectParams,
  type SyncerConnectPayload,
  type SyncerConnectResponse,
  type SyncerPeersParams,
  type SyncerPeersPayload,
  type SyncerPeersResponse,
  type SystemDirectoryCreateParams,
  type SystemDirectoryCreatePayload,
  type SystemDirectoryCreateResponse,
  type SystemDirectoryParams,
  type SystemDirectoryPayload,
  type SystemDirectoryResponse,
  type TxPoolFeeParams,
  type TxPoolFeePayload,
  type TxPoolFeeResponse,
  type VolumeCancelParams,
  type VolumeCancelPayload,
  type VolumeCancelResponse,
  type VolumeCreateParams,
  type VolumeCreatePayload,
  type VolumeCreateResponse,
  type VolumeDeleteParams,
  type VolumeDeletePayload,
  type VolumeDeleteResponse,
  type VolumeParams,
  type VolumePayload,
  type VolumeResizeParams,
  type VolumeResizePayload,
  type VolumeResizeResponse,
  type VolumeResponse,
  type VolumeUpdateParams,
  type VolumeUpdatePayload,
  type VolumeUpdateResponse,
  type VolumesParams,
  type VolumesPayload,
  type VolumesResponse,
  type WalletParams,
  type WalletPayload,
  type WalletPendingParams,
  type WalletPendingPayload,
  type WalletPendingResponse,
  type WalletResponse,
  type WalletSendParams,
  type WalletSendPayload,
  type WalletSendResponse,
  type WalletTransactionsParams,
  type WalletTransactionsPayload,
  type WalletTransactionsResponse,
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
      walletRoute,
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
    logsSearch: buildRequestHandler<
      LogsSearchParams,
      LogsSearchPayload,
      LogsSearchResponse
    >(axios, 'post', logEntriesRoute),
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
  }
}
