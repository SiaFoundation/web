import { useEffect, useMemo, useRef } from 'react'
import { ConfigViewMode, inputValues, getAdvancedDefaults } from './types'
import { useForm as useHookForm } from 'react-hook-form'
import { useBusState } from '@siafoundation/renterd-react'
import { getFields } from './fields'
import { useApp } from '../app'
import useLocalStorageState from 'use-local-storage-state'
import { useAutopilotEvaluations } from './useAutopilotEvaluations'
import { ResourcesMaybeLoaded } from './useResources'
import { getRedundancyMultiplier } from '@siafoundation/units'

export function useForm({ resources }: { resources: ResourcesMaybeLoaded }) {
  const form = useHookForm({
    mode: 'all',
    defaultValues: inputValues,
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

  const { isAutopilotEnabled } = useApp()
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

  const evaluation = useAutopilotEvaluations({
    form,
    resources,
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
    return getFields({
      validationContext: validationContext.current,
      isAutopilotEnabled,
      configViewMode,
      advancedDefaults,
      recommendations,
    })
  }, [
    isAutopilotEnabled,
    configViewMode,
    renterdState.data,
    evaluation.recommendations,
  ])

  return {
    form,
    fields,
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
  }
}
