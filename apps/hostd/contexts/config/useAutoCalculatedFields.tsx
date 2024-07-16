import { useEffect, useMemo } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import { getCalculatedValues } from './transform'
import type { SettingsData } from './types'

export function useAutoCalculatedFields({
  form,
}: {
  form: UseFormReturn<SettingsData>
}) {
  // Sync calculated values if applicable.
  const calculatedValues = useMemo(() => getCalculatedValues(), [])

  useEffect(() => {
    for (const [key, value] of Object.entries(calculatedValues)) {
      form.setValue(key as keyof SettingsData, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      })
    }
  }, [form, calculatedValues])

  return {}
}
