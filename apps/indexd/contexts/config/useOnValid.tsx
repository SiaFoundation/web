import {
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { delay, useMutate } from '@siafoundation/react-core'
import {
  useSettingsContractsUpdate,
  useSettingsHostsUpdate,
  useSettingsPricePinningUpdate,
} from '@siafoundation/indexd-react'
import { hostsRoute } from '@siafoundation/indexd-types'
import { useCallback } from 'react'
import { ResourcesMaybeLoaded, checkIfAllResourcesLoaded } from './useResources'
import { transformUp } from './transformUp'
import { InputValues, Values } from './types'

export function useOnValid({
  resources,
  revalidateAndResetForm,
}: {
  resources: ResourcesMaybeLoaded
  revalidateAndResetForm: () => Promise<void>
}) {
  const settingsContractsUpdate = useSettingsContractsUpdate()
  const settingsHostsUpdate = useSettingsHostsUpdate()
  const settingsPricePinningUpdate = useSettingsPricePinningUpdate()
  const mutate = useMutate()
  const onValid = useCallback(
    async (values: InputValues) => {
      const loaded = checkIfAllResourcesLoaded(resources)

      if (!loaded) {
        return
      }

      const { payloads } = transformUp({
        resources: loaded,
        values: values as Values,
      })

      const promises = [
        settingsContractsUpdate.put({
          payload: payloads.contracts,
        }),
        settingsHostsUpdate.put({
          payload: payloads.hosts,
        }),
        settingsPricePinningUpdate.put({
          payload: payloads.pricePinning,
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

      triggerSuccessToast({ title: 'Configuration has been saved' })

      const refreshHostsAfterDelay = async () => {
        await delay(5_000)
        mutate((key) => key.startsWith(hostsRoute))
      }
      refreshHostsAfterDelay()

      await revalidateAndResetForm()
    },
    [
      resources,
      settingsContractsUpdate,
      settingsHostsUpdate,
      settingsPricePinningUpdate,
      revalidateAndResetForm,
      mutate,
    ]
  )

  return onValid
}
