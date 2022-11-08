import { useGet } from './useGet'
import { SWROptions } from './types'
import { Host } from './siaTypes'

export type HostSortBy = 'firstSeen' | 'lastSeen' | 'score'
export type HostSortDir = 'asc' | 'desc'

type Params = {
  skip: number
  limit: number
  sortBy: HostSortBy
  sortDir: HostSortDir
}

const defaultParams = {
  skip: 0,
  limit: 20,
  sortBy: 'lastSeen',
  sortDir: 'desc',
}

export type ListMetaResponse = {
  total: number
  totalFiltered: number
}

export type HostsResponse = {
  hosts: Host[]
  meta: ListMetaResponse
}

export function useHosts(params: Params, options?: SWROptions<HostsResponse>) {
  const { skip, limit, sortBy, sortDir } = {
    ...defaultParams,
    ...params,
  }
  return useGet(
    `hosts?skip=${skip}&limit=${limit}&sortBy=${sortBy}&sortDir=${sortDir}`,
    options
  )
}
