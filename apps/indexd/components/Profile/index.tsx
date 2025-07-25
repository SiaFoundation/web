import {
  DaemonProfile,
  Label,
  Link,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { useIndexdState, useWallet } from '@siafoundation/indexd-react'
import { useDialog } from '../../contexts/dialog'
import { humanTime } from '@siafoundation/units'

export function Profile() {
  const { openDialog } = useDialog()
  const state = useIndexdState({
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
  const syncStatus = useSyncStatus()

  const version = state.data?.version
  const versionUrl =
    version === '?'
      ? `https://github.com/SiaFoundation/indexd/commits/`
      : version?.match(/^v\d+\.\d+\.\d+/)
      ? `https://github.com/SiaFoundation/indexd/releases/${version}`
      : `https://github.com/SiaFoundation/indexd/tree/${version}`

  const uptime = state.data
    ? new Date().getTime() - new Date(state.data?.startTime).getTime()
    : 0

  return (
    <DaemonProfile
      name="indexd"
      peerCount={0}
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
        <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
          <ValueCopyable
            size="14"
            maxLength={20}
            value={wallet.data?.address || ''}
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
      <div className="flex gap-4 justify-between items-center">
        <Label size="14" color="subtle" noWrap className="w-[100px]">
          Network
        </Label>
        <div className="flex-1 flex justify-end overflow-hidden -mr-0.5 pr-0.5">
          <Text size="14">{state.data?.network}</Text>
        </div>
      </div>
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
