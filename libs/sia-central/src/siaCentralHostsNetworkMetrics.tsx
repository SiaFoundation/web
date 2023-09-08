import { runFetch } from './fetch'
import { SiaCentralNetworkStats, api } from './types'

export type SiaCentralHostsNetworkMetricsResponse = {
  message: string
  type: string
  average: SiaCentralNetworkStats
  top: SiaCentralNetworkStats
  bottom: SiaCentralNetworkStats
  totals: {
    remaining_registry_entries: number
    total_registry_entries: number
    remaining_storage: number
    total_storage: number
    active_hosts: number
    total_hosts: number
  }
}

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
