import {
  HostMap,
  Text,
  ValueCopyable,
  CountryFlag,
  RemoteDataStates,
  ValueWithTooltip,
  Badge,
  Tooltip,
} from '@siafoundation/design-system'
import { CheckmarkFilled16, CloseFilled16 } from '@siafoundation/react-icons'
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
import { SidePanelSkeleton } from '../SidePanelSkeleton'
import { BlockReasons } from './BlockReasons'

export function SidePanelHost() {
  const { panelId, setPanelId } = useHostsParams()
  const host = useHost(panelId)
  const mapHost = useMemo(() => {
    if (!host.data || host.data?.location.countryCode === 'unknown') return null
    const hostData: HostMapHost = {
      id: host.data.id,
      publicKey: host.data.publicKey,
      location: host.data.location,
      v2Settings: host.data.settings,
      usable: host.data.usable,
    }
    return hostData
  }, [host])
  return (
    <RemoteDataStates
      data={host}
      loading={
        <SidePanelSkeleton
          withMap
          withActions
          onClose={() => setPanelId(undefined)}
        />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Host not found</Text>
          </div>
        </SidePanel>
      }
      loaded={(host) => (
        <SidePanel
          onClose={() => setPanelId(undefined)}
          heading={
            host ? (
              <SidePanelHeadingCopyable
                heading={
                  <Text size="18" weight="medium" ellipsis>
                    {host.location?.countryCode ? (
                      <span className="pr-1">
                        <CountryFlag countryCode={host.location?.countryCode} />
                      </span>
                    ) : null}
                  </Text>
                }
                value={host.addresses[0].address}
                label="host"
              />
            ) : null
          }
          actions={
            host ? (
              host.blocked ? (
                <BulkHostBlocklistRemove hosts={[host]} />
              ) : (
                <BulkHostBlocklistAdd hosts={[host]} />
              )
            ) : null
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
          <SidePanelSection heading="Info">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Public Key"
                value={<ValueCopyable value={host.id} type="hostPublicKey" />}
              />
              <InfoRow
                label="Location"
                value={
                  host.location.countryCode !== 'unknown' && (
                    <Text>
                      {host.displayFields.countryFlag}{' '}
                      {host.location.countryCode}
                    </Text>
                  )
                }
              />
              <InfoRow label="Uptime" value={host.displayFields.uptime} />
              <InfoRow label="Release" value={host.displayFields.release} />
              <div className="flex flex-col gap-1">
                <InfoRow
                  label="Blocked"
                  value={
                    <div className="flex items-center gap-1">
                      <Tooltip
                        content={
                          host.blocked
                            ? 'host is blocked'
                            : 'host is not blocked'
                        }
                      >
                        {host.blocked ? (
                          <CloseFilled16 className="text-red-500" />
                        ) : (
                          <CheckmarkFilled16 className="text-neutral-300 dark:text-neutral-500" />
                        )}
                      </Tooltip>
                    </div>
                  }
                />
                <BlockReasons host={host} />
              </div>
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Usability">
            <UsabilityBadges
              usable={host.usable}
              usability={host.usability}
              className="w-full overflow-hidden flex-wrap"
            />
          </SidePanelSection>
          <SidePanelSection heading="Addresses">
            <div className="flex flex-col gap-2">
              {host.addresses.map((address) => (
                <InfoRow
                  key={address.address + address.protocol}
                  label={address.protocol}
                  value={
                    <ValueCopyable value={address.address} maxLength={24} />
                  }
                />
              ))}
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Storage">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Total Storage"
                value={host.displayFields.totalStorage}
              />
              <InfoRow
                label="Remaining Storage"
                value={host.displayFields.remainingStorage}
              />
            </div>
          </SidePanelSection>
          <SidePanelSection heading="Pricing & Limits">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Storage Price"
                value={
                  <ValueWithTooltip {...host.displayFields.storagePrice} />
                }
              />
              <InfoRow
                label="Ingress Price"
                value={
                  <ValueWithTooltip {...host.displayFields.ingressPrice} />
                }
              />
              <InfoRow
                label="Egress Price"
                value={<ValueWithTooltip {...host.displayFields.egressPrice} />}
              />
              <InfoRow
                label="Free Sector Price"
                value={
                  <ValueWithTooltip {...host.displayFields.freeSectorPrice} />
                }
              />
              <InfoRow
                label="Max Collateral"
                value={
                  <ValueWithTooltip {...host.displayFields.maxCollateral} />
                }
              />
              <InfoRow
                label="Max Contract Duration"
                value={host.displayFields.maxContractDuration}
              />
              <InfoRow
                label="Protocol Version"
                value={host.displayFields.protocolVersion}
              />
              <InfoRow
                label="Price Validity"
                value={host.displayFields.priceValidity}
              />
            </div>
          </SidePanelSection>
        </SidePanel>
      )}
    />
  )
}
