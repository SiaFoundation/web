import {
  WalletAddressOutputsSiacoinParams,
  WalletAddressOutputsSiacoinPayload,
  WalletAddressOutputsSiacoinResponse,
  WalletAddressOutputsSiafundParams,
  WalletAddressOutputsSiafundPayload,
  WalletAddressOutputsSiafundResponse,
  ConsensusNetworkParams,
  ConsensusNetworkPayload,
  ConsensusNetworkResponse,
  ConsensusTipParams,
  ConsensusTipPayload,
  ConsensusTipResponse,
  ConsensusTipStateParams,
  ConsensusTipStatePayload,
  ConsensusTipStateResponse,
  RescanParams,
  RescanPayload,
  RescanResponse,
  RescanStartParams,
  RescanStartPayload,
  RescanStartResponse,
  StateParams,
  StatePayload,
  StateResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  SyncerPeersParams,
  SyncerPeersPayload,
  SyncerPeersResponse,
  TxPoolBroadcastParams,
  TxPoolBroadcastPayload,
  TxPoolBroadcastResponse,
  TxPoolFeeParams,
  TxPoolFeePayload,
  TxPoolFeeResponse,
  TxPoolTransactionsParams,
  TxPoolTransactionsPayload,
  TxPoolTransactionsResponse,
  WalletAddParams,
  WalletAddPayload,
  WalletAddResponse,
  WalletAddressAddParams,
  WalletAddressAddPayload,
  WalletAddressAddResponse,
  WalletAddressDeleteParams,
  WalletAddressDeletePayload,
  WalletAddressDeleteResponse,
  WalletAddressesParams,
  WalletAddressesPayload,
  WalletAddressesResponse,
  WalletBalanceParams,
  WalletBalancePayload,
  WalletBalanceResponse,
  WalletConstructV1TransactionParams,
  WalletConstructV1TransactionPayload,
  WalletConstructV1TransactionResponse,
  WalletConstructV2TransactionParams,
  WalletConstructV2TransactionPayload,
  WalletConstructV2TransactionResponse,
  WalletDeleteParams,
  WalletDeletePayload,
  WalletDeleteResponse,
  WalletEventsParams,
  WalletEventsPayload,
  WalletEventsResponse,
  WalletEventsUnconfirmedParams,
  WalletEventsUnconfirmedPayload,
  WalletEventsUnconfirmedResponse,
  WalletFundSiacoinParams,
  WalletFundSiacoinPayload,
  WalletFundSiacoinResponse,
  WalletFundSiafundParams,
  WalletFundSiafundPayload,
  WalletFundSiafundResponse,
  WalletOutputsSiacoinParams,
  WalletOutputsSiacoinPayload,
  WalletOutputsSiacoinResponse,
  WalletOutputsSiafundParams,
  WalletOutputsSiafundPayload,
  WalletOutputsSiafundResponse,
  WalletReleaseParams,
  WalletReleasePayload,
  WalletReleaseResponse,
  WalletReserveParams,
  WalletReservePayload,
  WalletReserveResponse,
  WalletUpdateParams,
  WalletUpdatePayload,
  WalletUpdateResponse,
  WalletsParams,
  WalletsPayload,
  WalletsResponse,
  addressesAddrOutputsSiacoinRoute,
  addressesAddrOutputsSiafundRoute,
  consensusNetworkRoute,
  consensusTipRoute,
  consensusTipStateRoute,
  rescanRoute,
  stateRoute,
  syncerConnectRoute,
  syncerPeersRoute,
  txPoolBroadcastRoute,
  txPoolFeeRoute,
  txPoolTransactionsRoute,
  walletsIdAddressesAddrRoute,
  walletsIdAddressesRoute,
  walletsIdBalanceRoute,
  walletsIdConstructTransactionRoute,
  walletsIdConstructV2TransactionRoute,
  walletsIdEventsRoute,
  walletsIdEventsUnconfirmedRoute,
  walletsIdFundRoute,
  walletsIdFundSfRoute,
  walletsIdOutputsSiacoinRoute,
  walletsIdOutputsSiafundRoute,
  walletsIdReleaseRoute,
  walletsIdReserveRoute,
  walletsIdRoute,
  walletsRoute,
} from '@siafoundation/walletd-types'
import { buildRequestHandler, initAxios } from '@siafoundation/request'

export function Walletd({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    state: buildRequestHandler<StateParams, StatePayload, StateResponse>(
      axios,
      'get',
      stateRoute
    ),
    consensusTip: buildRequestHandler<
      ConsensusTipParams,
      ConsensusTipPayload,
      ConsensusTipResponse
    >(axios, 'get', consensusTipRoute),
    consensusTipState: buildRequestHandler<
      ConsensusTipStateParams,
      ConsensusTipStatePayload,
      ConsensusTipStateResponse
    >(axios, 'get', consensusTipStateRoute),
    consensusNetwork: buildRequestHandler<
      ConsensusNetworkParams,
      ConsensusNetworkPayload,
      ConsensusNetworkResponse
    >(axios, 'get', consensusNetworkRoute),
    syncerPeers: buildRequestHandler<
      SyncerPeersParams,
      SyncerPeersPayload,
      SyncerPeersResponse
    >(axios, 'get', syncerPeersRoute),
    syncerConnect: buildRequestHandler<
      SyncerConnectParams,
      SyncerConnectPayload,
      SyncerConnectResponse
    >(axios, 'post', syncerConnectRoute),
    txPoolTransactions: buildRequestHandler<
      TxPoolTransactionsParams,
      TxPoolTransactionsPayload,
      TxPoolTransactionsResponse
    >(axios, 'get', txPoolTransactionsRoute),
    txPoolFee: buildRequestHandler<
      TxPoolFeeParams,
      TxPoolFeePayload,
      TxPoolFeeResponse
    >(axios, 'get', txPoolFeeRoute),
    txPoolBroadcast: buildRequestHandler<
      TxPoolBroadcastParams,
      TxPoolBroadcastPayload,
      TxPoolBroadcastResponse
    >(axios, 'post', txPoolBroadcastRoute),
    rescanStart: buildRequestHandler<
      RescanStartParams,
      RescanStartPayload,
      RescanStartResponse
    >(axios, 'post', rescanRoute),
    rescanStatus: buildRequestHandler<
      RescanParams,
      RescanPayload,
      RescanResponse
    >(axios, 'get', rescanRoute),
    wallets: buildRequestHandler<
      WalletsParams,
      WalletsPayload,
      WalletsResponse
    >(axios, 'get', walletsRoute),
    walletAdd: buildRequestHandler<
      WalletAddParams,
      WalletAddPayload,
      WalletAddResponse
    >(axios, 'post', walletsRoute),
    walletUpdate: buildRequestHandler<
      WalletUpdateParams,
      WalletUpdatePayload,
      WalletUpdateResponse
    >(axios, 'post', walletsIdRoute),
    walletDelete: buildRequestHandler<
      WalletDeleteParams,
      WalletDeletePayload,
      WalletDeleteResponse
    >(axios, 'delete', walletsIdRoute),
    walletAddresses: buildRequestHandler<
      WalletAddressesParams,
      WalletAddressesPayload,
      WalletAddressesResponse
    >(axios, 'get', walletsIdAddressesRoute),
    walletAddressAdd: buildRequestHandler<
      WalletAddressAddParams,
      WalletAddressAddPayload,
      WalletAddressAddResponse
    >(axios, 'put', walletsIdAddressesRoute),
    walletAddressDelete: buildRequestHandler<
      WalletAddressDeleteParams,
      WalletAddressDeletePayload,
      WalletAddressDeleteResponse
    >(axios, 'delete', walletsIdAddressesAddrRoute),
    walletBalance: buildRequestHandler<
      WalletBalanceParams,
      WalletBalancePayload,
      WalletBalanceResponse
    >(axios, 'get', walletsIdBalanceRoute),
    walletEvents: buildRequestHandler<
      WalletEventsParams,
      WalletEventsPayload,
      WalletEventsResponse
    >(axios, 'get', walletsIdEventsRoute),
    walletEventsUnconfirmed: buildRequestHandler<
      WalletEventsUnconfirmedParams,
      WalletEventsUnconfirmedPayload,
      WalletEventsUnconfirmedResponse
    >(axios, 'get', walletsIdEventsUnconfirmedRoute),
    walletOutputsSiacoin: buildRequestHandler<
      WalletOutputsSiacoinParams,
      WalletOutputsSiacoinPayload,
      WalletOutputsSiacoinResponse
    >(axios, 'get', walletsIdOutputsSiacoinRoute),
    walletOutputsSiafund: buildRequestHandler<
      WalletOutputsSiafundParams,
      WalletOutputsSiafundPayload,
      WalletOutputsSiafundResponse
    >(axios, 'get', walletsIdOutputsSiafundRoute),
    walletFundSiacoin: buildRequestHandler<
      WalletFundSiacoinParams,
      WalletFundSiacoinPayload,
      WalletFundSiacoinResponse
    >(axios, 'post', walletsIdFundRoute),
    walletFundSiafund: buildRequestHandler<
      WalletFundSiafundParams,
      WalletFundSiafundPayload,
      WalletFundSiafundResponse
    >(axios, 'post', walletsIdFundSfRoute),
    walletReserve: buildRequestHandler<
      WalletReserveParams,
      WalletReservePayload,
      WalletReserveResponse
    >(axios, 'post', walletsIdReserveRoute),
    walletRelease: buildRequestHandler<
      WalletReleaseParams,
      WalletReleasePayload,
      WalletReleaseResponse
    >(axios, 'post', walletsIdReleaseRoute),
    walletConstructV1Transaction: buildRequestHandler<
      WalletConstructV1TransactionParams,
      WalletConstructV1TransactionPayload,
      WalletConstructV1TransactionResponse
    >(axios, 'post', walletsIdConstructTransactionRoute),
    walletConstructV2Transaction: buildRequestHandler<
      WalletConstructV2TransactionParams,
      WalletConstructV2TransactionPayload,
      WalletConstructV2TransactionResponse
    >(axios, 'post', walletsIdConstructV2TransactionRoute),
    walletAddressOutputsSiacoin: buildRequestHandler<
      WalletAddressOutputsSiacoinParams,
      WalletAddressOutputsSiacoinPayload,
      WalletAddressOutputsSiacoinResponse
    >(axios, 'get', addressesAddrOutputsSiacoinRoute),
    walletAddressOutputsSiafund: buildRequestHandler<
      WalletAddressOutputsSiafundParams,
      WalletAddressOutputsSiafundPayload,
      WalletAddressOutputsSiafundResponse
    >(axios, 'get', addressesAddrOutputsSiafundRoute),
  }
}
