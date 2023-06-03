import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  HookArgsSwr,
  HookArgsCallback,
  delay,
  Transaction,
  getMainnetBlockHeight,
} from '@siafoundation/react-core'
import { ChainIndex, SiacoinElement, SiafundElement } from './siaTypes'

// consensus

export type ConsensusTip = ChainIndex

export function useConsensusTip(args?: HookArgsSwr<void, ConsensusTip>) {
  return useGetSwr({
    ...args,
    route: '/consensus/tip',
  })
}

// TODO
export function useEstimatedNetworkBlockHeight(): number {
  // const state = useWalletd({
  //   config: {
  //     swr: {
  //       revalidateOnFocus: false,
  //     },
  //   },
  // })
  // const res = useSWR(
  //   state,
  //   () => {
  //     if (state.data?.network === 'Zen Testnet') {
  //       return getTestnetZenBlockHeight()
  //     }
  //     return getMainnetBlockHeight()
  //   },
  //   {
  //     refreshInterval: 60_000,
  //     keepPreviousData: true,
  //   }
  // )
  // return res.data || 0
  return getMainnetBlockHeight()
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
        return key.startsWith(txPoolTransactionsRoute)
        // ||
        // key.startsWith(walletPendingRoute)
      })
    }
  )
}

// wallet

type Wallet = Record<string, unknown>

export function useWallets(args?: HookArgsSwr<void, Wallet[]>) {
  return useGetSwr({
    ...args,
    route: '/wallets',
  })
}

export function useWalletAdd(
  args?: HookArgsCallback<{ name: string }, Wallet, void>
) {
  return usePutFunc({
    ...args,
    route: '/wallets/:name',
  })
}

export function useWalletSubscribe(
  args?: HookArgsCallback<{ name: string }, { height: number }, void>
) {
  return usePostFunc({
    ...args,
    route: '/wallets/:name/subscribe',
  })
}

type Address = Record<string, unknown>

export function useWalletAddressAdd(
  args?: HookArgsCallback<{ name: string; addr: string }, Address, void>
) {
  return usePutFunc({
    ...args,
    route: '/wallets/:name/addresses/:addr',
  })
}

type Addresses = Record<string, Address>

export function useWalletAddresses(
  args?: HookArgsSwr<{ name: string }, Addresses>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:name/addresses',
  })
}

export function useWalletBalance(
  args?: HookArgsSwr<{ name: string }, { siacoins: string; siafunds: number }>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:name/balance',
  })
}

export function useWalletEvents(args?: HookArgsSwr<{ name: string }, Event>) {
  return useGetSwr({
    ...args,
    route: '/wallets/:name/events',
  })
}

type WalletOutputsResponse = {
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}

export function useWalletOutputs(
  args?: HookArgsSwr<{ name: string }, WalletOutputsResponse>
) {
  return useGetSwr({
    ...args,
    route: '/wallets/:name/outputs',
  })
}

type WalletReserveRequest = {
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
  duration: number
}

export function useWalletReserve(
  args?: HookArgsCallback<void, WalletReserveRequest, void>
) {
  return usePostFunc(
    { ...args, route: '/wallet/:name/reserve' },
    async (mutate) => {
      await delay(2_000)
      mutate((key) => {
        return key.startsWith(txPoolTransactionsRoute)
        // ||
        // key.startsWith(walletPendingRoute)
      })
    }
  )
}

type WalletReleaseRequest = {
  siacoinOutputs: SiacoinElement[]
  siafundOutputs: SiafundElement[]
}

export function useWalletRelease(
  args?: HookArgsCallback<void, WalletReleaseRequest, void>
) {
  return usePostFunc(
    { ...args, route: '/wallet/:name/release' },
    async (mutate) => {
      await delay(2_000)
      mutate((key) => {
        return key.startsWith(txPoolTransactionsRoute)
        // ||
        // key.startsWith(walletPendingRoute)
      })
    }
  )
}
