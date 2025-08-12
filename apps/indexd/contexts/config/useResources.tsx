import { SWRError } from '@siafoundation/react-core'
import {
  MaintenanceSettings,
  PinnedSettings,
  UsabilitySettings,
} from '@siafoundation/indexd-types'
import {
  useAdminSettingsContracts,
  useAdminSettingsHosts,
  useAdminSettingsPricePinning,
} from '@siafoundation/indexd-react'
import { minutesInMilliseconds } from '@siafoundation/units'
import { useMemo } from 'react'

export function useResources() {
  const contracts = useAdminSettingsContracts({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const hosts = useAdminSettingsHosts({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })
  const pricePinning = useAdminSettingsPricePinning({
    config: {
      swr: {
        refreshInterval: minutesInMilliseconds(1),
      },
    },
  })

  // Resources required to intialize form.
  const resources: ResourcesMaybeLoaded = useMemo(
    () => ({
      contracts: {
        data: contracts.data,
        error: contracts.error,
      },
      hosts: {
        data: hosts.data,
        error: hosts.error,
      },
      pricePinning: {
        data: pricePinning.data,
        error: pricePinning.error,
      },
    }),
    [
      contracts.data,
      contracts.error,
      hosts.data,
      hosts.error,
      pricePinning.data,
      pricePinning.error,
    ],
  )

  return {
    resources,
    contracts,
    hosts,
    pricePinning,
  }
}

export function checkIfAllResourcesLoaded(resources: ResourcesMaybeLoaded) {
  const { contracts, hosts, pricePinning } = resources
  const loaded = !!(
    contracts.data &&
    !contracts.error &&
    hosts.data &&
    !hosts.error &&
    pricePinning.data &&
    !pricePinning.error
  )
  if (loaded) {
    return resources as ResourcesRequiredLoaded
  }
  return false
}

export function checkIfAnyResourcesErrored({
  contracts,
  hosts,
  pricePinning,
}: ResourcesMaybeLoaded) {
  return !!(
    // These settings have initial daemon values.
    (contracts.error || hosts.error || pricePinning.error)
  )
}

export type ResourcesMaybeLoaded = {
  contracts: {
    data?: MaintenanceSettings
    error?: SWRError
  }
  hosts: {
    data?: UsabilitySettings
    error?: SWRError
  }
  pricePinning: {
    data?: PinnedSettings
    error?: SWRError
  }
}

export type ResourcesRequiredLoaded = {
  contracts: {
    data: MaintenanceSettings
    error?: SWRError
  }
  hosts: {
    data: UsabilitySettings
    error?: undefined
  }
  pricePinning: {
    data: PinnedSettings
    error?: undefined
  }
}
