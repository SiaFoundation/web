import { useGet } from './useGet'
import { SWROptions } from './types'

type ConsensusTipResponse = {
  ID: string
  Height: number
}

export function useConsensusTip(options?: SWROptions<ConsensusTipResponse>) {
  return useGet<ConsensusTipResponse>('consensus/tip', options)
}
