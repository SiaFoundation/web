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

export type ConsensusTipResponse = ChainIndex

export function useConsensusTip(
  args?: HookArgsSwr<void, ConsensusTipResponse>
) {
  return useGetSwr({
    ...args,
    route: '/consensus/tip',
  })
}

export type ConsensusStateResponse = ConsensusState

export function useConsensusTipState(
  args?: HookArgsSwr<void, ConsensusStateResponse>
) {
  return useGetSwr({
    ...args,
    route: '/consensus/tipstate',
  })
}

export type ConsensusNetworkResponse = ConsensusNetwork

export function useConsensusNetwork(
  args?: HookArgsSwr<void, ConsensusNetworkResponse>
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

export type SyncerPeersResponse = GatewayPeer[]

export function useSyncerPeers(args?: HookArgsSwr<void, SyncerPeersResponse>) {
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

export type TxPoolFeeResponse = Currency

export function useTxPoolFee(args?: HookArgsSwr<void, TxPoolFeeResponse>) {
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

export type WalletsResponse = Wallet[]

export function useWallets(args?: HookArgsSwr<void, WalletsResponse>) {
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

export type WalletAddResponse = Wallet

export function useWalletAdd(
  args?: HookArgsCallback<void, WalletUpdatePayload, WalletAddResponse>
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

export type WalletUpdateResponse = Wallet

export function useWalletUpdate(
  args?: HookArgsCallback<
    { id: string },
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
export type WalletAddressesResponse = WalletAddress[]

export const walletAddressesRoute = '/wallets/:id/addresses'
export function useWalletAddresses(
  args: HookArgsSwr<{ id: string }, WalletAddressesResponse>
) {
  return useGetSwr({
    ...args,
    route: walletAddressesRoute,
  })
}

export type WalletAddressAddResponse = WalletAddress

export function useWalletAddressAdd(
  args?: HookArgsCallback<{ id: string }, WalletAddressAddResponse, void>
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

export type WalletBalanceResponse = {
  siacoins: Currency
  immatureSiacoins: Currency
  siafunds: number
}

const walletBalanceRoute = '/wallets/:id/balance'
export function useWalletBalance(
  args: HookArgsSwr<{ id: string }, WalletBalanceResponse>
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

export type WalletTxPoolResponse = PoolTransaction[]

export function useWalletTxPool(
  args: HookArgsSwr<{ id: string }, WalletTxPoolResponse>
) {
  return useGetSwr({
    ...args,
    route: walletTxPoolRoute,
  })
}

export type WalletOutputsSiacoinResponse = SiacoinElement[]

export function useWalletOutputsSiacoin(
  args: HookArgsSwr<{ id: string }, WalletOutputsSiacoinResponse>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs/siacoin',
  })
}

export type WalletOutputsSiafundResponse = SiafundElement[]

export function useWalletOutputsSiafund(
  args: HookArgsSwr<{ id: string }, WalletOutputsSiafundResponse>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs/siafund',
  })
}

export type WalletFundSiacoinPayload = {
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

export type WalletFundSiafundPayload = {
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

export type WalletReservePayload = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
  duration: number
}

export function useWalletReserve(
  args?: HookArgsCallback<{ id: string }, WalletReservePayload, void>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/reserve' })
}

export type WalletReleasePayload = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
}

export function useWalletRelease(
  args?: HookArgsCallback<{ id: string }, WalletReleasePayload, void>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/release' })
}
