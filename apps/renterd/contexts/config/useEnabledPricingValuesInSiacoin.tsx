import { fiatToSiacoin } from '@siafoundation/units'
import { useMemo } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { InputValues } from './types'
import { useFormExchangeRate } from './useFormExchangeRate'

// Return each pricing value as siacoin. The siacoin value is converted from the
// pinned or non-pinned value depending on which is enabled on a per-field basis.
export function useEnabledPricingValuesInSiacoin({
  form,
}: {
  form: UseFormReturn<InputValues>
}) {
  const shouldPinMaxStoragePrice = form.watch('shouldPinMaxStoragePrice')
  const shouldPinMaxDownloadPrice = form.watch('shouldPinMaxDownloadPrice')
  const shouldPinMaxUploadPrice = form.watch('shouldPinMaxUploadPrice')
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

  return useMemo(() => {
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
  }, [
    needsExchangeRate,
    rate,
    shouldPinMaxStoragePrice,
    maxStoragePriceTBMonthPinned,
    shouldPinMaxDownloadPrice,
    maxDownloadPriceTBPinned,
    shouldPinMaxUploadPrice,
    maxUploadPriceTBPinned,
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
  ])
}
