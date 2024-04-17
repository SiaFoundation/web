import { minutesInMilliseconds } from '@siafoundation/design-system'
import {
  useAutopilotConfig,
  useSettingContractSet,
  useSettingGouging,
  useSettingRedundancy,
  useSettingUploadPacking,
} from '@siafoundation/renterd-react'
import { useSyncContractSet } from './useSyncContractSet'
import { useAppSettings } from '@siafoundation/react-core'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'
import { useApp } from '../app'

export function useResources() {
  const app = useApp()
  const isAutopilotEnabled = app.autopilot.status === 'on'
  // settings that 404 when empty
  const autopilot = useAutopilotConfig({
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const contractSet = useSettingContractSet({
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  // settings with initial defaults
  const gouging = useSettingGouging({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const redundancy = useSettingRedundancy({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const uploadPacking = useSettingUploadPacking({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const averages = useSiaCentralHostsNetworkAverages({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const {
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
  } = useSyncContractSet()

  const appSettings = useAppSettings()

  return {
    autopilotState: app.autopilot.state,
    autopilot,
    contractSet,
    gouging,
    redundancy,
    uploadPacking,
    averages,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
    appSettings,
    isAutopilotEnabled,
  }
}
