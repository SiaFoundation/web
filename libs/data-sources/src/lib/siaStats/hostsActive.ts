import axios from 'axios'
import { buildErrorResponse500 } from '../error'
import { AsyncDataSourceResponse } from '../types'

export async function getSiaStatsHostsActive(): AsyncDataSourceResponse<
  Record<string, unknown>
> {
  try {
    const { data } = await axios.get(
      'https://siastats.info/dbs/activehosts.json',
      {
        timeout: 10_000,
      }
    )
    const result = data[data.length - 1]
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
}
