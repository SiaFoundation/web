import {
  useDeleteFunc,
  useGetSwr,
  usePutFunc,
  usePostFunc,
  HookArgsSwr,
  HookArgsCallback,
} from '@siafoundation/react-core'
import {
  AdminAccountsParams,
  AdminAccountsResponse,
  adminAccountsRoute,
  AdminStateParams,
  AdminStateResponse,
  adminStateRoute,
  adminAccountRoute,
  AdminAccountAddParams,
  AdminAccountAddPayload,
  AdminAccountAddResponse,
  AdminAccountRotateKeyResponse,
  AdminAccountRotateKeyPayload,
  AdminAccountRotateKeyParams,
  AdminAccountDeleteParams,
  AdminAccountDeletePayload,
  AdminAccountDeleteResponse,
  adminContractRoute,
  AdminContractParams,
  AdminContractResponse,
  AdminContractsParams,
  AdminContractsResponse,
  adminContractsRoute,
  adminExplorerExchangeRateSiacoinRoute,
  AdminExplorerExchangeRateSiacoinParams,
  AdminExplorerExchangeRateSiacoinResponse,
  adminHostRoute,
  AdminHostParams,
  AdminHostResponse,
  AdminHostsParams,
  AdminHostsResponse,
  adminHostsRoute,
  adminHostsBlocklistRoute,
  AdminHostsBlocklistParams,
  AdminHostsBlocklistResponse,
  adminHostsBlocklistUpdateRoute,
  AdminHostsBlocklistUpdateParams,
  AdminHostsBlocklistUpdatePayload,
  AdminHostsBlocklistUpdateResponse,
  adminHostsBlocklistDeleteRoute,
  AdminHostsBlocklistDeleteParams,
  AdminHostsBlocklistDeletePayload,
  AdminHostsBlocklistDeleteResponse,
  adminSettingsContractsRoute,
  AdminSettingsContractsParams,
  AdminSettingsContractsResponse,
  adminSettingsContractsUpdateRoute,
  AdminSettingsContractsUpdateParams,
  AdminSettingsContractsUpdatePayload,
  AdminSettingsContractsUpdateResponse,
  adminSettingsHostsRoute,
  AdminSettingsHostsParams,
  AdminSettingsHostsResponse,
  adminSettingsHostsUpdateRoute,
  AdminSettingsHostsUpdateParams,
  AdminSettingsHostsUpdatePayload,
  AdminSettingsHostsUpdateResponse,
  adminSettingsPricePinningRoute,
  AdminSettingsPricePinningParams,
  AdminSettingsPricePinningResponse,
  AdminSettingsPricePinningUpdateResponse,
  adminSettingsPricePinningUpdateRoute,
  AdminSettingsPricePinningUpdateParams,
  AdminSettingsPricePinningUpdatePayload,
  AdminWalletParams,
  AdminWalletResponse,
  adminWalletRoute,
  AdminWalletEventsParams,
  AdminWalletEventsResponse,
  adminWalletEventsRoute,
  AdminWalletPendingParams,
  AdminWalletPendingResponse,
  adminWalletPendingRoute,
  AdminWalletSendParams,
  AdminWalletSendPayload,
  AdminWalletSendResponse,
  adminWalletSendRoute,
  AdminSyncerConnectResponse,
  AdminSyncerConnectParams,
  AdminSyncerConnectPayload,
  adminSyncerConnectRoute,
  AdminTxpoolRecommendedFeeParams,
  AdminTxpoolRecommendedFeeResponse,
  adminTxpoolRecommendedFeeRoute,
  AdminHostScanParams,
  AdminHostScanPayload,
  AdminHostScanResponse,
  adminHostScanRoute,
  adminConnectKeysRoute,
  AdminConnectKeysParams,
  AdminConnectKeysResponse,
  adminConnectKeyAddRoute,
  AdminConnectKeyAddParams,
  AdminConnectKeyAddPayload,
  AdminConnectKeyAddResponse,
  AdminConnectKeyUpdateParams,
  adminConnectKeyUpdateRoute,
  AdminConnectKeyUpdatePayload,
  AdminConnectKeyUpdateResponse,
  AdminConnectKeyDeleteParams,
  AdminConnectKeyDeletePayload,
  AdminConnectKeyDeleteResponse,
  adminConnectKeyDeleteRoute,
} from '@siafoundation/indexd-types'
import useSWR from 'swr'
import {
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
} from '@siafoundation/units'

// state

export function useAdminState(
  args?: HookArgsSwr<AdminStateParams, AdminStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminStateRoute,
  })
}

export function useAdminEstimatedNetworkBlockHeight(): number {
  const state = useAdminState({
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

export function useAdminSyncerConnect(
  args?: HookArgsCallback<
    AdminSyncerConnectParams,
    AdminSyncerConnectPayload,
    AdminSyncerConnectResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: adminSyncerConnectRoute,
  })
}

// txpool

export function useTxpoolRecommendedFee(
  args?: HookArgsSwr<
    AdminTxpoolRecommendedFeeParams,
    AdminTxpoolRecommendedFeeResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: adminTxpoolRecommendedFeeRoute,
  })
}

// accounts

export function useAdminAccounts(
  args?: HookArgsSwr<AdminAccountsParams, AdminAccountsResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminAccountsRoute,
  })
}

export function useAdminAccountAdd(
  args?: HookArgsCallback<
    AdminAccountAddParams,
    AdminAccountAddPayload,
    AdminAccountAddResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: adminAccountRoute,
  })
}

export function useAdminAccountRotateKey(
  args?: HookArgsCallback<
    AdminAccountRotateKeyParams,
    AdminAccountRotateKeyPayload,
    AdminAccountRotateKeyResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: adminAccountRoute,
  })
}

export function useAdminAccountDelete(
  args?: HookArgsCallback<
    AdminAccountDeleteParams,
    AdminAccountDeletePayload,
    AdminAccountDeleteResponse
  >,
) {
  return useDeleteFunc({
    ...args,
    route: adminAccountRoute,
  })
}

// contract

export function useAdminContract(
  args?: HookArgsSwr<AdminContractParams, AdminContractResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminContractRoute,
  })
}

export function useAdminContracts(
  args?: HookArgsSwr<AdminContractsParams, AdminContractsResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminContractsRoute,
  })
}

export function useAdminExplorerExchangeRateSiacoin(
  args?: HookArgsSwr<
    AdminExplorerExchangeRateSiacoinParams,
    AdminExplorerExchangeRateSiacoinResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: adminExplorerExchangeRateSiacoinRoute,
  })
}

// host

export function useAdminHost(
  args?: HookArgsSwr<AdminHostParams, AdminHostResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminHostRoute,
  })
}

export function useAdminHostScan(
  args?: HookArgsCallback<
    AdminHostScanParams,
    AdminHostScanPayload,
    AdminHostScanResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: adminHostScanRoute,
  })
}

export function useAdminHosts(
  args?: HookArgsSwr<AdminHostsParams, AdminHostsResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminHostsRoute,
  })
}

export function useAdminHostsBlocklist(
  args?: HookArgsSwr<AdminHostsBlocklistParams, AdminHostsBlocklistResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminHostsBlocklistRoute,
  })
}

export function useAdminHostsBlocklistUpdate(
  args?: HookArgsCallback<
    AdminHostsBlocklistUpdateParams,
    AdminHostsBlocklistUpdatePayload,
    AdminHostsBlocklistUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: adminHostsBlocklistUpdateRoute,
  })
}

export function useAdminHostsBlocklistDelete(
  args?: HookArgsCallback<
    AdminHostsBlocklistDeleteParams,
    AdminHostsBlocklistDeletePayload,
    AdminHostsBlocklistDeleteResponse
  >,
) {
  return useDeleteFunc({
    ...args,
    route: adminHostsBlocklistDeleteRoute,
  })
}

// settings

export function useAdminSettingsContracts(
  args?: HookArgsSwr<
    AdminSettingsContractsParams,
    AdminSettingsContractsResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: adminSettingsContractsRoute,
  })
}

export function useAdminSettingsContractsUpdate(
  args?: HookArgsCallback<
    AdminSettingsContractsUpdateParams,
    AdminSettingsContractsUpdatePayload,
    AdminSettingsContractsUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: adminSettingsContractsUpdateRoute,
  })
}

export function useAdminSettingsHosts(
  args?: HookArgsSwr<AdminSettingsHostsParams, AdminSettingsHostsResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminSettingsHostsRoute,
  })
}

export function useAdminSettingsHostsUpdate(
  args?: HookArgsCallback<
    AdminSettingsHostsUpdateParams,
    AdminSettingsHostsUpdatePayload,
    AdminSettingsHostsUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: adminSettingsHostsUpdateRoute,
  })
}

export function useAdminSettingsPricePinning(
  args?: HookArgsSwr<
    AdminSettingsPricePinningParams,
    AdminSettingsPricePinningResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: adminSettingsPricePinningRoute,
  })
}

export function useAdminSettingsPricePinningUpdate(
  args?: HookArgsCallback<
    AdminSettingsPricePinningUpdateParams,
    AdminSettingsPricePinningUpdatePayload,
    AdminSettingsPricePinningUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: adminSettingsPricePinningUpdateRoute,
  })
}

// wallet

export function useAdminWallet(
  args?: HookArgsSwr<AdminWalletParams, AdminWalletResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminWalletRoute,
  })
}

export function useAdminWalletEvents(
  args?: HookArgsSwr<AdminWalletEventsParams, AdminWalletEventsResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminWalletEventsRoute,
  })
}

export function useAdminWalletPending(
  args?: HookArgsSwr<AdminWalletPendingParams, AdminWalletPendingResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminWalletPendingRoute,
  })
}

export function useAdminWalletSend(
  args?: HookArgsCallback<
    AdminWalletSendParams,
    AdminWalletSendPayload,
    AdminWalletSendResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: adminWalletSendRoute,
  })
}

// connect

export function useAdminConnectKeys(
  args?: HookArgsSwr<AdminConnectKeysParams, AdminConnectKeysResponse>,
) {
  return useGetSwr({
    ...args,
    route: adminConnectKeysRoute,
  })
}

export function useAdminConnectKeyAdd(
  args?: HookArgsCallback<
    AdminConnectKeyAddParams,
    AdminConnectKeyAddPayload,
    AdminConnectKeyAddResponse
  >,
) {
  return usePostFunc({
    ...args,
    route: adminConnectKeyAddRoute,
  })
}

export function useAdminConnectKeyUpdate(
  args?: HookArgsCallback<
    AdminConnectKeyUpdateParams,
    AdminConnectKeyUpdatePayload,
    AdminConnectKeyUpdateResponse
  >,
) {
  return usePutFunc({
    ...args,
    route: adminConnectKeyUpdateRoute,
  })
}

export function useAdminConnectKeyDelete(
  args?: HookArgsCallback<
    AdminConnectKeyDeleteParams,
    AdminConnectKeyDeletePayload,
    AdminConnectKeyDeleteResponse
  >,
) {
  return useDeleteFunc({
    ...args,
    route: adminConnectKeyDeleteRoute,
  })
}
