import type {
  PublicKey,
  FileContractID,
  Currency,
  Address,
  WalletEvent,
  TransactionID,
  Hash256,
} from '@siafoundation/types'
import type {
  Contract,
  MaintenanceSettings,
  UsabilitySettings,
  PinnedSettings,
  WalletBalance,
  ConnectKey,
  Alert,
} from './types'
import type { Host } from '../types'

export const adminStateRoute = '/state'
export type AdminStateParams = void
export type AdminStatePayload = void
export type AdminStateResponse = {
  version: string
  commit: string
  os: string
  buildTime: string
  startTime: string
  scanHeight: number
  syncHeight: number
  synced: boolean
  network: 'mainnet' | 'zen'
  explorer: {
    enabled: boolean
    url?: string
  }
}

// syncer

export const adminSyncerConnectRoute = '/syncer/connect'
export type AdminSyncerConnectParams = void
export type AdminSyncerConnectPayload = {
  addr: Address
}
export type AdminSyncerConnectResponse = void

// txpool

export const adminTxpoolRecommendedFeeRoute = '/txpool/recommendedfee'
export type AdminTxpoolRecommendedFeeParams = void
export type AdminTxpoolRecommendedFeePayload = void
export type AdminTxpoolRecommendedFeeResponse = string

// accounts

export const adminAccountsRoute = '/accounts'
export type AdminAccountsParams = {
  offset?: number
  limit?: number
}
export type AdminAccountsPayload = void
export type AdminAccountsResponse = PublicKey[]

export const adminAccountRoute = '/account/:accountkey'
export type AdminAccountAddParams = {
  accountkey: PublicKey
}
export type AdminAccountAddPayload = void
export type AdminAccountAddResponse = void

export type AdminAccountRotateKeyParams = {
  accountkey: PublicKey
}
export type AdminAccountRotateKeyPayload = {
  newAccountKey: PublicKey
}
export type AdminAccountRotateKeyResponse = void

export type AdminAccountDeleteParams = {
  accountkey: PublicKey
}
export type AdminAccountDeletePayload = void
export type AdminAccountDeleteResponse = void

export const adminContractRoute = '/contract/:contractid'
export type AdminContractParams = {
  contractid: FileContractID
}
export type AdminContractPayload = void
export type AdminContractResponse = Contract

export const adminContractsRoute = '/contracts'
export type AdminContractsParams = {
  offset?: number
  limit?: number
  revisable?: boolean
  good?: boolean
}
export type AdminContractsPayload = void
export type AdminContractsResponse = Contract[]

export const adminExplorerExchangeRateSiacoinRoute =
  '/explorer/exchange-rate/siacoin/:currency'
export type AdminExplorerExchangeRateSiacoinParams = {
  currency: string
}
export type AdminExplorerExchangeRateSiacoinPayload = void
export type AdminExplorerExchangeRateSiacoinResponse = number

export const adminHostRoute = '/host/:hostkey'
export type AdminHostParams = {
  hostkey: PublicKey
}
export type AdminHostPayload = void
export type AdminHostResponse = Host

export const adminHostScanRoute = '/host/:hostkey/scan'
export type AdminHostScanParams = {
  hostkey: PublicKey
}
export type AdminHostScanPayload = void
export type AdminHostScanResponse = Host

export const adminHostsRoute = '/hosts'
export type AdminHostsParams = {
  offset?: number
  limit?: number
  usable?: boolean
  blocked?: boolean
  activecontracts?: boolean
}
export type AdminHostsPayload = void
export type AdminHostsResponse = Host[]

export const adminHostsBlocklistRoute = '/hosts/blocklist'
export type AdminHostsBlocklistParams = {
  offset?: number
  limit?: number
}
export type AdminHostsBlocklistPayload = void
export type AdminHostsBlocklistResponse = PublicKey[]

export const adminHostsBlocklistUpdateRoute = '/hosts/blocklist'
export type AdminHostsBlocklistUpdateParams = void
export type AdminHostsBlocklistUpdatePayload = {
  hostKeys: PublicKey[]
  reason: string
}
export type AdminHostsBlocklistUpdateResponse = void

export const adminHostsBlocklistDeleteRoute = '/hosts/blocklist/:hostkey'
export type AdminHostsBlocklistDeleteParams = {
  hostkey: PublicKey
}
export type AdminHostsBlocklistDeletePayload = void
export type AdminHostsBlocklistDeleteResponse = void

export const adminSettingsContractsRoute = '/settings/contracts'
export type AdminSettingsContractsParams = void
export type AdminSettingsContractsPayload = void
export type AdminSettingsContractsResponse = MaintenanceSettings

export const adminSettingsContractsUpdateRoute = '/settings/contracts'
export type AdminSettingsContractsUpdateParams = void
export type AdminSettingsContractsUpdatePayload = MaintenanceSettings
export type AdminSettingsContractsUpdateResponse = void

export const adminSettingsHostsRoute = '/settings/hosts'
export type AdminSettingsHostsParams = void
export type AdminSettingsHostsPayload = void
export type AdminSettingsHostsResponse = UsabilitySettings

export const adminSettingsHostsUpdateRoute = '/settings/hosts'
export type AdminSettingsHostsUpdateParams = void
export type AdminSettingsHostsUpdatePayload = UsabilitySettings
export type AdminSettingsHostsUpdateResponse = void

export const adminSettingsPricePinningRoute = '/settings/pricepinning'
export type AdminSettingsPricePinningParams = void
export type AdminSettingsPricePinningPayload = void
export type AdminSettingsPricePinningResponse = PinnedSettings

export const adminSettingsPricePinningUpdateRoute = '/settings/pricepinning'
export type AdminSettingsPricePinningUpdateParams = void
export type AdminSettingsPricePinningUpdatePayload = PinnedSettings
export type AdminSettingsPricePinningUpdateResponse = void

export const adminWalletRoute = '/wallet'
export type AdminWalletParams = void
export type AdminWalletPayload = void
export type AdminWalletResponse = {
  address: Address
} & WalletBalance

export const adminWalletEventsRoute = '/wallet/events'
export type AdminWalletEventsParams = {
  offset?: number
  limit?: number
}
export type AdminWalletEventsPayload = void
export type AdminWalletEventsResponse = WalletEvent[]

export const adminWalletPendingRoute = '/wallet/pending'
export type AdminWalletPendingParams = void
export type AdminWalletPendingPayload = void
export type AdminWalletPendingResponse = WalletEvent[]

export const adminWalletSendRoute = '/wallet/send'
export type AdminWalletSendParams = void
export type AdminWalletSendPayload = {
  address: Address
  amount: Currency
  subtractMinerFee: boolean
  useUnconfirmed: boolean
}
export type AdminWalletSendResponse = TransactionID

// connect

export const adminConnectKeysRoute = '/apps/connect/keys'
export type AdminConnectKeysParams = {
  offset?: number
  limit?: number
}
export type AdminConnectKeysPayload = void
export type AdminConnectKeysResponse = ConnectKey[]

export const adminConnectKeyAddRoute = '/apps/connect/keys'
export type AdminConnectKeyAddParams = void
export type AdminConnectKeyAddPayload = {
  description: string
  maxPinnedData: number
  remainingUses: number
}
export type AdminConnectKeyAddResponse = ConnectKey

export const adminConnectKeyUpdateRoute = '/apps/connect/keys'
export type AdminConnectKeyUpdateParams = void
export type AdminConnectKeyUpdatePayload = {
  key: string
  description: string
  maxPinnedData?: number
  remainingUses: number
}
export type AdminConnectKeyUpdateResponse = void

export const adminConnectKeyDeleteRoute = '/apps/connect/keys/:key'
export type AdminConnectKeyDeleteParams = {
  key: string
}
export type AdminConnectKeyDeletePayload = void
export type AdminConnectKeyDeleteResponse = void

// alerts

export const adminAlertsRoute = '/alerts'
export type AdminAlertsParams = {
  offset?: number
  limit?: number
}
export type AdminAlertsPayload = void
export type AdminAlertsResponse = Alert[]

export const adminAlertsDismissRoute = '/alerts/dismiss'
export type AdminAlertsDismissParams = void
export type AdminAlertsDismissPayload = Hash256[]
export type AdminAlertsDismissResponse = void

// stats

export const adminStatsSectorsRoute = '/stats/sectors'
export type AdminStatsSectorsParams = void
export type AdminStatsSectorsPayload = void
export type AdminStatsSectorsResponse = {
  numSectors: number
}
