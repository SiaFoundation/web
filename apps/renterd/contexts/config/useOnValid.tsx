import {
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { delay, useMutate } from '@siafoundation/react-core'
import {
  useAutopilotTrigger,
  useBusState,
  useAutopilotConfigUpdate,
  useSettingsGougingPatch,
  useSettingsPinnedPatch,
  useSettingsUploadPatch,
} from '@siafoundation/renterd-react'
import { busHostsRoute } from '@siafoundation/renterd-types'
import { useCallback } from 'react'
import { ResourcesMaybeLoaded, checkIfAllResourcesLoaded } from './useResources'
import { transformUp } from './transformUp'
import { InputValues, SubmitValues } from './types'
import { getPatchPayloads } from './patchPayloads'
import { useApp } from '../../contexts/app'

export function useOnValid({
  resources,
  revalidateAndResetForm,
}: {
  resources: ResourcesMaybeLoaded
  revalidateAndResetForm: () => Promise<void>
}) {
  const app = useApp()
  const isAutopilotEnabled = !!app.autopilotInfo.data?.isAutopilotEnabled
  const autopilotTrigger = useAutopilotTrigger()
  const autopilotUpdate = useAutopilotConfigUpdate()
  const settingsGougingPatch = useSettingsGougingPatch()
  const settingsPinnedPatch = useSettingsPinnedPatch()
  const settingsUploadPatch = useSettingsUploadPatch()
  const renterdState = useBusState()
  const mutate = useMutate()
  const onValid = useCallback(
    async (values: InputValues) => {
      const loaded = checkIfAllResourcesLoaded(resources)

      if (!loaded || !renterdState.data) {
        return
      }
      const firstTimeSettingConfig =
        isAutopilotEnabled && !resources.autopilot.data

      const { payloads } = transformUp({
        resources: loaded,
        renterdState: renterdState.data,
        isAutopilotEnabled,
        values: values as SubmitValues,
      })

      const patches = getPatchPayloads({
        resources: loaded,
        payloads,
      })

      const promises = []

      if (isAutopilotEnabled && payloads.autopilot && patches.autopilot) {
        promises.push(
          autopilotUpdate.put({
            payload: payloads.autopilot,
          })
        )
      }

      if (patches.gouging) {
        promises.push(
          settingsGougingPatch.patch({
            payload: patches.gouging,
          })
        )
      }

      if (patches.pinned) {
        promises.push(
          settingsPinnedPatch.patch({
            payload: patches.pinned,
          })
        )
      }

      if (patches.upload) {
        promises.push(
          settingsUploadPatch.patch({
            payload: patches.upload,
          })
        )
      }

      const results = await Promise.all(promises)

      const err = results.find((result) => result.error)
      if (err) {
        triggerErrorToast({
          title: 'Error updating configuration',
          body: err.error,
        })
        return
      }

      if (isAutopilotEnabled && patches.autopilot) {
        // Trigger the autopilot loop with new settings applied.
        autopilotTrigger.post({
          payload: {
            forceScan: true,
          },
        })
      }

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
      isAutopilotEnabled,
      revalidateAndResetForm,
      autopilotUpdate,
      settingsGougingPatch,
      settingsPinnedPatch,
      settingsUploadPatch,
      autopilotTrigger,
      mutate,
    ]
  )

  return onValid
}
