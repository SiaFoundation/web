import useSWR from 'swr'
import { api } from '../config'
import { NvgBlockInfo, BlockTransaction } from '../config/navigatorTypes'

export const landingKey = `${api}/landing`

type NavigatorLanding = {
  last10ScTx: Pick<BlockTransaction, 'Height' | 'TxHash'>[]
  last10Contracts: Pick<BlockTransaction, 'Height' | 'TxHash' | 'TxType'>[]
  last10Others: Pick<BlockTransaction, 'Height' | 'TxHash' | 'TxType'>[]
  last10Blocks: Pick<NvgBlockInfo, 'Height' | 'MiningPool' | 'Timestamp'>[]
}

export async function fetchLanding(): Promise<NavigatorLanding> {
  const response = await fetch(landingKey)
  return response.json()
}

export function useLanding() {
  return useSWR<NavigatorLanding>(landingKey, () => fetchLanding(), {
    refreshInterval: 30_000,
    dedupingInterval: 30_000,
  })
}
