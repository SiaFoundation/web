import { useMemo } from 'react'
import { defaultValues } from './types'
import { getRedundancyMultiplier } from './transform'
import { useForm as useHookForm } from 'react-hook-form'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues,
  })
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const maxDownloadPriceTB = form.watch('maxDownloadPriceTB')
  const maxUploadPriceTB = form.watch('maxUploadPriceTB')
  const storageTB = form.watch('storageTB')
  const downloadTBMonth = form.watch('downloadTBMonth')
  const uploadTBMonth = form.watch('uploadTBMonth')
  const minShards = form.watch('minShards')
  const totalShards = form.watch('totalShards')
  const includeRedundancyMaxStoragePrice = form.watch(
    'includeRedundancyMaxStoragePrice'
  )
  const includeRedundancyMaxUploadPrice = form.watch(
    'includeRedundancyMaxUploadPrice'
  )
  const redundancyMultiplier = useMemo(
    () => getRedundancyMultiplier(minShards, totalShards),
    [minShards, totalShards]
  )

  return {
    form,
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    minShards,
    totalShards,
    includeRedundancyMaxStoragePrice,
    includeRedundancyMaxUploadPrice,
    redundancyMultiplier,
  }
}
