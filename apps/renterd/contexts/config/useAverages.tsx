import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
  valuePerOneToPerMillion,
} from '@siafoundation/units'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'
import { useForexExchangeRate } from './useAllowanceDerivedPricing'
import { UseFormReturn } from 'react-hook-form'
import { SettingsData } from './types'

export function useAverages({ form }: { form: UseFormReturn<SettingsData> }) {
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
            valuePerBytePerBlockToPerTBPerMonth(
              toSiacoins(averages.data.settings.storage_price)
            ).toFixed(0)
          )
        : undefined,
    [averages.data]
  )
  const uploadAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(averages.data.settings.upload_price)
            ).toFixed(0)
          )
        : undefined,
    [averages.data]
  )
  const downloadAverage = useMemo(
    () =>
      averages.data
        ? new BigNumber(
            valuePerByteToPerTB(
              toSiacoins(averages.data.settings.download_price)
            ).toFixed(0)
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

  const rpcAverage = useMemo(
    () =>
      averages.data
        ? valuePerOneToPerMillion(
            toSiacoins(averages.data.settings.base_rpc_price)
          )
        : undefined,
    [averages.data]
  )

  const exchangeRate = useForexExchangeRate({
    form,
  })
  const averagesSc = useMemo(() => {
    if (!averages.data) {
      return null
    }
    return {
      storageAverage,
      uploadAverage,
      downloadAverage,
      contractAverage,
      rpcAverage,
    }
  }, [
    averages.data,
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
    rpcAverage,
  ])

  const averagesFiat = useMemo(() => {
    if (!averages.data || !exchangeRate) {
      return null
    }
    return {
      storageAverage: storageAverage.times(exchangeRate),
      uploadAverage: uploadAverage.times(exchangeRate),
      downloadAverage: downloadAverage.times(exchangeRate),
      contractAverage: contractAverage.times(exchangeRate),
      rpcAverage: rpcAverage.times(exchangeRate),
    }
  }, [
    averages.data,
    exchangeRate,
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
    rpcAverage,
  ])

  return {
    averagesSc,
    averagesFiat,
  }
}
