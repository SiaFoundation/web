import { fiatToSiacoin } from '@siafoundation/units'
import { useMemo } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { InputValues } from './types'
import { useFormExchangeRate } from './useFormExchangeRate'

// Return each pricing value as siacoin. The siacoin value is converted from the
// pinned or non-pinned value depending on which is enabled on a per-field basis.
export function useEnabledPricingValuesInSiacoin({
  form,
}: {
  form: UseFormReturn<InputValues>
}) {
  const shouldPinMaxStoragePrice = useWatch({
    control: form.control,
    name: 'shouldPinMaxStoragePrice',
  })
  const shouldPinMaxDownloadPrice = useWatch({
    control: form.control,
    name: 'shouldPinMaxDownloadPrice',
  })
  const shouldPinMaxUploadPrice = useWatch({
    control: form.control,
    name: 'shouldPinMaxUploadPrice',
  })
  const maxStoragePriceTBMonth = useWatch({
    control: form.control,
    name: 'maxStoragePriceTBMonth',
  })
  const maxStoragePriceTBMonthPinned = useWatch({
    control: form.control,
    name: 'maxStoragePriceTBMonthPinned',
  })
  const maxDownloadPriceTB = useWatch({
    control: form.control,
    name: 'maxDownloadPriceTB',
  })
  const maxDownloadPriceTBPinned = useWatch({
    control: form.control,
    name: 'maxDownloadPriceTBPinned',
  })
  const maxUploadPriceTB = useWatch({
    control: form.control,
    name: 'maxUploadPriceTB',
  })
  const maxUploadPriceTBPinned = useWatch({
    control: form.control,
    name: 'maxUploadPriceTBPinned',
  })
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
