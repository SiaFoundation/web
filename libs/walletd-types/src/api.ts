import {
  ConsensusState,
  ConsensusNetwork,
  Currency,
  BlockHeight,
  ChainIndex,
  SiacoinOutputID,
  SiafundOutputID,
  SiacoinElement,
  SiafundElement,
  Transaction,
  V2Transaction,
} from '@siafoundation/types'
import {
  WalletEvent,
  GatewayPeer,
  Wallet,
  WalletAddress,
  WalletMetadata,
} from './types'

export const stateRoute = '/state'
export const consensusTipRoute = '/consensus/tip'
export const consensusTipStateRoute = '/consensus/tipstate'
export const consensusNetworkRoute = '/consensus/network'
export const syncerPeersRoute = '/syncer/peers'
export const syncerConnectRoute = '/syncer/connect'
export const txPoolTransactionsRoute = '/txpool/transactions'
export const txPoolFeeRoute = '/txpool/fee'
export const txPoolBroadcastRoute = '/txpool/broadcast'
export const rescanRoute = '/rescan'
export const walletsRoute = '/wallets'
export const walletsIdRoute = '/wallets/:id'
export const walletsIdAddressesRoute = '/wallets/:id/addresses'
export const walletsIdAddressesAddrRoute = '/wallets/:id/addresses/:addr'
export const walletsIdBalanceRoute = '/wallets/:id/balance'
export const walletsIdEventsRoute = '/wallets/:id/events'
export const walletsIdEventsUnconfirmedRoute = '/wallets/:id/events/unconfirmed'
export const walletsIdOutputsSiacoinRoute = '/wallets/:id/outputs/siacoin'
export const walletsIdOutputsSiafundRoute = '/wallets/:id/outputs/siafund'
export const walletsIdFundRoute = '/wallets/:id/fund'
export const walletsIdFundSfRoute = '/wallets/:id/fundsf'
export const walletsIdReserveRoute = '/wallets/:id/reserve'
export const walletsIdReleaseRoute = '/wallets/:id/release'

// state

export type StateParams = void
export type StatePayload = void
export type StateResponse = {
  version: string
  commit: string
  os: string
  buildTime: string
  startTime: string
}

// consensus

export type ConsensusTipParams = void
export type ConsensusTipPayload = void
export type ConsensusTipResponse = ChainIndex

export type ConsensusTipStateParams = void
export type ConsensusTipStatePayload = void
export type ConsensusTipStateResponse = ConsensusState

export type ConsensusNetworkParams = void
export type ConsensusNetworkPayload = void
export type ConsensusNetworkResponse = ConsensusNetwork

// syncer

export type SyncerPeersParams = void
export type SyncerPeersPayload = void
export type SyncerPeersResponse = GatewayPeer[]

export type SyncerConnectParams = void
export type SyncerConnectPayload = string
export type SyncerConnectResponse = never

// txpool

export type TxPoolTransactionsParams = void
export type TxPoolTransactionsPayload = void
export type TxPoolTransactionsResponse = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}

export type TxPoolFeeParams = void
export type TxPoolFeePayload = void
export type TxPoolFeeResponse = Currency

export type TxPoolBroadcastParams = void
export type TxPoolBroadcastPayload = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}
export type TxPoolBroadcastResponse = unknown

// rescan

export type RescanStartParams = void
export type RescanStartPayload = BlockHeight
export type RescanStartResponse = void

export type RescanParams = void
export type RescanPayload = void
export type RescanResponse = {
  startIndex: ChainIndex
  index: ChainIndex
  startTime: string
  error?: string
}

// wallet

export type WalletsParams = void
export type WalletsPayload = void
export type WalletsResponse = Wallet[]

export type WalletAddParams = void
export type WalletAddPayload = {
  name: string
  description: string
  metadata: WalletMetadata
}
export type WalletAddResponse = Wallet

export type WalletUpdateParams = { id: string }
export type WalletUpdatePayload = {
  name: string
  description: string
  metadata: WalletMetadata
}
export type WalletUpdateResponse = Wallet

export type WalletDeleteParams = { id: string }
export type WalletDeletePayload = void
export type WalletDeleteResponse = never

// addresses

export type WalletAddressesParams = { id: string }
export type WalletAddressesPayload = void
export type WalletAddressesResponse = WalletAddress[]

export type WalletAddressAddParams = { id: string }
export type WalletAddressAddPayload = WalletAddress
export type WalletAddressAddResponse = void

export type WalletAddressDeleteParams = { id: string; addr: string }
export type WalletAddressDeletePayload = void
export type WalletAddressDeleteResponse = never

export type WalletBalanceParams = { id: string }
export type WalletBalancePayload = void
export type WalletBalanceResponse = {
  siacoins: Currency
  immatureSiacoins: Currency
  siafunds: number
}

export type WalletEventsParams = { id: string; offset: number; limit: number }
export type WalletEventsPayload = void
export type WalletEventsResponse = WalletEvent[]

export type WalletEventsUnconfirmedParams = { id: string }
export type WalletEventsUnconfirmedPayload = void
export type WalletEventsUnconfirmedResponse = WalletEvent[]

export type WalletOutputsSiacoinParams = { id: string }
export type WalletOutputsSiacoinPayload = void
export type WalletOutputsSiacoinResponse = SiacoinElement[]

export type WalletOutputsSiafundParams = { id: string }
export type WalletOutputsSiafundPayload = void
export type WalletOutputsSiafundResponse = SiafundElement[]

export type WalletFundSiacoinParams = {
  id: string
}
export type WalletFundSiacoinPayload = {
  transaction: Transaction
  amount: Currency
  changeAddress: string
}
export type WalletFundSiacoinResponse = {
  transaction: Transaction
  toSign: string[]
  dependsOn: Transaction[] | null
}

export type WalletFundSiafundParams = {
  id: string
}
export type WalletFundSiafundPayload = {
  transaction: Transaction
  amount: number
  changeAddress: string
  claimAddress: string
}
export type WalletFundSiafundResponse = {
  transaction: Transaction
  toSign: string[]
  dependsOn: Transaction[] | null
}

export type WalletReserveParams = {
  id: string
}
export type WalletReservePayload = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
  duration: number
}
export type WalletReserveResponse = void

export type WalletReleaseParams = {
  id: string
}
export type WalletReleasePayload = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
}
export type WalletReleaseResponse = void
