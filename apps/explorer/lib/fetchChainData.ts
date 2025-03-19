import { to } from '@siafoundation/request'
import { getExplored } from './explored'
import { notFound } from 'next/navigation'
import { AxiosResponse } from 'axios'
import {
  CurrencyID,
  HostQuery,
  HostSortBy,
} from '@siafoundation/explored-types'

/**
 * Helper to simplify axios-based requests by handling errors and empty responses.
 * Wraps a request in a `to()` call, throwing errors or invoking `notFound()` as needed.
 *
 * @template T The expected response data type.
 * @param request A function returning an Axios promise for the desired request.
 * @param notFoundOnEmpty If true (default), calls `notFound()` when the response is empty.
 * @param customError Optional error message to throw when the response is empty and
 * `notFoundOnEmpty` is false.
 * @returns A promise resolving to the response data of type `T`, or throws on error/empty.
 */
async function fetchOrThrow<T>(
  request: () => Promise<AxiosResponse<T>>,
  notFoundOnEmpty = true,
  customError?: string
): Promise<T> {
  const [data, error] = await to(request())
  if (error) throw error
  if (!data) {
    if (notFoundOnEmpty) return notFound()
    throw new Error(customError || 'No data found in successful request')
  }
  return data
}

// Address
export function fetchAddressBalance(address: string) {
  return fetchOrThrow(() =>
    getExplored().addressBalance({ params: { address } })
  )
}

export function fetchAddressEvents(
  address: string,
  options?: {
    limit?: number
    offset?: number
  }
) {
  const params = {
    address,
    ...(options?.limit !== undefined && { limit: options.limit }),
    ...(options?.offset !== undefined && { offset: options.offset }),
  }

  return fetchOrThrow(() => getExplored().addressEvents({ params }))
}

export function fetchAddressSiacoinUTXOs(address: string) {
  return fetchOrThrow(() =>
    getExplored().addressSiacoinUTXOs({ params: { address } })
  )
}

// Block
export function fetchBlockByID(id: string) {
  return fetchOrThrow(() => getExplored().blockByID({ params: { id } }))
}

// Consensus
export function fetchConsensusNetwork() {
  return fetchOrThrow(() => getExplored().consensusNetwork())
}

export function fetchConsensusState() {
  return fetchOrThrow(() => getExplored().consensusState())
}

export function fetchConsensusTip() {
  return fetchOrThrow(() => getExplored().consensusTip())
}

export function fetchConsensusTipByHeight(height: number) {
  return fetchOrThrow(() =>
    getExplored().consensusTipByHeight({ params: { height } })
  )
}

// Contracts
export function fetchV1Contract(id: string) {
  return fetchOrThrow(() => getExplored().contractByID({ params: { id } }))
}

export function fetchV2Contract(id: string) {
  return fetchOrThrow(() => getExplored().v2ContractByID({ params: { id } }))
}

export function fetchV1ContractRevisions(id: string) {
  return fetchOrThrow(
    () => getExplored().contractRevisions({ params: { id } }),
    false
  )
}

export function fetchV2ContractRevisions(id: string) {
  return fetchOrThrow(
    () => getExplored().v2ContractRevisionsByID({ params: { id } }),
    false
  )
}

// Exchange Rate
export function fetchExchangeRateByCurrencyID(currency: CurrencyID) {
  return fetchOrThrow(() =>
    getExplored().exchangeRate({ params: { currency } })
  )
}

// Host
export function fetchHostByPubkey(id: string) {
  return fetchOrThrow(() => getExplored().hostByPubkey({ params: { id } }))
}

export function fetchHostsList(
  requestOptions: {
    sortBy: HostSortBy
    dir: 'asc' | 'desc'
    offset?: number
    limit?: number
  },
  hostsOptions: HostQuery
) {
  const { sortBy, dir, offset, limit } = requestOptions

  const params = {
    sortBy,
    dir,
    ...(offset !== undefined && { offset }),
    ...(limit !== undefined && { limit }),
  }

  return fetchOrThrow(() =>
    getExplored().hostsList({ params, data: hostsOptions })
  )
}

// Metrics
export function fetchBlockMetrics() {
  return fetchOrThrow(() => getExplored().blockMetrics())
}

export function fetchHostMetrics() {
  return fetchOrThrow(() => getExplored().hostMetrics())
}

// Search
export function fetchSearchType(id: string) {
  return fetchOrThrow(() => getExplored().searchResultType({ params: { id } }))
}

// Transactions
export function fetchV1Transaction(id: string) {
  return fetchOrThrow(() => getExplored().transactionByID({ params: { id } }))
}

export function fetchV2Transaction(id: string) {
  return fetchOrThrow(() => getExplored().v2TransactionByID({ params: { id } }))
}

export function fetchV1TransactionChainIndices(id: string) {
  return fetchOrThrow(() =>
    getExplored().transactionChainIndices({ params: { id } })
  )
}

export function fetchV2TransactionChainIndices(id: string) {
  return fetchOrThrow(() =>
    getExplored().v2TransactionChainIndices({ params: { id } })
  )
}
