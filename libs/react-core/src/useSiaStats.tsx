import { HookArgsSwr } from './request'
import { useGetSwr } from './useGet'

const api = 'https://siastats.info'

type SiaStatsNetworkStatusGET = {
  active_contracts: number
  block_height: number
  block_timestamp: number
  coin_price_USD: number
  coin_supply: number
  countries_with_hosts: number
  difficulty: number
  hashrate: number
  market_cap_USD: number
  network_capacity_TB: number
  online_hosts: number
  price_per_tb_sc: number
  price_per_tb_usd: number
  revenue_30d: number
  revenue_30d_change: number
  skynet_files: number
  skynet_portals_number: number
  skynet_size: number
  storage_proof_count: number
  used_storage_TB: number
}

export function useSiaStatsNetworkStatus(
  args?: HookArgsSwr<void, SiaStatsNetworkStatusGET>
) {
  return useGetSwr({
    api,
    ...args,
    route: '/dbs/network_status.json',
  })
}
