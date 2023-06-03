import { useAppSettings } from '@siafoundation/react-core'
import {
  useConsensusTip,
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
  const estimatedBlockHeight = useEstimatedNetworkBlockHeight()

  const nodeBlockHeight = state.data ? state.data?.height : 0

  const percent =
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
    // isSynced: state.data?.synced,
    isSynced: !moreThan100BlocksToSync,
    nodeBlockHeight,
    estimatedBlockHeight,
    percent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}
