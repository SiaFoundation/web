import { useGet, SWROptions, usePost } from '@siafoundation/react-core'
import { SyncerConnectRequest, SyncerPeerResponse } from './types'

const syncerPeers = 'syncer/peers'

export function useSyncerPeers(options?: SWROptions<SyncerPeerResponse[]>) {
  return useGet(syncerPeers, options)
}

export function useSyncerConnect() {
  return usePost<SyncerConnectRequest, never>('syncer/connect', [syncerPeers])
}
