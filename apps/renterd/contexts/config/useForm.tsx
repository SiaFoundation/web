import { useEffect, useMemo, useRef } from 'react'
import { ConfigViewMode, inputValues, getAdvancedDefaults } from './types'
import { useForm as useHookForm, useWatch } from 'react-hook-form'
import { useBusState } from '@siafoundation/renterd-react'
import { getFields } from './fields'
import useLocalStorageState from 'use-local-storage-state'
import { useAutopilotEvaluations } from './useAutopilotEvaluations'
import { ResourcesMaybeLoaded } from './useResources'
import { getRedundancyMultiplier } from '@siafoundation/units'

export function useForm({ resources }: { resources: ResourcesMaybeLoaded }) {
  const form = useHookForm({
    mode: 'all',
    defaultValues: inputValues,
  })
  const maxStoragePriceTBMonth = useWatch({
    control: form.control,
    name: 'maxStoragePriceTBMonth',
  })
  const maxDownloadPriceTB = useWatch({
    control: form.control,
    name: 'maxDownloadPriceTB',
  })
  const maxUploadPriceTB = useWatch({
    control: form.control,
    name: 'maxUploadPriceTB',
  })
  const storageTB = useWatch({ control: form.control, name: 'storageTB' })
  const downloadTBMonth = useWatch({
    control: form.control,
    name: 'downloadTBMonth',
  })
  const uploadTBMonth = useWatch({
    control: form.control,
    name: 'uploadTBMonth',
  })
  const minShards = useWatch({ control: form.control, name: 'minShards' })
  const totalShards = useWatch({ control: form.control, name: 'totalShards' })
  const redundancyMultiplier = useMemo(
    () => getRedundancyMultiplier(minShards, totalShards),
    [minShards, totalShards],
  )

  const [configViewMode, setConfigViewMode] =
    useLocalStorageState<ConfigViewMode>('v0/config/mode', {
      defaultValue: 'basic',
    })

  // Trigger validation when the form is first setup.
  // This is necessary because otherwise the form will not validate until the
  // actual fields are rendered on screen, but we use isValid for other things
  // such as deciding whether to submit autopilot config evaluations.
  useEffect(() => {
    form.trigger()
  }, [form])

  // Trigger validation on configViewMode change because many field validation
  // objects switch from required to not required.
  useEffect(() => {
    form.trigger()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configViewMode])

  const evaluation = useAutopilotEvaluations({
    form,
    resources,
  })

  const renterdState = useBusState()

  // Field validation is only re-applied on re-mount,
  // so we pass a ref with latest data that can be used interally.
  const validationContext = useRef({
    configViewMode,
  })
  useEffect(() => {
    validationContext.current.configViewMode = configViewMode
  }, [configViewMode])

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
      configViewMode,
      advancedDefaults,
      recommendations,
    })
  }, [configViewMode, renterdState.data, evaluation.recommendations])

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
