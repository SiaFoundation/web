import { useEffect, useMemo } from 'react'
import { SettingsData } from './types'
import { UseFormReturn } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'
import { getCalculatedValues } from './transformUp'
import BigNumber from 'bignumber.js'

export function useAutoCalculatedFields({
  form,
  estimatedSpendingPerMonth,
  isAutopilotEnabled,
}: {
  form: UseFormReturn<SettingsData>
  estimatedSpendingPerMonth: BigNumber
  isAutopilotEnabled: boolean
}) {
  const [autoAllowance, setAutoAllowance] = useLocalStorageState<boolean>(
    'v0/config/auto/allowance',
    {
      defaultValue: true,
    }
  )

  // Sync calculated values if applicable.
  const calculatedValues = useMemo(
    () =>
      getCalculatedValues({
        estimatedSpendingPerMonth,
        isAutopilotEnabled,
        autoAllowance,
      }),
    [estimatedSpendingPerMonth, isAutopilotEnabled, autoAllowance]
  )

  useEffect(() => {
    for (const [key, value] of Object.entries(calculatedValues)) {
      form.setValue(key as keyof SettingsData, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [form, calculatedValues])

  return {
    autoAllowance,
    setAutoAllowance,
  }
}
