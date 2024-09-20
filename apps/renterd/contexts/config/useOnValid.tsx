import {
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { delay, useMutate } from '@siafoundation/react-core'
import {
  useAutopilotConfigUpdate,
  useAutopilotTrigger,
  useBusState,
  useSettingsGougingUpdate,
  useSettingsPinnedUpdate,
  useSettingsUploadUpdate,
} from '@siafoundation/renterd-react'
import { busHostsRoute } from '@siafoundation/renterd-types'
import { useCallback } from 'react'
import {
  ResourcesMaybeLoaded,
  ResourcesRequiredLoaded,
  checkIfAllResourcesLoaded,
} from './resources'
import { transformUp } from './transformUp'
import { InputValues, SubmitValues } from './types'
import { useSyncContractSet } from './useSyncContractSet'

export function useOnValid({
  resources,
  isAutopilotEnabled,
  revalidateAndResetForm,
}: {
  resources: ResourcesMaybeLoaded
  isAutopilotEnabled: boolean
  revalidateAndResetForm: () => Promise<void>
}) {
  const autopilotTrigger = useAutopilotTrigger()
  const autopilotUpdate = useAutopilotConfigUpdate()
  const settingsGougingUpdate = useSettingsGougingUpdate()
  const settingsPinnedUpdate = useSettingsPinnedUpdate()
  const settingsUploadUpdate = useSettingsUploadUpdate()
  const renterdState = useBusState()
  const { maybeSyncDefaultContractSet } = useSyncContractSet()
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
        resources: resources as ResourcesRequiredLoaded,
        renterdState: renterdState.data,
        isAutopilotEnabled,
        values: values as SubmitValues,
      })

      const autopilotResponse = payloads.autopilot
        ? await autopilotUpdate.put({
            payload: payloads.autopilot,
          })
        : undefined

      const [gougingResponse, pinnedResponse, uploadResponse] =
        await Promise.all([
          settingsGougingUpdate.put({
            payload: payloads.gouging,
          }),
          settingsPinnedUpdate.put({
            payload: payloads.pinned,
          }),
          settingsUploadUpdate.put({
            payload: payloads.upload,
          }),
        ])

      const error =
        autopilotResponse?.error ||
        gougingResponse.error ||
        pinnedResponse.error ||
        uploadResponse.error
      if (error) {
        triggerErrorToast({
          title: 'Error updating configuration',
          body: error,
        })
        return
      }

      if (isAutopilotEnabled && payloads.autopilot) {
        // Sync default contract set if the setting is enabled.
        maybeSyncDefaultContractSet(payloads.autopilot.contracts.set)

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
      autopilotUpdate,
      settingsGougingUpdate,
      settingsPinnedUpdate,
      settingsUploadUpdate,
      revalidateAndResetForm,
      maybeSyncDefaultContractSet,
      autopilotTrigger,
      mutate,
    ]
  )

  return onValid
}
