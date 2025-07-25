'use client'

import { useEffect, useMemo, useRef } from 'react'
import { ConfigViewMode, inputValues } from './types'
import { useForm as useHookForm } from 'react-hook-form'
import { getFields } from './fields'
import useLocalStorageState from 'use-local-storage-state'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues: inputValues,
  })
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const maxEgressPriceTB = form.watch('maxEgressPriceTB')
  const maxIngressPriceTB = form.watch('maxIngressPriceTB')

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

  // Field validation is only re-applied on re-mount,
  // so we pass a ref with latest data that can be used interally.
  const validationContext = useRef({
    configViewMode,
  })
  useEffect(() => {
    validationContext.current.configViewMode = configViewMode
  }, [configViewMode])

  const fields = useMemo(() => {
    return getFields({
      validationContext: validationContext.current,
      configViewMode,
    })
  }, [configViewMode])

  return {
    form,
    fields,
    maxStoragePriceTBMonth,
    maxEgressPriceTB,
    maxIngressPriceTB,
    configViewMode,
    setConfigViewMode,
  }
}
