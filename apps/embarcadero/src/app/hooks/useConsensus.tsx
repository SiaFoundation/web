import useSWR from 'swr'
import { getApi } from '../../config'
import { ConsensusGET } from '@siafoundation/sia-js'

export function useConsensus() {
  return useSWR<ConsensusGET>(
    'consensus',
    async () => {
      const r = await fetch(getApi('/api/consensus'))
      return r.json()
    },
    {
      refreshInterval: 10_000,
      errorRetryInterval: 10_000,
    }
  )
}
