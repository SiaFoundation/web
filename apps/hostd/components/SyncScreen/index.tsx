import {
  Panel,
  Separator,
  Text,
  ProgressBar,
  Button,
  Network_416,
  Tooltip,
  OverflowMenuHorizontal16,
  Locked16,
  Settings16,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
} from '@siafoundation/design-system'
import {
  useAppSettings,
  useConsensusState,
  useSiaStatsNetworkStatus,
  useSyncerPeers,
} from '@siafoundation/react-core'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import { HostdPublicLayout } from '../HostdPublicLayout'

export function SyncScreen() {
  const { settings, lock, isUnlocked } = useAppSettings()
  const { openDialog } = useDialog()
  const state = useConsensusState()
  const peers = useSyncerPeers()
  const status = useSiaStatsNetworkStatus()

  const currentBlockHeight = state.data?.BlockHeight || 0
  const networkBlockHeight = status.data?.block_height || 0

  const percent =
    isUnlocked && currentBlockHeight && networkBlockHeight
      ? ((currentBlockHeight / networkBlockHeight) * 100).toFixed(1)
      : 0

  const moreThan1BlockToSync =
    currentBlockHeight && networkBlockHeight
      ? networkBlockHeight - currentBlockHeight > 1
      : false

  return (
    <HostdPublicLayout title="Syncing" routes={routes}>
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <Panel className="relative top-[-50px] w-[300px] p-2.5">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between mb-2">
              <Text font="mono" weight="bold" size="20">
                hostd
              </Text>
              <div className="flex items-center">
                {peers.data?.length ? (
                  <Tooltip content={`${peers.data?.length} connected peers`}>
                    <Button
                      variant="ghost"
                      onClick={() => openDialog('connectPeer')}
                    >
                      <Text color="subtle">{peers.data?.length}</Text>
                      <Network_416 />
                    </Button>
                  </Tooltip>
                ) : null}
                <DropdownMenu
                  contentProps={{
                    align: 'end',
                  }}
                  trigger={
                    <Button variant="ghost">
                      <OverflowMenuHorizontal16 />
                    </Button>
                  }
                >
                  <DropdownMenuItem onSelect={() => lock()}>
                    <DropdownMenuLeftSlot>
                      <Locked16 />
                    </DropdownMenuLeftSlot>
                    Lock
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => openDialog('settings')}>
                    <DropdownMenuLeftSlot>
                      <Settings16 />
                    </DropdownMenuLeftSlot>
                    Settings
                  </DropdownMenuItem>
                </DropdownMenu>
              </div>
            </div>
            <Separator className="w-full mb-3" />
            <>
              {settings.siaStats ? (
                <ProgressBar
                  variant="accent"
                  value={
                    currentBlockHeight && networkBlockHeight
                      ? currentBlockHeight
                      : 0
                  }
                  max={networkBlockHeight || 1}
                  className=""
                />
              ) : (
                <ProgressBar
                  variant="accent"
                  value={1}
                  max={1}
                  className="animate-pulse"
                />
              )}
              <div className="flex justify-between mt-1.5">
                <Text color="verySubtle" size="10">
                  Syncing...
                </Text>
                {isUnlocked && settings.siaStats ? (
                  currentBlockHeight && networkBlockHeight ? (
                    <Text color="verySubtle" size="10">
                      {`${currentBlockHeight.toLocaleString()} / ${networkBlockHeight.toLocaleString()} (${percent}%)`}
                    </Text>
                  ) : null
                ) : currentBlockHeight ? (
                  <Text color="verySubtle" size="10">
                    {currentBlockHeight.toLocaleString()}
                  </Text>
                ) : null}
              </div>
            </>
            {(!settings.siaStats || moreThan1BlockToSync) && (
              <Text color="subtle" size="14" className="mt-2">
                Welcome to Sia! The blockchain is syncing to the current network
                height. Depending on your system this process may take a while.
              </Text>
            )}
          </div>
        </Panel>
      </div>
    </HostdPublicLayout>
  )
}
