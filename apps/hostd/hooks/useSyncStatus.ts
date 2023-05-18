import { useAppSettings } from '@siafoundation/react-core'
import {
  useEstimatedNetworkBlockHeight,
  useStateConsensus,
  useWallet,
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
  const wallet = useWallet({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.scanHeight >= nodeBlockHeight - 5 ? 60_000 : 10_000,
      },
    },
  })
  const estimatedBlockHeight = useEstimatedNetworkBlockHeight()

  const nodeBlockHeight = state.data ? state.data?.chainIndex.height : 0

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
    isSynced: state.data?.synced,
    isWalletSynced:
      state.data?.synced && wallet.data?.scanHeight >= nodeBlockHeight - 5,
    nodeBlockHeight,
    estimatedBlockHeight,
    percent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}
