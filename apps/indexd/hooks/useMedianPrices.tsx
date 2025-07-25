import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
} from '@siafoundation/units'
import { useDaemonExplorerHostMetrics } from '@siafoundation/design-system'

export function useMedianPrices() {
  const explorerMedians = useDaemonExplorerHostMetrics({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })

  const storagePrice = explorerMedians.data?.v2Settings.prices.storagePrice
  const ingressPrice = explorerMedians.data?.v2Settings.prices.ingressPrice
  const egressPrice = explorerMedians.data?.v2Settings.prices.egressPrice

  const storageMedian = useMemo(
    () =>
      storagePrice
        ? new BigNumber(
            valuePerBytePerBlockToPerTBPerMonth(
              toSiacoins(storagePrice)
            ).toFixed(0)
          )
        : undefined,
    [storagePrice]
  )
  const ingressMedian = useMemo(
    () =>
      ingressPrice
        ? new BigNumber(
            valuePerByteToPerTB(toSiacoins(ingressPrice)).toFixed(0)
          )
        : undefined,
    [ingressPrice]
  )
  const egressMedian = useMemo(
    () =>
      egressPrice
        ? new BigNumber(valuePerByteToPerTB(toSiacoins(egressPrice)).toFixed(0))
        : undefined,
    [egressPrice]
  )

  const medians = useMemo(() => {
    if (!storageMedian || !ingressMedian || !egressMedian) {
      return {}
    }
    return {
      storageMedian,
      ingressMedian,
      egressMedian,
    }
  }, [storageMedian, ingressMedian, egressMedian])

  return medians
}
