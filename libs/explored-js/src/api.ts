import { buildRequestHandler, initAxios } from '@siafoundation/request'
import {
  addressBalanceRoute,
  AddressBalanceParams,
  AddressBalancePayload,
  AddressBalanceResponse,
  addressEventsRoute,
  AddressEventsParams,
  AddressEventsPayload,
  AddressEventsResponse,
  addressSiacoinUTXOsRoute,
  AddressSiacoinUTXOsParams,
  AddressSiacoinUTXOsPayload,
  AddressSiacoinUTXOsResponse,
  addressSiafundUTXOsRoute,
  AddressSiafundUTXOsParams,
  AddressSiafundUTXOsPayload,
  AddressSiafundUTXOsResponse,
  blockByIDRoute,
  BlockByIDParams,
  BlockByIDPayload,
  BlockByIDResponse,
  blockMetricsRoute,
  BlockMetricsParams,
  BlockMetricsPayload,
  BlockMetricsResponse,
  blockMetricsByIDRoute,
  BlockMetricsByIDParams,
  BlockMetricsByIDPayload,
  BlockMetricsByIDResponse,
  consensusNetworkRoute,
  ConsensusNetworkParams,
  ConsensusNetworkPayload,
  ConsensusNetworkResponse,
  ContractRevisionsParams,
  ContractRevisionsPayload,
  ContractRevisionsResponse,
  contractRevisionsRoute,
  consensusStateRoute,
  ConsensusStateParams,
  ConsensusStatePayload,
  ConsensusStateResponse,
  consensusTipByHeightRoute,
  ConsensusTipByHeightParams,
  ConsensusTipByHeightPayload,
  ConsensusTipByHeightResponse,
  consensusTipRoute,
  ConsensusTipParams,
  ConsensusTipPayload,
  ConsensusTipResponse,
  contractByIDRoute,
  ContractByIDParams,
  ContractByIDPayload,
  ContractByIDResponse,
  contractsByIDsRoute,
  ContractsByIDsParams,
  ContractsByIDsPayload,
  ContractsByIDsResponse,
  contractByPubkeyRoute,
  ContractByPubkeyParams,
  ContractByPubkeyPayload,
  ContractByPubkeyResponse,
  ExchangeRateParams,
  ExchangeRatePayload,
  ExchangeRateResponse,
  exchangeRateRoute,
  explorerTipRoute,
  ExplorerTipParams,
  ExplorerTipPayload,
  ExplorerTipResponse,
  hostMetricsRoute,
  HostMetricsParams,
  HostMetricsPayload,
  HostMetricsResponse,
  hostsListRoute,
  HostsListParams,
  HostsListPayload,
  HostsListResponse,
  hostByPubkeyRoute,
  HostByPubkeyParams,
  HostByPubkeyPayload,
  HostByPubkeyResponse,
  OutputSiacoinParams,
  OutputSiacoinPayload,
  OutputSiacoinResponse,
  outputSiacoinRoute,
  OutputSiafundeParams,
  OutputSiafundePayload,
  OutputSiafundeResponse,
  outputSiafundeRoute,
  searchResultTypeRoute,
  SearchResultTypeParams,
  SearchResultTypePayload,
  SearchResultTypeResponse,
  syncerBroadcastBlockRoute,
  SyncerBroadcastBlockParams,
  SyncerBroadcastBlockPayload,
  SyncerBroadcastBlockResponse,
  syncerConnectRoute,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  syncerPeersRoute,
  SyncerPeersParams,
  SyncerPeersPayload,
  SyncerPeersResponse,
  transactionByIDRoute,
  TransactionByIDParams,
  TransactionByIDPayload,
  TransactionByIDResponse,
  transactionsByIDsRoute,
  TransactionsByIDsParams,
  TransactionsByIDsPayload,
  TransactionsByIDsResponse,
  txpoolBroadcastRoute,
  TxpoolBroadcastParams,
  TxpoolBroadcastPayload,
  TxpoolBroadcastResponse,
  txpoolFeeRoute,
  TxpoolFeeParams,
  TxpoolFeePayload,
  TxpoolFeeResponse,
  txpoolTransactionsRoute,
  TxpoolTransactionsParams,
  TxpoolTransactionsPayload,
  TxpoolTransactionsResponse,
  transactionChainIndicesRoute,
  TransactionChainIndicesParams,
  TransactionChainIndicesPayload,
  TransactionChainIndicesResponse,
  V2ContractByIDParams,
  V2ContractByIDPayload,
  V2ContractByIDResponse,
  v2ContractByIDRoute,
  V2ContractsByIDsParams,
  V2ContractsByIDsPayload,
  V2ContractsByIDsResponse,
  v2ContractsByIDsRoute,
  V2ContractRevisionsByIDParams,
  V2ContractRevisionsByIDPayload,
  V2ContractRevisionsByIDResponse,
  v2ContractRevisionsByIDRoute,
  V2ContractsByPubkeyParams,
  V2ContractsByPubkeyPayload,
  V2ContractsByPubkeyResponse,
  v2ContractsByPubkeyRoute,
  V2TransactionByIDParams,
  V2TransactionByIDPayload,
  V2TransactionByIDResponse,
  V2TransactionsByIDsParams,
  V2TransactionsByIDsPayload,
  V2TransactionsByIDsResponse,
  V2TransactionChainIndicesParams,
  V2TransactionChainIndicesPayload,
  V2TransactionChainIndicesResponse,
  v2TransactionByIDRoute,
  v2TransactionsByIDsRoute,
  v2TransactionChainIndicesRoute,
} from '@siafoundation/explored-types'

export function Explored({
  api,
  password,
}: {
  api: string
  password?: string
}) {
  const axios = initAxios(api, password)
  return {
    axios,
    // Tx pool
    txpoolBroadcast: buildRequestHandler<
      TxpoolBroadcastParams,
      TxpoolBroadcastPayload,
      TxpoolBroadcastResponse
    >(axios, 'post', txpoolBroadcastRoute),
    txpoolTransactions: buildRequestHandler<
      TxpoolTransactionsParams,
      TxpoolTransactionsPayload,
      TxpoolTransactionsResponse
    >(axios, 'get', txpoolTransactionsRoute),
    txpoolFee: buildRequestHandler<
      TxpoolFeeParams,
      TxpoolFeePayload,
      TxpoolFeeResponse
    >(axios, 'get', txpoolFeeRoute),
    // Syncer
    syncerConnect: buildRequestHandler<
      SyncerConnectParams,
      SyncerConnectPayload,
      SyncerConnectResponse
    >(axios, 'post', syncerConnectRoute),
    syncerPeers: buildRequestHandler<
      SyncerPeersParams,
      SyncerPeersPayload,
      SyncerPeersResponse
    >(axios, 'get', syncerPeersRoute),
    syncerBroadcastBlock: buildRequestHandler<
      SyncerBroadcastBlockParams,
      SyncerBroadcastBlockPayload,
      SyncerBroadcastBlockResponse
    >(axios, 'post', syncerBroadcastBlockRoute),
    // Consensus
    consensusTip: buildRequestHandler<
      ConsensusTipParams,
      ConsensusTipPayload,
      ConsensusTipResponse
    >(axios, 'get', consensusTipRoute),
    consensusTipByHeight: buildRequestHandler<
      ConsensusTipByHeightParams,
      ConsensusTipByHeightPayload,
      ConsensusTipByHeightResponse
    >(axios, 'get', consensusTipByHeightRoute),
    consensusNetwork: buildRequestHandler<
      ConsensusNetworkParams,
      ConsensusNetworkPayload,
      ConsensusNetworkResponse
    >(axios, 'get', consensusNetworkRoute),
    consensusState: buildRequestHandler<
      ConsensusStateParams,
      ConsensusStatePayload,
      ConsensusStateResponse
    >(axios, 'get', consensusStateRoute),
    // Block
    blockByID: buildRequestHandler<
      BlockByIDParams,
      BlockByIDPayload,
      BlockByIDResponse
    >(axios, 'get', blockByIDRoute),
    // Transaction
    transactionByID: buildRequestHandler<
      TransactionByIDParams,
      TransactionByIDPayload,
      TransactionByIDResponse
    >(axios, 'get', transactionByIDRoute),
    transactionsByIDs: buildRequestHandler<
      TransactionsByIDsParams,
      TransactionsByIDsPayload,
      TransactionsByIDsResponse
    >(axios, 'post', transactionsByIDsRoute),
    transactionChainIndices: buildRequestHandler<
      TransactionChainIndicesParams,
      TransactionChainIndicesPayload,
      TransactionChainIndicesResponse
    >(axios, 'get', transactionChainIndicesRoute),

    v2TransactionByID: buildRequestHandler<
      V2TransactionByIDParams,
      V2TransactionByIDPayload,
      V2TransactionByIDResponse
    >(axios, 'get', v2TransactionByIDRoute),
    v2TransactionsByIDs: buildRequestHandler<
      V2TransactionsByIDsParams,
      V2TransactionsByIDsPayload,
      V2TransactionsByIDsResponse
    >(axios, 'post', v2TransactionsByIDsRoute),
    v2TransactionChainIndices: buildRequestHandler<
      V2TransactionChainIndicesParams,
      V2TransactionChainIndicesPayload,
      V2TransactionChainIndicesResponse
    >(axios, 'get', v2TransactionChainIndicesRoute),

    // Address
    addressSiacoinUTXOs: buildRequestHandler<
      AddressSiacoinUTXOsParams,
      AddressSiacoinUTXOsPayload,
      AddressSiacoinUTXOsResponse
    >(axios, 'get', addressSiacoinUTXOsRoute),
    addressSiafundUTXOs: buildRequestHandler<
      AddressSiafundUTXOsParams,
      AddressSiafundUTXOsPayload,
      AddressSiafundUTXOsResponse
    >(axios, 'get', addressSiafundUTXOsRoute),
    addressEvents: buildRequestHandler<
      AddressEventsParams,
      AddressEventsPayload,
      AddressEventsResponse
    >(axios, 'get', addressEventsRoute),
    addressBalance: buildRequestHandler<
      AddressBalanceParams,
      AddressBalancePayload,
      AddressBalanceResponse
    >(axios, 'get', addressBalanceRoute),
    //Output
    outputSiacoin: buildRequestHandler<
      OutputSiacoinParams,
      OutputSiacoinPayload,
      OutputSiacoinResponse
    >(axios, 'get', outputSiacoinRoute),
    outputSiafund: buildRequestHandler<
      OutputSiafundeParams,
      OutputSiafundePayload,
      OutputSiafundeResponse
    >(axios, 'get', outputSiafundeRoute),
    // Contract
    contractByID: buildRequestHandler<
      ContractByIDParams,
      ContractByIDPayload,
      ContractByIDResponse
    >(axios, 'get', contractByIDRoute),
    contractsByIDs: buildRequestHandler<
      ContractsByIDsParams,
      ContractsByIDsPayload,
      ContractsByIDsResponse
    >(axios, 'post', contractsByIDsRoute),
    contractByPubkey: buildRequestHandler<
      ContractByPubkeyParams,
      ContractByPubkeyPayload,
      ContractByPubkeyResponse
    >(axios, 'get', contractByPubkeyRoute),
    contractRevisions: buildRequestHandler<
      ContractRevisionsParams,
      ContractRevisionsPayload,
      ContractRevisionsResponse
    >(axios, 'get', contractRevisionsRoute),
    // Contract - V2
    v2ContractByID: buildRequestHandler<
      V2ContractByIDParams,
      V2ContractByIDPayload,
      V2ContractByIDResponse
    >(axios, 'get', v2ContractByIDRoute),
    v2ContractsByID: buildRequestHandler<
      V2ContractsByIDsParams,
      V2ContractsByIDsPayload,
      V2ContractsByIDsResponse
    >(axios, 'post', v2ContractsByIDsRoute),
    v2ContractRevisionsByID: buildRequestHandler<
      V2ContractRevisionsByIDParams,
      V2ContractRevisionsByIDPayload,
      V2ContractRevisionsByIDResponse
    >(axios, 'get', v2ContractRevisionsByIDRoute),
    v2ContractsByPubKey: buildRequestHandler<
      V2ContractsByPubkeyParams,
      V2ContractsByPubkeyPayload,
      V2ContractsByPubkeyResponse
    >(axios, 'get', v2ContractsByPubkeyRoute),
    // Metrics
    blockMetrics: buildRequestHandler<
      BlockMetricsParams,
      BlockMetricsPayload,
      BlockMetricsResponse
    >(axios, 'get', blockMetricsRoute),
    blockMetricsByID: buildRequestHandler<
      BlockMetricsByIDParams,
      BlockMetricsByIDPayload,
      BlockMetricsByIDResponse
    >(axios, 'get', blockMetricsByIDRoute),
    hostMetrics: buildRequestHandler<
      HostMetricsParams,
      HostMetricsPayload,
      HostMetricsResponse
    >(axios, 'get', hostMetricsRoute),
    // Search
    searchResultType: buildRequestHandler<
      SearchResultTypeParams,
      SearchResultTypePayload,
      SearchResultTypeResponse
    >(axios, 'get', searchResultTypeRoute),
    // Host
    hostByPubkey: buildRequestHandler<
      HostByPubkeyParams,
      HostByPubkeyPayload,
      HostByPubkeyResponse
    >(axios, 'get', hostByPubkeyRoute),
    hostsList: buildRequestHandler<
      HostsListParams,
      HostsListPayload,
      HostsListResponse
    >(axios, 'post', hostsListRoute),
    // Exchange
    exchangeRate: buildRequestHandler<
      ExchangeRateParams,
      ExchangeRatePayload,
      ExchangeRateResponse
    >(axios, 'get', exchangeRateRoute),
    // Explorer Tip
    explorerTip: buildRequestHandler<
      ExplorerTipParams,
      ExplorerTipPayload,
      ExplorerTipResponse
    >(axios, 'get', explorerTipRoute),
  }
}
