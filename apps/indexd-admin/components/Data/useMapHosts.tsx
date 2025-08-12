import { HostMapHost } from '@siafoundation/design-system'
import { V2HostSettings } from '@siafoundation/types'
import { useMemo, useDeferredValue } from 'react'

export function useMapHosts({
  hosts,
}: {
  hosts: {
    id: string
    location?: { latitude: number; longitude: number; countryCode: string }
    settings?: V2HostSettings
    usable?: boolean
  }[]
}) {
  // Defer to avoid blocking UI on large updates.
  const deferredHosts = useDeferredValue(hosts)
  const mapHosts = useMemo(() => {
    if (deferredHosts.length > 100) {
      // Group by country
      const groupedHosts = deferredHosts.reduce(
        (acc, host) => {
          const country = host.location?.countryCode
          if (!country || country === 'unknown' || !host.location) {
            return acc
          }
          if (!acc[country]) {
            acc[country] = {
              type: 'group',
              id: host.id,
              location: {
                latitude: host.location?.latitude,
                longitude: host.location?.longitude,
                countryCode: host.location?.countryCode,
              },
              groupCount: 1,
            }
          } else {
            acc[country].groupCount = (acc[country].groupCount || 0) + 1
          }
          return acc
        },
        {} as {
          [key: string]: HostMapHost
        },
      )
      return Object.values(groupedHosts)
    }
    return deferredHosts
      .map((host) => {
        if (!host.location || host.location.countryCode === 'unknown') {
          return null
        }
        const hostData: HostMapHost = {
          id: host.id,
          publicKey: host.id,
          location: {
            latitude: host.location.latitude,
            longitude: host.location.longitude,
            countryCode: host.location.countryCode,
          },
          v2Settings: host.settings,
          usable: host.usable,
        }
        return hostData
      })
      .filter((host) => host !== null)
  }, [deferredHosts])
  return mapHosts
}
