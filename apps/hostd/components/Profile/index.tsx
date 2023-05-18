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
      estimatedBlockHeight={syncStatus.estimatedBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Net address
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden">
          <ValueCopyable
            className="overflow-hidden"
            size="14"
            value={settings.data?.netAddress}
            maxLength={50}
            label="network address"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Public key
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden">
          <ValueCopyable
            className="overflow-hidden"
            size="14"
            value={state.data?.publicKey}
            maxLength={50}
            label="public key"
          />
        </div>
      </div>
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Wallet address
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden">
          <ValueCopyable
            className="overflow-hidden"
            size="14"
            maxLength={50}
            value={state.data?.walletAddress}
            type="address"
          />
        </div>
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
          <Link
            size="14"
            href={`https://github.com/SiaFoundation/hostd/tree/${state.data?.commit}`}
            target="_blank"
          >
            {state.data?.version}
          </Link>
        </div>
      </div>
    </DaemonProfile>
  )
}
