import {
  Address,
  AddressBalance,
  Block,
  BlockID,
  ChainIndex,
  ConsensusNetwork,
  ConsensusState,
  Currency,
  ExplorerBlock,
  ExplorerFileContract,
  ExplorerSiacoinOutput,
  ExplorerSiafundOutput,
  ExplorerTransaction,
  FileContractID,
  Hash256,
  Metrics,
  Peer,
  SearchResultType,
  SiacoinOutputID,
  SiafundElement,
  SiafundOutputID,
  TransactionID,
  TxpoolBroadcast,
  TxpoolTransactions,
} from './types'

// Tx Pool

// Broadcasts a set of transactions to the network.
export const txpoolBroadcastRoute = '/txpool/broadcast'
export type TxpoolBroadcastParams = void
export type TxpoolBroadcastPayload = TxpoolBroadcast
export type TxpoolBroadcastResponse = void

// Returns all transactions in the transaction pool.
export const txpoolTransactionsRoute = '/txpool/transactions'
export type TxpoolTransactionsParams = void
export type TxpoolTransactionsPayload = void
export type TxpoolTransactionsResponse = TxpoolTransactions

// Returns the recommended fee (per weight unit) to ensure a high
// probability of inclusion in the next Block.
export const txpoolFeeRoute = '/txpool/fee'
export type TxpoolFeeParams = void
export type TxpoolFeePayload = void
export type TxpoolFeeResponse = Currency

// Syncer

// Adds the address as a peer of the syncer.
export const syncerConnectRoute = '/syncer/connect'
export type SyncerConnectParams = void
export type SyncerConnectPayload = Address
export type SyncerConnectResponse = void

// Returns the peers of the syncer.
export const syncerPeersRoute = '/syncer/peers'
export type SyncerPeersParams = void
export type SyncerPeersPayload = void
export type SyncerPeersResponse = Peer[]

// Broadcasts a block to all peers.
export const syncerBroadcastBlockRoute = '/syncer/broadcast/block'
export type SyncerBroadcastBlockParams = void
export type SyncerBroadcastBlockPayload = Block
export type SyncerBroadcastBlockResponse = void

// Consensus

// Returns the current tip of the explorer.
export const consensusTipRoute = '/consensus/tip'
export type ConsensusTipParams = void
export type ConsensusTipPayload = void
export type ConsensusTipResponse = ChainIndex

// Returns the chain index at the specified height.
export const consensusTipByHeightRoute = '/consensus/tip/:height'
export type ConsensusTipByHeightParams = { height: number }
export type ConsensusTipByHeightPayload = void
export type ConsensusTipByHeightResponse = ChainIndex

// Returns the network parameters of the consensus set.
export const consensusNetworkRoute = '/consensus/network'
export type ConsensusNetworkParams = void
export type ConsensusNetworkPayload = void
export type ConsensusNetworkResponse = ConsensusNetwork

// Returns the current state of the consensus set.
export const consensusStateRoute = '/consensus/state'
export type ConsensusStateParams = void
export type ConsensusStatePayload = void
export type ConsensusStateResponse = ConsensusState

// Block

// Returns the block with the specified ID.
export const blockByIDRoute = '/blocks/:id'
export type BlockByIDParams = { id: BlockID }
export type BlockByIDPayload = void
export type BlockByIDResponse = ExplorerBlock

// Transaction

// Returns the transaction with the specified ID.
export const transactionByIDRoute = '/transactions/:id'
export type TransactionByIDParams = { id: TransactionID }
export type TransactionByIDPayload = void
export type TransactionByIDResponse = ExplorerTransaction

// Returns the transactions with the specified IDs.
export const transactionsByIDsRoute = '/transactions'
export type TransactionsByIDsParams = void
export type TransactionsByIDsPayload = { ids: TransactionID[] }
export type TransactionsByIDsResponse = ExplorerTransaction[]

// Address

// Returns the specified address' unspent siacoin outputs.
export const addressSiacoinUTXOsRoute = '/addresses/:address/utxos/siacoin'
export type AddressSiacoinUTXOsParams = {
  address: Address
  offset?: number
  limit?: number
}
export type AddressSiacoinUTXOsPayload = void
export type AddressSiacoinUTXOsResponse = ExplorerSiacoinOutput

// Returns the specified address' unspent siafind outputs.
export const addressSiafundUTXOsRoute = '/addresses/:address/utxos/siafund'
export type AddressSiafundUTXOsParams = {
  address: Address
  offset?: number
  limit?: number
}
export type AddressSiafundUTXOsPayload = void
export type AddressSiafundUTXOsResponse = SiafundElement

// Returns the specified address' events.
export const addressEventsRoute = '/addresses/:address/events'
export type AddressEventsParams = {
  address: Address
  offset?: number
  limit?: number
}
export type AddressEventsPayload = void
export type AddressEventsResponse = Event

// Returns the specified address' balance.
export const addressBalanceRoute = '/addresses/:address/balance'
export type AddressBalanceParams = { address: Address }
export type AddressBalancePayload = void
export type AddressBalanceResponse = AddressBalance

// Output
// Returns the specified siacoin output.
export const outputSiacoineRoute = '/outputs/siacoin/:siacoinoutputid'
export type OutputSiacoineParams = { siacoinOutputID: SiacoinOutputID }
export type OutputSiacoinePayload = void
export type OutputSiacoineResponse = ExplorerSiacoinOutput

// Returns the specified address' events.
export const outputSiafundeRoute = '/outputs/siafund/:siafundoutputid'
export type OutputSiafundeParams = { address: SiafundOutputID }
export type OutputSiafundePayload = void
export type OutputSiafundeResponse = ExplorerSiafundOutput

// Contract

// Returns the file contract with the specified ID.
export const contractByIDRoute = '/contracts/:id'
export type ContractByIDParams = { id: FileContractID }
export type ContractByIDPayload = void
export type ContractByIDResponse = ExplorerFileContract

// Returns the file contracts with the specified IDs.
export const contractsByIDsRoute = '/contracts'
export type ContractsByIDsParams = void
export type ContractsByIDsPayload = { ids: FileContractID[] }
export type ContractsByIDsResponse = ExplorerFileContract[]

// Returns the file contracts for a particular ed25519 key.
export const contractByPubkeyRoute = '/pubkey/:pubkey/contracts'
export type ContractByPubkeyParams = { key: number }
export type ContractByPubkeyPayload = void
export type ContractByPubkeyResponse = ExplorerFileContract

// Metrics

// Returns the most recent metrics about Sia.
export const metricsRoute = '/metrics/block'
export type MetricsParams = void
export type MetricsPayload = void
export type MetricsResponse = Metrics

// Returns various metrics about Sia at the time of the given block ID.
export const metricsByIDRoute = '/metrics/block/:id'
export type MetricsByIDParams = { id: BlockID }
export type MetricsByIDPayload = void
export type MetricsByIDResponse = Metrics

// Search

// Returns what type of object an ID is.
export const searchResultTypeRoute = '/search/:id'
export type SearchResultTypeParams = { id: Hash256 }
export type SearchResultTypePayload = void
export type SearchResultTypeResponse = SearchResultType
