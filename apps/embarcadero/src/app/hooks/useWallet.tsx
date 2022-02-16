import useSWR from 'swr'
import { getApi } from '../../config'
import { WalletGET } from '@siafoundation/sia-js'

export function useWallet() {
  return useSWR<WalletGET>(
    'wallet',
    async () => {
      const r = await fetch(getApi('/api/wallet'))
      return r.json()
    },
    {
      refreshInterval: 10_000,
      errorRetryInterval: 10_000,
    }
  )
}
