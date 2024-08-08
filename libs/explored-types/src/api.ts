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

// Broadcasts a set of transactions to the network.
export const txpoolBroadcastRoute = '/txpool/broadcast'
export type TxpoolBroadcastParams = void
export type TxpoolBroadcastPayload = ExplorerTxpoolBroadcast
export type TxpoolBroadcastResponse = void

// Returns all transactions in the transaction pool.
export const txpoolTransactionsRoute = '/txpool/transactions'
export type TxpoolTransactionsParams = void
export type TxpoolTransactionsPayload = void
export type TxpoolTransactionsResponse = ExplorerTxpoolTransactions

// Returns the recommended fee (per weight unit) to ensure a high
// probability of inclusion in the next Block.
export const txpoolFeeRoute = '/txpool/fee'
export type TxpoolFeeParams = void
export type TxpoolFeePayload = void
export type TxpoolFeeResponse = ExplorerCurrency

// Syncer

// Adds the address as a peer of the syncer.
export const syncerConnectRoute = '/syncer/connect'
export type SyncerConnectParams = void
export type SyncerConnectPayload = ExplorerAddress
export type SyncerConnectResponse = void

// Returns the peers of the syncer.
export const syncerPeersRoute = '/syncer/peers'
export type SyncerPeersParams = void
export type SyncerPeersPayload = void
export type SyncerPeersResponse = ExplorerPeer[]

// Broadcasts a block to all peers.
export const syncerBroadcastBlockRoute = '/syncer/broadcast/block'
export type SyncerBroadcastBlockParams = void
export type SyncerBroadcastBlockPayload = ExplorerBlock
export type SyncerBroadcastBlockResponse = void

// Tip

// Returns the current tip of the explorer.
export const explorerTipRoute = '/explorer/tip'
export type ExplorerTipParams = void
export type ExplorerTipPayload = void
export type ExplorerTipResponse = ExplorerChainIndex

// Returns the chain index at the specified height.
export const explorerTipByHeightRoute = '/explorer/tip/:height'
export type ExplorerTipByHeightParams = void
export type ExplorerTipByHeightPayload = { height: number }
export type ExplorerTipByHeightResponse = ExplorerChainIndex

// Block

// Returns the block with the specified ID.
export const explorerBlockByIDRoute = '/explorer/block/:id'
export type ExplorerBlockParams = void
export type ExplorerBlockPayload = { id: ExplorerBlockID }
export type ExplorerBlockResponse = ExplorerBlock

// Transaction

// Returns the transaction with the specified ID.
export const explorerTransactionByIDRoute = '/explorer/transactions/:id'
export type ExplorerTransactionByIDParams = void
export type ExplorerTransactionByIDPayload = { id: ExplorerTransactionID }
export type ExplorerTransactionByIDResponse = ExplorerTransaction

// Returns the transactions with the specified IDs.
export const explorerTransactionsByIDsRoute = '/explorer/transactions'
export type ExplorerTransactionsByIDsParams = void
export type ExplorerTransactionsByIDsPayload = { ids: ExplorerTransactionID[] }
export type ExplorerTransactionsByIDsResponse = ExplorerTransaction[]

// Address

// Returns the specified address' unspent outputs.
export const explorerAddressUTXOsRoute = '/explorer/addresses/:address'
export type ExplorerAddressUTXOsParams = { offset?: number; limit?: number }
export type ExplorerAddressUTXOsPayload = ExplorerAddress
export type ExplorerAddressUTXOsResponse = ExplorerAddressUTXOs

// Returns the specified address' events.
export const explorerAddressEventsRoute = '/explorer/addresses/:address/events'
export type ExplorerAddressEventsParams = { offset?: number; limit?: number }
export type ExplorerAddressEventsPayload = ExplorerAddress
export type ExplorerAddressEventsResponse = ExplorerEvent

// Returns the specified address' balance.
export const explorerAddressBalanceRoute =
  '/explorer/addresses/:address/balance'
export type ExplorerAddressBalanceParams = void
export type ExplorerAddressBalancePayload = ExplorerAddress
export type ExplorerAddressBalanceResponse = ExplorerAddressBalance

// Contract

// Returns the file contract with the specified ID.
export const explorerContractByIDRoute = '/explorer/contracts/:id'
export type ExplorerContractByIDParams = void
export type ExplorerContractByIDPayload = { id: ExplorerFileContractID }
export type ExplorerContractByIDResponse = ExplorerFileContract

// Returns the file contracts with the specified IDs.
export const explorerContractsByIDsRoute = '/exporer/contracts/'
export type ExplorerContractsByIDsParams = void
export type ExplorerContractsByIDsPayload = { ids: ExplorerFileContractID[] }
export type ExplorerContractsByIDsResponse = ExplorerFileContract[]

// Returns the file contracts for a particular ed25519 key.
export const explorerContractByPubkeyRoute =
  '/explorer/pubkey/:pubkey/contracts'
export type ExplorerContractByPubkeyParams = void
export type ExplorerContractByPubkeyPayload = { key: number }
export type ExplorerContractByPubkeyResponse = ExplorerFileContract

// Metrics

// Returns the most recent metrics about Sia.
export const explorerMetricsRoute = '/explorer/metrics'
export type ExplorerMetricParams = void
export type ExplorerMetricPayload = void
export type ExplorerMetricResponse = ExplorerMetrics

// Returns various metrics about Sia at the time of the given block ID.
export const explorerMetricsByIDRoute = '/explorer/metrics/:id'
export type ExplorerMetricsByIDParams = void
export type ExplorerMetricsByIDPayload = { id: ExplorerBlockID }
export type ExplorerMetricsByIDResponse = ExplorerMetrics

// Search

// Returns what type of object an ID is.
export const explorerSearchResultTypeRoute = '/explorer/search/:id'
export type ExplorerSearchResultTypeParams = void
export type ExplorerSearchResultTypePayload = { id: ExplorerHash256 }
export type ExplorerSearchResultTypeResponse = ExplorerSearchResultType
