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
import { useAppSettings } from '@siafoundation/react-core'
import {
  useNetworkBlockHeight,
  useConsensusState,
  useSyncerPeers,
} from '@siafoundation/react-renterd'
import { useDialog } from '../../contexts/dialog'
import { routes } from '../../config/routes'
import { RenterdPublicLayout } from '../RenterdPublicLayout'

export function SyncScreen() {
  const { lock, isUnlocked } = useAppSettings()
  const { openDialog } = useDialog()
  const state = useConsensusState()
  const peers = useSyncerPeers()

  const currentBlockHeight = state.data?.BlockHeight || 0
  const networkBlockHeight = useNetworkBlockHeight()

  const percent =
    isUnlocked && currentBlockHeight && networkBlockHeight
      ? (Math.min(currentBlockHeight / networkBlockHeight, 1) * 100).toFixed(1)
      : 0

  const moreThan10BlockToSync =
    currentBlockHeight && networkBlockHeight
      ? networkBlockHeight - currentBlockHeight > 10
      : false

  return (
    <RenterdPublicLayout title="Syncing" routes={routes}>
      <div className="flex flex-col items-center justify-center gap-6 h-full">
        <Panel className="relative top-[-50px] w-[300px] p-2.5">
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between mb-2">
              <Text font="mono" weight="bold" size="20">
                renterd
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
              <div className="flex justify-between mt-1.5">
                <Text color="verySubtle" size="10">
                  Syncing...
                </Text>
                {isUnlocked && currentBlockHeight && networkBlockHeight ? (
                  currentBlockHeight > networkBlockHeight ? (
                    <Text color="verySubtle" size="10">
                      {`(${percent}%)`}
                    </Text>
                  ) : (
                    <Text color="verySubtle" size="10">
                      {`${currentBlockHeight.toLocaleString()} / ${networkBlockHeight.toLocaleString()} (${percent}%)`}
                    </Text>
                  )
                ) : null}
              </div>
            </>
            {moreThan10BlockToSync && (
              <Text color="subtle" size="14" className="mt-2">
                Welcome to Sia! The blockchain is syncing to the current network
                height. Depending on your system this process may take a while.
              </Text>
            )}
          </div>
        </Panel>
      </div>
    </RenterdPublicLayout>
  )
}
