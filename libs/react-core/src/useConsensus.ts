import { useGet } from './useGet'
import { SWROptions } from './types'

export function useConsensusTip(options?: SWROptions<string>) {
  return useGet('consensus/tip', options)
}
