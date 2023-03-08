import {
  Panel,
  Separator,
  Text,
  AppPublicLayout,
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

export function SyncScreen() {
  const { settings, lock, isUnlocked } = useAppSettings()
  const { openDialog } = useDialog()
  const state = useConsensusState()
  const peers = useSyncerPeers()
  const status = useSiaStatsNetworkStatus()

  const percent =
    isUnlocked && state.data?.BlockHeight && status.data?.block_height
      ? ((state.data?.BlockHeight / status.data?.block_height) * 100).toFixed(0)
      : 0

  return (
    <AppPublicLayout routes={routes}>
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <Panel className="relative top-[-50px] w-[300px] p-2.5">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between mb-2">
              <Text font="mono" weight="bold" size="20">
                renterd
              </Text>
              <div className="flex items-center">
                {peers.data?.length && (
                  <Tooltip content={`${peers.data?.length} connected peers`}>
                    <Button
                      variant="ghost"
                      onClick={() => openDialog('connectPeer')}
                    >
                      <Text color="subtle">{peers.data?.length}</Text>
                      <Network_416 />
                    </Button>
                  </Tooltip>
                )}
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
                  value={state.data?.BlockHeight}
                  max={status.data?.block_height}
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
                  Block
                </Text>
                {isUnlocked && settings.siaStats ? (
                  <Text color="verySubtle" size="10">
                    {`${state.data?.BlockHeight.toLocaleString()} / ${status.data?.block_height.toLocaleString()} (${percent}%)`}
                  </Text>
                ) : (
                  <Text color="verySubtle" size="10">
                    {state.data?.BlockHeight.toLocaleString()}
                  </Text>
                )}
              </div>
            </>
            <Text color="subtle" size="14" className="mt-2">
              Welcome to Sia! The blockchain is syncing to the current network
              height. Depending on your system this process may take a while.
            </Text>
          </div>
        </Panel>
      </div>
    </AppPublicLayout>
  )
}
