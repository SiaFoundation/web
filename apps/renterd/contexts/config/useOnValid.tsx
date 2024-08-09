import {
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import {
  useAutopilotConfigUpdate,
  useAutopilotTrigger,
  useBusState,
  useSettingUpdate,
} from '@siafoundation/renterd-react'
import { defaultValues } from './types'
import { transformUp } from './transformUp'
import { delay, useMutate } from '@siafoundation/react-core'
import { Resources } from './resources'
import { useSyncContractSet } from './useSyncContractSet'
import { autopilotHostsRoute } from '@siafoundation/renterd-types'

export function useOnValid({
  resources,
  isAutopilotEnabled,
  revalidateAndResetForm,
}: {
  resources: Resources
  isAutopilotEnabled: boolean
  revalidateAndResetForm: () => Promise<void>
}) {
  const autopilotTrigger = useAutopilotTrigger()
  const autopilotUpdate = useAutopilotConfigUpdate()
  const settingUpdate = useSettingUpdate()
  const renterdState = useBusState()
  const { maybeSyncDefaultContractSet } = useSyncContractSet()
  const mutate = useMutate()
  const onValid = useCallback(
    async (values: typeof defaultValues) => {
      if (
        !resources.gouging.data ||
        !resources.redundancy.data ||
        !renterdState.data
      ) {
        return
      }
      const firstTimeSettingConfig =
        isAutopilotEnabled && !resources.autopilot.data
      try {
        const { payloads } = transformUp({
          resources,
          renterdState: renterdState.data,
          isAutopilotEnabled,
          values,
        })

        const autopilotResponse = payloads.autopilot
          ? await autopilotUpdate.put({
              payload: payloads.autopilot,
            })
          : undefined

        const [
          contractSetResponse,
          uploadPackingResponse,
          gougingResponse,
          redundancyResponse,
          pricePinningResponse,
        ] = await Promise.all([
          settingUpdate.put({
            params: {
              key: 'contractset',
            },
            payload: payloads.contractSet,
          }),
          settingUpdate.put({
            params: {
              key: 'uploadpacking',
            },
            payload: payloads.uploadPacking,
          }),
          settingUpdate.put({
            params: {
              key: 'gouging',
            },
            payload: payloads.gouging,
          }),
          settingUpdate.put({
            params: {
              key: 'redundancy',
            },
            payload: payloads.redundancy,
          }),
          settingUpdate.put({
            params: {
              key: 'pricepinning',
            },
            payload: payloads.pricePinning,
          }),
        ])

        if (autopilotResponse?.error) {
          throw Error(autopilotResponse.error)
        }
        if (contractSetResponse.error) {
          throw Error(contractSetResponse.error)
        }
        if (uploadPackingResponse.error) {
          throw Error(uploadPackingResponse.error)
        }
        if (gougingResponse.error) {
          throw Error(gougingResponse.error)
        }
        if (redundancyResponse.error) {
          throw Error(redundancyResponse.error)
        }
        if (pricePinningResponse.error) {
          throw Error(pricePinningResponse.error)
        }

        if (isAutopilotEnabled) {
          // Sync default contract set if the setting is enabled.
          maybeSyncDefaultContractSet(values.autopilotContractSet)

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
            mutate((key) => key.startsWith(autopilotHostsRoute))
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsRoute))
          }
          refreshHostsAfterDelay()
        }

        await revalidateAndResetForm()
      } catch (e) {
        triggerErrorToast({
          title: 'Error updating configuration',
          body: (e as Error).message,
        })
        console.log(e)
      }
    },
    [
      renterdState.data,
      isAutopilotEnabled,
      autopilotUpdate,
      revalidateAndResetForm,
      maybeSyncDefaultContractSet,
      mutate,
      settingUpdate,
      resources,
      autopilotTrigger,
    ]
  )

  return onValid
}
