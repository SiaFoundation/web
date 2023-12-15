import { SWRError } from '@siafoundation/react-core'
import { HostSettings } from '@siafoundation/react-hostd'

export type Resources = {
  settings: {
    data?: HostSettings
    error?: SWRError
  }
}

export function checkIfAllResourcesLoaded({ settings }: Resources) {
  return !!(
    // has initial daemon values
    settings.data
  )
}

export function checkIfAnyResourcesErrored({ settings }: Resources) {
  return !!(
    // settings has initial daemon values
    settings.error
  )
}
