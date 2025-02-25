import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
  valuePerOneToPerMillion,
} from '@siafoundation/units'
import { useExternalHostMetrics } from '@siafoundation/design-system'

export function useAverages() {
  const siascanAverages = useExternalHostMetrics({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const storageAverage = useMemo(
    () =>
      siascanAverages.data
        ? new BigNumber(
            valuePerBytePerBlockToPerTBPerMonth(
              toSiacoins(siascanAverages.data.settings.storageprice)
            ).toFixed(0)
          )
        : undefined,
    [siascanAverages.data]
  )
  const uploadAverage = useMemo(
    () =>
      siascanAverages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(siascanAverages.data.settings.uploadbandwidthprice)
            ).toFixed(0)
          )
        : undefined,
    [siascanAverages.data]
  )
  const downloadAverage = useMemo(
    () =>
      siascanAverages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(siascanAverages.data.settings.downloadbandwidthprice)
            ).toFixed(0)
          )
        : undefined,
    [siascanAverages.data]
  )

  const contractAverage = useMemo(
    () =>
      siascanAverages.data
        ? new BigNumber(
            toSiacoins(siascanAverages.data.settings.contractprice).toFixed(0)
          )
        : undefined,
    [siascanAverages.data]
  )

  const rpcAverage = useMemo(
    () =>
      siascanAverages.data
        ? valuePerOneToPerMillion(
            toSiacoins(siascanAverages.data.settings.baserpcprice)
          )
        : undefined,
    [siascanAverages.data]
  )

  const averages = useMemo(() => {
    if (
      !storageAverage ||
      !uploadAverage ||
      !downloadAverage ||
      !contractAverage ||
      !rpcAverage
    ) {
      return {}
    }
    return {
      storageAverage,
      uploadAverage,
      downloadAverage,
      contractAverage,
      rpcAverage,
    }
  }, [
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
    rpcAverage,
  ])

  return averages
}
