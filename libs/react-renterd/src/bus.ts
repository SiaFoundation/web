import useSWR from 'swr'
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
  getMainnetBlockHeight,
  getTestnetZenBlockHeight,
  delay,
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

export type ConsensusNetwork = {
  Name: string
}

export function useConsensusNetwork(
  args?: HookArgsSwr<void, ConsensusNetwork>
) {
  return useGetSwr({
    ...args,
    route: '/bus/consensus/network',
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
      if (network.data?.Name === 'zen') {
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
    async (mutate) => {
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
    async (mutate) => {
      await delay(2_000)
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
  args?: HookArgsCallback<void, Transaction, never>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/discard' })
}

export function useWalletPrepareForm(
  args?: HookArgsCallback<void, WalletPrepareFormRequest, Transaction[]>
) {
  return usePostFunc({ ...args, route: '/bus/wallet/prepare/form' })
}

export function useWalletPrepareRenew(
  args?: HookArgsCallback<
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
export type HostsUsabilityMode = 'all' | 'usable' | 'unusable'
export type HostsSearchPayload = {
  filterMode: HostsSearchFilterMode
  usabilityMode?: HostsUsabilityMode
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

export function useHost(args: HookArgsSwr<{ hostKey: string }, Host>) {
  return useGetSwr({ ...args, route: '/bus/host/:hostKey' })
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
  return usePutFunc(
    { ...args, route: '/bus/hosts/allowlist' },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          hostsSearchRoute,
          hostsAllowlistRoute,
          contractsActiveRoute,
        ]
        return !!matches.find((match) => key.startsWith(match))
      })
    }
  )
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
  return usePutFunc(
    { ...args, route: '/bus/hosts/blocklist' },
    async (mutate) => {
      mutate((key) => {
        const matches = [
          hostsSearchRoute,
          hostsBlocklistRoute,
          contractsActiveRoute,
        ]
        return !!matches.find((match) => key.startsWith(match))
      })
    }
  )
}

// contracts

const contractsActiveRoute = '/bus/contracts'
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
  args?: HookArgsCallback<{ id: string }, void, never>
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

export type ObjEntry = {
  name: string
  size: number
}

export function useObjectDirectory(
  args: HookArgsSwr<{ key: string }, { entries: ObjEntry[] }>
) {
  return useGetSwr({ ...args, route: '/bus/objects/:key' })
}

export function useObject(args: HookArgsSwr<{ key: string }, { object: Obj }>) {
  return useGetSwr({ ...args, route: '/bus/objects/:key' })
}

export function useObjectSearch(
  args: HookArgsSwr<{ key: string; skip: number; limit: number }, ObjEntry[]>
) {
  return useGetSwr({ ...args, route: '/bus/search/objects' })
}

export function useObjectAdd(
  args: HookArgsCallback<{ key: string }, AddObjectRequest, never>
) {
  return usePutFunc({ ...args, route: '/bus/objects/:key' })
}

export function useObjectDelete(
  args?: HookArgsCallback<{ key: string; batch: boolean }, void, never>
) {
  return useDeleteFunc(
    { ...args, route: '/bus/objects/:key' },
    async (mutate) => {
      mutate((key) => key.startsWith('/bus/objects/'))
    }
  )
}

type ObjectsStats = {
  numObjects: number // number of objects
  totalObjectsSize: number // size of all objects
  totalSectorsSize: number // uploaded size of all objects
  totalUploadedSize: number // uploaded size of all objects including redundant sectors
}

export function useObjectStats(args?: HookArgsSwr<void, ObjectsStats>) {
  return useGetSwr({ ...args, route: '/bus/stats/objects' })
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

export function useSetting<T extends Setting>(
  args: HookArgsSwr<{ key: string }, T>
) {
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
    async (mutate, args) => {
      mutate((key) => key.startsWith(`/bus/setting/${args.params.key}`))
    }
  )
}

type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'

type Alert = {
  id: string
  severity: AlertSeverity
  message: string
  timestamp: string
  data: {
    account?: string
    host?: string
  }
}

export function useAlerts(args?: HookArgsSwr<void, Alert[]>) {
  return useGetSwr({ ...args, route: '/bus/alerts' })
}
