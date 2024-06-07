import { useEffect, useMemo } from 'react'
import { SettingsData } from './types'
import { UseFormReturn } from 'react-hook-form'
import useLocalStorageState from 'use-local-storage-state'
import { getCalculatedValues } from './transform'
import BigNumber from 'bignumber.js'

export function useAutoCalculatedFields({
  form,
  storagePrice,
  collateralMultiplier,
}: {
  form: UseFormReturn<SettingsData>
  storagePrice: BigNumber
  collateralMultiplier: BigNumber
}) {
  const [autoMaxCollateral, setAutoMaxCollateral] =
    useLocalStorageState<boolean>('v0/config/auto/maxCollateral', {
      defaultValue: true,
    })

  // Sync calculated values if applicable.
  const calculatedValues = useMemo(
    () =>
      getCalculatedValues({
        storagePrice,
        collateralMultiplier,
        autoMaxCollateral,
      }),
    [storagePrice, collateralMultiplier, autoMaxCollateral]
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
    autoMaxCollateral,
    setAutoMaxCollateral,
  }
}
