import { SWRError } from '@siafoundation/react-core'
import {
  AutopilotConfig,
  AutopilotState,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import {
  useAutopilotConfig,
  useAutopilotState,
  useSettingsGouging,
  useSettingsPinned,
  useSettingsUpload,
} from '@siafoundation/renterd-react'
import { minutesInMilliseconds } from '@siafoundation/units'
import { useMemo } from 'react'

export function useResources() {
  const autopilotState = useAutopilotState({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const autopilot = useAutopilotConfig({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
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

  // Resources required to intialize form.
  const resources: ResourcesMaybeLoaded = useMemo(
    () => ({
      autopilotState: {
        data: autopilotState.data,
        error: autopilotState.error,
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
    }),
    [
      autopilotState.data,
      autopilotState.error,
      autopilot.data,
      autopilot.error,
      gouging.data,
      gouging.error,
      pinned.data,
      pinned.error,
      upload.data,
      upload.error,
    ],
  )

  return {
    resources,
    autopilotState,
    autopilot,
    gouging,
    pinned,
    upload,
  }
}

export function checkIfAllResourcesLoaded(resources: ResourcesMaybeLoaded) {
  const { autopilotState, autopilot, gouging, pinned, upload } = resources
  const loaded = !!(
    autopilotState.data &&
    !autopilotState.error &&
    autopilot.data &&
    !autopilot.error &&
    gouging.data &&
    !gouging.error &&
    pinned.data &&
    !pinned.error &&
    upload.data &&
    !upload.error
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
  autopilotState: {
    data?: AutopilotState
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
}

export type ResourcesRequiredLoaded = {
  autopilotState: {
    data: AutopilotState
    error?: SWRError
  }
  autopilot: {
    data: AutopilotConfig
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
}
