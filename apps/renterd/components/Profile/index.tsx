import {
  DaemonProfile,
  Label,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import {
  useConsensusNetwork,
  useSyncerPeers,
  useWalletAddress,
} from '@siafoundation/react-renterd'
import { useDialog } from '../../contexts/dialog'

export function Profile() {
  const { openDialog } = useDialog()
  const network = useConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const address = useWalletAddress({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const peers = useSyncerPeers()
  const syncStatus = useSyncStatus()
  return (
    <DaemonProfile
      name="renterd"
      peerCount={peers.data?.length}
      connectPeer={() => openDialog('connectPeer')}
      isSynced={syncStatus.isSynced}
      percent={syncStatus.percent}
      nodeBlockHeight={syncStatus.nodeBlockHeight}
      networkBlockHeight={syncStatus.networkBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle">
          Wallet address
        </Label>
        <ValueCopyable size="14" value={address.data} type="address" />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle">
          Network
        </Label>
        <Text size="14">{network.data?.Name}</Text>
      </div>
      {/* <div className="flex gap-2 justify-between items-center">
          <Label size="14" color="subtle">
            Version
          </Label>
          <Link
            size="14"
            href={`https://github.com/SiaFoundation/renterd/tree/${state.data?.commit}`}
            target="_blank"
          >
            {state.data?.version}
          </Link>
        </div> */}
    </DaemonProfile>
  )
}
