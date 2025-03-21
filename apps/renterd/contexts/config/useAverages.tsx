import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
} from '@siafoundation/units'
import { useExternalHostMetrics } from '@siafoundation/design-system'

export function useAverages() {
  const explorerAverages = useExternalHostMetrics({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const storageAverage = useMemo(
    () =>
      explorerAverages.data
        ? new BigNumber(
            valuePerBytePerBlockToPerTBPerMonth(
              toSiacoins(explorerAverages.data.v2Settings.prices.storagePrice)
            ).toFixed(0)
          )
        : undefined,
    [explorerAverages.data]
  )
  const uploadAverage = useMemo(
    () =>
      explorerAverages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(explorerAverages.data.v2Settings.prices.ingressPrice)
            ).toFixed(0)
          )
        : undefined,
    [explorerAverages.data]
  )
  const downloadAverage = useMemo(
    () =>
      explorerAverages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(explorerAverages.data.v2Settings.prices.egressPrice)
            ).toFixed(0)
          )
        : undefined,
    [explorerAverages.data]
  )

  const averages = useMemo(() => {
    if (!storageAverage || !uploadAverage || !downloadAverage) {
      return {}
    }
    return {
      storageAverage,
      uploadAverage,
      downloadAverage,
    }
  }, [storageAverage, uploadAverage, downloadAverage])

  return averages
}
