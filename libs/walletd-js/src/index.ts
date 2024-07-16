import { buildRequestHandler, initAxios } from '@siafoundation/request'
import {
  type ConsensusNetworkParams,
  type ConsensusNetworkPayload,
  type ConsensusNetworkResponse,
  type ConsensusTipParams,
  type ConsensusTipPayload,
  type ConsensusTipResponse,
  type ConsensusTipStateParams,
  type ConsensusTipStatePayload,
  type ConsensusTipStateResponse,
  type RescanParams,
  type RescanPayload,
  type RescanResponse,
  type RescanStartParams,
  type RescanStartPayload,
  type RescanStartResponse,
  type StateParams,
  type StatePayload,
  type StateResponse,
  type SyncerConnectParams,
  type SyncerConnectPayload,
  type SyncerConnectResponse,
  type SyncerPeersParams,
  type SyncerPeersPayload,
  type SyncerPeersResponse,
  type TxPoolBroadcastParams,
  type TxPoolBroadcastPayload,
  type TxPoolBroadcastResponse,
  type TxPoolFeeParams,
  type TxPoolFeePayload,
  type TxPoolFeeResponse,
  type TxPoolTransactionsParams,
  type TxPoolTransactionsPayload,
  type TxPoolTransactionsResponse,
  type WalletAddParams,
  type WalletAddPayload,
  type WalletAddResponse,
  type WalletAddressAddParams,
  type WalletAddressAddPayload,
  type WalletAddressAddResponse,
  type WalletAddressDeleteParams,
  type WalletAddressDeletePayload,
  type WalletAddressDeleteResponse,
  type WalletAddressesParams,
  type WalletAddressesPayload,
  type WalletAddressesResponse,
  type WalletBalanceParams,
  type WalletBalancePayload,
  type WalletBalanceResponse,
  type WalletDeleteParams,
  type WalletDeletePayload,
  type WalletDeleteResponse,
  type WalletEventsParams,
  type WalletEventsPayload,
  type WalletEventsResponse,
  type WalletEventsUnconfirmedParams,
  type WalletEventsUnconfirmedPayload,
  type WalletEventsUnconfirmedResponse,
  type WalletFundSiacoinParams,
  type WalletFundSiacoinPayload,
  type WalletFundSiacoinResponse,
  type WalletFundSiafundParams,
  type WalletFundSiafundPayload,
  type WalletFundSiafundResponse,
  type WalletOutputsSiacoinParams,
  type WalletOutputsSiacoinPayload,
  type WalletOutputsSiacoinResponse,
  type WalletOutputsSiafundParams,
  type WalletOutputsSiafundPayload,
  type WalletOutputsSiafundResponse,
  type WalletReleaseParams,
  type WalletReleasePayload,
  type WalletReleaseResponse,
  type WalletReserveParams,
  type WalletReservePayload,
  type WalletReserveResponse,
  type WalletUpdateParams,
  type WalletUpdatePayload,
  type WalletUpdateResponse,
  type WalletsParams,
  type WalletsPayload,
  type WalletsResponse,
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

export function Walletd({ api, password }: { api: string; password?: string }) {
  const axios = initAxios(api, password)
  return {
    axios,
    state: buildRequestHandler<StateParams, StatePayload, StateResponse>(
      axios,
      'get',
      stateRoute,
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
  }
}
