import {
  DaemonProfile,
  Label,
  Link,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import {
  useSettings,
  useStateHost,
  useSyncerPeers,
} from '@siafoundation/react-hostd'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useDialog } from '../../contexts/dialog'

export function Profile() {
  const { openDialog } = useDialog()
  const state = useStateHost({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const settings = useSettings({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const syncStatus = useSyncStatus()
  const peers = useSyncerPeers()
  return (
    <DaemonProfile
      name="hostd"
      peerCount={peers.data?.length}
      connectPeer={() => openDialog('connectPeer')}
      isSynced={syncStatus.isSynced}
      percent={syncStatus.percent}
      nodeBlockHeight={syncStatus.nodeBlockHeight}
      networkBlockHeight={syncStatus.networkBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      <div className="flex gap-1 justify-between items-center">
        <Label size="14" color="subtle">
          Net address
        </Label>
        <ValueCopyable
          size="14"
          value={settings.data?.netAddress}
          maxLength={50}
          label="network address"
        />
      </div>
      <div className="flex gap-1 justify-between items-center">
        <Label size="14" color="subtle">
          Public key
        </Label>
        <ValueCopyable
          size="14"
          value={state.data?.publicKey}
          label="public key"
        />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle">
          Wallet address
        </Label>
        <ValueCopyable
          size="14"
          value={state.data?.walletAddress}
          type="address"
        />
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle">
          Network
        </Label>
        <Text size="14">{state.data?.network}</Text>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle">
          Version
        </Label>
        <Link
          size="14"
          href={`https://github.com/SiaFoundation/hostd/tree/${state.data?.commit}`}
          target="_blank"
        >
          {state.data?.version}
        </Link>
      </div>
    </DaemonProfile>
  )
}
