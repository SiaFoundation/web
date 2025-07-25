import { Heading, HostMap } from '@siafoundation/design-system'
import { HostMapHost } from '@siafoundation/design-system'
import { Host } from '../mockData'
import { useTableParams } from '../useTableParams'
import { Row } from '@tanstack/react-table'
import { useMemo, useDeferredValue } from 'react'

export function HostListDrawer({ hosts }: { hosts: Row<Host>[] }) {
  // Defer the hosts prop to avoid blocking UI on large updates.
  const deferredHosts = useDeferredValue(hosts)
  const { offset, limit, setSelectedId } = useTableParams('hostList')
  const mapHosts = useMemo(() => {
    if (deferredHosts.length > 100) {
      // group by country
      const groupedHosts = deferredHosts.reduce(
        (acc, host) => {
          const country = host.original.location.countryCode
          if (!acc[country]) {
            acc[country] = {
              type: 'group',
              id: host.original.id,
              activeContractsCount: host.original.contracts.length,
              location: {
                latitude: host.original.location.latitude,
                longitude: host.original.location.longitude,
                countryCode: host.original.location.countryCode,
              },
            }
          } else {
            acc[country].activeContractsCount += host.original.contracts.length
          }
          return acc
        },
        {} as {
          [key: string]: HostMapHost
        }
      )
      return Object.values(groupedHosts)
    }
    return deferredHosts
      .slice(offset, offset + limit)
      .map(({ original: host }) => {
        const hostData: HostMapHost = {
          id: host.id,
          publicKey: host.id,
          location: {
            latitude: host.location.latitude,
            longitude: host.location.longitude,
            countryCode: host.location.countryCode,
          },
          v2Settings: host.v2Settings,
          activeContractsCount: host.contracts.length,
          isUsable: true,
          activeContracts: host.contracts,
        }
        return hostData
      })
  }, [deferredHosts, offset, limit])
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Hosts ({hosts.length})
      </Heading>
      <HostMap
        hosts={mapHosts}
        activeHost={null}
        onHostMapClick={(id) => setSelectedId(id)}
        scale={180}
        showLegend={false}
      />
    </div>
  )
}
