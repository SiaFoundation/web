import { minutesInMilliseconds } from '@siafoundation/design-system'
import { useAutopilotConfig } from '@siafoundation/renterd-react'
import { useSyncContractSet } from './useSyncContractSet'
import { useAppSettings } from '@siafoundation/react-core'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import { useGougingSettings } from '../../hooks/useGougingSettings'
import { useRedundancySettings } from '../../hooks/useRedundancySettings'
import { useUploadPackingSettings } from '../../hooks/useUploadPackingSettings'
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
  const contractSet = useContractSetSettings({
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  // settings with initial defaults
  const gouging = useGougingSettings({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const redundancy = useRedundancySettings({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const uploadPacking = useUploadPackingSettings({
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
