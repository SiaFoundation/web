import { useGet } from './useGet'
import { SWROptions } from './types'
import { Host } from './siaTypes'

export function useHosts(options?: SWROptions<Host[]>) {
  return useGet('hosts', options)
}
