import {
  triggerSuccessToast,
  triggerErrorToast,
  minutesInMilliseconds,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { SettingsData } from './types'
import {
  calculateMaxCollateral,
  transformUpSettings,
  transformUpSettingsPinned,
} from './transform'
import { Resources } from './resources'
import {
  useSettingsPinnedUpdate,
  useSettingsUpdate,
  useStateHost,
} from '@siafoundation/hostd-react'

export function useOnValid({
  resources,
  showAdvanced,
  revalidateAndResetForm,
}: {
  resources: Resources
  showAdvanced: boolean
  revalidateAndResetForm: () => Promise<void>
}) {
  const state = useStateHost()
  const settingsUpdate = useSettingsUpdate()
  const settingsPinnedUpdate = useSettingsPinnedUpdate()
  const host = useStateHost({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const onValid = useCallback(
    async (values: SettingsData) => {
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

        const settings = await settingsUpdate.patch({
          payload: transformUpSettings(finalValues, resources.settings.data),
        })

        if (settings.error) {
          throw Error(settings.error)
        }

        if (state.data?.explorer.enabled) {
          const settingsPinned = await settingsPinnedUpdate.put({
            payload: transformUpSettingsPinned(
              finalValues,
              resources.settingsPinned.data
            ),
          })

          if (settingsPinned.error) {
            throw Error(settingsPinned.error)
          }
        }

        const needsToAnnounce =
          host.data?.lastAnnouncement?.address !== values.netAddress
        if (needsToAnnounce) {
          triggerSuccessToast({
            title: 'Settings have been saved',
            body: 'Address has changed, make sure to re-announce the host.',
            options: {
              duration: 20_000,
            },
          })
        } else {
          triggerSuccessToast({ title: 'Settings have been saved' })
        }
        await revalidateAndResetForm()
      } catch (e) {
        triggerErrorToast({
          title: 'Error updating settings',
          body: (e as Error).message,
        })
        console.log(e)
      }
    },
    [
      showAdvanced,
      resources,
      settingsUpdate,
      settingsPinnedUpdate,
      revalidateAndResetForm,
      host.data,
      state.data,
    ]
  )
  return onValid
}
