import useSWR from 'swr'
import { WalletGET } from '@siafoundation/sia-js'
import { SWROptions } from './types'
import { defaultApi, getKey } from './utils'

const route = 'wallet'

export function useWallet(options?: SWROptions<WalletGET>) {
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
