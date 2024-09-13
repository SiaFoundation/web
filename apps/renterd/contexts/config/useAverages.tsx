import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import {
  valuePerBytePerBlockToPerTBPerMonth,
  toSiacoins,
  valuePerByteToPerTB,
  valuePerOneToPerMillion,
} from '@siafoundation/units'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'
import { UseFormReturn } from 'react-hook-form'
import { SettingsData } from './types'
import { useFormExchangeRate } from './useFormExchangeRate'

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

  const { rate } = useFormExchangeRate(form)
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
    if (!averages.data || !rate) {
      return null
    }
    return {
      storageAverage: storageAverage.times(rate),
      uploadAverage: uploadAverage.times(rate),
      downloadAverage: downloadAverage.times(rate),
      contractAverage: contractAverage.times(rate),
      rpcAverage: rpcAverage.times(rate),
    }
  }, [
    averages.data,
    rate,
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
