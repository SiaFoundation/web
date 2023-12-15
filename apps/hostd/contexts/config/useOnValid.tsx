import {
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { SettingsData, initialValues } from './types'
import { calculateMaxCollateral, transformUp } from './transform'
import { UseFormReturn } from 'react-hook-form'
import { Resources } from './resources'
import { useSettingsUpdate } from '@siafoundation/react-hostd'

export function useOnValid({
  resources,
  dirtyFields,
  showAdvanced,
  revalidateAndResetForm,
}: {
  dirtyFields: UseFormReturn<SettingsData>['formState']['dirtyFields']
  resources: Resources
  showAdvanced: boolean
  revalidateAndResetForm: () => Promise<void>
}) {
  const settingsUpdate = useSettingsUpdate()
  const onValid = useCallback(
    async (values: typeof initialValues) => {
      if (!resources) {
        return
      }
      try {
        const calculatedValues: Partial<SettingsData> = {}
        if (!showAdvanced) {
          calculatedValues.maxCollateral = calculateMaxCollateral(
            values.storagePrice,
            values.collateralMultiplier
          )
        }

        const finalValues = {
          ...values,
          ...calculatedValues,
        }

        const response = await settingsUpdate.patch({
          payload: transformUp(finalValues, resources.settings.data),
        })
        if (response.error) {
          throw Error(response.error)
        }
        if (dirtyFields.netAddress) {
          triggerSuccessToast(
            'Settings have been saved. Address has changed, make sure to re-announce the host.',
            {
              duration: 20_000,
            }
          )
        } else {
          triggerSuccessToast('Settings have been saved.')
        }
        await revalidateAndResetForm()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [
      showAdvanced,
      resources,
      dirtyFields.netAddress,
      settingsUpdate,
      revalidateAndResetForm,
    ]
  )
  return onValid
}
