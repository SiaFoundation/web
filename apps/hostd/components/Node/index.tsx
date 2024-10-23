import { DatumCard, PeerList } from '@siafoundation/design-system'
import { useSyncerPeers } from '@siafoundation/hostd-react'
import { useDialog } from '../../contexts/dialog'
import { useMemo } from 'react'
import { orderBy } from '@technically/lodash'
import { useSyncStatus } from '../../hooks/useSyncStatus'

export function Node() {
  const peers = useSyncerPeers()
  const syncStatus = useSyncStatus()
  const { openDialog } = useDialog()

  const peerList = useMemo(() => {
    if (!peers.data) {
      return null
    }
    return orderBy(peers.data, ['address']).map((p) => p.address)
  }, [peers.data])

  return (
    <div className="p-6 flex flex-col gap-5">
      <div className="flex flex-wrap gap-7">
        <DatumCard
          label="Height"
          value={
            syncStatus.nodeBlockHeight
              ? syncStatus.nodeBlockHeight.toLocaleString()
              : undefined
          }
          comment={
            !syncStatus.isSynced
              ? `Syncing to ${syncStatus.estimatedBlockHeight.toLocaleString()}`
              : undefined
          }
        />
        <DatumCard label="Connected peers" value={peers.data?.length} />
      </div>
      <PeerList
        peers={peerList}
        isLoading={peers.isValidating}
        connectPeer={() => openDialog('connectPeer')}
      />
    </div>
  )
}
