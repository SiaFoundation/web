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
      estimatedBlockHeight={syncStatus.estimatedBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Wallet address
        </Label>
        <ValueCopyable
          className="overflow-hidden"
          size="14"
          maxLength={50}
          value={address.data}
          type="address"
        />
      </div>
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Network
        </Label>
        <Text size="14">{network.data?.Name}</Text>
      </div>
      {/* <div className="flex gap-4 justify-between items-center">
          <Label size="14" color="subtle" noWrap className="w-[100px]">
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
