import {
  HostMap,
  Text,
  ValueCopyable,
  CountryFlag,
} from '@siafoundation/design-system'
import { HostMapHost } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { UsabilityBadges } from '../UsabilityBadges'
import { InfoRow } from '../PanelInfoRow'
import { SidePanel } from '../SidePanel'
import { BulkHostBlocklistAdd } from './bulkActions/BulkHostBlocklistAdd'
import { BulkHostBlocklistRemove } from './bulkActions/BulkHostBlocklistRemove'
import { SidePanelSection } from '../SidePanelSection'
import { useHost } from './useHost'
import { useHostsParams } from './useHostsParams'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'

export function SidePanelHost() {
  const { panelId, setPanelId } = useHostsParams()
  const host = useHost(panelId)
  const mapHost = useMemo(() => {
    if (!host || host.location.countryCode === 'unknown') return null
    const hostData: HostMapHost = {
      id: host.id,
      publicKey: host.publicKey,
      location: host.location,
      v2Settings: host.settings,
      usable: host.usable,
    }
    return hostData
  }, [host])
  if (!host) {
    return (
      <SidePanel heading={null}>
        <div className="flex justify-center pt-[50px]">
          <Text color="subtle">Host not found</Text>
        </div>
      </SidePanel>
    )
  }
  return (
    <SidePanel
      onClose={() => setPanelId(undefined)}
      heading={
        <SidePanelHeadingCopyable
          heading={
            <Text size="18" weight="medium" ellipsis>
              {host?.location?.countryCode ? (
                <span className="pr-1">
                  <CountryFlag countryCode={host?.location?.countryCode} />
                </span>
              ) : null}
            </Text>
          }
          value={host?.addresses[0].address}
          label="host"
        />
      }
      actions={
        host.blocked ? (
          <BulkHostBlocklistRemove hosts={[host]} />
        ) : (
          <BulkHostBlocklistAdd hosts={[host]} />
        )
      }
    >
      <HostMap
        key={panelId}
        hosts={mapHost ? [mapHost] : []}
        activeHost={mapHost}
        onHostMapClick={() => null}
        scale={180}
        mapClassName="-mt-[20px]"
      />
      <SidePanelSection heading="Addresses">
        <div className="flex flex-col gap-2">
          {host.addresses.map((address) => (
            <InfoRow
              key={address.address + address.protocol}
              label={address.protocol}
              value={<ValueCopyable value={address.address} maxLength={24} />}
            />
          ))}
        </div>
      </SidePanelSection>
      <SidePanelSection heading="Usability">
        <UsabilityBadges
          usable={host.usable}
          usability={host.usability}
          className="w-full overflow-hidden flex-wrap"
        />
      </SidePanelSection>
    </SidePanel>
  )
}
