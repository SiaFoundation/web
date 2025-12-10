'use client'

import { useMemo } from 'react'
import { inputValues } from './types'
import { useForm as useHookForm, useWatch } from 'react-hook-form'
import { getFields } from './fields'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues: inputValues,
  })
  const maxStoragePriceTBMonth = useWatch({
    control: form.control,
    name: 'maxStoragePriceTBMonth',
  })
  const maxEgressPriceTB = useWatch({
    control: form.control,
    name: 'maxEgressPriceTB',
  })
  const maxIngressPriceTB = useWatch({
    control: form.control,
    name: 'maxIngressPriceTB',
  })

  const fields = useMemo(() => {
    return getFields()
  }, [])

  return {
    form,
    fields,
    maxStoragePriceTBMonth,
    maxEgressPriceTB,
    maxIngressPriceTB,
  }
}
