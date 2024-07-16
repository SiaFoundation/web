import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'
import { TBToBytes, monthsToBlocks, toSiacoins } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'

export function useAverages() {
  const averages = useSiaCentralHostsNetworkAverages({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const storageAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.storage_price) // bytes/block
              .times(monthsToBlocks(1)) // bytes/month
              .times(TBToBytes(1)) // TB/month
              .toFixed(0),
          )
        : undefined,
    [averages.data],
  )
  const uploadAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.upload_price) // bytes
              .times(TBToBytes(1)) // TB
              .toFixed(0),
          )
        : undefined,
    [averages.data],
  )
  const downloadAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.download_price) // bytes
              .times(TBToBytes(1)) // TB
              .toFixed(0),
          )
        : undefined,
    [averages.data],
  )

  const contractAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.contract_price).toFixed(0),
          )
        : undefined,
    [averages.data],
  )

  return {
    averages,
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
  }
}
