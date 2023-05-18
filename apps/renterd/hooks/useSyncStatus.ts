import { useAppSettings } from '@siafoundation/react-core'
import {
  useConsensusState,
  useNetworkBlockHeight,
} from '@siafoundation/react-renterd'

export function useSyncStatus() {
  const { isUnlocked } = useAppSettings()
  const state = useConsensusState({
    config: {
      swr: {
        refreshInterval: (data) => (data?.Synced ? 60_000 : 10_000),
      },
    },
  })
  const networkBlockHeight = useNetworkBlockHeight()

  const nodeBlockHeight = state.data ? state.data?.BlockHeight : 0

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
    isSynced: state.data?.Synced,
    nodeBlockHeight,
    networkBlockHeight,
    percent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}
