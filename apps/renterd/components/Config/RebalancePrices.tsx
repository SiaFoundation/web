import { useMemo } from 'react'
import { Scales16 } from '@siafoundation/react-icons'
import { useConfig } from '../../contexts/config'
import {
  Button,
  formSetFields,
  Maybe,
  Text,
  Tooltip,
} from '@siafoundation/design-system'
import { InputValues } from '../../contexts/config/types'
import BigNumber from 'bignumber.js'
import { derivePricingFromSpendingEstimate } from '../../contexts/config/spending'
import {
  maxPricingFactor,
  storageWeight,
  downloadWeight,
  uploadWeight,
} from '../../contexts/config/spendingConfig'
import { useRedundancyMultiplier } from '../../contexts/config/useRedundancyMultiplier'
import { useFormExchangeRate } from '../../contexts/config/useFormExchangeRate'
import { useSpendingEstimate } from '../../contexts/config/useSpendingEstimate'
import { useEnabledPricingValuesInSiacoin } from '../../contexts/config/useEnabledPricingValuesInSiacoin'

export function RebalancePrices({
  estimatedSpendingPerMonth,
}: {
  estimatedSpendingPerMonth: Maybe<BigNumber>
}) {
  const { form, fields } = useConfig()
  const enabledDerivedPrices = useSpendingDerivedPricingFromEnabledFields({
    estimatedSpendingPerMonth,
  })
  const isEnabled = useIsEnabledAndDifferentEnough()

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-1 p-1">
          <Text size="14" weight="medium">
            Rebalance prices
          </Text>
          <Text size="14" color="subtle">
            Update max prices for storage, upload, and download to suggested
            values that take into account the current estimated usage values and
            fit the current estimated spending value. The suggested values keep
            storage, upload, and download prices proportional to each other
            according to the following weights: {storageWeight}x storage,{' '}
            {uploadWeight}x upload, {downloadWeight}x download. These weights
            model a recommended pricing ratio across the categories.
          </Text>
        </div>
      }
    >
      <Button
        disabled={!isEnabled}
        aria-label="rebalance prices"
        onClick={() => {
          if (!enabledDerivedPrices) {
            return
          }
          formSetFields({
            form,
            fields,
            values: enabledDerivedPrices,
            options: true,
          })
        }}
      >
        <Scales16 />
      </Button>
    </Tooltip>
  )
}

// Convert the spending estimate to balanced pricing values. This method returns values for
// pinned or non-pinned values depending on which is enabled on a per-field basis.
function useSpendingDerivedPricingFromEnabledFields({
  estimatedSpendingPerMonth,
}: {
  estimatedSpendingPerMonth?: BigNumber
}): Maybe<{
  maxStoragePriceTBMonth?: BigNumber
  maxDownloadPriceTB?: BigNumber
  maxUploadPriceTB?: BigNumber
  maxStoragePriceTBMonthPinned?: BigNumber
  maxDownloadPriceTBPinned?: BigNumber
  maxUploadPriceTBPinned?: BigNumber
}> {
  const { form } = useConfig()
  const storageTB = form.watch('storageTB')
  const downloadTBMonth = form.watch('downloadTBMonth')
  const uploadTBMonth = form.watch('uploadTBMonth')
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards: form.watch('minShards'),
    totalShards: form.watch('totalShards'),
  })
  const { rate } = useFormExchangeRate(form)
  const values = useMemo(() => {
    const derivedPricing = derivePricingFromSpendingEstimate({
      estimatedSpendingPerMonth,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
      storageWeight,
      downloadWeight,
      uploadWeight,
    })
    if (!derivedPricing) {
      return undefined
    }
    // Convert derived siacoin prices to pinned fiat prices.
    const pinnedPricing = rate
      ? {
          maxStoragePriceTBMonthPinned:
            derivedPricing?.maxStoragePriceTBMonth.times(rate),
          maxDownloadPriceTBPinned:
            derivedPricing?.maxDownloadPriceTB.times(rate),
          maxUploadPriceTBPinned: derivedPricing?.maxUploadPriceTB.times(rate),
        }
      : undefined
    return {
      ...derivedPricing,
      ...pinnedPricing,
    }
  }, [
    estimatedSpendingPerMonth,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    rate,
  ])
  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')
  const results: Partial<InputValues> = {}
  if (!values) {
    return undefined
  }
  if (shouldPinMaxStoragePrice) {
    results.maxStoragePriceTBMonthPinned = values.maxStoragePriceTBMonthPinned
  } else {
    results.maxStoragePriceTBMonth = values.maxStoragePriceTBMonth
  }
  if (shouldPinMaxUploadPrice) {
    results.maxUploadPriceTBPinned = values.maxUploadPriceTBPinned
  } else {
    results.maxUploadPriceTB = values.maxUploadPriceTB
  }
  if (shouldPinMaxDownloadPrice) {
    results.maxDownloadPriceTBPinned = values.maxDownloadPriceTBPinned
  } else {
    results.maxDownloadPriceTB = values.maxDownloadPriceTB
  }
  return results
}

function useIsEnabledAndDifferentEnough() {
  const { form } = useConfig()
  const currentPrices = useEnabledPricingValuesInSiacoin({
    form,
  })
  const { estimatedSpendingPerMonth } = useSpendingEstimate()
  const storageTB = form.watch('storageTB')
  const downloadTBMonth = form.watch('downloadTBMonth')
  const uploadTBMonth = form.watch('uploadTBMonth')
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards: form.watch('minShards'),
    totalShards: form.watch('totalShards'),
  })
  const canCalculatePrices = useMemo(
    () => estimatedSpendingPerMonth?.gt(0),
    [estimatedSpendingPerMonth]
  )
  const differenceThreshold = 0.01
  // Calculate the difference between the current and optimal pricing values.
  // Return true if the difference is greater than 1% for any of the values.
  return useMemo(() => {
    if (!canCalculatePrices) {
      return new BigNumber(0)
    }
    const optimalPrices = derivePricingFromSpendingEstimate({
      estimatedSpendingPerMonth,
      maxPricingFactor,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
      storageWeight,
      downloadWeight,
      uploadWeight,
    })

    return (
      isPriceDifferenceGreaterThanThreshold(
        optimalPrices?.maxStoragePriceTBMonth,
        currentPrices?.maxStoragePriceTBMonth,
        differenceThreshold
      ) ||
      isPriceDifferenceGreaterThanThreshold(
        optimalPrices?.maxUploadPriceTB,
        currentPrices?.maxUploadPriceTB,
        differenceThreshold
      ) ||
      isPriceDifferenceGreaterThanThreshold(
        optimalPrices?.maxDownloadPriceTB,
        currentPrices?.maxDownloadPriceTB,
        differenceThreshold
      )
    )
  }, [
    canCalculatePrices,
    currentPrices,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    estimatedSpendingPerMonth,
  ])
}

function isPriceDifferenceGreaterThanThreshold(
  a: BigNumber = new BigNumber(0),
  b: BigNumber = new BigNumber(0),
  threshold: number
) {
  if (a.eq(0) || b.eq(0)) {
    return new BigNumber(100)
  }
  return a.minus(b).div(a).abs().gt(threshold)
}
