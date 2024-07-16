import {
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { delay, useMutate } from '@siafoundation/react-core'
import {
  useAutopilotConfigUpdate,
  useAutopilotTrigger,
  useBusState,
  useSettingUpdate,
} from '@siafoundation/renterd-react'
import { autopilotHostsRoute } from '@siafoundation/renterd-types'
import type BigNumber from 'bignumber.js'
import { useCallback } from 'react'
import type { Resources } from './resources'
import { transformUp } from './transformUp'
import type { defaultValues } from './types'
import { useSyncContractSet } from './useSyncContractSet'

export function useOnValid({
  resources,
  estimatedSpendingPerMonth,
  isAutopilotEnabled,
  revalidateAndResetForm,
}: {
  resources: Resources
  estimatedSpendingPerMonth: BigNumber
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
          estimatedSpendingPerMonth,
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
      estimatedSpendingPerMonth,
      isAutopilotEnabled,
      autopilotUpdate,
      revalidateAndResetForm,
      maybeSyncDefaultContractSet,
      mutate,
      settingUpdate,
      resources,
      autopilotTrigger,
    ],
  )

  return onValid
}
