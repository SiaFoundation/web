import {
  useGetSwr,
  usePostFunc,
  usePutFunc,
  usePostSwr,
  HookArgsSwr,
  HookArgsCallback,
  Transaction,
  HookArgsWithPayloadSwr,
  FileContractID,
  PublicKey,
} from '@siafoundation/react-core'
import { Contract, WalletTransaction } from './siaTypes'

export type HostState = {
  publicKey: string
  walletAddress: string
  chainIndex: {
    Height: number
    ID: string
  }
  synced: boolean
  storedSectors: number
  totalSectors: number
}

export function useHostState(args?: HookArgsSwr<void, HostState>) {
  return useGetSwr({
    ...args,
    route: '/state',
  })
}

// syncer

type Peer = {
  address: string
  version: string
}

const syncerPeers = '/syncer/peers'

export function useSyncerPeers(args?: HookArgsSwr<void, Peer[]>) {
  return useGetSwr({
    ...args,
    route: syncerPeers,
  })
}

export function useSyncerConnect(
  args?: HookArgsCallback<void, { address: string }, never>
) {
  return usePutFunc(
    {
      ...args,
      route: '/syncer/peers',
    },
    (mutate) => {
      mutate((key) => key === syncerPeers)
    }
  )
}

// wallet

type WalletResponse = {
  scanHeight: number
  address: string
  spendable: string
  confirmed: string
  unconfirmed: string
}

export function useWallet(args?: HookArgsSwr<void, WalletResponse>) {
  return useGetSwr({
    ...args,
    route: '/wallet',
  })
}

export function useWalletTransactions(
  args?: HookArgsSwr<void, WalletTransaction[]>
) {
  return useGetSwr({
    ...args,
    route: '/wallet/transactions',
  })
}

const walletPendingRoute = '/wallet/pending'
export function useWalletPending(args?: HookArgsSwr<void, Transaction[]>) {
  return useGetSwr({
    ...args,
    route: walletPendingRoute,
  })
}

type WalletSendRequest = {
  amount: string
  address: string
}

export function useWalletSend(
  args?: HookArgsCallback<void, WalletSendRequest, void>
) {
  return usePostFunc({ ...args, route: '/wallet/send' }, (mutate) => {
    mutate((key) => {
      return (
        // key.startsWith(txPoolTransactionsRoute) ||
        key.startsWith(walletPendingRoute)
      )
    })
  })
}

// contracts

export type ContractFilterRequest = {
  // filters
  statuses?: number[]
  contractIDs?: FileContractID[]
  renewedFrom?: FileContractID[]
  renewedTo?: FileContractID[]
  renterKey?: PublicKey[]

  minNegotiationHeight?: number
  maxNegotiationHeight?: number

  minExpirationHeight?: number
  maxExpirationHeight?: number

  // pagination
  limit?: number
  offset?: number

  // sorting
  sortField?: string
  sortDesc?: boolean
}

const contractsRoute = '/contracts'
export function useContracts(
  args: HookArgsWithPayloadSwr<void, ContractFilterRequest, Contract[]>
) {
  return usePostSwr({
    ...args,
    route: contractsRoute,
  })
}
