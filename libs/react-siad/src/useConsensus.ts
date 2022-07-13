import { SWROptions, useGet } from '@siafoundation/react-core'

export function useConsensusTip(options?: SWROptions<string>) {
  return useGet('consensus/tip', options)
}
