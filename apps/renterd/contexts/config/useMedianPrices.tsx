import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
} from '@siafoundation/units'
import { useConsensusState } from '@siafoundation/renterd-react'
import {
  useDaemonExplorerConsensusNetwork,
  useDaemonExplorerHostMetrics,
} from '@siafoundation/design-system'

export function useMedianPrices() {
  const nodeState = useConsensusState()
  // renterd does not have an endpoint that returns the full consensus state
  // so we use the explorer api to get the v2 allow height.
  const explorerState = useDaemonExplorerConsensusNetwork({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const nodeHeight = nodeState.data?.blockHeight
  const networkV2AllowHeight = explorerState.data?.hardforkV2.allowHeight
  const isV2Allowed =
    nodeHeight && networkV2AllowHeight
      ? nodeHeight >= networkV2AllowHeight
      : true // Default to v2

  const explorerHostMetrics = useDaemonExplorerHostMetrics({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const storagePrice = isV2Allowed
    ? explorerHostMetrics.data?.v2Settings.prices.storagePrice
    : explorerHostMetrics.data?.settings.storageprice
  const uploadPrice = isV2Allowed
    ? explorerHostMetrics.data?.v2Settings.prices.ingressPrice
    : explorerHostMetrics.data?.settings.uploadbandwidthprice
  const downloadPrice = isV2Allowed
    ? explorerHostMetrics.data?.v2Settings.prices.egressPrice
    : explorerHostMetrics.data?.settings.downloadbandwidthprice

  const storageMedian = useMemo(
    () =>
      storagePrice
        ? new BigNumber(
            valuePerBytePerBlockToPerTBPerMonth(
              toSiacoins(storagePrice),
            ).toFixed(0),
          )
        : undefined,
    [storagePrice],
  )
  const uploadMedian = useMemo(
    () =>
      uploadPrice
        ? new BigNumber(valuePerByteToPerTB(toSiacoins(uploadPrice)).toFixed(0))
        : undefined,
    [uploadPrice],
  )
  const downloadMedian = useMemo(
    () =>
      downloadPrice
        ? new BigNumber(
            valuePerByteToPerTB(toSiacoins(downloadPrice)).toFixed(0),
          )
        : undefined,
    [downloadPrice],
  )

  const medians = useMemo(() => {
    if (!storageMedian || !uploadMedian || !downloadMedian) {
      return {}
    }
    return {
      storageMedian,
      uploadMedian,
      downloadMedian,
    }
  }, [storageMedian, uploadMedian, downloadMedian])

  return medians
}
