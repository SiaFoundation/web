import {
  Code,
  triggerErrorToast,
  triggerSuccessToast,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import {
  useSettingsUpload,
  useSettingsUploadUpdate,
} from '@siafoundation/renterd-react'
import useLocalStorageState from 'use-local-storage-state'
import { transformUpUpload } from './transformUp'

export function useSyncContractSet() {
  const [shouldSyncDefaultContractSet, setShouldSyncDefaultContractSet] =
    useLocalStorageState<boolean>('v0/autopilot/syncDefaultContractSet', {
      defaultValue: true,
    })
  const uploadSettings = useSettingsUpload({
    config: {
      swr: {
        errorRetryCount: 0,
      },
    },
  })
  const settingsUploadUpdate = useSettingsUploadUpdate()

  const maybeSyncDefaultContractSet = useCallback(
    async (autopilotContractSet: string) => {
      if (!uploadSettings.data) {
        return
      }
      const csd = uploadSettings.data || { defaultContractSet: '' }
      try {
        if (
          shouldSyncDefaultContractSet &&
          autopilotContractSet !== csd.defaultContractSet
        ) {
          await settingsUploadUpdate.put({
            payload: transformUpUpload(
              {
                defaultContractSet: autopilotContractSet,
              },
              uploadSettings.data
            ),
          })
          uploadSettings.mutate()
          triggerSuccessToast({
            title: 'Default contract set updated',
            body: (
              <>
                Default contract set has been updated to:{' '}
                <Code>{autopilotContractSet}</Code>.
              </>
            ),
          })
        }
      } catch (e) {
        triggerErrorToast({
          title: 'Error updating default contract set',
          body: (e as Error).message,
        })
        console.log(e)
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [uploadSettings.data, settingsUploadUpdate, shouldSyncDefaultContractSet]
  )

  return {
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    maybeSyncDefaultContractSet,
  }
}
