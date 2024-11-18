import {
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { delay, useMutate } from '@siafoundation/react-core'
import {
  useAutopilotTrigger,
  useBusState,
  useAutopilotConfigUpdate,
  useSettingsGougingUpdate,
  useSettingsPinnedUpdate,
  useSettingsUploadUpdate,
} from '@siafoundation/renterd-react'
import { busHostsRoute } from '@siafoundation/renterd-types'
import { useCallback } from 'react'
import { ResourcesMaybeLoaded, checkIfAllResourcesLoaded } from './useResources'
import { transformUp } from './transformUp'
import { InputValues, SubmitValues } from './types'

export function useOnValid({
  resources,
  revalidateAndResetForm,
}: {
  resources: ResourcesMaybeLoaded
  revalidateAndResetForm: () => Promise<void>
}) {
  const autopilotTrigger = useAutopilotTrigger()
  const autopilotUpdate = useAutopilotConfigUpdate()
  const settingsGougingUpdate = useSettingsGougingUpdate()
  const settingsPinnedUpdate = useSettingsPinnedUpdate()
  const settingsUploadUpdate = useSettingsUploadUpdate()
  const renterdState = useBusState()
  const mutate = useMutate()
  const onValid = useCallback(
    async (values: InputValues) => {
      const loaded = checkIfAllResourcesLoaded(resources)

      if (!loaded || !renterdState.data) {
        return
      }
      const firstTimeSettingConfig = !loaded.autopilotState.data?.configured

      const { payloads } = transformUp({
        resources: loaded,
        renterdState: renterdState.data,
        values: values as SubmitValues,
      })

      const promises = [
        autopilotUpdate.put({
          payload: payloads.autopilot,
        }),
        settingsGougingUpdate.put({
          payload: payloads.gouging,
        }),
        settingsPinnedUpdate.put({
          payload: payloads.pinned,
        }),
        settingsUploadUpdate.put({
          payload: payloads.upload,
        }),
      ]

      const results = await Promise.all(promises)
      const err = results.find((result) => result.error)
      if (err) {
        triggerErrorToast({
          title: 'Error updating configuration',
          body: err.error,
        })
        return
      }

      // Trigger the autopilot loop with new settings applied.
      autopilotTrigger.post({
        payload: {
          forceScan: true,
        },
      })

      triggerSuccessToast({ title: 'Configuration has been saved' })

      // If autopilot is being configured for the first time,
      // revalidate the empty hosts list.
      if (firstTimeSettingConfig) {
        const refreshHostsAfterDelay = async () => {
          await delay(5_000)
          mutate((key) => key.startsWith(busHostsRoute))
          await delay(5_000)
          mutate((key) => key.startsWith(busHostsRoute))
        }
        refreshHostsAfterDelay()
      }

      await revalidateAndResetForm()
    },
    [
      resources,
      renterdState.data,
      autopilotUpdate,
      settingsGougingUpdate,
      settingsPinnedUpdate,
      settingsUploadUpdate,
      revalidateAndResetForm,
      autopilotTrigger,
      mutate,
    ]
  )

  return onValid
}
