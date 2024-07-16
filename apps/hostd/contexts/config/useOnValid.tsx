import {
  minutesInMilliseconds,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import {
  useSettingsPinnedUpdate,
  useSettingsUpdate,
  useStateHost,
} from '@siafoundation/hostd-react'
import { useCallback } from 'react'
import type { Resources } from './resources'
import { transformUpSettings, transformUpSettingsPinned } from './transform'
import type { SettingsData } from './types'

export function useOnValid({
  resources,
  revalidateAndResetForm,
}: {
  resources: Resources
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
        const payload = transformUpSettings(values, resources.settings.data)

        const settings = await settingsUpdate.patch({
          payload,
        })

        if (settings.error) {
          throw Error(settings.error)
        }

        if (state.data?.explorer.enabled) {
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
      resources,
      settingsUpdate,
      settingsPinnedUpdate,
      revalidateAndResetForm,
      host.data,
      state.data,
    ],
  )
  return onValid
}
