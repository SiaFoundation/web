import { mock } from '../mockData'
import { Heading, HostMap, Text } from '@siafoundation/design-system'
import { HostMapHost } from '@siafoundation/design-system'
import { useTableParams } from '../useTableParams'
import { useMemo } from 'react'
import { DrawerContractsTable } from '../DrawerContractsTable'

export function HostDetailsDrawer() {
  const { selectedId } = useTableParams('hostList')
  const host = useMemo(
    () => mock.hosts.find((h) => h.id === selectedId),
    [selectedId]
  )
  const mapHost = useMemo(() => {
    if (!host) return null
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
  }, [host])
  if (!host) {
    return (
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <Text>Host not found</Text>
      </div>
    )
  }
  return (
    <div className="flex flex-col overflow-hidden" key={host?.id}>
      <Heading size="24" className="mb-2">
        {host?.dns}
      </Heading>
      <HostMap
        key={selectedId}
        hosts={mapHost ? [mapHost] : []}
        activeHost={mapHost}
        onHostMapClick={() => null}
        scale={180}
        showLegend={false}
      />
      <Text size="16" weight="medium" className="mt-4 mb-1">
        Contracts ({host?.contracts.length})
      </Text>
      <DrawerContractsTable
        scope="hostContracts"
        fixedFilters={[
          {
            id: 'hostPublicKey',
            value: host?.id,
          },
        ]}
      />
    </div>
  )
}
