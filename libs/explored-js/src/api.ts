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
  blockMetricsRoute,
  BlockMetricsParams,
  BlockMetricsPayload,
  BlockMetricsResponse,
  blockMetricsByIDRoute,
  BlockMetricsByIDParams,
  BlockMetricsByIDPayload,
  BlockMetricsByIDResponse,
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
  }
}
