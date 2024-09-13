import { useAppSettings } from '@siafoundation/react-core'
import {
  useAutopilotConfig,
  useSettingsGouging,
  useSettingsPinned,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'
import { minutesInMilliseconds } from '@siafoundation/units'
import { useApp } from '../app'
import { useSyncContractSet } from './useSyncContractSet'

export function useResources() {
  const app = useApp()
  // settings that 404 when empty
  const autopilot = useAutopilotConfig({
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  // settings with initial defaults
  const gouging = useSettingsGouging({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const pinned = useSettingsPinned({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const upload = useSettingsUpload({
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
    maybeSyncDefaultContractSet,
  } = useSyncContractSet()

  const appSettings = useAppSettings()

  return {
    autopilotState: app.autopilot.state,
    autopilot,
    gouging,
    pinned,
    upload,
    averages,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    maybeSyncDefaultContractSet,
    appSettings,
  }
}
