import { useMemo } from 'react'
import { defaultValues, getAdvancedDefaults } from './types'
import { getRedundancyMultiplier } from './transform'
import { useForm as useHookForm } from 'react-hook-form'
import { useAverages } from './useAverages'
import { useBusState } from '@siafoundation/renterd-react'
import { getFields } from './fields'
import { useApp } from '../app'
import useLocalStorageState from 'use-local-storage-state'

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
  const redundancyMultiplier = useMemo(
    () => getRedundancyMultiplier(minShards, totalShards),
    [minShards, totalShards]
  )

  const {
    averages,
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
  } = useAverages()

  const app = useApp()
  const isAutopilotEnabled = app.autopilot.status === 'on'
  const [showAdvanced, setShowAdvanced] = useLocalStorageState<boolean>(
    'v0/config/showAdvanced',
    {
      defaultValue: false,
    }
  )

  const renterdState = useBusState()
  const fields = useMemo(() => {
    const advancedDefaults = renterdState.data
      ? getAdvancedDefaults(renterdState.data.network)
      : undefined
    if (averages.data) {
      return getFields({
        advancedDefaults,
        isAutopilotEnabled,
        showAdvanced,
        maxStoragePriceTBMonth,
        maxUploadPriceTB,
        redundancyMultiplier,
        storageAverage,
        uploadAverage,
        downloadAverage,
        contractAverage,
        minShards,
        totalShards,
      })
    }
    return getFields({
      advancedDefaults,
      isAutopilotEnabled,
      showAdvanced,
      maxStoragePriceTBMonth,
      maxUploadPriceTB,
      redundancyMultiplier,
      minShards,
      totalShards,
    })
  }, [
    renterdState.data,
    isAutopilotEnabled,
    showAdvanced,
    averages.data,
    storageAverage,
    uploadAverage,
    downloadAverage,
    contractAverage,
    redundancyMultiplier,
    maxStoragePriceTBMonth,
    maxUploadPriceTB,
    minShards,
    totalShards,
  ])

  return {
    form,
    fields,
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    minShards,
    totalShards,
    redundancyMultiplier,
    showAdvanced,
    setShowAdvanced,
  }
}
