import { SiaCentralNetworkStats } from './types'

export type SiaCentralHostsNetworkMetricsParams = void
export type SiaCentralHostsNetworkMetricsPayload = void
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
