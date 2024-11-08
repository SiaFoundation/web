import { useAppSettings, SWRError } from '@siafoundation/react-core'
import {
  AutopilotConfig,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import {
  useAutopilotConfig,
  useSettingsGouging,
  useSettingsPinned,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { useSiaCentralHostsNetworkAverages } from '@siafoundation/sia-central-react'
import { SiaCentralHostsNetworkAveragesResponse } from '@siafoundation/sia-central-types'
import { minutesInMilliseconds } from '@siafoundation/units'
import { useApp } from '../app'
import { useMemo } from 'react'
import { AutopilotInfo } from '../app/useAutopilotInfo'

export function useResources() {
  const { autopilotInfo } = useApp()
  // Settings that 404 when empty.
  const autopilot = useAutopilotConfig({
    config: {
      swr: {
        errorRetryCount: 0,
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  // Settings with initial defaults.
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

  const appSettings = useAppSettings()

  // Resources required to intialize form.
  const resources: ResourcesMaybeLoaded = useMemo(
    () => ({
      autopilotInfo: {
        data: autopilotInfo.data,
        error: autopilotInfo.error,
      },
      autopilot: {
        data: autopilot.data,
        error: autopilot.error,
      },
      gouging: {
        data: gouging.data,
        error: gouging.error,
      },
      pinned: {
        data: pinned.data,
        error: pinned.error,
      },
      upload: {
        data: upload.data,
        error: upload.error,
      },
      averages: {
        data: averages.data,
        error: averages.error,
      },
      appSettings: {
        settings: {
          siaCentral: appSettings.settings.siaCentral,
        },
      },
    }),
    [
      autopilotInfo.data,
      autopilotInfo.error,
      autopilot.data,
      autopilot.error,
      gouging.data,
      gouging.error,
      pinned.data,
      pinned.error,
      upload.data,
      upload.error,
      averages.data,
      averages.error,
      appSettings.settings.siaCentral,
    ]
  )

  return {
    resources,
    autopilotInfo,
    autopilot,
    gouging,
    pinned,
    upload,
    averages,
    appSettings,
  }
}

export function checkIfAllResourcesLoaded(resources: ResourcesMaybeLoaded) {
  const { autopilotInfo, autopilot, gouging, pinned, upload } = resources
  const loaded = !!(
    // These settings have initial daemon values.
    (
      autopilotInfo.data &&
      !autopilotInfo.error &&
      gouging.data &&
      !gouging.error &&
      pinned.data &&
      !pinned.error &&
      upload.data &&
      !upload.error &&
      // These settings are undefined and will error until the user sets them.
      (autopilot.data || autopilot.error)
    )
    // We do not wait for exchange rate or averages to load,
    // in case the third party API is down.
  )
  if (loaded) {
    return resources as ResourcesRequiredLoaded
  }
  return false
}

export function checkIfAnyResourcesErrored({
  gouging,
  pinned,
  upload,
}: ResourcesMaybeLoaded) {
  return !!(
    // These settings have initial daemon values.
    (gouging.error || pinned.error || upload.error)
  )
}

export type ResourcesMaybeLoaded = {
  autopilotInfo: {
    data?: AutopilotInfo
    error?: SWRError
  }
  autopilot: {
    data?: AutopilotConfig
    error?: SWRError
  }
  gouging: {
    data?: SettingsGouging
    error?: SWRError
  }
  pinned: {
    data?: SettingsPinned
    error?: SWRError
  }
  upload: {
    data?: SettingsUpload
    error?: SWRError
  }
  averages: {
    data?: SiaCentralHostsNetworkAveragesResponse
    error?: SWRError
  }
  appSettings: {
    settings: {
      siaCentral: boolean
    }
  }
}

export type ResourcesRequiredLoaded = {
  autopilotInfo: {
    data?: AutopilotInfo
    error?: SWRError
  }
  autopilot: {
    data?: AutopilotConfig
    error?: SWRError
  }
  gouging: {
    data: SettingsGouging
    error?: undefined
  }
  pinned: {
    data: SettingsPinned
    error?: undefined
  }
  upload: {
    data: SettingsUpload
    error?: undefined
  }
  averages: {
    data?: SiaCentralHostsNetworkAveragesResponse
    error?: SWRError
  }
  appSettings: {
    settings: {
      siaCentral: boolean
    }
  }
}
