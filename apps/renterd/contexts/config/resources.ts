import { SWRError } from '@siafoundation/react-core'
import {
  AutopilotConfig,
  AutopilotState,
  SettingsGouging,
  SettingsPinned,
  SettingsUpload,
} from '@siafoundation/renterd-types'
import { SiaCentralHostsNetworkAveragesResponse } from '@siafoundation/sia-central-types'
import BigNumber from 'bignumber.js'

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
  autopilotState: {
    data: AutopilotState
    error?: undefined
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

export function checkIfAllResourcesLoaded(resources: ResourcesMaybeLoaded) {
  const {
    autopilotState,
    autopilot,
    gouging,
    pinned,
    upload,
    averages,
    appSettings,
  } = resources
  const loaded = !!(
    // these settings have initial daemon values
    (
      autopilotState.data &&
      !autopilotState.error &&
      gouging.data &&
      !gouging.error &&
      pinned.data &&
      !pinned.error &&
      upload.data &&
      !upload.error &&
      // these settings are undefined and will error
      // until the user sets them
      (autopilot.data || autopilot.error) &&
      // other data dependencies
      (!appSettings.settings.siaCentral || averages.data)
    )
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
    // these settings have initial daemon values
    (gouging.error || pinned.error || upload.error)
  )
}

export function firstTimeGougingData({
  gouging,
  averages,
  hasBeenConfigured,
}: {
  gouging: SettingsGouging
  averages?: {
    settings: {
      download_price: string
      storage_price: string
      upload_price: string
    }
  }
  hasBeenConfigured: boolean
}): SettingsGouging {
  // already configured, the user has changed the defaults
  if (hasBeenConfigured) {
    return gouging
  }
  // if sia central is disabled, we cant override with averages
  if (!averages) {
    return gouging
  }
  return {
    ...gouging,
    maxStoragePrice: averages.settings.storage_price,
    maxDownloadPrice: new BigNumber(
      averages.settings.download_price
    ).toString(),
    maxUploadPrice: new BigNumber(averages.settings.upload_price).toString(),
  }
}
