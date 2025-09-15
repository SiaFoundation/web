import {
  AddressBalanceParams,
  AddressBalanceResponse,
  addressBalanceRoute,
  AddressEventsParams,
  AddressEventsResponse,
  addressEventsRoute,
  AddressSiacoinUTXOsParams,
  AddressSiacoinUTXOsResponse,
  addressSiacoinUTXOsRoute,
  AddressSiafundUTXOsParams,
  AddressSiafundUTXOsResponse,
  addressSiafundUTXOsRoute,
  AddressUnconfirmedEventsParams,
  AddressUnconfirmedEventsResponse,
  addressUnconfirmedEventsRoute,
  BlockMetricsByIDParams,
  BlockMetricsByIDResponse,
  blockMetricsByIDRoute,
  BlockMetricsParams,
  BlockMetricsResponse,
  blockMetricsRoute,
  BlockTimeMetricsParams,
  BlockTimeMetricsResponse,
  blockTimeMetricsRoute,
  ConsensusNetworkParams,
  ConsensusNetworkResponse,
  consensusNetworkRoute,
  ConsensusStateParams,
  ConsensusStateResponse,
  consensusStateRoute,
  ConsensusTipParams,
  ConsensusTipResponse,
  consensusTipRoute,
  ContractByIDParams,
  ContractByIDResponse,
  contractByIDRoute,
  ContractByPubkeyParams,
  ContractByPubkeyResponse,
  contractByPubkeyRoute,
  ContractRevisionsParams,
  ContractRevisionsResponse,
  contractRevisionsRoute,
  ContractsByIDsParams,
  ContractsByIDsPayload,
  ContractsByIDsResponse,
  contractsByIDsRoute,
  DifficultyMetricsParams,
  DifficultyMetricsResponse,
  difficultyMetricsRoute,
  ExchangeRateParams,
  ExchangeRateResponse,
  exchangeRateRoute,
  ExplorerTipParams,
  ExplorerTipResponse,
  explorerTipRoute,
  HostByPubkeyParams,
  HostByPubkeyResponse,
  hostByPubkeyRoute,
  HostMetricsParams,
  HostMetricsResponse,
  hostMetricsRoute,
  HostsListParams,
  HostsListPayload,
  HostsListResponse,
  hostsListRoute,
  OutputSiacoinParams,
  OutputSiacoinResponse,
  outputSiacoinRoute,
  OutputSiafundParams,
  OutputSiafundResponse,
  outputSiafundRoute,
  SearchResultTypeParams,
  SearchResultTypeResponse,
  searchResultTypeRoute,
  SyncerBroadcastBlockParams,
  SyncerBroadcastBlockPayload,
  SyncerBroadcastBlockResponse,
  syncerBroadcastBlockRoute,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  syncerConnectRoute,
  SyncerPeersParams,
  SyncerPeersResponse,
  syncerPeersRoute,
  TransactionByIDParams,
  TransactionByIDResponse,
  transactionByIDRoute,
  TransactionChainIndicesParams,
  TransactionChainIndicesResponse,
  transactionChainIndicesRoute,
  TransactionsByIDsParams,
  TransactionsByIDsPayload,
  TransactionsByIDsResponse,
  transactionsByIDsRoute,
  TxpoolBroadcastParams,
  TxpoolBroadcastPayload,
  TxpoolBroadcastResponse,
  txpoolBroadcastRoute,
  TxpoolFeeParams,
  TxpoolFeeResponse,
  txpoolFeeRoute,
  TxpoolTransactionsParams,
  TxpoolTransactionsResponse,
  txpoolTransactionsRoute,
  V2ContractByIDParams,
  V2ContractByIDResponse,
  v2ContractByIDRoute,
  V2ContractRevisionsByIDParams,
  V2ContractRevisionsByIDResponse,
  v2ContractRevisionsByIDRoute,
  V2ContractsByIDsParams,
  V2ContractsByIDsPayload,
  V2ContractsByIDsResponse,
  v2ContractsByIDsRoute,
  V2ContractsByPubkeyParams,
  V2ContractsByPubkeyResponse,
  v2ContractsByPubkeyRoute,
  V2TransactionByIDParams,
  V2TransactionByIDResponse,
  v2TransactionByIDRoute,
  V2TransactionChainIndicesParams,
  V2TransactionChainIndicesResponse,
  v2TransactionChainIndicesRoute,
  V2TransactionsByIDsParams,
  V2TransactionsByIDsPayload,
  V2TransactionsByIDsResponse,
  v2TransactionsByIDsRoute,
} from '@siafoundation/explored-types'
import {
  HookArgsCallback,
  HookArgsSwr,
  HookArgsWithPayloadSwr,
  useGetSwr,
  usePostFunc,
  usePostSwr,
} from '@siafoundation/react-core'

// Txpool

export function useTxpoolBroadcast(
  args: HookArgsCallback<
    TxpoolBroadcastParams,
    TxpoolBroadcastPayload,
    TxpoolBroadcastResponse
  >,
) {
  return usePostFunc(
    { ...args, route: txpoolBroadcastRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(txpoolTransactionsRoute)
      })
    },
  )
}

export function useTxpoolTransactions(
  args?: HookArgsSwr<TxpoolTransactionsParams, TxpoolTransactionsResponse>,
) {
  return useGetSwr({
    ...args,
    route: txpoolTransactionsRoute,
  })
}

export function useTxpoolFee(
  args?: HookArgsSwr<TxpoolFeeParams, TxpoolFeeResponse>,
) {
  return useGetSwr({
    ...args,
    route: txpoolFeeRoute,
  })
}

// Syncer

export function useSyncerConnect(
  args: HookArgsCallback<
    SyncerConnectParams,
    SyncerConnectPayload,
    SyncerConnectResponse
  >,
) {
  return usePostFunc(
    {
      ...args,
      route: syncerConnectRoute,
    },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(syncerPeersRoute)
      })
    },
  )
}

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>,
) {
  return useGetSwr({
    ...args,
    route: syncerPeersRoute,
  })
}

export function useSyncerBroadcastBlock(
  args?: HookArgsCallback<
    SyncerBroadcastBlockParams,
    SyncerBroadcastBlockPayload,
    SyncerBroadcastBlockResponse
  >,
) {
  return usePostFunc({ ...args, route: syncerBroadcastBlockRoute })
}

// Consensus

export function useConsensusTip(
  args?: HookArgsSwr<ConsensusTipParams, ConsensusTipResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusTipRoute,
  })
}

// TODO: TipByHeight AKA "Best Index"

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusNetworkRoute,
  })
}

export function useConsensusState(
  args?: HookArgsSwr<ConsensusStateParams, ConsensusStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusStateRoute,
  })
}

// Transaction

export function useTransactionByID(
  args: HookArgsSwr<TransactionByIDParams, TransactionByIDResponse>,
) {
  return useGetSwr({
    ...args,
    route: transactionByIDRoute,
  })
}

export function useTransactionsByIDs(
  args: HookArgsWithPayloadSwr<
    TransactionsByIDsParams,
    TransactionsByIDsPayload,
    TransactionsByIDsResponse
  >,
) {
  return usePostSwr({
    ...args,
    route: transactionsByIDsRoute,
  })
}

export function useTransactionChainIndices(
  args: HookArgsSwr<
    TransactionChainIndicesParams,
    TransactionChainIndicesResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: transactionChainIndicesRoute,
  })
}

export function useV2TransactionByID(
  args: HookArgsSwr<V2TransactionByIDParams, V2TransactionByIDResponse>,
) {
  return useGetSwr({
    ...args,
    route: v2TransactionByIDRoute,
  })
}

export function useV2TransactionsByIDs(
  args: HookArgsWithPayloadSwr<
    V2TransactionsByIDsParams,
    V2TransactionsByIDsPayload,
    V2TransactionsByIDsResponse
  >,
) {
  return usePostSwr({
    ...args,
    route: v2TransactionsByIDsRoute,
  })
}

export function useV2TransactionChainIndices(
  args: HookArgsSwr<
    V2TransactionChainIndicesParams,
    V2TransactionChainIndicesResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: v2TransactionChainIndicesRoute,
  })
}

// Address

export function useAddressSiacoinUTXOs(
  args: HookArgsSwr<AddressSiacoinUTXOsParams, AddressSiacoinUTXOsResponse>,
) {
  return useGetSwr({
    ...args,
    route: addressSiacoinUTXOsRoute,
  })
}

export function useAddressSiafundUTXOs(
  args: HookArgsSwr<AddressSiafundUTXOsParams, AddressSiafundUTXOsResponse>,
) {
  return useGetSwr({
    ...args,
    route: addressSiafundUTXOsRoute,
  })
}

export function useAddressEvents(
  args: HookArgsSwr<AddressEventsParams, AddressEventsResponse>,
) {
  return useGetSwr({
    ...args,
    route: addressEventsRoute,
  })
}

export function useAddressUnconfirmedEvents(
  args: HookArgsSwr<
    AddressUnconfirmedEventsParams,
    AddressUnconfirmedEventsResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: addressUnconfirmedEventsRoute,
  })
}

export function useAddressBalance(
  args: HookArgsSwr<AddressBalanceParams, AddressBalanceResponse>,
) {
  return useGetSwr({
    ...args,
    route: addressBalanceRoute,
  })
}

// Output

export function useOutputSiacoin(
  args: HookArgsSwr<OutputSiacoinParams, OutputSiacoinResponse>,
) {
  return useGetSwr({
    ...args,
    route: outputSiacoinRoute,
  })
}

export function useOutputSiafund(
  args: HookArgsSwr<OutputSiafundParams, OutputSiafundResponse>,
) {
  return useGetSwr({
    ...args,
    route: outputSiafundRoute,
  })
}

// Contract

export function useContractByID(
  args: HookArgsSwr<ContractByIDParams, ContractByIDResponse>,
) {
  return useGetSwr({
    ...args,
    route: contractByIDRoute,
  })
}

export function useContractsByIDs(
  args: HookArgsWithPayloadSwr<
    ContractsByIDsParams,
    ContractsByIDsPayload,
    ContractsByIDsResponse
  >,
) {
  return usePostSwr({
    ...args,
    route: contractsByIDsRoute,
  })
}

export function useContractByPubkey(
  args: HookArgsSwr<ContractByPubkeyParams, ContractByPubkeyResponse>,
) {
  return useGetSwr({
    ...args,
    route: contractByPubkeyRoute,
  })
}

export function useContractRevisions(
  args: HookArgsSwr<ContractRevisionsParams, ContractRevisionsResponse>,
) {
  return useGetSwr({
    ...args,
    route: contractRevisionsRoute,
  })
}

export function useV2ContractByID(
  args: HookArgsSwr<V2ContractByIDParams, V2ContractByIDResponse>,
) {
  return useGetSwr({
    ...args,
    route: v2ContractByIDRoute,
  })
}

export function useV2ContractsByIDs(
  args: HookArgsWithPayloadSwr<
    V2ContractsByIDsParams,
    V2ContractsByIDsPayload,
    V2ContractsByIDsResponse
  >,
) {
  return usePostSwr({
    ...args,
    route: v2ContractsByIDsRoute,
  })
}

export function useV2ContractByPubkey(
  args: HookArgsSwr<V2ContractsByPubkeyParams, V2ContractsByPubkeyResponse>,
) {
  return useGetSwr({
    ...args,
    route: v2ContractsByPubkeyRoute,
  })
}

export function useV2ContractRevisions(
  args: HookArgsSwr<
    V2ContractRevisionsByIDParams,
    V2ContractRevisionsByIDResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: v2ContractRevisionsByIDRoute,
  })
}

// Metrics

export function useBlockMetrics(
  args: HookArgsSwr<BlockMetricsParams, BlockMetricsResponse>,
) {
  return useGetSwr({
    ...args,
    route: blockMetricsRoute,
  })
}

export function useBlockMetricsByID(
  args: HookArgsSwr<BlockMetricsByIDParams, BlockMetricsByIDResponse>,
) {
  return useGetSwr({
    ...args,
    route: blockMetricsByIDRoute,
  })
}

export function useHostMetrics(
  args: HookArgsSwr<HostMetricsParams, HostMetricsResponse>,
) {
  return useGetSwr({
    ...args,
    route: hostMetricsRoute,
  })
}

export function useBlockTimeMetrics(
  args: HookArgsSwr<BlockTimeMetricsParams, BlockTimeMetricsResponse>,
) {
  return useGetSwr({
    ...args,
    route: blockTimeMetricsRoute,
  })
}

export function useDifficultyMetrics(
  args: HookArgsSwr<DifficultyMetricsParams, DifficultyMetricsResponse>,
) {
  return useGetSwr({
    ...args,
    route: difficultyMetricsRoute,
  })
}

// Search

export function useSearchResultType(
  args: HookArgsSwr<SearchResultTypeParams, SearchResultTypeResponse>,
) {
  return useGetSwr({
    ...args,
    route: searchResultTypeRoute,
  })
}

// Host
export function useHostByPubkey(
  args: HookArgsSwr<HostByPubkeyParams, HostByPubkeyResponse>,
) {
  return useGetSwr({
    ...args,
    route: hostByPubkeyRoute,
  })
}

export function useHostsList(
  args?: HookArgsWithPayloadSwr<
    HostsListParams,
    HostsListPayload,
    HostsListResponse
  >,
) {
  return usePostSwr({ ...args, route: hostsListRoute })
}

// Exchange
export function useExchangeRate(
  args: HookArgsSwr<ExchangeRateParams, ExchangeRateResponse>,
) {
  return useGetSwr({
    ...args,
    route: exchangeRateRoute,
  })
}

// Explorer Tip
export function useExplorerTip(
  args: HookArgsSwr<ExplorerTipParams, ExplorerTipResponse>,
) {
  return useGetSwr({
    ...args,
    route: explorerTipRoute,
  })
}
