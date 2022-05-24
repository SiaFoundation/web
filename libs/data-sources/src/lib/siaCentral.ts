import axios from 'axios'
import { errorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

type SiaCentralHostsNetworkMetrics = {
  totals: {
    remaining_registry_entries: number
    total_registry_entries: number
    remaining_storage: number
    total_storage: number
    active_hosts: number
    total_hosts: number
  }
}

export async function getSiaCentralHostsNetworkMetrics(): AsyncDataSourceResponse<SiaCentralHostsNetworkMetrics> {
  try {
    const response = await axios.get(
      'https://api.siacentral.com/v2/hosts/network/metrics',
      {
        timeout: 10_000,
      }
    )
    const result = response.data
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return errorResponse500
  }
}
