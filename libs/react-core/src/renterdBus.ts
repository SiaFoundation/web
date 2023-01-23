import { useGet } from './useGet'
import { SWROptions } from './types'
import { usePost } from './usePost'
import {
  AddObjectRequest,
  Block,
  ConsensusState,
  Contract,
  ContractAcquireRequest,
  ContractAcquireResponse,
  ContractsIDAddRequest,
  ContractsIDRenewedRequest,
  Currency,
  Host,
  Interaction,
  Obj,
  SiacoinElement,
  Transaction,
  WalletFundRequest,
  WalletFundResponse,
  WalletPrepareFormRequest,
  WalletPrepareRenewRequest,
  WalletPrepareRenewResponse,
  WalletRedistributeRequest,
  WalletSignRequest,
  WalletTransaction,
} from './siaTypes'
import { usePut } from './usePut'
import { useDelete } from './useDelete'

// consensus

export function useConsensusState(options?: SWROptions<ConsensusState>) {
  return useGet<ConsensusState>(null, '/bus/consensus/state', options)
}

export function useConsensusAcceptBlock() {
  return usePost<undefined, Block, never>('/bus/consensus/acceptblock', [])
}

// syncer

const syncerPeers = '/bus/syncer/peers'

export function useSyncerPeers(options?: SWROptions<string[]>) {
  return useGet(null, syncerPeers, options)
}

export function useSyncerConnect() {
  return usePost<undefined, string, never>('/bus/syncer/connect', [syncerPeers])
}

export function useSyncerAddress(options?: SWROptions<string>) {
  return useGet(null, '/bus/syncer/addr', options)
}

// txpool

export function useTxPoolFee(options?: SWROptions<Currency>) {
  return useGet(null, '/bus/txpool/fee', options)
}

export function useTxPoolTransactions(options?: SWROptions<Transaction[]>) {
  return useGet(null, '/bus/txpool/transactions', options)
}

export function useTxPoolBroadcast() {
  return usePost<undefined, Transaction[], unknown>('/bus/txpool/broadcast', [
    '/bus/txpool/transactions',
    '/bus/wallet/pending',
  ])
}

// wallet

export function useWalletBalance(options?: SWROptions<string>) {
  return useGet(null, '/bus/wallet/balance', options)
}

export function useWalletAddress(options?: SWROptions<string>) {
  return useGet(null, '/bus/wallet/address', options)
}

export function useWalletAddresses(options?: SWROptions<string[]>) {
  return useGet(null, '/bus/wallet/addresses', options)
}

type WalletTransactionsParams = {
  since?: number
  max?: number
}

export function useWalletTransactions(
  params: WalletTransactionsParams,
  options?: SWROptions<WalletTransaction[]>
) {
  let query = '?'
  if (params?.since) {
    query += `since=${params.since}`
  }
  if (params?.max) {
    query += `max=${params.max}`
  }
  return useGet(
    null,
    '/bus/wallet/transactions' + (query.length > 1 ? query : ''),
    options
  )
}

export function useWalletUtxos(options?: SWROptions<SiacoinElement[]>) {
  return useGet(null, '/bus/wallet/outputs', options)
}

export function useWalletFund() {
  return usePost<undefined, WalletFundRequest, WalletFundResponse>(
    '/bus/wallet/fund'
  )
}

export function useWalletSign() {
  return usePost<undefined, WalletSignRequest, Transaction>('/bus/wallet/sign')
}

export function useWalletRedistribute() {
  return usePost<undefined, WalletRedistributeRequest, Transaction>(
    '/bus/wallet/redistribute'
  )
}

export function useWalletDiscard() {
  return usePost<undefined, Transaction, never>('/bus/wallet/discard')
}

export function useWalletPrepareForm() {
  return usePost<undefined, WalletPrepareFormRequest, Transaction[]>(
    '/bus/wallet/prepare/form'
  )
}

export function useWalletPrepareRenew() {
  return usePost<
    undefined,
    WalletPrepareRenewRequest,
    WalletPrepareRenewResponse
  >('/bus/wallet/prepare/form')
}

export function useWalletPending(options?: SWROptions<Transaction[]>) {
  return useGet(null, '/bus/wallet/pending', options)
}

// hosts

type HostsParams = {
  notSince?: number
  max?: number
}

// TODO: ideally the API includes the following parameters
export type HostSortBy = 'firstSeen' | 'lastSeen' | 'score'
export type HostSortDir = 'asc' | 'desc'
export type ListMetaResponse = {
  total: number
  totalFiltered: number
}
export type HostsResponse = {
  hosts: Host[]
  meta: ListMetaResponse
}

export function useHosts(params: HostsParams, options?: SWROptions<Host[]>) {
  let query = '?'
  if (params?.notSince) {
    query += `notSince=${params.notSince}`
  }
  if (params?.max) {
    query += `max=${params.max}`
  }
  return useGet(null, '/bus/hosts' + (query.length > 1 ? query : ''), options)
}

export function useHostsPubkey(
  params: { hostKey: string },
  options?: SWROptions<Host>
) {
  return useGet(params, '/bus/hosts/:hostKey', options)
}

export function useHostsPubkeyInteractionAdd() {
  return usePost<{ hostKey: string }, Interaction, never>('/bus/hosts/:hostKey')
}

// contracts

export function useContracts(options?: SWROptions<Contract[]>) {
  return useGet(null, '/bus/contracts/active', options)
}

export function useContractsAcquire() {
  return usePost<
    { id: string },
    ContractAcquireRequest,
    ContractAcquireResponse
  >('/bus/contracts/:id/acquire')
}

export function useContractsRelease() {
  return usePost<{ id: string }, never, never>('/bus/contracts/:id/release')
}

export function useContract(
  params: { id: string },
  options?: SWROptions<Contract>
) {
  return useGet(params, '/bus/contracts/:id', options)
}

export function useContractCreate() {
  return usePost<{ id: string }, ContractsIDAddRequest, Contract>(
    '/bus/contracts/:id/new'
  )
}

export function useContractRenew() {
  return usePost<{ id: string }, ContractsIDRenewedRequest, Contract>(
    '/bus/contracts/:id/renewed'
  )
}

export function useContractDelete() {
  return useDelete<{ id: string }>('/bus/contracts/:id/delete')
}

export function useContractsets(options?: SWROptions<string[][]>) {
  return useGet(null, '/bus/contractsets', options)
}

export function useContractset(
  params: { name: string },
  options?: SWROptions<string[]>
) {
  return useGet(params, '/bus/contractsets/:name', options)
}

export function useContractsetUpdate() {
  return usePut<{ name: string }, string[], never>('/bus/contractsets/:name')
}

export function useObjects(
  params: { key: string },
  options?: SWROptions<Obj[]>
) {
  return useGet(params, '/bus/objects/:key', options)
}

export function useObjectAdd() {
  return usePut<{ key: string }, AddObjectRequest, never>('/bus/objects/:key')
}

export function useObjectDelete() {
  return useDelete<{ key: string }>('/bus/objects/:key')
}

// type ObjectsMigrateParams = {
//   cutoff?: number
//   limit?: number
//   goodContracts?: string[]
// }

// export function useObjectsMigrate(params: ObjectsMigrateParams, options?: SWROptions<Slab[]>) {
//   return useGet('migration/slabs' + (query.length > 1 ? query : ''), options)
// }

export function useSettings(options?: SWROptions<string[]>) {
  return useGet(null, '/bus/settings', options)
}

export function useSetting(
  params: { key: string },
  options?: SWROptions<string>
) {
  return useGet(params, '/bus/setting/:key', options)
}

export function useSettingUpdate() {
  return usePost<{ key: string; value: string }, never, never>(
    '/bus/setting/:key/:value'
  )
}
