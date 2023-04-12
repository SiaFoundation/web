import {
  useDeleteFunc,
  useGetSwr,
  usePostSwr,
  usePutFunc,
  usePostFunc,
  HookArgsSwr,
  HookArgsCallback,
  HookArgsWithPayloadSwr,
  Currency,
  PublicKey,
  Transaction,
} from '@siafoundation/react-core'
import {
  AddObjectRequest,
  Block,
  ConsensusState,
  Contract,
  ContractAcquireRequest,
  ContractAcquireResponse,
  ContractsIDAddRequest,
  ContractsIDRenewedRequest,
  Host,
  Interaction,
  Obj,
  SiacoinElement,
  WalletFundRequest,
  WalletFundResponse,
  WalletPrepareFormRequest,
  WalletPrepareRenewRequest,
  WalletPrepareRenewResponse,
  WalletRedistributeRequest,
  WalletSignRequest,
  WalletTransaction,
} from './siaTypes'

// consensus

export function useConsensusState(args?: HookArgsSwr<void, ConsensusState>) {
  return useGetSwr({
    ...args,
    route: '/bus/consensus/state',
  })
}

export function useConsensusAcceptBlock(
  args?: HookArgsCallback<void, Block, void>
) {
  return usePostFunc({ ...args, route: '/bus/consensus/acceptblock' })
}

// syncer

const syncerPeers = '/bus/syncer/peers'

export function useSyncerPeers(args?: HookArgsSwr<void, string[]>) {
  return useGetSwr({
    ...args,
    route: syncerPeers,
  })
}

export function useSyncerConnect(args?: HookArgsCallback<void, string, never>) {
  return usePostFunc(
    {
      ...args,
      route: '/bus/syncer/connect',
    },
    (mutate) => {
      mutate((key) => key === syncerPeers)
    }
  )
}

export function useSyncerAddress(args?: HookArgsSwr<void, string>) {
  return useGetSwr({ ...args, route: '/bus/syncer/addr' })
}

// txpool

export function useTxPoolFee(args?: HookArgsSwr<void, Currency>) {
  return useGetSwr({ ...args, route: '/bus/txpool/fee' })
}

const txPoolTransactionsRoute = '/bus/txpool/transactions'
export function useTxPoolTransactions(args?: HookArgsSwr<void, Transaction[]>) {
  return useGetSwr({ ...args, route: txPoolTransactionsRoute })
}

export function useTxPoolBroadcast(
  args?: HookArgsCallback<void, Transaction[], unknown>
) {
  return usePostFunc(
    {
      ...args,
      route: '/bus/txpool/broadcast',
    },
    (mutate) => {
      mutate((key) => {
        return (
          key.startsWith(txPoolTransactionsRoute) ||
          key.startsWith(walletPendingRoute)
        )
      })
    }
  )
}

// wallet

export function useWalletBalance(args?: HookArgsSwr<void, string>) {
  return useGetSwr({ ...args, route: '/bus/wallet/balance' })
}

export function useWalletAddress(args?: HookArgsSwr<void, string>) {
  return useGetSwr({ ...args, route: '/bus/wallet/address' })
}

export function useWalletAddresses(args?: HookArgsSwr<void, string[]>) {
  return useGetSwr({ ...args, route: '/bus/wallet/addresses' })
}

type WalletTransactionsParams = {
  since?: number
  max?: number
}

export function useWalletTransactions(
  args: HookArgsSwr<WalletTransactionsParams, WalletTransaction[]>
) {
  return useGetSwr({
    ...args,
    route: '/bus/wallet/transactions',
  })
}

export function useWalletUtxos(args?: HookArgsSwr<void, SiacoinElement[]>) {
  return useGetSwr({ ...args, route: '/bus/wallet/outputs' })
}

export function useWalletFund(
  args?: HookArgsCallback<void, WalletFundRequest, WalletFundResponse>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/fund' })
}

export function useWalletSign(
  args?: HookArgsCallback<void, WalletSignRequest, Transaction>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/sign' })
}

export function useWalletRedistribute(
  args?: HookArgsCallback<void, WalletRedistributeRequest, Transaction>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/redistribute' })
}

export function useWalletDiscard(
  args: HookArgsCallback<void, Transaction, never>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/discard' })
}

export function useWalletPrepareForm(
  args: HookArgsCallback<void, WalletPrepareFormRequest, Transaction[]>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/prepare/form' })
}

export function useWalletPrepareRenew(
  args: HookArgsCallback<
    void,
    WalletPrepareRenewRequest,
    WalletPrepareRenewResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/wallet/prepare/form' })
}

const walletPendingRoute = '/bus/wallet/pending'
export function useWalletPending(args?: HookArgsSwr<void, Transaction[]>) {
  return useGetSwr({ ...args, route: walletPendingRoute })
}

// hosts

type HostsParams = {
  offset?: number
  limit?: number
}

// TODO: ideally the API includes the following parameters
// export type HostSortBy = 'firstSeen' | 'lastSeen' | 'score'
// export type HostSortDir = 'asc' | 'desc'
// export type ListMetaResponse = {
//   total: number
//   totalFiltered: number
// }
// export type HostsResponse = {
//   hosts: Host[]
//   meta: ListMetaResponse
// }

export function useHosts(args: HookArgsSwr<HostsParams, Host[]>) {
  return useGetSwr({
    ...args,
    route: '/bus/hosts',
  })
}

export type HostsSearchFilterMode = 'all' | 'allowed' | 'blocked'
export type HostsSearchPayload = {
  filterMode: HostsSearchFilterMode
  addressContains?: string
  keyIn?: string[]
  offset?: number
  limit?: number
}

const hostsSearchRoute = '/bus/search/hosts'
export function useHostsSearch(
  args: HookArgsWithPayloadSwr<void, HostsSearchPayload, Host[]>
) {
  return usePostSwr({
    ...args,
    route: hostsSearchRoute,
  })
}

export function useHostsPubkey(args: HookArgsSwr<{ hostKey: string }, Host>) {
  return useGetSwr({ ...args, route: '/bus/hosts/:hostKey' })
}

export function useHostsPubkeyInteractionAdd(
  args: HookArgsCallback<{ hostKey: string }, Interaction, never>
) {
  return usePostFunc({
    ...args,
    route: '/bus/hosts/:hostKey',
  })
}
const hostsBlocklistRoute = '/bus/hosts/blocklist'
export function useHostsBlocklist(args?: HookArgsSwr<void, string[]>) {
  return useGetSwr({ ...args, route: hostsBlocklistRoute })
}

const hostsAllowlistRoute = '/bus/hosts/allowlist'
export function useHostsAllowlist(args?: HookArgsSwr<void, PublicKey[]>) {
  return useGetSwr({ ...args, route: hostsAllowlistRoute })
}

export function useHostsAllowlistUpdate(
  args?: HookArgsCallback<
    void,
    {
      add: string[]
      remove: string[]
    },
    void
  >
) {
  return usePutFunc({ ...args, route: '/bus/hosts/allowlist' }, (mutate) => {
    mutate((key) => {
      const matches = [
        hostsSearchRoute,
        hostsAllowlistRoute,
        contractsActiveRoute,
      ]
      return !!matches.find((match) => key.startsWith(match))
    })
  })
}

export function useHostsBlocklistUpdate(
  args?: HookArgsCallback<
    void,
    {
      add: string[]
      remove: string[]
    },
    void
  >
) {
  return usePutFunc({ ...args, route: '/bus/hosts/blocklist' }, (mutate) => {
    mutate((key) => {
      const matches = [
        hostsSearchRoute,
        hostsBlocklistRoute,
        contractsActiveRoute,
      ]
      return !!matches.find((match) => key.startsWith(match))
    })
  })
}

// contracts

const contractsActiveRoute = '/bus/contracts/active'
export function useContracts(args?: HookArgsSwr<void, Contract[]>) {
  return useGetSwr({ ...args, route: contractsActiveRoute })
}

export function useContractsAcquire(
  args: HookArgsCallback<
    { id: string },
    ContractAcquireRequest,
    ContractAcquireResponse
  >
) {
  return usePostFunc({ ...args, route: '/bus/contracts/:id/acquire' })
}

export function useContractsRelease(
  args: HookArgsCallback<{ id: string }, void, never>
) {
  return usePostFunc({ ...args, route: '/bus/contracts/:id/release' })
}

export function useContract(args: HookArgsSwr<{ id: string }, Contract>) {
  return useGetSwr({ ...args, route: '/bus/contracts/:id' })
}

export function useContractCreate(
  args: HookArgsCallback<{ id: string }, ContractsIDAddRequest, Contract>
) {
  return usePostFunc({ ...args, route: '/bus/contracts/:id/new' })
}

export function useContractRenew(
  args: HookArgsCallback<{ id: string }, ContractsIDRenewedRequest, Contract>
) {
  return usePostFunc({ ...args, route: '/bus/contracts/:id/renewed' })
}

export function useContractDelete(
  args: HookArgsCallback<{ id: string }, void, never>
) {
  return useDeleteFunc({ ...args, route: '/bus/contracts/:id/delete' })
}

export function useContractsets(args?: HookArgsSwr<void, string[][]>) {
  return useGetSwr({ ...args, route: '/bus/contractsets' })
}

export function useContractset(args: HookArgsSwr<{ name: string }, string[]>) {
  return useGetSwr({ ...args, route: '/bus/contractsets/:name' })
}

export function useContractsetUpdate(
  args: HookArgsCallback<{ name: string }, string[], never>
) {
  return usePutFunc({ ...args, route: '/bus/contractsets/:name' })
}

// objects

export function useObjectDirectory(
  args: HookArgsSwr<{ key: string }, { entries: string[] }>
) {
  return useGetSwr({ ...args, route: '/bus/objects/:key' })
}

export function useObject(args: HookArgsSwr<{ key: string }, { object: Obj }>) {
  return useGetSwr({ ...args, route: '/bus/objects/:key' })
}

export function useObjectSearch(
  args: HookArgsSwr<{ key: string; skip: number; limit: number }, string[]>
) {
  return useGetSwr({ ...args, route: '/bus/search/objects' })
}

export function useObjectAdd(
  args: HookArgsCallback<{ key: string }, AddObjectRequest, never>
) {
  return usePutFunc({ ...args, route: '/bus/objects/:key' })
}

export function useObjectDelete(
  args?: HookArgsCallback<{ key: string }, void, never>
) {
  return useDeleteFunc({ ...args, route: '/bus/objects/:key' }, (mutate) => {
    mutate((key) => key.startsWith('/bus/objects/'))
  })
}

// type ObjectsMigrateParams = {
//   cutoff?: number
//   limit?: number
//   goodContracts?: string[]
// }

// export function useObjectsMigrate(
//   args: ExtCallArgs<ObjectsMigrateParams, void, Slab[]>
// ) {
//   return useGet({ ...args, route: '/bus/migration/slabs' })
// }

type Setting = Record<string, unknown> | string

export function useSettings(args?: HookArgsSwr<void, string[]>) {
  return useGetSwr({ ...args, route: '/bus/settings' })
}

export function useSetting(args: HookArgsSwr<{ key: string }, Setting>) {
  return useGetSwr({ ...args, route: '/bus/setting/:key' })
}

export function useSettingUpdate(
  args?: HookArgsCallback<{ key: string }, Setting, void>
) {
  return usePutFunc(
    {
      ...args,
      route: '/bus/setting/:key',
    },
    (mutate, args) => {
      mutate((key) => key.startsWith(`/bus/setting/${args.params.key}`))
    }
  )
}
