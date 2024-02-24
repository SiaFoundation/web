import {
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import {
  autopilotHostsKey,
  useAutopilotConfigUpdate,
  useAutopilotTrigger,
  useBusState,
  useSettingUpdate,
} from '@siafoundation/react-renterd'
import { SettingsData, defaultValues } from './types'
import {
  transformUpAutopilot,
  transformUpContractSet,
  transformUpGouging,
  transformUpRedundancy,
  transformUpUploadPacking,
} from './transform'
import { delay, useMutate } from '@siafoundation/react-core'
import { Resources } from './resources'
import { useSyncContractSet } from './useSyncContractSet'
import BigNumber from 'bignumber.js'

export function useOnValid({
  resources,
  estimatedSpendingPerMonth,
  isAutopilotEnabled,
  showAdvanced,
  revalidateAndResetForm,
}: {
  resources: Resources
  estimatedSpendingPerMonth: BigNumber
  isAutopilotEnabled: boolean
  showAdvanced: boolean
  revalidateAndResetForm: () => Promise<void>
}) {
  const autopilotTrigger = useAutopilotTrigger()
  const autopilotUpdate = useAutopilotConfigUpdate()
  const settingUpdate = useSettingUpdate()
  const renterdState = useBusState()
  const { syncDefaultContractSet } = useSyncContractSet()
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
      try {
        const calculatedValues: Partial<SettingsData> = {}
        if (isAutopilotEnabled && !showAdvanced) {
          calculatedValues.allowanceMonth = estimatedSpendingPerMonth
        }

        const finalValues = {
          ...values,
          ...calculatedValues,
        }

        const firstTimeSettingConfig =
          isAutopilotEnabled && !resources.autopilot.data
        const autopilotResponse = isAutopilotEnabled
          ? await autopilotUpdate.put({
              payload: transformUpAutopilot(
                renterdState.data.network,
                finalValues,
                resources.autopilot.data
              ),
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
            payload: transformUpContractSet(
              finalValues,
              resources.contractSet.data
            ),
          }),
          settingUpdate.put({
            params: {
              key: 'uploadpacking',
            },
            payload: transformUpUploadPacking(
              finalValues,
              resources.uploadPacking.data
            ),
          }),
          settingUpdate.put({
            params: {
              key: 'gouging',
            },
            payload: transformUpGouging(finalValues, resources.gouging.data),
          }),
          settingUpdate.put({
            params: {
              key: 'redundancy',
            },
            payload: transformUpRedundancy(
              finalValues,
              resources.redundancy.data
            ),
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
          // Sync default contract set if necessary. Only syncs if the setting
          // is enabled in case the user changes in advanced mode and then
          // goes back to simple mode.
          // Might be simpler nice to just override in simple mode without a
          // special setting since this is how other settings like allowance
          // behave - but leaving for now.
          syncDefaultContractSet(finalValues.autopilotContractSet)

          // Trigger the autopilot loop with new settings applied.
          autopilotTrigger.post({
            payload: {
              forceScan: true,
            },
          })
        }

        triggerSuccessToast('Configuration has been saved.')

        // If autopilot is being configured for the first time,
        // revalidate the empty hosts list.
        if (firstTimeSettingConfig) {
          const refreshHostsAfterDelay = async () => {
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsKey))
            await delay(5_000)
            mutate((key) => key.startsWith(autopilotHostsKey))
          }
          refreshHostsAfterDelay()
        }

        await revalidateAndResetForm()
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    [
      renterdState.data,
      estimatedSpendingPerMonth,
      showAdvanced,
      isAutopilotEnabled,
      autopilotUpdate,
      revalidateAndResetForm,
      syncDefaultContractSet,
      mutate,
      settingUpdate,
      resources,
      autopilotTrigger,
    ]
  )

  return onValid
}
