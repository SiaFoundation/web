import {
  Code,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { useSettingUpdate } from '@siafoundation/react-renterd'
import useLocalStorageState from 'use-local-storage-state'
import { transformUpContractSet } from '../../contexts/config/transform'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'

export function useSyncContractSet() {
  const [shouldSyncDefaultContractSet, setShouldSyncDefaultContractSet] =
    useLocalStorageState<boolean>('v0/autopilot/syncDefaultContractSet', {
      defaultValue: true,
    })
  const contractSet = useContractSetSettings({
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  const settingUpdate = useSettingUpdate()

  const syncDefaultContractSet = useCallback(
    async (autopilotContractSet: string) => {
      const csd = contractSet.data || { default: '' }
      try {
        if (
          shouldSyncDefaultContractSet &&
          autopilotContractSet !== csd.default
        ) {
          await settingUpdate.put({
            params: {
              key: 'contractset',
            },
            payload: transformUpContractSet(
              {
                defaultContractSet: autopilotContractSet,
              },
              contractSet.data
            ),
          })
          contractSet.mutate()
          triggerSuccessToast(
            <Text>
              Default contract set has been updated to:{' '}
              <Code>{autopilotContractSet}</Code>.
            </Text>
          )
        }
      } catch (e) {
        triggerErrorToast((e as Error).message)
        console.log(e)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [contractSet.data, settingUpdate, shouldSyncDefaultContractSet]
  )

  return {
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
  }
}
