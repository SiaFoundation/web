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
  metricsRoute,
  MetricsParams,
  MetricsPayload,
  MetricsResponse,
  metricsByIDRoute,
  MetricsByIDParams,
  MetricsByIDPayload,
  MetricsByIDResponse,
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
  OutputSiacoineParams,
  OutputSiacoinePayload,
  OutputSiacoineResponse,
  outputSiacoineRoute,
  OutputSiafundeParams,
  OutputSiafundePayload,
  OutputSiafundeResponse,
  outputSiafundeRoute,
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
      OutputSiacoineParams,
      OutputSiacoinePayload,
      OutputSiacoineResponse
    >(axios, 'get', outputSiacoineRoute),
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
    // Metrics
    metrics: buildRequestHandler<
      MetricsParams,
      MetricsPayload,
      MetricsResponse
    >(axios, 'get', metricsRoute),
    metricsByID: buildRequestHandler<
      MetricsByIDParams,
      MetricsByIDPayload,
      MetricsByIDResponse
    >(axios, 'get', metricsByIDRoute),
    // Search
    searchResultType: buildRequestHandler<
      SearchResultTypeParams,
      SearchResultTypePayload,
      SearchResultTypeResponse
    >(axios, 'get', searchResultTypeRoute),
  }
}
