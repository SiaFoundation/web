import type BigNumber from 'bignumber.js'
import { useEffect, useMemo } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'
import { getCalculatedValues } from './transformUp'
import type { SettingsData } from './types'

export function useAutoCalculatedFields({
  form,
  allowanceMonth,
  storageTB,
  downloadTBMonth,
  uploadTBMonth,
  redundancyMultiplier,
  isAutopilotEnabled,
}: {
  form: UseFormReturn<SettingsData>
  allowanceMonth?: BigNumber
  storageTB?: BigNumber
  downloadTBMonth?: BigNumber
  uploadTBMonth?: BigNumber
  redundancyMultiplier?: BigNumber
  isAutopilotEnabled: boolean
}) {
  const [allowanceDerivedPricing, setAllowanceDerivedPricing] =
    useLocalStorageState<boolean>('v0/config/auto/allowance', {
      defaultValue: true,
    })

  // Sync calculated values if applicable.
  const calculatedValues = useMemo(
    () =>
      getCalculatedValues({
        isAutopilotEnabled,
        allowanceDerivedPricing,
        allowanceMonth,
        storageTB,
        downloadTBMonth,
        uploadTBMonth,
        redundancyMultiplier,
      }),
    [
      isAutopilotEnabled,
      allowanceDerivedPricing,
      allowanceMonth,
      storageTB,
      downloadTBMonth,
      uploadTBMonth,
      redundancyMultiplier,
    ],
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
    allowanceDerivedPricing,
    setAllowanceDerivedPricing,
  }
}
