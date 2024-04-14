import { useForm as useHookForm } from 'react-hook-form'
import { initialValues } from './types'
import { useMemo } from 'react'
import { getFields } from './fields'
import useLocalStorageState from 'use-local-storage-state'
import { useSiaCentralExchangeRates } from '@siafoundation/sia-central-react'

export function useForm() {
  const form = useHookForm({
    mode: 'all',
    defaultValues: initialValues,
  })
  const storageTBMonth = form.watch('storagePrice')
  const collateralMultiplier = form.watch('collateralMultiplier')

  const [showAdvanced, setShowAdvanced] = useLocalStorageState<boolean>(
    'v0/config/showAdvanced',
    {
      defaultValue: false,
    }
  )
  // const mode: 'simple' | 'advanced' = showAdvanced ? 'advanced' : 'simple'

  const rates = useSiaCentralExchangeRates()
  const fields = useMemo(
    () =>
      getFields({
        showAdvanced,
        storageTBMonth,
        collateralMultiplier,
        rates: rates.data?.rates,
      }),
    [showAdvanced, storageTBMonth, collateralMultiplier, rates.data]
  )

  return {
    form,
    fields,
    storageTBMonth,
    collateralMultiplier,
    showAdvanced,
    setShowAdvanced,
  }
}
