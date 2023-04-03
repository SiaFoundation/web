import useSWR from 'swr'
import { WalletGET } from '@siafoundation/sia-js'
import { SWRError, SWROptions } from './types'
import { defaultApi, keyOrNull } from './utils'
import { handleResponse } from './handleResponse'

const route = 'wallet'

export function useWallet(options?: SWROptions<WalletGET>) {
  const basePath = options?.api || defaultApi
  return useSWR<WalletGET, SWRError>(
    keyOrNull(route, options),
    async () => {
      const r = await fetch(`${basePath}/api/${route}`)
      return handleResponse(r)
    },
    options
  )
}
