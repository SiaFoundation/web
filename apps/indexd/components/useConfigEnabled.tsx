import {
  useAdminSettingsContracts,
  useAdminSettingsContractsUpdate,
} from '@siafoundation/indexd-react'
import { useCallback } from 'react'

export function useConfigEnabled() {
  const settingsContractsUpdate = useAdminSettingsContractsUpdate()
  const settingsContracts = useAdminSettingsContracts()
  const toggleEnabled = useCallback(async () => {
    if (!settingsContracts.data) {
      return
    }
    await settingsContractsUpdate.put({
      payload: {
        ...settingsContracts.data,
        enabled: !settingsContracts.data?.enabled,
      },
    })
    // Optimistically update and revalidate.
    settingsContracts.mutate((data) => {
      if (!data) {
        return data
      }
      return {
        ...data,
        enabled: !data.enabled,
      }
    })
  }, [settingsContracts, settingsContractsUpdate])

  return {
    toggleEnabled,
    enabled: !!settingsContracts.data?.enabled,
  }
}
