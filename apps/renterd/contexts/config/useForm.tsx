import { useEffect, useMemo, useRef } from 'react'
import { ConfigViewMode, defaultValues, getAdvancedDefaults } from './types'
import { getRedundancyMultiplier } from './utils'
import { useForm as useHookForm } from 'react-hook-form'
import { useAverages } from './useAverages'
import { useBusState } from '@siafoundation/renterd-react'
import { getFields } from './fields'
import { useApp } from '../app'
import useLocalStorageState from 'use-local-storage-state'
import { useAutopilotEvaluations } from './useAutopilotEvaluations'
import { useEstimates } from './useEstimates'
import { Resources } from './resources'
import { useAutoCalculatedFields } from './useAutoCalculatedFields'

export function useForm({ resources }: { resources: Resources }) {
  const form = useHookForm({
    mode: 'all',
    defaultValues,
  })
  const allowanceMonth = form.watch('allowanceMonth')
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
  const [configViewMode, setConfigViewMode] =
    useLocalStorageState<ConfigViewMode>('v0/config/mode', {
      defaultValue: 'basic',
    })

  // Trigger input validation on configViewMode change because many field validation
  // objects switch from required to not required.
  useEffect(() => {
    form.trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configViewMode])

  const estimates = useEstimates({
    isAutopilotEnabled,
    allowanceMonth,
    storageTB,
  })
  const { estimatedSpendingPerMonth } = estimates

  const evaluation = useAutopilotEvaluations({
    form,
    resources,
    isAutopilotEnabled,
    estimatedSpendingPerMonth,
  })

  const { allowanceDerivedPricing, setAllowanceDerivedPricing } =
    useAutoCalculatedFields({
      form,
      allowanceMonth,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
      isAutopilotEnabled,
    })

  const renterdState = useBusState()

  // Field validation is only re-applied on re-mount,
  // so we pass a ref with latest data that can be used interally.
  const validationContext = useRef({
    isAutopilotEnabled,
    configViewMode,
  })
  useEffect(() => {
    validationContext.current.isAutopilotEnabled = isAutopilotEnabled
    validationContext.current.configViewMode = configViewMode
  }, [isAutopilotEnabled, configViewMode])

  const fields = useMemo(() => {
    const advancedDefaults = renterdState.data
      ? getAdvancedDefaults(renterdState.data.network)
      : undefined
    const recommendations = evaluation.recommendations.reduce((acc, rec) => {
      return {
        ...acc,
        [rec.key]: rec,
      }
    }, {})
    if (averages.data) {
      return getFields({
        validationContext: validationContext.current,
        isAutopilotEnabled,
        configViewMode,
        advancedDefaults,
        maxStoragePriceTBMonth,
        maxUploadPriceTB,
        redundancyMultiplier,
        storageAverage,
        uploadAverage,
        downloadAverage,
        contractAverage,
        minShards,
        totalShards,
        recommendations,
        allowanceDerivedPricing,
        setAllowanceDerivedPricing,
      })
    }
    return getFields({
      validationContext: validationContext.current,
      isAutopilotEnabled,
      configViewMode,
      advancedDefaults,
      maxStoragePriceTBMonth,
      maxUploadPriceTB,
      redundancyMultiplier,
      minShards,
      totalShards,
      recommendations,
      allowanceDerivedPricing,
      setAllowanceDerivedPricing,
    })
  }, [
    isAutopilotEnabled,
    configViewMode,
    renterdState.data,
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
    evaluation,
    allowanceDerivedPricing,
    setAllowanceDerivedPricing,
  ])

  return {
    form,
    fields,
    estimates,
    evaluation,
    maxStoragePriceTBMonth,
    maxDownloadPriceTB,
    maxUploadPriceTB,
    storageTB,
    downloadTBMonth,
    uploadTBMonth,
    minShards,
    totalShards,
    redundancyMultiplier,
    configViewMode,
    setConfigViewMode,
    allowanceDerivedPricing,
    setAllowanceDerivedPricing,
  }
}
