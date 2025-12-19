import { secondsInMilliseconds } from '@siafoundation/units'
import { useAppSettings } from '@siafoundation/react-core'
import {
  useConsensusState,
  useEstimatedNetworkBlockHeight,
  useWallet,
} from '@siafoundation/renterd-react'

export function useSyncStatus() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()
  const state = useConsensusState({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.synced ? secondsInMilliseconds(60) : secondsInMilliseconds(10),
      },
    },
  })
  const estimatedBlockHeight = useEstimatedNetworkBlockHeight()
  const nodeBlockHeight = state.data ? state.data?.blockHeight : 0
  const wallet = useWallet({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.scanHeight && data.scanHeight >= nodeBlockHeight
            ? secondsInMilliseconds(60)
            : secondsInMilliseconds(10),
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

  return {
    isSynced: !!state.data?.synced,
    isWalletSynced: !!(
      state.data?.synced &&
      wallet.data?.scanHeight &&
      wallet.data.scanHeight >= nodeBlockHeight - 1
    ),
    nodeBlockHeight,
    estimatedBlockHeight,
    syncPercent,
    walletScanPercent,
    moreThan100BlocksToSync,
  }
}
