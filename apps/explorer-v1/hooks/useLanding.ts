import useSWR from 'swr'
import { apiBase } from '../config'
import { BlockInfo, BlockTransaction } from '../config/types'

const url = `${apiBase}/landing`

type ExplorerLanding = {
  last10ScTx: Pick<BlockTransaction, 'Height' | 'TxHash'>[]
  last10Contracts: Pick<BlockTransaction, 'Height' | 'TxHash' | 'TxType'>[]
  last10Others: Pick<BlockTransaction, 'Height' | 'TxHash' | 'TxType'>[]
  last10Blocks: Pick<BlockInfo, 'Height' | 'MiningPool' | 'Timestamp'>[]
}

export function useLanding() {
  return useSWR<ExplorerLanding>(
    'landing',
    async () => {
      const response = await fetch(url)
      return response.json()
    },
    {
      refreshInterval: 30_000,
      dedupingInterval: 30_000,
    }
  )
}
