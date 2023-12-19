import merge from 'lodash-es/merge'
import { runFetch } from './fetch'
import { SiaCentralHost, api } from './types'

export type SiaCentralHostsParams = {
  limit?: number
  page?: number
}

export type SiaCentralHostsResponse = {
  message: string
  count: number
  total: number
  type: string
  hosts: SiaCentralHost[]
}

export async function getSiaCentralHosts(args?: {
  params?: SiaCentralHostsParams
  config?: {
    api: string
  }
}) {
  const { params, config } = merge(
    {
      params: {
        limit: 10,
        page: 1,
      },
    },
    args
  )
  return runFetch<SiaCentralHostsResponse>(
    `${
      config?.api || api
    }/hosts/list?showinactive=false&sort=used_storage&dir=desc&protocol=rhp3&page=${
      params.page
    }&limit=${params.limit}`
  )
}
