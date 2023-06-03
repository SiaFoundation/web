import { DaemonProfile } from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useSyncerPeers } from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'

export function Profile() {
  const { openDialog } = useDialog()
  const peers = useSyncerPeers()
  const syncStatus = useSyncStatus()
  return (
    <DaemonProfile
      name="walletd"
      peerCount={peers.data?.length}
      connectPeer={() => openDialog('connectPeer')}
      isSynced={syncStatus.isSynced}
      percent={syncStatus.percent}
      nodeBlockHeight={syncStatus.nodeBlockHeight}
      estimatedBlockHeight={syncStatus.estimatedBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      {/* <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Network
        </Label>
        <Text size="14">{network.data?.Name}</Text>
      </div> */}
      {/* <div className="flex gap-4 justify-between items-center">
          <Label size="14" color="subtle" noWrap className="w-[100px]">
            Version
          </Label>
          <Link
            size="14"
            href={`https://github.com/SiaFoundation/walletd/tree/${state.data?.commit}`}
            target="_blank"
          >
            {state.data?.version}
          </Link>
        </div> */}
    </DaemonProfile>
  )
}
