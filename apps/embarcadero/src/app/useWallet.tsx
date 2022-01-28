import useSWR from 'swr'
import { getApi } from '../config'

type Data = {
  encrypted: boolean
  height: number
  rescanning: boolean
  unlocked: boolean
  confirmedsiacoinbalance: string
  unconfirmedoutgoingsiacoins: string
  unconfirmedincomingsiacoins: string
  siacoinclaimbalance: string
  siafundbalance: string
  dustthreshold: string
}

export function useWallet() {
  return useSWR<Data>(
    'wallet',
    async () => {
      const r = await fetch(getApi('/api/wallet'))
      return r.json()
    },
    {
      errorRetryInterval: 10_000,
    }
  )
}
