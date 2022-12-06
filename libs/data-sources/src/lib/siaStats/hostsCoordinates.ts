import axios from 'axios'
import { buildErrorResponse500 } from '../error'
import { AsyncDataSourceResponse } from '../types'

export async function getSiaStatsHostsCoordinates(): AsyncDataSourceResponse<
  Record<string, unknown>
> {
  try {
    const { data } = await axios.get(
      'https://siastats.info/dbs/hostscoordinates.json',
      {
        timeout: 10_000,
      }
    )
    const result = data
    return {
      status: 200,
      data: result,
    }
  } catch (e) {
    console.log(e)
    return buildErrorResponse500()
  }
}
