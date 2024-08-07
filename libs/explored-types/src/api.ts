import {
    ExplorerAddress,
    ExplorerAddressBalance,
    ExplorerAddressUTXOs,
    ExplorerBlock,
    ExplorerBlockID,
    ExplorerChainIndex,
    ExplorerCurrency,
    ExplorerEvent,
    ExplorerFileContract,
    ExplorerFileContractID,
    ExplorerHash256,
    ExplorerMetrics,
    ExplorerPeer,
    ExplorerSearchResultType,
    ExplorerTransaction,
    ExplorerTransactionID,
    ExplorerTxpoolBroadcast,
    ExplorerTxpoolTransactions,
  } from './types'
  
  // Tx Pool
  
  export const txpoolBroadcastRoute = '/txpool/broadcast'
  export type TxpoolBroadcastParams = void
  export type TxpoolBroadcastPayload = ExplorerTxpoolBroadcast
  export type TxpoolBroadcastResponse = void
  
  export const txpoolTransactionsRoute = '/txpool/transactions'
  export type TxpoolTransactionsParams = void
  export type TxpoolTransactionsPayload = void
  export type TxpoolTransactionsResponse = ExplorerTxpoolTransactions
  
  export const txpoolFeeRoute = '/txpool/fee'
  export type TxpoolFeeParams = void
  export type TxpoolFeePayload = void
  export type TxpoolFeeResponse = ExplorerCurrency
  
  // Syncer
  
  export const syncerConnectRoute = '/syncer/connect'
  export type SyncerConnectParams = void
  export type SyncerConnectPayload = ExplorerAddress
  export type SyncerConnectResponse = void
  
  export const syncerPeersRoute = '/syncer/peers'
  export type SyncerPeersParams = void
  export type SyncerPeersPayload = void
  export type SyncerPeersResponse = ExplorerPeer[]
  
  export const syncerBroadcastBlockRoute = '/syncer/broadcast/block'
  export type SyncerBroadcastBlockParams = void
  export type SyncerBroadcastBlockPayload = ExplorerBlock
  export type SyncerBroadcastBlockResponse = void
  
  // Tip
  
  export const explorerTipRoute = '/explorer/tip'
  export type ExplorerTipParams = void
  export type ExplorerTipPayload = void
  export type ExplorerTipResponse = ExplorerChainIndex
  
  export const explorerTipByHeightRoute = '/explorer/tip/:height'
  export type ExplorerTipByHeightParams = void
  export type ExplorerTipByHeightPayload = { height: number }
  export type ExplorerTipByHeightResponse = ExplorerChainIndex
  
  // Block
  
  export const explorerBlockByIDRoute = '/explorer/block/:id'
  export type ExplorerBlockParams = void
  export type ExplorerBlockPayload = { id: ExplorerBlockID }
  export type ExplorerBlockResponse = ExplorerBlock
  
  // Transaction
  
  export const explorerTransactionByIDRoute = '/explorer/transactions/:id'
  export type ExplorerTransactionByIDParams = void
  export type ExplorerTransactionByIDPayload = { id: ExplorerTransactionID }
  export type ExplorerTransactionByIDResponse = ExplorerTransaction
  
  export const explorerTransactionsByIDsRoute = '/explorer/transactions'
  export type ExplorerTransactionsByIDsParams = void
  export type ExplorerTransactionsByIDsPayload = { ids: ExplorerTransactionID[] }
  export type ExplorerTransactionsByIDsResponse = ExplorerTransaction[]
  
  // Address
  
  export const explorerAddressUTXOsRoute = '/explorer/addresses/:address'
  export type ExplorerAddressUTXOsParams = { offset?: number; limit?: number }
  export type ExplorerAddressUTXOsPayload = ExplorerAddress
  export type ExplorerAddressUTXOsResponse = ExplorerAddressUTXOs
  
  export const explorerAddressEventsRoute = '/explorer/addresses/:address/events'
  export type ExplorerAddressEventsParams = { offset?: number; limit?: number }
  export type ExplorerAddressEventsPayload = ExplorerAddress
  export type ExplorerAddressEventsResponse = ExplorerEvent
  
  export const explorerAddressBalanceRoute =
    '/explorer/addresses/:address/balance'
  export type ExplorerAddressBalanceParams = void
  export type ExplorerAddressBalancePayload = ExplorerAddress
  export type ExplorerAddressBalanceResponse = ExplorerAddressBalance
  
  // Contract
  
  export const explorerContractByIDRoute = '/explorer/contracts/:id'
  export type ExplorerContractByIDParams = void
  export type ExplorerContractByIDPayload = { id: ExplorerFileContractID }
  export type ExplorerContractByIDResponse = ExplorerFileContract
  
  export const explorerContractsByIDsRoute = '/exporer/contracts/'
  export type ExplorerContractsByIDsParams = void
  export type ExplorerContractsByIDsPayload = { ids: ExplorerFileContractID[] }
  export type ExplorerContractsByIDsResponse = ExplorerFileContract[]
  
  export const explorerContractByPubkeyRoute =
    '/explorer/pubkey/:pubkey/contracts'
  export type ExplorerContractByPubkeyParams = void
  export type ExplorerContractByPubkeyPayload = { key: number }
  export type ExplorerContractByPubkeyResponse = ExplorerFileContract
  
  // Metrics
  
  export const explorerMetricsRoute = '/explorer/metrics'
  export type ExplorerMetricParams = void
  export type ExplorerMetricPayload = void
  export type ExplorerMetricResponse = ExplorerMetrics
  
  export const explorerMetricsByIDRoute = '/explorer/metrics/:id'
  export type ExplorerMetricsByIDParams = void
  export type ExplorerMetricsByIDPayload = { id: ExplorerBlockID }
  export type ExplorerMetricsByIDResponse = ExplorerMetrics
  
  // Search
  
  export const explorerSearchResultTypeRoute = '/explorer/search/:id'
  export type ExplorerSearchResultTypeParams = void
  export type ExplorerSearchResultTypePayload = { id: ExplorerHash256 }
  export type ExplorerSearchResultTypeResponse = ExplorerSearchResultType
  