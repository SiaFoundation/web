import { SWRError } from '@siafoundation/react-core'
import {
  AutopilotConfig,
  AutopilotState,
  ContractSetSettings,
  GougingSettings,
  RedundancySettings,
  UploadPackingSettings,
} from '@siafoundation/renterd-react'
import { SiaCentralHostsNetworkAveragesResponse } from '@siafoundation/sia-central'
import BigNumber from 'bignumber.js'
import { TBToBytes } from '@siafoundation/units'

export type Resources = {
  autopilotState: {
    data?: AutopilotState
    error?: SWRError
  }
  autopilot: {
    data?: AutopilotConfig
    error?: SWRError
  }
  contractSet: {
    data?: ContractSetSettings
    error?: SWRError
  }
  uploadPacking: {
    data?: UploadPackingSettings
    error?: SWRError
  }
  gouging: {
    data?: GougingSettings
    error?: SWRError
  }
  redundancy: {
    data?: RedundancySettings
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

export function checkIfAllResourcesLoaded({
  autopilotState,
  autopilot,
  contractSet,
  uploadPacking,
  gouging,
  redundancy,
  averages,
  appSettings,
}: Resources) {
  return !!(
    // these settings have initial daemon values
    (
      autopilotState.data &&
      redundancy.data &&
      uploadPacking.data &&
      gouging.data &&
      // these settings are undefined and will error
      // until the user sets them
      (autopilot.data || autopilot.error) &&
      (contractSet.data || contractSet.error) &&
      // other data dependencies
      (!appSettings.settings.siaCentral || averages.data)
    )
  )
}

export function checkIfAnyResourcesErrored({
  uploadPacking,
  gouging,
  redundancy,
}: Resources) {
  return !!(
    // these settings have initial daemon values
    (redundancy.error || uploadPacking.error || gouging.error)
  )
}

export function firstTimeGougingData({
  gouging,
  averages,
  hasBeenConfigured,
}: {
  gouging: GougingSettings
  averages?: {
    settings: {
      download_price: string
      storage_price: string
      upload_price: string
    }
  }
  hasBeenConfigured: boolean
}): GougingSettings {
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
    maxDownloadPrice: new BigNumber(averages.settings.download_price)
      .times(TBToBytes(1))
      .toString(),
    maxUploadPrice: new BigNumber(averages.settings.upload_price)
      .times(TBToBytes(1))
      .toString(),
  }
}
