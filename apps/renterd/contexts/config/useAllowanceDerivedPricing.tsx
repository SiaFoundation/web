import { useMemo } from 'react'
import { SettingsData } from './types'
import { UseFormReturn } from 'react-hook-form'
import BigNumber from 'bignumber.js'
import useSWR from 'swr'
import axios from 'axios'
import {
  calculateIdealAllowance,
  derivePricingFromAllowance,
} from './deriveAllowance'
import { useApp } from '../app'
import { useRedundancyMultiplier } from './useRedundancyMultiplier'
import {
  allowanceFactor,
  downloadWeight,
  storageWeight,
  uploadWeight,
} from './deriveAllowanceConfig'
import {
  fiatToSiacoin,
  siacoinToFiat,
  minutesInMilliseconds,
} from '@siafoundation/units'

export function useForexExchangeRate({
  form,
}: {
  form: UseFormReturn<SettingsData>
}) {
  const pinnedCurrency = form.watch('pinnedCurrency')
  const forexEndpointURL = form.watch('forexEndpointURL')
  const forex = useSWR(
    forexEndpointURL && pinnedCurrency
      ? ['pricePinningExchangeRate', forexEndpointURL, pinnedCurrency]
      : null,
    async () => {
      const response = await axios.get(`${forexEndpointURL}/${pinnedCurrency}`)
      return response.data
    },
    {
      refreshInterval: minutesInMilliseconds(5),
      dedupingInterval: 10_000,
    }
  )
  const rate = forex.data
  return useMemo(
    () => (rate && typeof rate === 'number' ? new BigNumber(rate) : undefined),
    [rate]
  )
}

// Convert the allowance to pricing values. This method returns values for
// pinned or non-pinned values depending on which is enabled on a per-field basis.
export function useAllowanceDerivedPricingForEnabledFields({
  form,
}: {
  form: UseFormReturn<SettingsData>
}): {
  maxStoragePriceTBMonth?: BigNumber
  maxDownloadPriceTB?: BigNumber
  maxUploadPriceTB?: BigNumber
  maxStoragePriceTBMonthPinned?: BigNumber
  maxDownloadPriceTBPinned?: BigNumber
  maxUploadPriceTBPinned?: BigNumber
} | null {
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
  const exchangeRate = useForexExchangeRate({
    form,
  })

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
        return null
      }
      // Convert derived siacoin prices to pinned fiat prices.
      const pinnedPricing = exchangeRate
        ? {
            maxStoragePriceTBMonthPinned:
              derivedPricing?.maxStoragePriceTBMonth.times(exchangeRate),
            maxDownloadPriceTBPinned:
              derivedPricing?.maxDownloadPriceTB.times(exchangeRate),
            maxUploadPriceTBPinned:
              derivedPricing?.maxUploadPriceTB.times(exchangeRate),
          }
        : {}
      return {
        ...derivedPricing,
        ...pinnedPricing,
      }
    }
    return null
  }, [
    isAutopilotEnabled,
    allowanceMonth,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    redundancyMultiplier,
    exchangeRate,
  ])

  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')

  const results: Partial<SettingsData> = {}

  if (!values) {
    return null
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
  form: UseFormReturn<SettingsData>
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
  const exchangeRate = useForexExchangeRate({
    form,
  })

  const needsExchangeRate =
    shouldPinMaxStoragePrice ||
    shouldPinMaxDownloadPrice ||
    shouldPinMaxUploadPrice

  if (needsExchangeRate && !exchangeRate) {
    return null
  }

  if (shouldPinMaxStoragePrice && !maxStoragePriceTBMonthPinned) {
    return null
  }

  if (shouldPinMaxDownloadPrice && !maxDownloadPriceTBPinned) {
    return null
  }

  if (shouldPinMaxUploadPrice && !maxUploadPriceTBPinned) {
    return null
  }

  return {
    maxStoragePriceTBMonth: shouldPinMaxStoragePrice
      ? fiatToSiacoin(maxStoragePriceTBMonthPinned, exchangeRate)
      : maxStoragePriceTBMonth,
    maxDownloadPriceTB: shouldPinMaxDownloadPrice
      ? fiatToSiacoin(maxDownloadPriceTBPinned, exchangeRate)
      : maxDownloadPriceTB,
    maxUploadPriceTB: shouldPinMaxUploadPrice
      ? fiatToSiacoin(maxUploadPriceTBPinned, exchangeRate)
      : maxUploadPriceTB,
  }
}

// Use the current pricing values to calculate the ideal allowance and return
// it as either allowanceMonth or allowanceMonthPinned depending on which is enabled.
export function useEnabledAllowanceFromEnabledPricingValues({
  form,
}: {
  form: UseFormReturn<SettingsData>
}): {
  allowanceMonth?: BigNumber
  allowanceMonthPinned?: BigNumber
} | null {
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
  const exchangeRate = useForexExchangeRate({
    form,
  })

  if (!prices) {
    return null
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

  const results: Partial<SettingsData> = {}

  if (!allowance) {
    return null
  }

  if (shouldPinAllowance) {
    if (!exchangeRate) {
      return null
    }
    results.allowanceMonthPinned = allowance.times(exchangeRate)
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
  form: UseFormReturn<SettingsData>
}): BigNumber | null {
  const shouldPinAllowance = form.watch('shouldPinAllowance')
  const allowanceMonth = form.watch('allowanceMonth')
  const allowanceMonthPinned = form.watch('allowanceMonthPinned')
  const exchangeRate = useForexExchangeRate({
    form,
  })
  const needsExchangeRate = shouldPinAllowance
  if (needsExchangeRate && !exchangeRate) {
    return null
  }

  return shouldPinAllowance
    ? allowanceMonthPinned?.div(exchangeRate)
    : allowanceMonth
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
    return null
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
