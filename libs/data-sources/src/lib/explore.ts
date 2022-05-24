import axios from 'axios'
import { errorResponse500 } from './error'
import { AsyncDataSourceResponse } from './types'

type ExploreNavigatorStatus = {
  coinsupply: number
  consensusblock: number
  heartbeat: number
  blockHeight: number
  mempool: number
  peers: number
  totalTx: number
  version: string
}

export async function getExploreNavigatorStatus(): AsyncDataSourceResponse<ExploreNavigatorStatus> {
  try {
    const response = await axios.get(
      'https://explore.sia.tech/navigator-api/status',
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
