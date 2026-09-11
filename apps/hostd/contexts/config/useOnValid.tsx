import {
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { SettingsData } from './types'
import { transformUpSettings, transformUpSettingsPinned } from './transform'
import { Resources } from './resources'
import {
  useHostState,
  useSettingsPinnedUpdate,
  useSettingsUpdate,
} from '@siafoundation/hostd-react'
import { minutesInMilliseconds } from '@siafoundation/units'

export function useOnValid({
  resources,
  revalidateAndResetForm,
}: {
  resources: Resources
  revalidateAndResetForm: () => Promise<void>
}) {
  const state = useHostState({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const settingsUpdate = useSettingsUpdate()
  const settingsPinnedUpdate = useSettingsPinnedUpdate()
  const onValid = useCallback(
    async (values: SettingsData) => {
      if (!resources) {
        return
      }
      try {
        const payload = transformUpSettings(values, resources.settings.data)

        const settings = await settingsUpdate.patch({
          payload,
        })

        if (settings.error) {
          throw Error(settings.error)
        }

        // Without the current pinned settings there is nothing to base an
        // update on, and writing the form defaults would unpin every price.
        if (state.data?.explorer.enabled && resources.settingsPinned.data) {
          const settingsPinned = await settingsPinnedUpdate.put({
            payload: transformUpSettingsPinned(
              values,
              resources.settingsPinned.data,
            ),
          })

          if (settingsPinned.error) {
            throw Error(settingsPinned.error)
          }
        }

        triggerSuccessToast({ title: 'Settings have been saved' })
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
      resources,
      settingsUpdate,
      settingsPinnedUpdate,
      revalidateAndResetForm,
      state.data,
    ],
  )
  return onValid
}
