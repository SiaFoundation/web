import useSWR from 'swr'
import { ConsensusGET } from '@siafoundation/sia-js'
import { SWROptions } from './types'
import { defaultApi, getKey } from './utils'

const route = 'consensus'

export function useConsensus(options?: SWROptions<ConsensusGET>) {
  const basePath = options?.api || defaultApi
  return useSWR(
    getKey(route),
    async () => {
      const r = await fetch(`${basePath}/api/${route}`)
      return r.json()
    },
    options
  )
}
