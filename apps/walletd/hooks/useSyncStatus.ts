import { hoursInMilliseconds } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import { ConsensusState } from '@siafoundation/types'
import {
  useConsensusTip,
  useConsensusTipState,
  useEstimatedNetworkBlockHeight,
} from '@siafoundation/walletd-react'

export function useSyncStatus() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
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
    isUnlockedAndAuthedRoute && nodeBlockHeight && estimatedBlockHeight
      ? Number(
          (Math.min(nodeBlockHeight / estimatedBlockHeight, 1) * 100).toFixed(
            1,
          ),
        )
      : 0

  const moreThan100BlocksToSync =
    nodeBlockHeight && estimatedBlockHeight
      ? estimatedBlockHeight - nodeBlockHeight > 100
      : false

  return {
    isSynced: getIsSynced(tipState.data),
    nodeBlockHeight,
    estimatedBlockHeight,
    syncPercent,
    moreThan100BlocksToSync,
  }
}

function getIsSynced(tipState?: ConsensusState) {
  if (!tipState) return false
  return lastBlockLessThan2HoursAgo(tipState.prevTimestamps)
}

function lastBlockLessThan2HoursAgo(prevTimestamps?: string[]) {
  if (!prevTimestamps || !prevTimestamps.length) return false
  const lastBlockTime = prevTimestamps[0]
  const twoHoursAgo = Date.now() - hoursInMilliseconds(2)
  return new Date(lastBlockTime).getTime() > twoHoursAgo
}
