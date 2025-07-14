import type {
  PublicKey,
  FileContractID,
  Currency,
  Address,
  WalletEvent,
  TransactionID,
} from '@siafoundation/types'
import type {
  Contract,
  Host,
  MaintenanceSettings,
  UsabilitySettings,
  PinnedSettings,
  WalletBalance,
} from './types'

export const stateRoute = '/state'
export type StateParams = void
export type StatePayload = void
export type StateResponse = {
  version: string
  commit: string
  os: string
  buildTime: string
  startTime: string
  scanHeight: number
  syncHeight: number
  synced: boolean
  network: 'mainnet' | 'zen'
}

// syncer

export const syncerConnectRoute = '/syncer/connect'
export type SyncerConnectParams = void
export type SyncerConnectPayload = {
  addr: Address
}
export type SyncerConnectResponse = void

// txpool

export const txpoolRecommendedFeeRoute = '/txpool/recommendedfee'
export type TxpoolRecommendedFeeParams = void
export type TxpoolRecommendedFeePayload = void
export type TxpoolRecommendedFeeResponse = string

// accounts

export const accountsRoute = '/accounts'
export type AccountsParams = {
  offset?: number
  limit?: number
}
export type AccountsPayload = void
export type AccountsResponse = {
  accounts: PublicKey[]
}

export const accountRoute = '/account/:accountkey'
export type AccountAddParams = {
  accountkey: PublicKey
}
export type AccountAddPayload = void
export type AccountAddResponse = void

export type AccountRotateKeyParams = {
  accountkey: PublicKey
}
export type AccountRotateKeyPayload = {
  newAccountKey: PublicKey
}
export type AccountRotateKeyResponse = void

export type AccountDeleteParams = {
  accountkey: PublicKey
}
export type AccountDeletePayload = void
export type AccountDeleteResponse = void

export const contractRoute = '/contract/:contractid'
export type ContractParams = {
  contractid: FileContractID
}
export type ContractPayload = void
export type ContractResponse = Contract

export const contractsRoute = '/contracts'
export type ContractsParams = {
  offset?: number
  limit?: number
  revisable?: boolean
  good?: boolean
}
export type ContractsPayload = void
export type ContractsResponse = Contract[]

export const explorerExchangeRateSiacoinRoute =
  '/explorer/exchange-rate/siacoin/:currency'
export type ExplorerExchangeRateSiacoinParams = {
  currency: string
}
export type ExplorerExchangeRateSiacoinPayload = void
export type ExplorerExchangeRateSiacoinResponse = number

export const hostRoute = '/host/:hostkey'
export type HostParams = {
  hostkey: PublicKey
}
export type HostPayload = void
export type HostResponse = Host

export const hostScanRoute = '/host/:hostkey/scan'
export type HostScanParams = {
  hostkey: PublicKey
}
export type HostScanPayload = void
export type HostScanResponse = Host

export const hostsRoute = '/hosts'
export type HostsParams = {
  offset?: number
  limit?: number
  usable?: boolean
  blocked?: boolean
  activecontracts?: boolean
}
export type HostsPayload = void
export type HostsResponse = Host[]

export const hostsBlocklistRoute = '/hosts/blocklist'
export type HostsBlocklistParams = {
  offset?: number
  limit?: number
}
export type HostsBlocklistPayload = void
export type HostsBlocklistResponse = PublicKey[]

export const hostsBlocklistUpdateRoute = '/hosts/blocklist'
export type HostsBlocklistUpdateParams = void
export type HostsBlocklistUpdatePayload = {
  hostKeys: PublicKey[]
  reason: string
}
export type HostsBlocklistUpdateResponse = void

export const hostsBlocklistDeleteRoute = '/hosts/blocklist/:hostkey'
export type HostsBlocklistDeleteParams = {
  hostkey: PublicKey
}
export type HostsBlocklistDeletePayload = void
export type HostsBlocklistDeleteResponse = void

export const settingsContractsRoute = '/settings/contracts'
export type SettingsContractsParams = void
export type SettingsContractsPayload = void
export type SettingsContractsResponse = MaintenanceSettings

export const settingsContractsUpdateRoute = '/settings/contracts'
export type SettingsContractsUpdateParams = void
export type SettingsContractsUpdatePayload = MaintenanceSettings
export type SettingsContractsUpdateResponse = void

export const settingsHostsRoute = '/settings/hosts'
export type SettingsHostsParams = void
export type SettingsHostsPayload = void
export type SettingsHostsResponse = UsabilitySettings

export const settingsHostsUpdateRoute = '/settings/hosts'
export type SettingsHostsUpdateParams = void
export type SettingsHostsUpdatePayload = UsabilitySettings
export type SettingsHostsUpdateResponse = void

export const settingsPricePinningRoute = '/settings/pricepinning'
export type SettingsPricePinningParams = void
export type SettingsPricePinningPayload = void
export type SettingsPricePinningResponse = PinnedSettings

export const settingsPricePinningUpdateRoute = '/settings/pricepinning'
export type SettingsPricePinningUpdateParams = void
export type SettingsPricePinningUpdatePayload = PinnedSettings
export type SettingsPricePinningUpdateResponse = void

export const walletRoute = '/wallet'
export type WalletParams = void
export type WalletPayload = void
export type WalletResponse = {
  address: Address
} & WalletBalance

export const walletEventsRoute = '/wallet/events'
export type WalletEventsParams = {
  offset?: number
  limit?: number
}
export type WalletEventsPayload = void
export type WalletEventsResponse = WalletEvent[]

export const walletPendingRoute = '/wallet/pending'
export type WalletPendingParams = void
export type WalletPendingPayload = void
export type WalletPendingResponse = WalletEvent[]

export const walletSendRoute = '/wallet/send'
export type WalletSendParams = void
export type WalletSendPayload = {
  address: Address
  amount: Currency
  subtractMinerFee: boolean
  useUnconfirmed: boolean
}
export type WalletSendResponse = TransactionID
