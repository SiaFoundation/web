import {
  StateParams,
  StatePayload,
  StateResponse,
  stateRoute,
  AccountsParams,
  AccountsPayload,
  AccountsResponse,
  accountsRoute,
  AccountAddParams,
  AccountAddPayload,
  AccountAddResponse,
  accountRoute,
  AccountRotateKeyParams,
  AccountRotateKeyPayload,
  AccountRotateKeyResponse,
  AccountDeleteParams,
  AccountDeletePayload,
  AccountDeleteResponse,
  ContractParams,
  ContractPayload,
  ContractResponse,
  contractRoute,
  ContractsParams,
  ContractsPayload,
  ContractsResponse,
  contractsRoute,
  ExplorerExchangeRateSiacoinParams,
  ExplorerExchangeRateSiacoinPayload,
  ExplorerExchangeRateSiacoinResponse,
  explorerExchangeRateSiacoinRoute,
  HostParams,
  HostPayload,
  HostResponse,
  hostRoute,
  HostsParams,
  HostsPayload,
  HostsResponse,
  hostsRoute,
  HostsBlocklistParams,
  HostsBlocklistPayload,
  HostsBlocklistResponse,
  hostsBlocklistRoute,
  HostsBlocklistUpdateParams,
  HostsBlocklistUpdatePayload,
  HostsBlocklistUpdateResponse,
  hostsBlocklistUpdateRoute,
  HostsBlocklistDeleteParams,
  HostsBlocklistDeletePayload,
  HostsBlocklistDeleteResponse,
  hostsBlocklistDeleteRoute,
  SettingsContractsParams,
  SettingsContractsPayload,
  SettingsContractsResponse,
  settingsContractsRoute,
  SettingsContractsUpdateParams,
  SettingsContractsUpdatePayload,
  SettingsContractsUpdateResponse,
  settingsContractsUpdateRoute,
  SettingsHostsParams,
  SettingsHostsPayload,
  SettingsHostsResponse,
  settingsHostsRoute,
  SettingsHostsUpdateParams,
  SettingsHostsUpdatePayload,
  SettingsHostsUpdateResponse,
  settingsHostsUpdateRoute,
  SettingsPricePinningParams,
  SettingsPricePinningPayload,
  SettingsPricePinningResponse,
  settingsPricePinningRoute,
  SettingsPricePinningUpdateParams,
  SettingsPricePinningUpdatePayload,
  SettingsPricePinningUpdateResponse,
  settingsPricePinningUpdateRoute,
  WalletParams,
  WalletPayload,
  WalletResponse,
  walletRoute,
  WalletEventsParams,
  WalletEventsPayload,
  WalletEventsResponse,
  walletEventsRoute,
  WalletPendingParams,
  WalletPendingPayload,
  WalletPendingResponse,
  walletPendingRoute,
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
  walletSendRoute,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  syncerConnectRoute,
  TxpoolRecommendedFeeParams,
  TxpoolRecommendedFeePayload,
  TxpoolRecommendedFeeResponse,
  txpoolRecommendedFeeRoute,
  HostScanParams,
  HostScanPayload,
  HostScanResponse,
  hostScanRoute,
} from '@siafoundation/indexd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Admin({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    state: buildRequestHandler<StateParams, StatePayload, StateResponse>(
      axios,
      'get',
      stateRoute,
    ),
    syncerConnect: buildRequestHandler<
      SyncerConnectParams,
      SyncerConnectPayload,
      SyncerConnectResponse
    >(axios, 'post', syncerConnectRoute),
    txpoolRecommendedFee: buildRequestHandler<
      TxpoolRecommendedFeeParams,
      TxpoolRecommendedFeePayload,
      TxpoolRecommendedFeeResponse
    >(axios, 'get', txpoolRecommendedFeeRoute),
    accounts: buildRequestHandler<
      AccountsParams,
      AccountsPayload,
      AccountsResponse
    >(axios, 'get', accountsRoute),
    accountAdd: buildRequestHandler<
      AccountAddParams,
      AccountAddPayload,
      AccountAddResponse
    >(axios, 'post', accountRoute),
    accountRotateKey: buildRequestHandler<
      AccountRotateKeyParams,
      AccountRotateKeyPayload,
      AccountRotateKeyResponse
    >(axios, 'put', accountRoute),
    accountDelete: buildRequestHandler<
      AccountDeleteParams,
      AccountDeletePayload,
      AccountDeleteResponse
    >(axios, 'delete', accountRoute),
    contract: buildRequestHandler<
      ContractParams,
      ContractPayload,
      ContractResponse
    >(axios, 'get', contractRoute),
    contracts: buildRequestHandler<
      ContractsParams,
      ContractsPayload,
      ContractsResponse
    >(axios, 'get', contractsRoute),
    explorerExchangeRateSiacoin: buildRequestHandler<
      ExplorerExchangeRateSiacoinParams,
      ExplorerExchangeRateSiacoinPayload,
      ExplorerExchangeRateSiacoinResponse
    >(axios, 'get', explorerExchangeRateSiacoinRoute),
    host: buildRequestHandler<HostParams, HostPayload, HostResponse>(
      axios,
      'get',
      hostRoute,
    ),
    hostScan: buildRequestHandler<
      HostScanParams,
      HostScanPayload,
      HostScanResponse
    >(axios, 'post', hostScanRoute),
    hosts: buildRequestHandler<HostsParams, HostsPayload, HostsResponse>(
      axios,
      'get',
      hostsRoute,
    ),
    hostsBlocklist: buildRequestHandler<
      HostsBlocklistParams,
      HostsBlocklistPayload,
      HostsBlocklistResponse
    >(axios, 'get', hostsBlocklistRoute),
    hostsBlocklistUpdate: buildRequestHandler<
      HostsBlocklistUpdateParams,
      HostsBlocklistUpdatePayload,
      HostsBlocklistUpdateResponse
    >(axios, 'put', hostsBlocklistUpdateRoute),
    hostsBlocklistDelete: buildRequestHandler<
      HostsBlocklistDeleteParams,
      HostsBlocklistDeletePayload,
      HostsBlocklistDeleteResponse
    >(axios, 'delete', hostsBlocklistDeleteRoute),
    settingsContracts: buildRequestHandler<
      SettingsContractsParams,
      SettingsContractsPayload,
      SettingsContractsResponse
    >(axios, 'get', settingsContractsRoute),
    settingsContractsUpdate: buildRequestHandler<
      SettingsContractsUpdateParams,
      SettingsContractsUpdatePayload,
      SettingsContractsUpdateResponse
    >(axios, 'put', settingsContractsUpdateRoute),
    settingsHosts: buildRequestHandler<
      SettingsHostsParams,
      SettingsHostsPayload,
      SettingsHostsResponse
    >(axios, 'get', settingsHostsRoute),
    settingsHostsUpdate: buildRequestHandler<
      SettingsHostsUpdateParams,
      SettingsHostsUpdatePayload,
      SettingsHostsUpdateResponse
    >(axios, 'put', settingsHostsUpdateRoute),
    settingsPricePinning: buildRequestHandler<
      SettingsPricePinningParams,
      SettingsPricePinningPayload,
      SettingsPricePinningResponse
    >(axios, 'get', settingsPricePinningRoute),
    settingsPricePinningUpdate: buildRequestHandler<
      SettingsPricePinningUpdateParams,
      SettingsPricePinningUpdatePayload,
      SettingsPricePinningUpdateResponse
    >(axios, 'put', settingsPricePinningUpdateRoute),
    wallet: buildRequestHandler<WalletParams, WalletPayload, WalletResponse>(
      axios,
      'get',
      walletRoute,
    ),
    walletEvents: buildRequestHandler<
      WalletEventsParams,
      WalletEventsPayload,
      WalletEventsResponse
    >(axios, 'get', walletEventsRoute),
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
  }
}
