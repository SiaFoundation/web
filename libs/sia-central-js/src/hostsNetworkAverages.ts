import { runFetch } from './fetch'
import {
  api,
  SiaCentralHostsNetworkAveragesResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralHostsNetworkAverages(args?: {
  config?: {
    api: string
  }
}) {
  const { config } = args || {}
  return runFetch<SiaCentralHostsNetworkAveragesResponse>(
    `${config?.api || api}/hosts/network/averages`
  )
}
