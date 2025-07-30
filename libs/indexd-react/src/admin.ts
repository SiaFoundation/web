import {
  useDeleteFunc,
  useGetSwr,
  usePutFunc,
  usePostFunc,
  HookArgsSwr,
  HookArgsCallback,
} from '@siafoundation/react-core'
import {
  AccountsParams,
  AccountsResponse,
  accountsRoute,
  StateParams,
  StateResponse,
  stateRoute,
  accountRoute,
  AccountAddParams,
  AccountAddPayload,
  AccountAddResponse,
  AccountRotateKeyResponse,
  AccountRotateKeyPayload,
  AccountRotateKeyParams,
  AccountDeleteParams,
  AccountDeletePayload,
  AccountDeleteResponse,
  contractRoute,
  ContractParams,
  ContractResponse,
  ContractsParams,
  ContractsResponse,
  contractsRoute,
  explorerExchangeRateSiacoinRoute,
  ExplorerExchangeRateSiacoinParams,
  ExplorerExchangeRateSiacoinResponse,
  HostParams,
  HostResponse,
  hostRoute,
  HostsParams,
  HostsResponse,
  hostsRoute,
  hostsBlocklistRoute,
  HostsBlocklistParams,
  HostsBlocklistResponse,
  hostsBlocklistUpdateRoute,
  HostsBlocklistUpdateParams,
  HostsBlocklistUpdatePayload,
  HostsBlocklistUpdateResponse,
  hostsBlocklistDeleteRoute,
  HostsBlocklistDeleteParams,
  HostsBlocklistDeletePayload,
  HostsBlocklistDeleteResponse,
  settingsContractsRoute,
  SettingsContractsParams,
  SettingsContractsResponse,
  settingsContractsUpdateRoute,
  SettingsContractsUpdateParams,
  SettingsContractsUpdatePayload,
  SettingsContractsUpdateResponse,
  settingsHostsRoute,
  SettingsHostsParams,
  SettingsHostsResponse,
  settingsHostsUpdateRoute,
  SettingsHostsUpdateParams,
  SettingsHostsUpdatePayload,
  SettingsHostsUpdateResponse,
  settingsPricePinningRoute,
  SettingsPricePinningParams,
  SettingsPricePinningResponse,
  SettingsPricePinningUpdateResponse,
  settingsPricePinningUpdateRoute,
  SettingsPricePinningUpdateParams,
  SettingsPricePinningUpdatePayload,
  WalletParams,
  WalletResponse,
  walletRoute,
  WalletEventsParams,
  WalletEventsResponse,
  walletEventsRoute,
  WalletPendingParams,
  WalletPendingResponse,
  walletPendingRoute,
  WalletSendParams,
  WalletSendPayload,
  WalletSendResponse,
  walletSendRoute,
  SyncerConnectResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  syncerConnectRoute,
  TxpoolRecommendedFeeParams,
  TxpoolRecommendedFeeResponse,
  txpoolRecommendedFeeRoute,
  HostScanParams,
  HostScanPayload,
  HostScanResponse,
  hostScanRoute,
} from '@siafoundation/indexd-types'
import useSWR from 'swr'
import {
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
} from '@siafoundation/units'

// state

export function useIndexdState(args?: HookArgsSwr<StateParams, StateResponse>) {
  return useGetSwr({
    ...args,
    route: stateRoute,
  })
}

export function useEstimatedNetworkBlockHeight(): number {
  const state = useIndexdState({
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
    },
  )
  return res.data || 0
}

// syncer

export function useSyncerConnect(
  args?: HookArgsCallback<
    SyncerConnectParams,
    SyncerConnectPayload,
    SyncerConnectResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: syncerConnectRoute,
  })
}

// txpool

export function useTxpoolRecommendedFee(
  args?: HookArgsSwr<TxpoolRecommendedFeeParams, TxpoolRecommendedFeeResponse>,
) {
  return useGetSwr({
    ...args,
    route: txpoolRecommendedFeeRoute,
  })
}

// accounts

export function useAccounts(
  args?: HookArgsSwr<AccountsParams, AccountsResponse>,
) {
  return useGetSwr({
    ...args,
    route: accountsRoute,
  })
}

export function useAccountAdd(
  args?: HookArgsCallback<
    AccountAddParams,
    AccountAddPayload,
    AccountAddResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: accountRoute,
  })
}

export function useAccountRotateKey(
  args?: HookArgsCallback<
    AccountRotateKeyParams,
    AccountRotateKeyPayload,
    AccountRotateKeyResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: accountRoute,
  })
}

export function useAccountDelete(
  args?: HookArgsCallback<
    AccountDeleteParams,
    AccountDeletePayload,
    AccountDeleteResponse
  >,
) {
  return useDeleteFunc({
    ...args,
    route: accountRoute,
  })
}

// contract

export function useContract(
  args?: HookArgsSwr<ContractParams, ContractResponse>,
) {
  return useGetSwr({
    ...args,
    route: contractRoute,
  })
}

export function useContracts(
  args?: HookArgsSwr<ContractsParams, ContractsResponse>,
) {
  return useGetSwr({
    ...args,
    route: contractsRoute,
  })
}

export function useExplorerExchangeRateSiacoin(
  args?: HookArgsSwr<
    ExplorerExchangeRateSiacoinParams,
    ExplorerExchangeRateSiacoinResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: explorerExchangeRateSiacoinRoute,
  })
}

// host

export function useHost(args?: HookArgsSwr<HostParams, HostResponse>) {
  return useGetSwr({
    ...args,
    route: hostRoute,
  })
}

export function useHostScan(
  args?: HookArgsCallback<HostScanParams, HostScanPayload, HostScanResponse>,
) {
  return usePostFunc({
    ...args,
    route: hostScanRoute,
  })
}

export function useHosts(args?: HookArgsSwr<HostsParams, HostsResponse>) {
  return useGetSwr({
    ...args,
    route: hostsRoute,
  })
}

export function useHostsBlocklist(
  args?: HookArgsSwr<HostsBlocklistParams, HostsBlocklistResponse>,
) {
  return useGetSwr({
    ...args,
    route: hostsBlocklistRoute,
  })
}

export function useHostsBlocklistUpdate(
  args?: HookArgsCallback<
    HostsBlocklistUpdateParams,
    HostsBlocklistUpdatePayload,
    HostsBlocklistUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: hostsBlocklistUpdateRoute,
  })
}

export function useHostsBlocklistDelete(
  args?: HookArgsCallback<
    HostsBlocklistDeleteParams,
    HostsBlocklistDeletePayload,
    HostsBlocklistDeleteResponse
  >,
) {
  return useDeleteFunc({
    ...args,
    route: hostsBlocklistDeleteRoute,
  })
}

// settings

export function useSettingsContracts(
  args?: HookArgsSwr<SettingsContractsParams, SettingsContractsResponse>,
) {
  return useGetSwr({
    ...args,
    route: settingsContractsRoute,
  })
}

export function useSettingsContractsUpdate(
  args?: HookArgsCallback<
    SettingsContractsUpdateParams,
    SettingsContractsUpdatePayload,
    SettingsContractsUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: settingsContractsUpdateRoute,
  })
}

export function useSettingsHosts(
  args?: HookArgsSwr<SettingsHostsParams, SettingsHostsResponse>,
) {
  return useGetSwr({
    ...args,
    route: settingsHostsRoute,
  })
}

export function useSettingsHostsUpdate(
  args?: HookArgsCallback<
    SettingsHostsUpdateParams,
    SettingsHostsUpdatePayload,
    SettingsHostsUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: settingsHostsUpdateRoute,
  })
}

export function useSettingsPricePinning(
  args?: HookArgsSwr<SettingsPricePinningParams, SettingsPricePinningResponse>,
) {
  return useGetSwr({
    ...args,
    route: settingsPricePinningRoute,
  })
}

export function useSettingsPricePinningUpdate(
  args?: HookArgsCallback<
    SettingsPricePinningUpdateParams,
    SettingsPricePinningUpdatePayload,
    SettingsPricePinningUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: settingsPricePinningUpdateRoute,
  })
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
  return usePostFunc({
    ...args,
    route: walletSendRoute,
  })
}
