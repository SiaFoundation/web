import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { monthsToBlocks, TBToBytes, toSiacoins } from '@siafoundation/units'
import { getRedundancyMultiplierIfIncluded } from './transform'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-sia-central'

export function useAverages({
  minShards,
  totalShards,
  includeRedundancyMaxStoragePrice,
  includeRedundancyMaxUploadPrice,
}: {
  minShards: BigNumber
  totalShards: BigNumber
  includeRedundancyMaxStoragePrice: boolean
  includeRedundancyMaxUploadPrice: boolean
}) {
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
              .times(
                getRedundancyMultiplierIfIncluded(
                  minShards,
                  totalShards,
                  includeRedundancyMaxStoragePrice
                )
              ) // redundancy
              .toFixed(0)
          )
        : undefined,
    [averages.data, minShards, totalShards, includeRedundancyMaxStoragePrice]
  )
  const uploadAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.upload_price) // bytes
              .times(TBToBytes(1)) // TB
              .times(
                getRedundancyMultiplierIfIncluded(
                  minShards,
                  totalShards,
                  includeRedundancyMaxUploadPrice
                )
              ) // redundancy
              .toFixed(0)
          )
        : undefined,
    [averages.data, minShards, totalShards, includeRedundancyMaxUploadPrice]
  )
  const downloadAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.download_price) // bytes
              .times(TBToBytes(1)) // TB
              .toFixed(0)
          )
        : undefined,
    [averages.data]
  )

  const contractAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            toSiacoins(averages.data.settings.contract_price).toFixed(0)
          )
        : undefined,
    [averages.data]
  )

  return {
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
  }
}
