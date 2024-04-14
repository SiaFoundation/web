import { runFetch } from './fetch'
import {
  api,
  SiaCentralHostsNetworkMetricsResponse,
} from '@siafoundation/sia-central-types'

export async function getSiaCentralHostsNetworkMetrics(args?: {
  config?: {
    api: string
  }
}) {
  const { config } = args || {}
  return runFetch<SiaCentralHostsNetworkMetricsResponse>(
    `${config?.api || api}/hosts/network/metrics`
  )
}
