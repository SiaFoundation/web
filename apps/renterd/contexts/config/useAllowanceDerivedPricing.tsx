import { fiatToSiacoin, siacoinToFiat } from '@siafoundation/units'
import BigNumber from 'bignumber.js'
import { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useApp } from '../app'
import {
  calculateIdealAllowance,
  derivePricingFromAllowance,
} from './deriveAllowance'
import {
  allowanceFactor,
  downloadWeight,
  storageWeight,
  uploadWeight,
} from './deriveAllowanceConfig'
import { InputValues } from './types'
import { useFormExchangeRate } from './useFormExchangeRate'
import { useRedundancyMultiplier } from './useRedundancyMultiplier'
import { Maybe } from '@siafoundation/design-system'

// Convert the allowance to pricing values. This method returns values for
// pinned or non-pinned values depending on which is enabled on a per-field basis.
export function useAllowanceDerivedPricingForEnabledFields({
  form,
}: {
  form: UseFormReturn<InputValues>
}): Maybe<{
  maxStoragePriceTBMonth?: BigNumber
  maxDownloadPriceTB?: BigNumber
  maxUploadPriceTB?: BigNumber
  maxStoragePriceTBMonthPinned?: BigNumber
  maxDownloadPriceTBPinned?: BigNumber
  maxUploadPriceTBPinned?: BigNumber
}> {
  const { isAutopilotEnabled } = useApp()
  const allowanceMonth = useEnabledAllowanceInSiacoin({
    form,
  })
  const storageTB = form.watch('storageTB')
  const downloadTBMonth = form.watch('downloadTBMonth')
  const uploadTBMonth = form.watch('uploadTBMonth')
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards: form.watch('minShards'),
    totalShards: form.watch('totalShards'),
  })
  const { rate } = useFormExchangeRate(form)

  const values = useMemo(() => {
    if (isAutopilotEnabled) {
      const derivedPricing = derivePricingFromAllowance({
        allowanceMonth,
        allowanceFactor,
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
            maxUploadPriceTBPinned:
              derivedPricing?.maxUploadPriceTB.times(rate),
          }
        : undefined
      return {
        ...derivedPricing,
        ...pinnedPricing,
      }
    }
    return undefined
  }, [
    isAutopilotEnabled,
    allowanceMonth,
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

// Return each pricing value as siacoin. The siacoin value is converted from the
// pinned or non-pinned value depending on which is enabled on a per-field basis.
export function useEnabledPricingValuesInSiacoin({
  form,
}: {
  form: UseFormReturn<InputValues>
}) {
  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const maxStoragePriceTBMonthPinned = form.watch(
    'maxStoragePriceTBMonthPinned'
  )
  const maxDownloadPriceTB = form.watch('maxDownloadPriceTB')
  const maxDownloadPriceTBPinned = form.watch('maxDownloadPriceTBPinned')
  const maxUploadPriceTB = form.watch('maxUploadPriceTB')
  const maxUploadPriceTBPinned = form.watch('maxUploadPriceTBPinned')
  const { rate } = useFormExchangeRate(form)

  const needsExchangeRate =
    shouldPinMaxStoragePrice ||
    shouldPinMaxDownloadPrice ||
    shouldPinMaxUploadPrice

  if (needsExchangeRate && !rate) {
    return undefined
  }

  if (shouldPinMaxStoragePrice && !maxStoragePriceTBMonthPinned) {
    return undefined
  }

  if (shouldPinMaxDownloadPrice && !maxDownloadPriceTBPinned) {
    return undefined
  }

  if (shouldPinMaxUploadPrice && !maxUploadPriceTBPinned) {
    return undefined
  }

  return {
    maxStoragePriceTBMonth:
      shouldPinMaxStoragePrice && maxStoragePriceTBMonthPinned && rate
        ? fiatToSiacoin(maxStoragePriceTBMonthPinned, rate)
        : maxStoragePriceTBMonth,
    maxDownloadPriceTB:
      shouldPinMaxDownloadPrice && maxDownloadPriceTBPinned && rate
        ? fiatToSiacoin(maxDownloadPriceTBPinned, rate)
        : maxDownloadPriceTB,
    maxUploadPriceTB:
      shouldPinMaxUploadPrice && maxUploadPriceTBPinned && rate
        ? fiatToSiacoin(maxUploadPriceTBPinned, rate)
        : maxUploadPriceTB,
  }
}

// Use the current pricing values to calculate the ideal allowance and return
// it as either allowanceMonth or allowanceMonthPinned depending on which is enabled.
export function useEnabledAllowanceFromEnabledPricingValues({
  form,
}: {
  form: UseFormReturn<InputValues>
}):
  | {
      allowanceMonth?: BigNumber
      allowanceMonthPinned?: BigNumber
    }
  | undefined {
  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')
  const storageTB = form.watch('storageTB')
  const downloadTBMonth = form.watch('downloadTBMonth')
  const uploadTBMonth = form.watch('uploadTBMonth')
  const shouldPinAllowance = form.watch('shouldPinAllowance')
  const redundancyMultiplier = useRedundancyMultiplier({
    minShards,
    totalShards,
  })
  const prices = useEnabledPricingValuesInSiacoin({
    form,
  })
  const { rate } = useFormExchangeRate(form)

  if (!prices) {
    return undefined
  }

  const { maxStoragePriceTBMonth, maxUploadPriceTB, maxDownloadPriceTB } =
    prices
  const allowance = calculateIdealAllowance({
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
  })

  const results: Partial<InputValues> = {}

  if (!allowance) {
    return undefined
  }

  if (shouldPinAllowance) {
    if (!rate) {
      return undefined
    }
    results.allowanceMonthPinned = allowance.times(rate)
  } else {
    results.allowanceMonth = allowance
  }
  return results
}

// Returns the value of allowanceMonth or allowanceMonthPinned in siacoin,
// depending on which is enabled.
export function useEnabledAllowanceInSiacoin({
  form,
}: {
  form: UseFormReturn<InputValues>
}): Maybe<BigNumber> {
  const shouldPinAllowance = form.watch('shouldPinAllowance')
  const allowanceMonth = form.watch('allowanceMonth')
  const allowanceMonthPinned = form.watch('allowanceMonthPinned')
  const { rate } = useFormExchangeRate(form)
  const needsExchangeRate = shouldPinAllowance
  if (needsExchangeRate) {
    if (rate) {
      return allowanceMonthPinned?.div(rate)
    }
    return undefined
  }
  return allowanceMonth
}

export function pricesToPinnedPrices({
  exchangeRate,
  maxStoragePriceTBMonth,
  maxDownloadPriceTB,
  maxUploadPriceTB,
}: {
  exchangeRate?: BigNumber
  maxStoragePriceTBMonth: BigNumber
  maxDownloadPriceTB: BigNumber
  maxUploadPriceTB: BigNumber
}) {
  if (!exchangeRate) {
    return undefined
  }
  return {
    maxStoragePriceTBMonthPinned: siacoinToFiat(
      maxStoragePriceTBMonth,
      exchangeRate
    ),
    maxDownloadPriceTBPinned: siacoinToFiat(maxDownloadPriceTB, exchangeRate),
    maxUploadPriceTBPinned: siacoinToFiat(maxUploadPriceTB, exchangeRate),
  }
}
