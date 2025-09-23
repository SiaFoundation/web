import {
  AdminStateParams,
  AdminStatePayload,
  AdminStateResponse,
  adminStateRoute,
  AdminAccountsParams,
  AdminAccountsPayload,
  AdminAccountsResponse,
  adminAccountsRoute,
  AdminAccountAddParams,
  AdminAccountAddPayload,
  AdminAccountAddResponse,
  adminAccountRoute,
  AdminAccountRotateKeyParams,
  AdminAccountRotateKeyPayload,
  AdminAccountRotateKeyResponse,
  AdminAccountDeleteParams,
  AdminAccountDeletePayload,
  AdminAccountDeleteResponse,
  AdminContractParams,
  AdminContractPayload,
  AdminContractResponse,
  adminContractRoute,
  AdminContractsParams,
  AdminContractsPayload,
  AdminContractsResponse,
  adminContractsRoute,
  AdminExplorerExchangeRateSiacoinParams,
  AdminExplorerExchangeRateSiacoinPayload,
  AdminExplorerExchangeRateSiacoinResponse,
  adminExplorerExchangeRateSiacoinRoute,
  AdminHostParams,
  AdminHostPayload,
  AdminHostResponse,
  adminHostRoute,
  AdminHostsParams,
  AdminHostsPayload,
  AdminHostsResponse,
  adminHostsRoute,
  AdminHostsBlocklistParams,
  AdminHostsBlocklistPayload,
  AdminHostsBlocklistResponse,
  adminHostsBlocklistRoute,
  AdminHostsBlocklistUpdateParams,
  AdminHostsBlocklistUpdatePayload,
  AdminHostsBlocklistUpdateResponse,
  adminHostsBlocklistUpdateRoute,
  AdminHostsBlocklistDeleteParams,
  AdminHostsBlocklistDeletePayload,
  AdminHostsBlocklistDeleteResponse,
  adminHostsBlocklistDeleteRoute,
  AdminSettingsContractsParams,
  AdminSettingsContractsPayload,
  AdminSettingsContractsResponse,
  adminSettingsContractsRoute,
  AdminSettingsContractsUpdateParams,
  AdminSettingsContractsUpdatePayload,
  AdminSettingsContractsUpdateResponse,
  adminSettingsContractsUpdateRoute,
  AdminSettingsHostsParams,
  AdminSettingsHostsPayload,
  AdminSettingsHostsResponse,
  adminSettingsHostsRoute,
  AdminSettingsHostsUpdateParams,
  AdminSettingsHostsUpdatePayload,
  AdminSettingsHostsUpdateResponse,
  adminSettingsHostsUpdateRoute,
  AdminSettingsPricePinningParams,
  AdminSettingsPricePinningPayload,
  AdminSettingsPricePinningResponse,
  adminSettingsPricePinningRoute,
  AdminSettingsPricePinningUpdateParams,
  AdminSettingsPricePinningUpdatePayload,
  AdminSettingsPricePinningUpdateResponse,
  adminSettingsPricePinningUpdateRoute,
  AdminWalletParams,
  AdminWalletPayload,
  AdminWalletResponse,
  adminWalletRoute,
  AdminWalletEventsParams,
  AdminWalletEventsPayload,
  AdminWalletEventsResponse,
  adminWalletEventsRoute,
  AdminWalletPendingParams,
  AdminWalletPendingPayload,
  AdminWalletPendingResponse,
  adminWalletPendingRoute,
  AdminWalletSendParams,
  AdminWalletSendPayload,
  AdminWalletSendResponse,
  adminWalletSendRoute,
  AdminSyncerConnectParams,
  AdminSyncerConnectPayload,
  AdminSyncerConnectResponse,
  adminSyncerConnectRoute,
  AdminTxpoolRecommendedFeeParams,
  AdminTxpoolRecommendedFeePayload,
  AdminTxpoolRecommendedFeeResponse,
  adminTxpoolRecommendedFeeRoute,
  AdminHostScanParams,
  AdminHostScanPayload,
  AdminHostScanResponse,
  adminHostScanRoute,
  AdminConnectKeysParams,
  AdminConnectKeysPayload,
  AdminConnectKeysResponse,
  adminConnectKeysRoute,
  AdminConnectKeyAddParams,
  AdminConnectKeyAddPayload,
  AdminConnectKeyAddResponse,
  adminConnectKeyAddRoute,
  AdminConnectKeyUpdateParams,
  AdminConnectKeyUpdatePayload,
  AdminConnectKeyUpdateResponse,
  adminConnectKeyUpdateRoute,
  AdminConnectKeyDeleteParams,
  AdminConnectKeyDeletePayload,
  AdminConnectKeyDeleteResponse,
  adminConnectKeyDeleteRoute,
  AdminAlertsParams,
  AdminAlertsPayload,
  AdminAlertsResponse,
  adminAlertsRoute,
  AdminAlertsDismissParams,
  AdminAlertsDismissPayload,
  AdminAlertsDismissResponse,
  adminAlertsDismissRoute,
  AdminStatsSectorsParams,
  AdminStatsSectorsPayload,
  AdminStatsSectorsResponse,
  adminStatsSectorsRoute,
  AdminConnectKeyParams,
  AdminConnectKeyPayload,
  AdminConnectKeyResponse,
  adminConnectKeyRoute,
  adminStatsAccountsRoute,
  AdminStatsAccountsResponse,
  AdminStatsAccountsPayload,
  AdminStatsAccountsParams,
  AdminAlertParams,
  AdminAlertPayload,
  AdminAlertResponse,
  adminAlertsIdRoute,
  AdminAccountParams,
  AdminAccountPayload,
  AdminAccountResponse,
} from '@siafoundation/indexd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Admin({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    state: buildRequestHandler<
      AdminStateParams,
      AdminStatePayload,
      AdminStateResponse
    >(axios, 'get', adminStateRoute),
    syncerConnect: buildRequestHandler<
      AdminSyncerConnectParams,
      AdminSyncerConnectPayload,
      AdminSyncerConnectResponse
    >(axios, 'post', adminSyncerConnectRoute),
    txpoolRecommendedFee: buildRequestHandler<
      AdminTxpoolRecommendedFeeParams,
      AdminTxpoolRecommendedFeePayload,
      AdminTxpoolRecommendedFeeResponse
    >(axios, 'get', adminTxpoolRecommendedFeeRoute),
    account: buildRequestHandler<
      AdminAccountParams,
      AdminAccountPayload,
      AdminAccountResponse
    >(axios, 'get', adminAccountRoute),
    accounts: buildRequestHandler<
      AdminAccountsParams,
      AdminAccountsPayload,
      AdminAccountsResponse
    >(axios, 'get', adminAccountsRoute),
    accountAdd: buildRequestHandler<
      AdminAccountAddParams,
      AdminAccountAddPayload,
      AdminAccountAddResponse
    >(axios, 'post', adminAccountRoute),
    accountRotateKey: buildRequestHandler<
      AdminAccountRotateKeyParams,
      AdminAccountRotateKeyPayload,
      AdminAccountRotateKeyResponse
    >(axios, 'put', adminAccountRoute),
    accountDelete: buildRequestHandler<
      AdminAccountDeleteParams,
      AdminAccountDeletePayload,
      AdminAccountDeleteResponse
    >(axios, 'delete', adminAccountRoute),
    contract: buildRequestHandler<
      AdminContractParams,
      AdminContractPayload,
      AdminContractResponse
    >(axios, 'get', adminContractRoute),
    contracts: buildRequestHandler<
      AdminContractsParams,
      AdminContractsPayload,
      AdminContractsResponse
    >(axios, 'get', adminContractsRoute),
    explorerExchangeRateSiacoin: buildRequestHandler<
      AdminExplorerExchangeRateSiacoinParams,
      AdminExplorerExchangeRateSiacoinPayload,
      AdminExplorerExchangeRateSiacoinResponse
    >(axios, 'get', adminExplorerExchangeRateSiacoinRoute),
    host: buildRequestHandler<
      AdminHostParams,
      AdminHostPayload,
      AdminHostResponse
    >(axios, 'get', adminHostRoute),
    hostScan: buildRequestHandler<
      AdminHostScanParams,
      AdminHostScanPayload,
      AdminHostScanResponse
    >(axios, 'post', adminHostScanRoute),
    hosts: buildRequestHandler<
      AdminHostsParams,
      AdminHostsPayload,
      AdminHostsResponse
    >(axios, 'get', adminHostsRoute),
    hostsBlocklist: buildRequestHandler<
      AdminHostsBlocklistParams,
      AdminHostsBlocklistPayload,
      AdminHostsBlocklistResponse
    >(axios, 'get', adminHostsBlocklistRoute),
    hostsBlocklistUpdate: buildRequestHandler<
      AdminHostsBlocklistUpdateParams,
      AdminHostsBlocklistUpdatePayload,
      AdminHostsBlocklistUpdateResponse
    >(axios, 'put', adminHostsBlocklistUpdateRoute),
    hostsBlocklistDelete: buildRequestHandler<
      AdminHostsBlocklistDeleteParams,
      AdminHostsBlocklistDeletePayload,
      AdminHostsBlocklistDeleteResponse
    >(axios, 'delete', adminHostsBlocklistDeleteRoute),
    settingsContracts: buildRequestHandler<
      AdminSettingsContractsParams,
      AdminSettingsContractsPayload,
      AdminSettingsContractsResponse
    >(axios, 'get', adminSettingsContractsRoute),
    settingsContractsUpdate: buildRequestHandler<
      AdminSettingsContractsUpdateParams,
      AdminSettingsContractsUpdatePayload,
      AdminSettingsContractsUpdateResponse
    >(axios, 'put', adminSettingsContractsUpdateRoute),
    settingsHosts: buildRequestHandler<
      AdminSettingsHostsParams,
      AdminSettingsHostsPayload,
      AdminSettingsHostsResponse
    >(axios, 'get', adminSettingsHostsRoute),
    settingsHostsUpdate: buildRequestHandler<
      AdminSettingsHostsUpdateParams,
      AdminSettingsHostsUpdatePayload,
      AdminSettingsHostsUpdateResponse
    >(axios, 'put', adminSettingsHostsUpdateRoute),
    settingsPricePinning: buildRequestHandler<
      AdminSettingsPricePinningParams,
      AdminSettingsPricePinningPayload,
      AdminSettingsPricePinningResponse
    >(axios, 'get', adminSettingsPricePinningRoute),
    settingsPricePinningUpdate: buildRequestHandler<
      AdminSettingsPricePinningUpdateParams,
      AdminSettingsPricePinningUpdatePayload,
      AdminSettingsPricePinningUpdateResponse
    >(axios, 'put', adminSettingsPricePinningUpdateRoute),
    wallet: buildRequestHandler<
      AdminWalletParams,
      AdminWalletPayload,
      AdminWalletResponse
    >(axios, 'get', adminWalletRoute),
    walletEvents: buildRequestHandler<
      AdminWalletEventsParams,
      AdminWalletEventsPayload,
      AdminWalletEventsResponse
    >(axios, 'get', adminWalletEventsRoute),
    walletPending: buildRequestHandler<
      AdminWalletPendingParams,
      AdminWalletPendingPayload,
      AdminWalletPendingResponse
    >(axios, 'get', adminWalletPendingRoute),
    walletSend: buildRequestHandler<
      AdminWalletSendParams,
      AdminWalletSendPayload,
      AdminWalletSendResponse
    >(axios, 'post', adminWalletSendRoute),
    connectKey: buildRequestHandler<
      AdminConnectKeyParams,
      AdminConnectKeyPayload,
      AdminConnectKeyResponse
    >(axios, 'get', adminConnectKeyRoute),
    connectKeys: buildRequestHandler<
      AdminConnectKeysParams,
      AdminConnectKeysPayload,
      AdminConnectKeysResponse
    >(axios, 'get', adminConnectKeysRoute),
    connectKeyAdd: buildRequestHandler<
      AdminConnectKeyAddParams,
      AdminConnectKeyAddPayload,
      AdminConnectKeyAddResponse
    >(axios, 'post', adminConnectKeyAddRoute),
    connectKeyUpdate: buildRequestHandler<
      AdminConnectKeyUpdateParams,
      AdminConnectKeyUpdatePayload,
      AdminConnectKeyUpdateResponse
    >(axios, 'put', adminConnectKeyUpdateRoute),
    connectKeyDelete: buildRequestHandler<
      AdminConnectKeyDeleteParams,
      AdminConnectKeyDeletePayload,
      AdminConnectKeyDeleteResponse
    >(axios, 'delete', adminConnectKeyDeleteRoute),
    alert: buildRequestHandler<
      AdminAlertParams,
      AdminAlertPayload,
      AdminAlertResponse
    >(axios, 'get', adminAlertsIdRoute),
    alerts: buildRequestHandler<
      AdminAlertsParams,
      AdminAlertsPayload,
      AdminAlertsResponse
    >(axios, 'get', adminAlertsRoute),
    alertsDismiss: buildRequestHandler<
      AdminAlertsDismissParams,
      AdminAlertsDismissPayload,
      AdminAlertsDismissResponse
    >(axios, 'post', adminAlertsDismissRoute),
    statsSectors: buildRequestHandler<
      AdminStatsSectorsParams,
      AdminStatsSectorsPayload,
      AdminStatsSectorsResponse
    >(axios, 'get', adminStatsSectorsRoute),
    statsAccounts: buildRequestHandler<
      AdminStatsAccountsParams,
      AdminStatsAccountsPayload,
      AdminStatsAccountsResponse
    >(axios, 'get', adminStatsAccountsRoute),
  }
}
