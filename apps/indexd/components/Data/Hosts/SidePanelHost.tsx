import {
  Heading,
  HostMap,
  Separator,
  Text,
  ValueCopyable,
  CountryFlag,
} from '@siafoundation/design-system'
import { HostMapHost } from '@siafoundation/design-system'
import { useDataTableParams } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useHosts } from './useHosts'
import { UsabilityBadges } from '../UsabilityBadges'
import { InfoRow } from '../InfoRow'

export function SidePanelHost() {
  const hosts = useHosts()
  const { selectedId } = useDataTableParams('hostList')
  const host = useMemo(
    () => hosts.find((h) => h.id === selectedId),
    [selectedId, hosts],
  )
  const mapHost = useMemo(() => {
    if (!host || host.location.countryCode === 'unknown') return null
    const hostData: HostMapHost = {
      id: host.id,
      publicKey: host.id,
      location: host.location,
      v2Settings: host.settings,
      usable: host.usable,
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
    <div className="flex flex-col" key={host?.id}>
      <Heading size="24">
        {host?.location?.countryCode ? (
          <span className="pr-1">
            <CountryFlag countryCode={host?.location?.countryCode} />
          </span>
        ) : null}
        {host?.addresses[0].address}
      </Heading>
      <HostMap
        key={selectedId}
        hosts={mapHost ? [mapHost] : []}
        activeHost={mapHost}
        onHostMapClick={() => null}
        scale={180}
        showLegend={false}
      />
      <Separator className="mt-4 mb-2" />
      <Text size="16" weight="medium" className="mb-2">
        Addresses
      </Text>
      <div className="flex flex-col gap-2">
        {host.addresses.map((address) => (
          <InfoRow
            key={address.address}
            label={address.protocol}
            value={
              <ValueCopyable
                className="justify-end"
                value={address.address}
                maxLength={24}
              />
            }
          />
        ))}
      </div>
      <Separator className="mt-4 mb-2" />
      <Text size="16" weight="medium" className="mb-2">
        Usability
      </Text>
      <UsabilityBadges
        usable={host.usable}
        usability={host.usability}
        className="w-full overflow-hidden flex-wrap"
      />
    </div>
  )
}
