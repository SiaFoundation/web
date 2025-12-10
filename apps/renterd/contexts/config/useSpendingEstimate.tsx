import { useConfig } from '.'
import { useMemo } from 'react'
import { useWatch } from 'react-hook-form'
import { Maybe } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import { useRedundancyMultiplier } from './useRedundancyMultiplier'
import { calculateSpendingEstimate } from './spending'
import { useEnabledPricingValuesInSiacoin } from './useEnabledPricingValuesInSiacoin'

export function useSpendingEstimate() {
  const { form } = useConfig()
  const estimatedSpendingPerMonth =
    useSpendingEstimateFromEnabledPricingValues()
  const storageTB = useWatch({ control: form.control, name: 'storageTB' })

  const estimatedSpendingPerTB: Maybe<BigNumber> = useMemo(() => {
    if (!estimatedSpendingPerMonth?.gt(0) || !storageTB?.gt(0)) {
      return undefined
    }
    const totalCostPerMonthTB = estimatedSpendingPerMonth.div(storageTB)
    return totalCostPerMonthTB
  }, [estimatedSpendingPerMonth, storageTB])

  return {
    estimatedSpendingPerMonth,
    estimatedSpendingPerTB,
  }
}

// Use the current enabled pricing values to calculate the estimated spending in siacoin.
function useSpendingEstimateFromEnabledPricingValues(): Maybe<BigNumber> {
  const { form } = useConfig()
  const minShards = useWatch({ control: form.control, name: 'minShards' })
  const totalShards = useWatch({ control: form.control, name: 'totalShards' })
  const storageTB = useWatch({ control: form.control, name: 'storageTB' })
  const downloadTBMonth = useWatch({
    control: form.control,
    name: 'downloadTBMonth',
  })
  const uploadTBMonth = useWatch({
    control: form.control,
    name: 'uploadTBMonth',
  })
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards,
    totalShards,
  })
  const prices = useEnabledPricingValuesInSiacoin({
    form,
  })

  return useMemo(() => {
    if (!prices) {
      return undefined
    }
    const { maxStoragePriceTBMonth, maxUploadPriceTB, maxDownloadPriceTB } =
      prices

    return calculateSpendingEstimate({
      maxStoragePriceTBMonth,
      maxDownloadPriceTB,
      maxUploadPriceTB,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    })
  }, [prices, storageTB, downloadTBMonth, uploadTBMonth, redundancyMultiplier])
}
