import {
  DaemonProfile,
  Label,
  Link,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import {
  useBusState,
  useSyncerPeers,
  useWallet,
} from '@siafoundation/react-renterd'
import { useDialog } from '../../contexts/dialog'

export function Profile() {
  const { openDialog } = useDialog()
  const state = useBusState({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const wallet = useWallet({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const peers = useSyncerPeers()
  const syncStatus = useSyncStatus()

  const version = state.data?.version
  const versionUrl =
    version === '?'
      ? `https://github.com/SiaFoundation/renterd/commits/`
      : version?.match(/^v\d+\.\d+\.\d+/)
      ? `https://github.com/SiaFoundation/renterd/releases/${version}`
      : `https://github.com/SiaFoundation/renterd/tree/${version}`

  return (
    <DaemonProfile
      name="renterd"
      peerCount={peers.data?.length}
      connectPeer={() => openDialog('connectPeer')}
      isSynced={syncStatus.isSynced}
      syncPercent={syncStatus.syncPercent}
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
          value={wallet.data?.address}
          type="address"
        />
      </div>
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Network
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden">
          <Text size="14">{state.data?.network}</Text>
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Version
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden">
          <Link size="14" href={versionUrl} target="_blank">
            {state.data?.version}
          </Link>
        </div>
      </div>
    </DaemonProfile>
  )
}
