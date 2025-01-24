import useSWR from 'swr'
import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  HookArgsSwr,
  HookArgsCallback,
  delay,
  useDeleteFunc,
} from '@siafoundation/react-core'
import {
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
} from '@siafoundation/units'
import {
  ConsensusNetworkParams,
  ConsensusNetworkResponse,
  ConsensusTipParams,
  ConsensusTipResponse,
  ConsensusTipStateParams,
  ConsensusTipStateResponse,
  RescanParams,
  RescanResponse,
  RescanStartParams,
  RescanStartPayload,
  RescanStartResponse,
  StateParams,
  StateResponse,
  SyncerConnectParams,
  SyncerConnectPayload,
  SyncerConnectResponse,
  SyncerPeersParams,
  SyncerPeersResponse,
  TxPoolBroadcastParams,
  TxPoolBroadcastPayload,
  TxPoolBroadcastResponse,
  TxPoolFeeParams,
  TxPoolFeeResponse,
  TxPoolTransactionsParams,
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
  WalletAddressesResponse,
  WalletBalanceParams,
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
  WalletEventsResponse,
  WalletEventsUnconfirmedParams,
  WalletEventsUnconfirmedResponse,
  WalletFundSiacoinParams,
  WalletFundSiacoinPayload,
  WalletFundSiacoinResponse,
  WalletFundSiafundParams,
  WalletFundSiafundPayload,
  WalletFundSiafundResponse,
  WalletOutputsSiacoinParams,
  WalletOutputsSiacoinResponse,
  WalletOutputsSiafundParams,
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
  WalletsResponse,
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

// state

export function useNodeState(args?: HookArgsSwr<StateParams, StateResponse>) {
  return useGetSwr({
    ...args,
    route: stateRoute,
  })
}

// consensus

export function useConsensusTip(
  args?: HookArgsSwr<ConsensusTipParams, ConsensusTipResponse>
) {
  return useGetSwr({
    ...args,
    route: consensusTipRoute,
  })
}

export function useConsensusTipState(
  args?: HookArgsSwr<ConsensusTipStateParams, ConsensusTipStateResponse>
) {
  return useGetSwr({
    ...args,
    route: consensusTipStateRoute,
  })
}

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>
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
    }
  )
  return res.data || 0
}

// syncer

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>
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
  >
) {
  return usePostFunc(
    {
      ...args,
      route: syncerConnectRoute,
    },
    async (mutate) => {
      mutate((key) => key === syncerPeersRoute)
    }
  )
}

// txpool

export function useTxPoolTransactions(
  args?: HookArgsSwr<TxPoolTransactionsParams, TxPoolTransactionsResponse>
) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolFee(
  args?: HookArgsSwr<TxPoolFeeParams, TxPoolFeeResponse>
) {
  return useGetSwr({ ...args, route: txPoolFeeRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<
    TxPoolBroadcastParams,
    TxPoolBroadcastPayload,
    TxPoolBroadcastResponse
  >
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
    }
  )
}

// rescan

export function useRescanStart(
  args?: HookArgsCallback<
    RescanStartParams,
    RescanStartPayload,
    RescanStartResponse
  >
) {
  return usePostFunc(
    {
      ...args,
      route: rescanRoute,
    },
    async (mutate) => {
      // Do not block the hook method from returning and allowing consumer to toast success etc.
      const func = async () => {
        await mutate((key) => key.startsWith(rescanRoute))
        await delay(1_000)
        await mutate((key) => key.startsWith(rescanRoute))
      }
      func()
    }
  )
}

export function useRescanStatus(
  args?: HookArgsSwr<RescanParams, RescanResponse>
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
  args?: HookArgsCallback<WalletAddParams, WalletAddPayload, WalletAddResponse>
) {
  return usePostFunc(
    {
      ...args,
      route: walletsRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(walletsRoute))
    }
  )
}

export function useWalletUpdate(
  args?: HookArgsCallback<
    WalletUpdateParams,
    WalletUpdatePayload,
    WalletUpdateResponse
  >
) {
  return usePostFunc(
    {
      ...args,
      route: walletsIdRoute,
    },
    async (mutate) => {
      mutate((key) => key.startsWith(walletsRoute))
    }
  )
}

export function useWalletDelete(
  args?: HookArgsCallback<
    WalletDeleteParams,
    WalletDeletePayload,
    WalletDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: walletsIdRoute },
    async (mutate, data) => {
      mutate((key) => key.startsWith(walletsRoute))
    }
  )
}

// addresses

export function useWalletAddresses(
  args: HookArgsSwr<WalletAddressesParams, WalletAddressesResponse>
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
  >
) {
  return usePutFunc(
    {
      ...args,
      route: walletsIdAddressesRoute,
    },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith(walletsIdRoute.replace(':id', data.params.id))
      )
    }
  )
}

export function useWalletAddressDelete(
  args?: HookArgsCallback<
    WalletAddressDeleteParams,
    WalletAddressDeletePayload,
    WalletAddressDeleteResponse
  >
) {
  return useDeleteFunc(
    { ...args, route: walletsIdAddressesAddrRoute },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith(walletsIdAddressesRoute.replace(':id', data.params.id))
      )
    }
  )
}

export function useWalletBalance(
  args: HookArgsSwr<WalletBalanceParams, WalletBalanceResponse>
) {
  return useGetSwr({
    ...args,
    route: walletsIdBalanceRoute,
  })
}

export function useWalletEvents(
  args: HookArgsSwr<WalletEventsParams, WalletEventsResponse>
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
  >
) {
  return useGetSwr({
    ...args,
    route: walletsIdEventsUnconfirmedRoute,
  })
}

export function useWalletOutputsSiacoin(
  args: HookArgsSwr<WalletOutputsSiacoinParams, WalletOutputsSiacoinResponse>
) {
  return useGetSwr({
    ...args,
    route: walletsIdOutputsSiacoinRoute,
  })
}

export function useWalletOutputsSiafund(
  args: HookArgsSwr<WalletOutputsSiafundParams, WalletOutputsSiafundResponse>
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
  >
) {
  return usePostFunc({ ...args, route: walletsIdFundRoute })
}

export function useWalletFundSiafund(
  args?: HookArgsCallback<
    WalletFundSiafundParams,
    WalletFundSiafundPayload,
    WalletFundSiafundResponse
  >
) {
  return usePostFunc({ ...args, route: walletsIdFundSfRoute })
}

export function useWalletReserve(
  args?: HookArgsCallback<
    WalletReserveParams,
    WalletReservePayload,
    WalletReserveResponse
  >
) {
  return usePostFunc({ ...args, route: walletsIdReserveRoute })
}

export function useWalletRelease(
  args?: HookArgsCallback<
    WalletReleaseParams,
    WalletReleasePayload,
    WalletReleaseResponse
  >
) {
  return usePostFunc({ ...args, route: walletsIdReleaseRoute })
}

export function useWalletConstructV1Transaction(
  args?: HookArgsCallback<
    WalletConstructV1TransactionParams,
    WalletConstructV1TransactionPayload,
    WalletConstructV1TransactionResponse
  >
) {
  return usePostFunc({ ...args, route: walletsIdConstructTransactionRoute })
}

export function useWalletConstructV2Transaction(
  args?: HookArgsCallback<
    WalletConstructV2TransactionParams,
    WalletConstructV2TransactionPayload,
    WalletConstructV2TransactionResponse
  >
) {
  return usePostFunc({ ...args, route: walletsIdConstructV2TransactionRoute })
}
