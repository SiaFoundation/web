import useSWR from 'swr'
import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  HookArgsSwr,
  HookArgsCallback,
  delay,
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
  useDeleteFunc,
} from '@siafoundation/react-core'
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
  WalletDeleteParams,
  WalletDeletePayload,
  WalletDeleteResponse,
  WalletEventsParams,
  WalletEventsResponse,
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
  WalletTxPoolParams,
  WalletTxPoolResponse,
  WalletUpdateParams,
  WalletUpdatePayload,
  WalletUpdateResponse,
  WalletsParams,
  WalletsResponse,
} from '@siafoundation/walletd-types'

// state

export function useNodeState(args?: HookArgsSwr<StateParams, StateResponse>) {
  return useGetSwr({
    ...args,
    route: '/state',
  })
}

// consensus

export function useConsensusTip(
  args?: HookArgsSwr<ConsensusTipParams, ConsensusTipResponse>
) {
  return useGetSwr({
    ...args,
    route: '/consensus/tip',
  })
}

export function useConsensusTipState(
  args?: HookArgsSwr<ConsensusTipStateParams, ConsensusTipStateResponse>
) {
  return useGetSwr({
    ...args,
    route: '/consensus/tipstate',
  })
}

export function useConsensusNetwork(
  args?: HookArgsSwr<ConsensusNetworkParams, ConsensusNetworkResponse>
) {
  return useGetSwr({
    ...args,
    route: '/consensus/network',
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

export const syncerPeersKey = '/syncer/peers'

export function useSyncerPeers(
  args?: HookArgsSwr<SyncerPeersParams, SyncerPeersResponse>
) {
  return useGetSwr({
    ...args,
    route: syncerPeersKey,
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
      route: '/syncer/connect',
    },
    async (mutate) => {
      mutate((key) => key === syncerPeersKey)
    }
  )
}

// txpool

const txPoolTransactionsRoute = '/txpool/transactions'
export function useTxPoolTransactions(
  args?: HookArgsSwr<TxPoolTransactionsParams, TxPoolTransactionsResponse>
) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolFee(
  args?: HookArgsSwr<TxPoolFeeParams, TxPoolFeeResponse>
) {
  return useGetSwr({ ...args, route: '/txpool/fee' })
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
      route: '/txpool/broadcast',
    },
    async (mutate) => {
      await delay(2_000)
      mutate((key) => {
        return (
          key.startsWith(txPoolTransactionsRoute) ||
          // Most importantly to trigger /wallets/:id/txpool
          key.startsWith('/wallets')
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
      route: '/rescan',
    },
    async (mutate) => {
      // Do not block the hook method from returning and allowing consumer to toast success etc
      const func = async () => {
        await delay(1_000)
        await mutate((key) => key.startsWith('/rescan'))
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
    route: '/rescan',
  })
}

// wallet

const walletsRoute = '/wallets'

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
      route: '/wallets',
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
      route: '/wallets/:id',
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
    { ...args, route: '/wallets/:id' },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith(walletsRoute.replace(':id', data.params.id))
      )
    }
  )
}

// addresses

export const walletAddressesRoute = '/wallets/:id/addresses'
export function useWalletAddresses(
  args: HookArgsSwr<WalletAddressesParams, WalletAddressesResponse>
) {
  return useGetSwr({
    ...args,
    route: walletAddressesRoute,
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
      route: '/wallets/:id/addresses',
    },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith('/wallets/:id'.replace(':id', data.params.id))
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
    { ...args, route: '/wallets/:id/addresses/:addr' },
    async (mutate, data) => {
      mutate((key) =>
        key.startsWith(walletAddressesRoute.replace(':id', data.params.id))
      )
    }
  )
}

const walletBalanceRoute = '/wallets/:id/balance'
export function useWalletBalance(
  args: HookArgsSwr<WalletBalanceParams, WalletBalanceResponse>
) {
  return useGetSwr({
    ...args,
    route: walletBalanceRoute,
  })
}

const walletEventsRoute = '/wallets/:id/events'
export function useWalletEvents(
  args: HookArgsSwr<WalletEventsParams, WalletEventsResponse>
) {
  return useGetSwr({
    ...args,
    route: walletEventsRoute,
  })
}

const walletTxPoolRoute = '/wallets/:id/txpool'

export function useWalletTxPool(
  args: HookArgsSwr<WalletTxPoolParams, WalletTxPoolResponse>
) {
  return useGetSwr({
    ...args,
    route: walletTxPoolRoute,
  })
}

export function useWalletOutputsSiacoin(
  args: HookArgsSwr<WalletOutputsSiacoinParams, WalletOutputsSiacoinResponse>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs/siacoin',
  })
}

export function useWalletOutputsSiafund(
  args: HookArgsSwr<WalletOutputsSiafundParams, WalletOutputsSiafundResponse>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs/siafund',
  })
}

export function useWalletFundSiacoin(
  args?: HookArgsCallback<
    WalletFundSiacoinParams,
    WalletFundSiacoinPayload,
    WalletFundSiacoinResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/fund' })
}

export function useWalletFundSiafund(
  args?: HookArgsCallback<
    WalletFundSiafundParams,
    WalletFundSiafundPayload,
    WalletFundSiafundResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/fundsf' })
}

export function useWalletReserve(
  args?: HookArgsCallback<
    WalletReserveParams,
    WalletReservePayload,
    WalletReserveResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/reserve' })
}

export function useWalletRelease(
  args?: HookArgsCallback<
    WalletReleaseParams,
    WalletReleasePayload,
    WalletReleaseResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/release' })
}
