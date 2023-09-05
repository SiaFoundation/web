import axios from 'axios'
import { buildErrorResponse500 } from '../error'
import { AsyncDataSourceResponse } from '../types'

export type SiaStatsHostCoordinate = {
  active: boolean
  country: string
  firstseen: number
  ip: string
  key: string
  lat: number
  lon: number
  totalstorage: number
  usedstorage: number
}

/** @deprecated no longer depending on siastats */
export async function getSiaStatsHostsCoordinates(): AsyncDataSourceResponse<
  SiaStatsHostCoordinate[]
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
