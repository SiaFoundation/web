import useSWR from 'swr'
import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  HookArgsSwr,
  HookArgsCallback,
  delay,
  Transaction,
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
  useDeleteFunc,
} from '@siafoundation/react-core'
import {
  BlockHeight,
  ChainIndex,
  ConsensusState,
  PoolTransaction,
  SiacoinElement,
  SiafundElement,
  WalletEvent,
} from './siaTypes'

// consensus

export type ConsensusTip = ChainIndex

export function useConsensusTip(args?: HookArgsSwr<void, ConsensusTip>) {
  return useGetSwr({
    ...args,
    route: '/consensus/tip',
  })
}

export function useConsensusNetwork(args?: HookArgsSwr<void, ConsensusState>) {
  return useGetSwr({
    ...args,
    route: '/consensus/network',
  })
}

// TODO
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

type GatewayPeer = {
  addr: string
  inbound: boolean
  version: string

  firstSeen: string
  connectedSince: string
  syncedBlocks: number
  syncDuration: number
}

const syncerPeers = '/syncer/peers'

export function useSyncerPeers(args?: HookArgsSwr<void, GatewayPeer[]>) {
  return useGetSwr({
    ...args,
    route: syncerPeers,
  })
}

export function useSyncerConnect(args?: HookArgsCallback<void, string, never>) {
  return usePostFunc(
    {
      ...args,
      route: '/syncer/connect',
    },
    async (mutate) => {
      mutate((key) => key === syncerPeers)
    }
  )
}

// txpool

const txPoolTransactionsRoute = '/txpool/transactions'
export function useTxPoolTransactions(args?: HookArgsSwr<void, Transaction[]>) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<void, Transaction[], unknown>
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

const walletAddressesRoute = '/wallets/:id/addresses'
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
        key.startsWith(walletAddressesRoute.replace(':id', data.params.id))
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
        key.startsWith(walletAddressesRoute.replace(':id', data.params.id))
      )
    }
  )
}

export function useWalletBalance(
  args: HookArgsSwr<{ id: string }, { siacoins: string; siafunds: number }>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/balance',
  })
}

export function useWalletEvents(
  args: HookArgsSwr<{ id: string }, WalletEvent[]>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:id/events',
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

type WalletReserveRequest = {
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
  duration: number
}

export function useWalletReserve(
  args?: HookArgsCallback<{ id: string }, WalletReserveRequest, void>
) {
  return usePostFunc({ ...args, route: '/wallet/:id/reserve' })
}

type WalletReleaseRequest = {
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}

export function useWalletRelease(
  args?: HookArgsCallback<{ id: string }, WalletReleaseRequest, void>
) {
  return usePostFunc({ ...args, route: '/wallet/:id/release' })
}
