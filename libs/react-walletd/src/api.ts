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
} from '@siafoundation/types'
import { PoolTransaction, WalletEvent, GatewayPeer } from './siaTypes'

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

type TxPoolTransactions = {
  transactions: Transaction[]
  v2Transactions: unknown[]
}

const txPoolTransactionsRoute = '/txpool/transactions'
export function useTxPoolTransactions(
  args?: HookArgsSwr<void, TxPoolTransactions>
) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<void, TxPoolTransactions, unknown>
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

// wallet

type Wallet = Record<string, unknown>
type Wallets = Record<string, Wallet>

const walletsRoute = '/wallets'

export function useWallets(args?: HookArgsSwr<void, Wallets>) {
  return useGetSwr({
    ...args,
    route: walletsRoute,
  })
}

type Address = Record<string, unknown>
type Addresses = Record<string, Address>

export const walletAddressesRoute = '/wallets/:id/addresses'
export function useWalletAddresses(
  args: HookArgsSwr<{ id: string }, Addresses>
) {
  return useGetSwr({
    ...args,
    route: walletAddressesRoute,
  })
}

export function useWalletAdd(
  args?: HookArgsCallback<{ id: string }, Wallet, void>
) {
  return usePutFunc(
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

export function useWalletSubscribe(
  args?: HookArgsCallback<{ id: string }, BlockHeight, void>
) {
  return usePostFunc({
    ...args,
    route: '/wallets/:id/subscribe',
  })
}

export function useWalletAddressAdd(
  args?: HookArgsCallback<{ id: string; addr: string }, Address, void>
) {
  return usePutFunc(
    {
      ...args,
      route: '/wallets/:id/addresses/:addr',
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
  args: HookArgsSwr<{ id: string }, { siacoins: string; siafunds: number }>
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

type WalletOutputsResponse = {
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}

export function useWalletOutputs(
  args: HookArgsSwr<{ id: string }, WalletOutputsResponse>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/outputs',
  })
}

type WalletFundRequest = {
  transaction: Transaction
  amount: Currency
  changeAddress: string
}

export type WalletFundResponse = {
  transaction: Transaction
  toSign: string[]
  dependsOn: Transaction[]
}

export function useWalletFund(
  args?: HookArgsCallback<{ id: string }, WalletFundRequest, WalletFundResponse>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/fund' })
}

type WalletFundRequestSf = {
  transaction: Transaction
  amount: number
  changeAddress: string
  claimAddress: string
}

export function useWalletFundSf(
  args?: HookArgsCallback<
    { id: string },
    WalletFundRequestSf,
    WalletFundResponse
  >
) {
  return usePostFunc({ ...args, route: '/wallets/:id/fundsf' })
}

type WalletReserveRequest = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
  duration: number
}

export function useWalletReserve(
  args?: HookArgsCallback<{ id: string }, WalletReserveRequest, void>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/reserve' })
}

type WalletReleaseRequest = {
  siacoinOutputs?: SiacoinOutputID[]
  siafundOutputs?: SiafundOutputID[]
}

export function useWalletRelease(
  args?: HookArgsCallback<{ id: string }, WalletReleaseRequest, void>
) {
  return usePostFunc({ ...args, route: '/wallets/:id/release' })
}
