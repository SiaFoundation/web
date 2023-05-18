import { useAppSettings } from '@siafoundation/react-core'
import {
  useNetworkBlockHeight,
  useStateConsensus,
} from '@siafoundation/react-hostd'

export function useSyncStatus() {
  const { isUnlocked } = useAppSettings()
  const state = useStateConsensus({
    config: {
      swr: {
        refreshInterval: (data) => (data?.synced ? 60_000 : 10_000),
      },
    },
  })
  const networkBlockHeight = useNetworkBlockHeight()

  const nodeBlockHeight = state.data ? state.data?.chainIndex.height : 0

  const percent =
    isUnlocked && nodeBlockHeight && networkBlockHeight
      ? Number(
          (Math.min(nodeBlockHeight / networkBlockHeight, 1) * 100).toFixed(1)
        )
      : 0

  const moreThan100BlocksToSync =
    nodeBlockHeight && networkBlockHeight
      ? networkBlockHeight - nodeBlockHeight > 100
      : false

  const firstTimeSyncing =
    nodeBlockHeight && networkBlockHeight
      ? networkBlockHeight - nodeBlockHeight > 50_000
      : false

  return {
    isSynced: state.data?.synced,
    nodeBlockHeight,
    networkBlockHeight,
    percent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}
