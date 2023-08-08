import { hoursInMilliseconds } from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import {
  ConsensusState,
  useConsensusTip,
  useConsensusTipState,
  useEstimatedNetworkBlockHeight,
} from '@siafoundation/react-walletd'

export function useSyncStatus() {
  const { isUnlocked } = useAppSettings()
  const state = useConsensusTip({
    config: {
      swr: {
        // refreshInterval: (data) => (data?.synced ? 60_000 : 10_000),
        refreshInterval: 10_000,
      },
    },
  })
  const tipState = useConsensusTipState({
    config: {
      swr: {
        refreshInterval: (data) => (getIsSynced(data) ? 60_000 : 10_000),
      },
    },
  })
  const estimatedBlockHeight = useEstimatedNetworkBlockHeight()

  const nodeBlockHeight = state.data ? state.data?.height : 0

  const syncPercent =
    isUnlocked && nodeBlockHeight && estimatedBlockHeight
      ? Number(
          (Math.min(nodeBlockHeight / estimatedBlockHeight, 1) * 100).toFixed(1)
        )
      : 0

  const moreThan100BlocksToSync =
    nodeBlockHeight && estimatedBlockHeight
      ? estimatedBlockHeight - nodeBlockHeight > 100
      : false

  const firstTimeSyncing =
    nodeBlockHeight && estimatedBlockHeight
      ? estimatedBlockHeight - nodeBlockHeight > 50_000
      : false

  return {
    isSynced: getIsSynced(tipState.data),
    nodeBlockHeight,
    estimatedBlockHeight,
    syncPercent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}

function getIsSynced(tipState?: ConsensusState) {
  if (!tipState) return false
  return lastBlockLessThan2HoursAgo(tipState.prevTimestamps)
}

function lastBlockLessThan2HoursAgo(prevTimestamps?: string[]) {
  if (!prevTimestamps || !prevTimestamps.length) return false
  const lastBlockTime = prevTimestamps[prevTimestamps.length - 1]
  const twoHoursAgo = Date.now() - hoursInMilliseconds(2)
  return new Date(lastBlockTime).getTime() > twoHoursAgo
}
