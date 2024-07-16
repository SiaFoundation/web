import type {
  HostSettings,
  HostSettingsPinned,
} from '@siafoundation/hostd-types'
import type { SWRError } from '@siafoundation/react-core'

export type Resources = {
  settings: {
    data?: HostSettings
    error?: SWRError
  }
  settingsPinned: {
    data?: HostSettingsPinned
    error?: SWRError
  }
}

export function checkIfAllResourcesLoaded({
  settings,
  settingsPinned,
}: Resources) {
  return !!(
    // has initial daemon values
    (settings.data && (settingsPinned.data || settingsPinned.error))
  )
}

export function checkIfAnyResourcesErrored({ settings }: Resources) {
  return !!(
    // settings has initial daemon values
    settings.error
  )
}
