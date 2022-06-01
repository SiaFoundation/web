import useSWR from 'swr'
import { apiBase } from '../config'

const url = `${apiBase}/status`

type ExplorerStatus = {
  coinsupply: number
  consensusblock: number
  heartbeat: number
  lastblock: number
  mempool: number
  peers: number
  totalTx: number
  version: string
}

export function useStatus() {
  return useSWR<ExplorerStatus>(
    'status',
    async () => {
      const response = await fetch(url)
      const x = await response.json()
      return x[0]
    },
    {
      refreshInterval: 30_000,
      dedupingInterval: 30_000,
    }
  )
}
