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
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { humanTime } from '@siafoundation/units'

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
  const siascanUrl = useSiascanUrl()

  const version = state.data?.version
  const versionUrl = version?.match(/^v\d+\.\d+\.\d+/)
    ? `https://github.com/SiaFoundation/hostd/releases/${version}`
    : `https://github.com/SiaFoundation/hostd/tree/${version}`

  const uptime = state.data
    ? new Date().getTime() - new Date(state.data?.startTime).getTime()
    : 0

  return (
    <DaemonProfile
      name="hostd"
      peerCount={peers.data?.length}
      connectPeer={() => openDialog('connectPeer')}
      isSynced={syncStatus.isSynced}
      syncPercent={syncStatus.syncPercent}
      nodeBlockHeight={syncStatus.nodeBlockHeight}
      estimatedBlockHeight={syncStatus.estimatedBlockHeight}
      firstTimeSyncing={syncStatus.firstTimeSyncing}
      moreThan100BlocksToSync={syncStatus.moreThan100BlocksToSync}
    >
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Net address
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
          <ValueCopyable
            size="14"
            value={settings.data?.netAddress}
            maxLength={24}
            label="network address"
            type="hostIp"
            siascanUrl={siascanUrl}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Public key
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
          <ValueCopyable
            size="14"
            value={state.data?.publicKey}
            maxLength={24}
            label="public key"
            type="hostPublicKey"
            siascanUrl={siascanUrl}
          />
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Wallet address
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
          <ValueCopyable
            size="14"
            maxLength={24}
            value={state.data?.walletAddress}
            type="address"
          />
        </div>
      </div>
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
      <div className="flex gap-2 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Network
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden">
          <Text size="14">{state.data?.network}</Text>
        </div>
      </div>
      <div className="flex gap-2 justify-between items-center">
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
