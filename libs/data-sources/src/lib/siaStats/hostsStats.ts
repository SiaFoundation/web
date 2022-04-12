import axios from 'axios'
import { errorResponse500 } from '../error'
import { AsyncDataSourceResponse } from '../types'

type SiaStatsHostsStats = {
  timestamp: number
  activehosts: number
  onlinehosts: number
  totalstorage: number
  usedstorage: number
  usage: number
  skynetFiles: number
  skynetSize: number
}

export async function getSiaStatsHostsStats(): AsyncDataSourceResponse<SiaStatsHostsStats> {
  try {
    const response = await axios.get(
      'https://siastats.info/dbs/hostsRTdb.json',
      {
        timeout: 10_000,
      }
    )
    const result = response.data[0]
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return errorResponse500
  }
}
