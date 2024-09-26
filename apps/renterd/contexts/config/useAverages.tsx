import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
  valuePerOneToPerMillion,
} from '@siafoundation/units'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'

export function useAverages() {
  const siaCentralAverages = useSiaCentralHostsNetworkAverages({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const storageAverage = useMemo(
    () =>
      siaCentralAverages.data
        ? new BigNumber(
            valuePerBytePerBlockToPerTBPerMonth(
              toSiacoins(siaCentralAverages.data.settings.storage_price)
            ).toFixed(0)
          )
        : undefined,
    [siaCentralAverages.data]
  )
  const uploadAverage = useMemo(
    () =>
      siaCentralAverages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(siaCentralAverages.data.settings.upload_price)
            ).toFixed(0)
          )
        : undefined,
    [siaCentralAverages.data]
  )
  const downloadAverage = useMemo(
    () =>
      siaCentralAverages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(siaCentralAverages.data.settings.download_price)
            ).toFixed(0)
          )
        : undefined,
    [siaCentralAverages.data]
  )

  const contractAverage = useMemo(
    () =>
      siaCentralAverages.data
        ? new BigNumber(
            toSiacoins(siaCentralAverages.data.settings.contract_price).toFixed(
              0
            )
          )
        : undefined,
    [siaCentralAverages.data]
  )

  const rpcAverage = useMemo(
    () =>
      siaCentralAverages.data
        ? valuePerOneToPerMillion(
            toSiacoins(siaCentralAverages.data.settings.base_rpc_price)
          )
        : undefined,
    [siaCentralAverages.data]
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
