import { useAppSettings } from '@siafoundation/react-core'
import {
  useEstimatedNetworkBlockHeight,
  useConsensusTipState,
  useIndexTip,
} from '@siafoundation/hostd-react'
import { hoursInMilliseconds } from '@siafoundation/design-system'

export function useSyncStatus() {
  const { isUnlockedAndAuthedRoute } = useAppSettings()

  const state = useConsensusTipState({
    config: {
      swr: {
        refreshInterval: (data) => (getIsSynced(data) ? 60_000 : 10_000),
      },
    },
  })
  const isSynced = getIsSynced(state.data)
  const estimatedBlockHeight = useEstimatedNetworkBlockHeight()
  const nodeBlockHeight = state.data ? state.data?.index.height : 0
  const scan = useIndexTip({
    config: {
      swr: {
        refreshInterval: (data) =>
          data?.height >= nodeBlockHeight ? 60_000 : 10_000,
      },
    },
  })

  const syncPercent =
    isUnlockedAndAuthedRoute && nodeBlockHeight && estimatedBlockHeight
      ? Number(
          (Math.min(nodeBlockHeight / estimatedBlockHeight, 1) * 100).toFixed(1)
        )
      : 0

  const walletScanPercent =
    isUnlockedAndAuthedRoute && nodeBlockHeight && scan.data
      ? Number(
          (Math.min(scan.data.height / estimatedBlockHeight, 1) * 100).toFixed(
            1
          )
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
    isSynced,
    isWalletSynced: isSynced && scan.data?.height >= nodeBlockHeight - 1,
    nodeBlockHeight,
    estimatedBlockHeight,
    syncPercent,
    walletScanPercent,
    moreThan100BlocksToSync,
    firstTimeSyncing,
  }
}

function getIsSynced(data?: { prevTimestamps: string[] }) {
  // Last block is greater than 12 hours ago
  return data?.prevTimestamps[0]
    ? new Date(data?.prevTimestamps[0]).getTime() >
        Date.now() - hoursInMilliseconds(12)
    : false
}
