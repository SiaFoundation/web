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
  ConsensusState,
  ConsensusNetwork,
  Currency,
  BlockHeight,
  ChainIndex,
  SiacoinOutputID,
  SiafundOutputID,
  SiacoinElement,
  SiafundElement,
  Transaction,
  V2Transaction,
} from '@siafoundation/types'
import {
  PoolTransaction,
  WalletEvent,
  GatewayPeer,
  Wallet,
  Metadata,
  WalletAddress,
} from './siaTypes'

// consensus

export type ConsensusTip = ChainIndex

export function useConsensusTip(args?: HookArgsSwr<void, ConsensusTip>) {
  return useGetSwr({
    ...args,
    route: '/consensus/tip',
  })
}

export function useConsensusTipState(args?: HookArgsSwr<void, ConsensusState>) {
  return useGetSwr({
    ...args,
    route: '/consensus/tipstate',
  })
}

export function useConsensusNetwork(
  args?: HookArgsSwr<void, ConsensusNetwork>
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

export function useSyncerPeers(args?: HookArgsSwr<void, GatewayPeer[]>) {
  return useGetSwr({
    ...args,
    route: syncerPeersKey,
  })
}

export function useSyncerConnect(args?: HookArgsCallback<void, string, never>) {
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

type TxPoolTransactionsResponse = {
  transactions: Transaction[]
  v2Transactions: V2Transaction[]
}

const txPoolTransactionsRoute = '/txpool/transactions'
export function useTxPoolTransactions(
  args?: HookArgsSwr<void, TxPoolTransactionsResponse>
) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolFee(args?: HookArgsSwr<void, Currency>) {
  return useGetSwr({ ...args, route: '/txpool/fee' })
}

type TxPoolBroadcastPayload = {
  transactions: Transaction[]
  v2Transactions: V2Transaction[]
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<void, TxPoolBroadcastPayload, unknown>
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

// subscribe

export function useResubscribe(
  args?: HookArgsCallback<void, BlockHeight, void>
) {
  return usePostFunc({
    ...args,
    route: '/resubscribe',
  })
}

// wallet

const walletsRoute = '/wallets'

export function useWallets(args?: HookArgsSwr<void, Wallet[]>) {
  return useGetSwr({
    ...args,
    route: walletsRoute,
  })
}

type WalletUpdatePayload = {
  name: string
  description: string
  metadata: Metadata
}

export function useWalletAdd(
  args?: HookArgsCallback<void, WalletUpdatePayload, Wallet>
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
  args?: HookArgsCallback<{ id: string }, WalletUpdatePayload, Wallet>
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
  args?: HookArgsCallback<{ id: string }, void, never>
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
  args: HookArgsSwr<{ id: string }, WalletAddress[]>
) {
  return useGetSwr({
    ...args,
    route: walletAddressesRoute,
  })
}

export function useWalletAddressAdd(
  args?: HookArgsCallback<{ id: string }, WalletAddress, void>
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
  args?: HookArgsCallback<{ id: string; addr: string }, void, never>
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
  args: HookArgsSwr<
    { id: string },
    { siacoins: Currency; immatureSiacoins: Currency; siafunds: number }
  >
) {
  return useGetSwr({
    ...args,
    route: walletBalanceRoute,
  })
}

const walletEventsRoute = '/wallets/:id/events'
export function useWalletEvents(
  args: HookArgsSwr<
    { id: string; offset: number; limit: number },
    WalletEvent[]
  >
) {
  return useGetSwr({
    ...args,
    route: walletEventsRoute,
  })
}

const walletTxPoolRoute = '/wallets/:id/txpool'

export function useWalletTxPool(
  args: HookArgsSwr<{ id: string }, PoolTransaction[]>
) {
  return useGetSwr({
    ...args,
    route: walletTxPoolRoute,
  })
}

export function useWalletOutputsSiacoin(
  args: HookArgsSwr<{ id: string }, SiacoinElement[]>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs/siacoin',
  })
}

export function useWalletOutputsSiafund(
  args: HookArgsSwr<{ id: string }, SiafundElement[]>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs/siafund',
  })
}

type WalletFundSiacoinPayload = {
  transaction: Transaction
  amount: Currency
  changeAddress: string
}

export type WalletFundResponse = {
  transaction: Transaction
  toSign: string[]
  dependsOn: Transaction[]
}

export function useWalletFundSiacoin(
  args?: HookArgsCallback<
    { id: string },
    WalletFundSiacoinPayload,
    WalletFundResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/fund' })
}

type WalletFundSiafundPayload = {
  transaction: Transaction
  amount: number
  changeAddress: string
  claimAddress: string
}

export function useWalletFundSiafund(
  args?: HookArgsCallback<
    { id: string },
    WalletFundSiafundPayload,
    WalletFundResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/fundsf' })
}

type WalletReservePayload = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
  duration: number
}

export function useWalletReserve(
  args?: HookArgsCallback<{ id: string }, WalletReservePayload, void>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/reserve' })
}

type WalletReleasePayload = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
}

export function useWalletRelease(
  args?: HookArgsCallback<{ id: string }, WalletReleasePayload, void>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/release' })
}
