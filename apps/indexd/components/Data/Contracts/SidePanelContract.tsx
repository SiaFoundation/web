import {
  HostMap,
  Text,
  ValueCopyable,
  RemoteDataStates,
} from '@siafoundation/design-system'
import { useMemo } from 'react'
import { UsabilityBadges } from '../UsabilityBadges'
import { StateBadge, StatusBadge } from './contractsColumns'
import { InfoRow } from '../PanelInfoRow'
import { SidePanel } from '../SidePanel'
import { SidePanelSection } from '../SidePanelSection'
import { useContract } from './useContract'
import { useContractsParams } from './useContractsParams'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import { SidePanelSkeleton } from '../SidePanelSkeleton'

export function SidePanelContract() {
  const { panelId, setPanelId } = useContractsParams()
  const contract = useContract(panelId)
  const mapContract = useMemo(() => {
    if (!contract.data?.contract) return null
    return {
      id: contract.data.contract.hostKey,
      publicKey: contract.data.contract.hostKey,
      location: contract.data.contract.host?.location,
      v2Settings: contract.data.contract.host?.v2Settings,
      usable: contract.data.contract.good,
    }
  }, [contract])
  if (!contract) {
    return (
      <SidePanel heading={null}>
        <div className="flex justify-center pt-[50px]">
          <Text color="subtle">Contract not found</Text>
        </div>
      </SidePanel>
    )
  }
  return (
    <RemoteDataStates
      data={contract}
      loading={
        <SidePanelSkeleton
          withMap
          withActions={false}
          onClose={() => setPanelId(undefined)}
        />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Contract not found</Text>
          </div>
        </SidePanel>
      }
      loaded={({ contract, host }) => (
        <SidePanel
          onClose={() => setPanelId(undefined)}
          heading={
            <SidePanelHeadingCopyable
              heading="Contract"
              value={contract?.id}
              label="contract"
            />
          }
        >
          <HostMap
            hosts={mapContract ? [mapContract] : []}
            activeHost={mapContract}
            onHostMapClick={() => null}
            scale={180}
            mapClassName="-mt-[20px]"
          />
          <SidePanelSection heading="Info">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="State"
                value={<StateBadge value={contract.state} />}
              />
              <InfoRow
                label="Status"
                value={<StatusBadge variant={contract.good ? 'good' : 'bad'} />}
              />
              <InfoRow
                label="Host public key"
                value={
                  <ValueCopyable
                    value={contract.hostKey}
                    type="hostPublicKey"
                  />
                }
              />
              {host.addresses?.map((address) => (
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
          <SidePanelSection heading="Usability">
            <UsabilityBadges
              usable={host?.usable || false}
              usability={host?.usability}
              className="w-full overflow-hidden flex-wrap"
            />
          </SidePanelSection>
        </SidePanel>
      )}
    />
  )
}
