import { DaemonProfile, Label, Text, Link } from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import {
  useConsensusNetwork,
  useNodeState,
  useSyncerPeers,
} from '@siafoundation/react-walletd'
import { useDialog } from '../../contexts/dialog'
import { humanTime } from '@siafoundation/units'

export function Profile() {
  const { openDialog } = useDialog()
  const peers = useSyncerPeers()
  const syncStatus = useSyncStatus()
  const network = useConsensusNetwork()
  const state = useNodeState({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const version = state.data?.version
  const versionUrl =
    version === '?'
      ? `https://github.com/SiaFoundation/walletd/commits/`
      : version?.match(/^v\d+\.\d+\.\d+/)
      ? `https://github.com/SiaFoundation/walletd/releases/${version}`
      : `https://github.com/SiaFoundation/walletd/tree/${version}`

  const uptime = state.data
    ? new Date().getTime() - new Date(state.data?.startTime).getTime()
    : 0

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
      {state.data && (
        <div className="flex gap-4 justify-between items-center">
          <Label size="14" color="subtle" noWrap className="w-[100px]">
            Uptime
          </Label>
          <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
            <Text size="14">{humanTime(uptime, { format: 'long' })}</Text>
          </div>
        </div>
      )}
      {network.data && (
        <div className="flex gap-4 justify-between items-center">
          <Label size="14" color="subtle" noWrap className="w-[100px]">
            Network
          </Label>
          <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
            <Text size="14">{network.data.name}</Text>
          </div>
        </div>
      )}
      <div className="flex gap-4 justify-between items-center">
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
      </div>
    </DaemonProfile>
  )
}
