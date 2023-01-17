import useSWR from 'swr'
import { api } from '../config'

export const statusKey = `${api}/status`

type NavigatorStatus = {
  coinsupply: number
  consensusblock: number
  heartbeat: number
  lastblock: number
  mempool: number
  peers: number
  totalTx: number
  version: string
}

export async function fetchStatus(): Promise<NavigatorStatus> {
  const response = await fetch(statusKey)
  const x = await response.json()
  return x[0]
}

export function useStatus() {
  return useSWR<NavigatorStatus>(statusKey, () => fetchStatus(), {
    refreshInterval: 30_000,
    dedupingInterval: 30_000,
  })
}
