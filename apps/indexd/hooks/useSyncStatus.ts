import { secondsInMilliseconds } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import {
  useAdminState,
  useAdminEstimatedNetworkBlockHeight,
} from '@siafoundation/indexd-react'

export function useSyncStatus() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const state = useAdminState({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.synced ? secondsInMilliseconds(60) : secondsInMilliseconds(10),
      },
    },
  })
  const estimatedBlockHeight = useAdminEstimatedNetworkBlockHeight()
  const nodeBlockHeight = state.data ? state.data?.syncHeight : 0
  const walletScanHeight = state.data ? state.data?.scanHeight : 0

  const syncPercent =
    isUnlockedAndAuthedRoute && nodeBlockHeight && estimatedBlockHeight
      ? Number(
          (Math.min(nodeBlockHeight / estimatedBlockHeight, 1) * 100).toFixed(
            1,
          ),
        )
      : 0

  const walletScanPercent =
    isUnlockedAndAuthedRoute && nodeBlockHeight && walletScanHeight
      ? Number(
          (
            Math.min(walletScanHeight ?? 0 / estimatedBlockHeight, 1) * 100
          ).toFixed(1),
        )
      : 0

  const moreThan100BlocksToSync =
    nodeBlockHeight && estimatedBlockHeight
      ? estimatedBlockHeight - nodeBlockHeight > 100
      : false

  return {
    isSynced: !!state.data?.synced,
    isWalletSynced: !!(
      state.data?.synced &&
      walletScanHeight &&
      walletScanHeight >= nodeBlockHeight - 1
    ),
    blockHeight: state.data?.synced ? nodeBlockHeight : estimatedBlockHeight,
    nodeBlockHeight,
    estimatedBlockHeight,
    walletScanHeight,
    syncPercent,
    walletScanPercent,
    moreThan100BlocksToSync,
  }
}
