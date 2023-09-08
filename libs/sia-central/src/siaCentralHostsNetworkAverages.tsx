import { runFetch } from './fetch'
import { SiaCentralNetworkStats, api } from './types'

export type SiaCentralHostsNetworkAveragesResponse = {
  message: string
  type: string
} & SiaCentralNetworkStats

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
