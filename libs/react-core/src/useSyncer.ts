import { useGet } from './useGet'
import { usePost } from './usePost'
import { SWROptions } from './types'

const syncerPeers = 'syncer/peers'

export function useSyncerPeers(options?: SWROptions<string[]>) {
  return useGet(syncerPeers, options)
}

export function useSyncerConnect() {
  return usePost<string, never>('syncer/connect', [syncerPeers])
}
