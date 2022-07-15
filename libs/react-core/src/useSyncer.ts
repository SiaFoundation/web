import { useGet } from './useGet'
import { usePost } from './usePost'
import { SWROptions } from './types'
import { SyncerConnectRequest, SyncerPeerResponse } from './siaTypes'

const syncerPeers = 'syncer/peers'

export function useSyncerPeers(options?: SWROptions<SyncerPeerResponse[]>) {
  return useGet(syncerPeers, options)
}

export function useSyncerConnect() {
  return usePost<SyncerConnectRequest, never>('syncer/connect', [syncerPeers])
}
