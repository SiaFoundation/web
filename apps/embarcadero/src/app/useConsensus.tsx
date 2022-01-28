import useSWR from 'swr'
import { getApi } from '../config'
import { environment } from '../environments/environment'

type Data = {
  synced: boolean
  height: number
  currentblock: string
  target: number[]
  difficulty: string
  foundationprimaryunlockhash: string
  foundationfailsafeunlockhash: string
  blockfrequency: number
  blocksizelimit: number
  extremefuturethreshold: number
  futurethreshold: number
  genesistimestamp: number
  maturitydelay: number
  mediantimestampwindow: number
  siafundcount: string
  siafundportion: string
  initialcoinbase: number
  minimumcoinbase: number
  roottarget: number[]
  rootdepth: number[]
  siacoinprecision: string
}

export function useConsensus() {
  return useSWR<Data>(
    'consensus',
    async () => {
      const r = await fetch(getApi('/api/consensus'))
      return r.json()
    },
    {
      errorRetryInterval: 10_000,
    }
  )
}
