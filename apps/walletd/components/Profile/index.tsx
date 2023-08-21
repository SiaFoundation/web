import { DaemonProfile, Label, Text } from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import {
  useConsensusNetwork,
  useSyncerPeers,
} from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'

export function Profile() {
  const { openDialog } = useDialog()
  const peers = useSyncerPeers()
  const syncStatus = useSyncStatus()
  const network = useConsensusNetwork()
  return (
    <DaemonProfile
      name="walletd"
      peerCount={peers.data?.length}
      connectPeer={() => openDialog('connectPeer')}
      isSynced={syncStatus.isSynced}
      syncPercent={syncStatus.syncPercent}
      nodeBlockHeight={syncStatus.nodeBlockHeight}
      estimatedBlockHeight={syncStatus.estimatedBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      {network.data && (
        <div className="flex gap-4 justify-between items-center">
          <Label size="14" color="subtle" noWrap className="w-[100px]">
            Network
          </Label>
          <Text size="14">{network.data.name}</Text>
        </div>
      )}
      {/* <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Version
        </Label>
        <Link
          size="14"
          href={versionUrl}
          underline="hover"
          target="_blank"
          ellipsis
        >
          {state.data?.version}
        </Link>
      </div> */}
    </DaemonProfile>
  )
}
