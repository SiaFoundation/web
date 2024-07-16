import {
  type HookArgsCallback,
  type HookArgsSwr,
  delay,
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
  useDeleteFunc,
  useGetSwr,
  usePostFunc,
  usePutFunc,
} from '@siafoundation/react-core'
import {
  type ConsensusNetworkParams,
  type ConsensusNetworkResponse,
  type ConsensusTipParams,
  type ConsensusTipResponse,
  type ConsensusTipStateParams,
  type ConsensusTipStateResponse,
  type RescanParams,
  type RescanResponse,
  type RescanStartParams,
  type RescanStartPayload,
  type RescanStartResponse,
  type StateParams,
  type StateResponse,
  type SyncerConnectParams,
  type SyncerConnectPayload,
  type SyncerConnectResponse,
  type SyncerPeersParams,
  type SyncerPeersResponse,
  type TxPoolBroadcastParams,
  type TxPoolBroadcastPayload,
  type TxPoolBroadcastResponse,
  type TxPoolFeeParams,
  type TxPoolFeeResponse,
  type TxPoolTransactionsParams,
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
  type WalletAddressesResponse,
  type WalletBalanceParams,
  type WalletBalanceResponse,
  type WalletDeleteParams,
  type WalletDeletePayload,
  type WalletDeleteResponse,
  type WalletEventsParams,
  type WalletEventsResponse,
  type WalletEventsUnconfirmedParams,
  type WalletEventsUnconfirmedResponse,
  type WalletFundSiacoinParams,
  type WalletFundSiacoinPayload,
  type WalletFundSiacoinResponse,
  type WalletFundSiafundParams,
  type WalletFundSiafundPayload,
  type WalletFundSiafundResponse,
  type WalletOutputsSiacoinParams,
  type WalletOutputsSiacoinResponse,
  type WalletOutputsSiafundParams,
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
import useSWR from 'swr'

// state

export function useNodeState(args?: HookArgsSwr<StateParams, StateResponse>) {
  return useGetSwr({
    ...args,
    route: stateRoute,
  })
}

// consensus

export function useConsensusTip(
  args?: HookArgsSwr<ConsensusTipParams, ConsensusTipResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusTipRoute,
  })
}

export function useConsensusTipState(
  args?: HookArgsSwr<ConsensusTipStateParams, ConsensusTipStateResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusTipStateRoute,
  })
}

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>,
) {
  return useGetSwr({
    ...args,
    route: consensusNetworkRoute,
  })
}

export function useEstimatedNetworkBlockHeight(): number {
  const network = useConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const res = useSWR(
    network,
    () => {
      if (network.data?.name === 'zen') {
        return getTestnetZenBlockHeight()
      }
      return getMainnetBlockHeight()
    },
    {
      refreshInterval: 60_000,
      keepPreviousData: true,
    },
  )
  return res.data || 0
}

// syncer

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>,
) {
  return useGetSwr({
    ...args,
    route: syncerPeersRoute,
  })
}

export function useSyncerConnect(
  args?: HookArgsCallback<
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
      mutate((key) => key === syncerPeersRoute)
    },
  )
}

// txpool

export function useTxPoolTransactions(
  args?: HookArgsSwr<TxPoolTransactionsParams, TxPoolTransactionsResponse>,
) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolFee(
  args?: HookArgsSwr<TxPoolFeeParams, TxPoolFeeResponse>,
) {
  return useGetSwr({ ...args, route: txPoolFeeRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<
    TxPoolBroadcastParams,
    TxPoolBroadcastPayload,
    TxPoolBroadcastResponse
  >,
) {
  return usePostFunc(
    {
      ...args,
      route: txPoolBroadcastRoute,
    },
    async (mutate) => {
      await delay(2_000)
      mutate((key) => {
        return (
          key.startsWith(txPoolTransactionsRoute) ||
          // Most importantly to trigger /wallets/:id/txpool.
          key.startsWith(walletsRoute)
        )
      })
    },
  )
}

// rescan

export function useRescanStart(
  args?: HookArgsCallback<
    RescanStartParams,
    RescanStartPayload,
    RescanStartResponse
  >,
) {
  return usePostFunc(
    {
      ...args,
      route: rescanRoute,
    },
    async (mutate) => {
      // Do not block the hook method from returning and allowing consumer to toast success etc.
      const func = async () => {
        await delay(1_000)
        await mutate((key) => key.startsWith(rescanRoute))
      }
      func()
    },
  )
}

export function useRescanStatus(
  args?: HookArgsSwr<RescanParams, RescanResponse>,
) {
  return useGetSwr({
    ...args,
    route: rescanRoute,
  })
}

// wallet

export function useWallets(args?: HookArgsSwr<WalletsParams, WalletsResponse>) {
  return useGetSwr({
    ...args,
    route: walletsRoute,
  })
}

export function useWalletAdd(
  args?: HookArgsCallback<WalletAddParams, WalletAddPayload, WalletAddResponse>,
) {
  return usePostFunc(
    {
      ...args,
      route: walletsRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(walletsRoute))
    },
  )
}

export function useWalletUpdate(
  args?: HookArgsCallback<
    WalletUpdateParams,
    WalletUpdatePayload,
    WalletUpdateResponse
  >,
) {
  return usePostFunc(
    {
      ...args,
      route: walletsIdRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(walletsRoute))
    },
  )
}

export function useWalletDelete(
  args?: HookArgsCallback<
    WalletDeleteParams,
    WalletDeletePayload,
    WalletDeleteResponse
  >,
) {
  return useDeleteFunc(
    { ...args, route: walletsIdRoute },
    async (mutate, data) => {
      mutate((key) => key.startsWith(walletsRoute))
    },
  )
}

// addresses

export function useWalletAddresses(
  args: HookArgsSwr<WalletAddressesParams, WalletAddressesResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletsIdAddressesRoute,
  })
}

export function useWalletAddressAdd(
  args?: HookArgsCallback<
    WalletAddressAddParams,
    WalletAddressAddPayload,
    WalletAddressAddResponse
  >,
) {
  return usePutFunc(
    {
      ...args,
      route: walletsIdAddressesRoute,
    },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith(walletsIdRoute.replace(':id', data.params.id)),
      )
    },
  )
}

export function useWalletAddressDelete(
  args?: HookArgsCallback<
    WalletAddressDeleteParams,
    WalletAddressDeletePayload,
    WalletAddressDeleteResponse
  >,
) {
  return useDeleteFunc(
    { ...args, route: walletsIdAddressesAddrRoute },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith(walletsIdAddressesRoute.replace(':id', data.params.id)),
      )
    },
  )
}

export function useWalletBalance(
  args: HookArgsSwr<WalletBalanceParams, WalletBalanceResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletsIdBalanceRoute,
  })
}

export function useWalletEvents(
  args: HookArgsSwr<WalletEventsParams, WalletEventsResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletsIdEventsRoute,
  })
}

export function useWalletEventsUnconfirmed(
  args: HookArgsSwr<
    WalletEventsUnconfirmedParams,
    WalletEventsUnconfirmedResponse
  >,
) {
  return useGetSwr({
    ...args,
    route: walletsIdEventsUnconfirmedRoute,
  })
}

export function useWalletOutputsSiacoin(
  args: HookArgsSwr<WalletOutputsSiacoinParams, WalletOutputsSiacoinResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletsIdOutputsSiacoinRoute,
  })
}

export function useWalletOutputsSiafund(
  args: HookArgsSwr<WalletOutputsSiafundParams, WalletOutputsSiafundResponse>,
) {
  return useGetSwr({
    ...args,
    route: walletsIdOutputsSiafundRoute,
  })
}

export function useWalletFundSiacoin(
  args?: HookArgsCallback<
    WalletFundSiacoinParams,
    WalletFundSiacoinPayload,
    WalletFundSiacoinResponse
  >,
) {
  return usePostFunc({ ...args, route: walletsIdFundRoute })
}

export function useWalletFundSiafund(
  args?: HookArgsCallback<
    WalletFundSiafundParams,
    WalletFundSiafundPayload,
    WalletFundSiafundResponse
  >,
) {
  return usePostFunc({ ...args, route: walletsIdFundSfRoute })
}

export function useWalletReserve(
  args?: HookArgsCallback<
    WalletReserveParams,
    WalletReservePayload,
    WalletReserveResponse
  >,
) {
  return usePostFunc({ ...args, route: walletsIdReserveRoute })
}

export function useWalletRelease(
  args?: HookArgsCallback<
    WalletReleaseParams,
    WalletReleasePayload,
    WalletReleaseResponse
  >,
) {
  return usePostFunc({ ...args, route: walletsIdReleaseRoute })
}
