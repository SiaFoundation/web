import { minutesInMilliseconds } from '@siafoundation/design-system'
import {
  useAutopilotConfig,
  useAutopilotConfigUpdate,
  useSettingUpdate,
} from '@siafoundation/react-renterd'
import { useSyncContractSet } from './useSyncContractSet'
import { useAppSettings } from '@siafoundation/react-core'
import { useContractSetSettings } from '../../hooks/useContractSetSettings'
import { useConfigDisplayOptions } from '../../hooks/useConfigDisplayOptions'
import { useGougingSettings } from '../../hooks/useGougingSettings'
import { useRedundancySettings } from '../../hooks/useRedundancySettings'
import { useUploadPackingSettings } from '../../hooks/useUploadPackingSettings'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/react-sia-central'
import useLocalStorageState from 'use-local-storage-state'
import { useApp } from '../app'

export function useResources() {
  const app = useApp()
  const isAutopilotConfigured = app.autopilot.state.data?.configured
  const isAutopilotEnabled = app.autopilot.status === 'on'
  // settings that 404 when empty
  const autopilot = useAutopilotConfig({
    disabled: !isAutopilotEnabled,
    standalone: 'configFormAutopilot',
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const contractSet = useContractSetSettings({
    standalone: 'configFormContractSet',
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const configApp = useConfigDisplayOptions({
    standalone: 'configFormConfigApp',
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  // settings with initial defaults
  const gouging = useGougingSettings({
    standalone: 'configFormGouging',
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const redundancy = useRedundancySettings({
    standalone: 'configFormRedundancy',
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const uploadPacking = useUploadPackingSettings({
    standalone: 'configFormUploadPacking',
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  const settingUpdate = useSettingUpdate()

  const averages = useSiaCentralHostsNetworkAverages({
    config: {
      swr: {
        revalidateOnFocus: false,
      },
    },
  })
  const [showAdvanced, setShowAdvanced] = useLocalStorageState<boolean>(
    'v0/config/showAdvanced',
    {
      defaultValue: false,
    }
  )
  const mode: 'advanced' | 'simple' = showAdvanced ? 'advanced' : 'simple'
  const {
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
  } = useSyncContractSet()
  const autopilotUpdate = useAutopilotConfigUpdate()

  const appSettings = useAppSettings()

  return {
    app,
    isAutopilotConfigured,
    isAutopilotEnabled,
    autopilot,
    contractSet,
    configApp,
    gouging,
    redundancy,
    uploadPacking,
    settingUpdate,
    averages,
    showAdvanced,
    setShowAdvanced,
    mode,
    shouldSyncDefaultContractSet,
    setShouldSyncDefaultContractSet,
    syncDefaultContractSet,
    autopilotUpdate,
    appSettings,
  }
}
