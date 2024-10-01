import {
  AddressBalanceParams,
  AddressBalanceResponse,
  addressBalanceRoute,
  AddressSiacoinUTXOsParams,
  AddressSiacoinUTXOsResponse,
  addressSiacoinUTXOsRoute,
  AddressSiafundUTXOsParams,
  AddressSiafundUTXOsResponse,
  addressSiafundUTXOsRoute,
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
  MetricsByIDParams,
  MetricsByIDResponse,
  metricsByIDRoute,
  MetricsParams,
  MetricsResponse,
  metricsRoute,
  OutputSiacoinParams,
  OutputSiacoinResponse,
  outputSiacoinRoute,
  OutputSiafundeParams,
  OutputSiafundeResponse,
  outputSiafundeRoute,
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
  >
) {
  return usePostFunc(
    { ...args, route: txpoolBroadcastRoute },
    async (mutate) => {
      mutate((key) => {
        return key.startsWith(txpoolTransactionsRoute)
      })
    }
  )
}

export function useTxpoolTransactions(
  args?: HookArgsSwr<TxpoolTransactionsParams, TxpoolTransactionsResponse>
) {
  return useGetSwr({
    ...args,
    route: txpoolTransactionsRoute,
  })
}

export function useTxpoolFee(
  args?: HookArgsSwr<TxpoolFeeParams, TxpoolFeeResponse>
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
  >
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
    }
  )
}

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>
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
  >
) {
  return usePostFunc({ ...args, route: syncerBroadcastBlockRoute })
}

// Consensus

export function useConsensusTip(
  args?: HookArgsSwr<ConsensusTipParams, ConsensusTipResponse>
) {
  return useGetSwr({
    ...args,
    route: consensusTipRoute,
  })
}

// TODO: TipByHeight AKA "Best Index"

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>
) {
  return useGetSwr({
    ...args,
    route: consensusNetworkRoute,
  })
}

export function useConsensusState(
  args?: HookArgsSwr<ConsensusStateParams, ConsensusStateResponse>
) {
  return useGetSwr({
    ...args,
    route: consensusStateRoute,
  })
}

// Transaction

export function useTransactionByID(
  args: HookArgsSwr<TransactionByIDParams, TransactionByIDResponse>
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
  >
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
  >
) {
  return useGetSwr({
    ...args,
    route: transactionChainIndicesRoute,
  })
}

// Address

export function useAddressSiacoinUTXOs(
  args: HookArgsSwr<AddressSiacoinUTXOsParams, AddressSiacoinUTXOsResponse>
) {
  return useGetSwr({
    ...args,
    route: addressSiacoinUTXOsRoute,
  })
}

export function useAddressSiafundUTXOs(
  args: HookArgsSwr<AddressSiafundUTXOsParams, AddressSiafundUTXOsResponse>
) {
  return useGetSwr({
    ...args,
    route: addressSiafundUTXOsRoute,
  })
}

export function useAddressBalance(
  args: HookArgsSwr<AddressBalanceParams, AddressBalanceResponse>
) {
  return useGetSwr({
    ...args,
    route: addressBalanceRoute,
  })
}

// Output

export function useOutputSiacoin(
  args: HookArgsSwr<OutputSiacoinParams, OutputSiacoinResponse>
) {
  return useGetSwr({
    ...args,
    route: outputSiacoinRoute,
  })
}

export function useOutputSiafund(
  args: HookArgsSwr<OutputSiafundeParams, OutputSiafundeResponse>
) {
  return useGetSwr({
    ...args,
    route: outputSiafundeRoute,
  })
}

// Contract

export function useContractByID(
  args: HookArgsSwr<ContractByIDParams, ContractByIDResponse>
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
  >
) {
  return usePostSwr({
    ...args,
    route: contractsByIDsRoute,
  })
}

export function useContractByPubkey(
  args: HookArgsSwr<ContractByPubkeyParams, ContractByPubkeyResponse>
) {
  return useGetSwr({
    ...args,
    route: contractByPubkeyRoute,
  })
}

export function useContractRevisions(
  args: HookArgsSwr<ContractRevisionsParams, ContractRevisionsResponse>
) {
  return useGetSwr({
    ...args,
    route: contractRevisionsRoute,
  })
}

// Metrics

export function useMetrics(args: HookArgsSwr<MetricsParams, MetricsResponse>) {
  return useGetSwr({
    ...args,
    route: metricsRoute,
  })
}

export function useMetricsByID(
  args: HookArgsSwr<MetricsByIDParams, MetricsByIDResponse>
) {
  return useGetSwr({
    ...args,
    route: metricsByIDRoute,
  })
}

// Search

export function useSearchResultType(
  args: HookArgsSwr<SearchResultTypeParams, SearchResultTypeResponse>
) {
  return useGetSwr({
    ...args,
    route: searchResultTypeRoute,
  })
}
