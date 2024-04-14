import { merge } from '@technically/lodash'
import { runFetch } from './fetch'
import {
  api,
  SiaCentralHostsParams,
  SiaCentralHostsResponse,
} from '@siafoundation/sia-central-types'

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
