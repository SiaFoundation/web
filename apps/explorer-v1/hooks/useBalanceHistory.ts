import useSWR from 'swr'
import axios from 'axios'
import { navigatorApi } from '../config'

const url = `${navigatorApi}/balance-track`

function getBalanceHistoryKey(address?: string) {
  return address ? `${url}/${address}` : null
}

type Point = {
  timestamp: number
  value: number
}

export type NavigatorBalanceHistory = {
  scDataBool: boolean
  scJson: Point[]
  scUsdJson: Point[]
  sfDataBool: boolean
  sfJson: Point[]
  sfUsdJson: Point[]
  status: string
}

export function useBalanceHistory(address?: string) {
  return useSWR<NavigatorBalanceHistory>(
    getBalanceHistoryKey(address),
    async () => {
      const response = await axios(url, {
        method: 'post',
        data: {
          addresses: [address],
          currency: 'USD',
        },
      })
      return {
        ...response.data,
        scJson: formatPoints(response.data.scJson),
        scUsdJson: formatPoints(response.data.scUsdJson),
        sfJson: formatPoints(response.data.sfJson),
        sfUsdJson: formatPoints(response.data.sfUsdJson),
      }
    },
    {
      dedupingInterval: 60_000 * 5,
    }
  )
}

function formatPoints(points: [number, number][]): Point[] {
  return points.map(([timestamp, balance]) => ({
    timestamp,
    value: balance,
  }))
}
