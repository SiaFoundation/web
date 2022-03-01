import useSWR from 'swr'
import { ConsensusGET } from '@siafoundation/sia-js'
import { SWRError, SWROptions } from './types'
import { defaultApi, getKey } from './utils'
import { handleResponse } from './handleResponse'

const route = 'consensus'

export function useConsensus(options?: SWROptions<ConsensusGET>) {
  const basePath = options?.api || defaultApi
  return useSWR<ConsensusGET, SWRError>(
    getKey(route),
    async () => {
      const r = await fetch(`${basePath}/api/${route}`)
      return handleResponse(r)
    },
    options
  )
}
