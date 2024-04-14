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
  PoolTransaction,
  WalletEvent,
  GatewayPeer,
  Wallet,
  WalletAddress,
  WalletMetadata,
} from './types'

// state

export type StateParams = void
export type StateResponse = {
  version: string
  commit: string
  os: string
  buildTime: string
  startTime: string
}

// consensus

export type ConsensusTipParams = void
export type ConsensusTipResponse = ChainIndex

export type ConsensusTipStateParams = void
export type ConsensusTipStateResponse = ConsensusState

export type ConsensusNetworkParams = void
export type ConsensusNetworkResponse = ConsensusNetwork

// syncer

export type SyncerPeersParams = void
export type SyncerPeersResponse = GatewayPeer[]

export type SyncerConnectParams = void
export type SyncerConnectPayload = string
export type SyncerConnectResponse = never

// txpool

export type TxPoolTransactionsParams = void
export type TxPoolTransactionsResponse = {
  transactions: Transaction[]
  v2transactions: V2Transaction[]
}

export type TxPoolFeeParams = void
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
export type RescanResponse = {
  startIndex: ChainIndex
  index: ChainIndex
  startTime: string
  error?: string
}

// wallet

export type WalletsParams = void
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
export type WalletAddressesResponse = WalletAddress[]

export type WalletAddressAddParams = { id: string }
export type WalletAddressAddPayload = WalletAddress
export type WalletAddressAddResponse = void

export type WalletAddressDeleteParams = { id: string; addr: string }
export type WalletAddressDeletePayload = void
export type WalletAddressDeleteResponse = never

export type WalletBalanceParams = { id: string }
export type WalletBalanceResponse = {
  siacoins: Currency
  immatureSiacoins: Currency
  siafunds: number
}

export type WalletEventsParams = { id: string; offset: number; limit: number }
export type WalletEventsResponse = WalletEvent[]

export type WalletTxPoolParams = { id: string }
export type WalletTxPoolResponse = PoolTransaction[]

export type WalletOutputsSiacoinParams = { id: string }
export type WalletOutputsSiacoinResponse = SiacoinElement[]

export type WalletOutputsSiafundParams = { id: string }
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
