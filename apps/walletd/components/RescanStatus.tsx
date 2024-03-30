import {
  Panel,
  ProgressBar,
  Separator,
  Text,
} from '@siafoundation/design-system'
import { useRescanStatus } from '@siafoundation/react-walletd'
import { useSyncStatus } from '../hooks/useSyncStatus'
import { formatRelative } from 'date-fns'
import { defaultDatasetRefreshInterval } from '../config/swr'

export function RescanStatus() {
  const syncStatus = useSyncStatus()
  const rescanStatus = useRescanStatus({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  if (!rescanStatus.data) {
    return null
  }

  const isScanning = rescanStatus.data.index.height < syncStatus.nodeBlockHeight
  const showAsRescanning = syncStatus.isSynced && isScanning

  if (!showAsRescanning) {
    return null
  }

  return (
    <div className="z-20 fixed bottom-5 left-1/2 -translate-x-1/2 flex justify-center">
      <Panel className="px-2 py-2 w-[400px] overflow-hidden">
        <Text weight="medium" className="pb-2">
          Rescanning the blockchain
        </Text>
        <div className="flex flex-col gap-1">
          <ProgressBar
            variant="accent"
            value={rescanStatus.data.index.height}
            max={syncStatus.nodeBlockHeight}
          />
          <div className="flex justify-between gap-3">
            <Text color="verySubtle" size="12" ellipsis>
              {rescanStatus.data.error ? 'Stopped' : 'Scanning...'}
            </Text>
            <Text color="verySubtle" size="12" noWrap>
              {`${rescanStatus.data.index.height.toLocaleString()} / ${syncStatus.nodeBlockHeight.toLocaleString()}`}
            </Text>
          </div>
        </div>
        <Separator className="w-full mt-2 mb-1" />
        <div className="flex justify-between items-center">
          {rescanStatus.data.error && (
            <Text color="red" size="12">
              Error rescanning the blockchain
            </Text>
          )}
          <div className="flex-1" />
          <Text color="subtle" size="12">
            Started{' '}
            {formatRelative(new Date(rescanStatus.data.startTime), new Date())}
          </Text>
        </div>
        {rescanStatus.data.error && (
          <div className="flex flex-col gap-1 overflow-hidden pt-1">
            <Text color="contrast" size="12">
              {rescanStatus.data.error}
            </Text>
          </div>
        )}
      </Panel>
    </div>
  )
}
