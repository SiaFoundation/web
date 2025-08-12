'use client'

import { useMemo } from 'react'
import { inputValues } from './types'
import { useForm as useHookForm } from 'react-hook-form'
import { getFields } from './fields'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues: inputValues,
  })
  const maxStoragePriceTBMonth = form.watch('maxStoragePriceTBMonth')
  const maxEgressPriceTB = form.watch('maxEgressPriceTB')
  const maxIngressPriceTB = form.watch('maxIngressPriceTB')

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
