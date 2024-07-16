import {
  useEstimatedNetworkBlockHeight,
  useStateConsensus,
  useWallet,
} from '@siafoundation/hostd-react'
import { useAppSettings } from '@siafoundation/react-core'

export function useSyncStatus() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const state = useStateConsensus({
    config: {
      swr: {
        refreshInterval: (data) => (data?.synced ? 60_000 : 10_000),
      },
    },
  })
  const estimatedBlockHeight = useEstimatedNetworkBlockHeight()
  const nodeBlockHeight = state.data ? state.data?.chainIndex.height : 0
  const wallet = useWallet({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.scanHeight >= nodeBlockHeight ? 60_000 : 10_000,
      },
    },
  })

  const syncPercent =
    isUnlockedAndAuthedRoute && nodeBlockHeight && estimatedBlockHeight
      ? Number(
          (Math.min(nodeBlockHeight / estimatedBlockHeight, 1) * 100).toFixed(
            1,
          ),
        )
      : 0

  const walletScanPercent =
    isUnlockedAndAuthedRoute && nodeBlockHeight && wallet.data
      ? Number(
          (
            Math.min(wallet.data.scanHeight / estimatedBlockHeight, 1) * 100
          ).toFixed(1),
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
      state.data?.synced && wallet.data?.scanHeight >= nodeBlockHeight - 1,
    nodeBlockHeight,
    estimatedBlockHeight,
    syncPercent,
    walletScanPercent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}
