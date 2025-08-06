import {
  HostMap,
  Text,
  truncate,
  ValueCopyable,
} from '@siafoundation/design-system'
import { useDataTableParams } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { UsabilityBadges } from '../UsabilityBadges'
import { StateBadge, StatusBadge } from './contractsColumns'
import { InfoRow } from '../InfoRow'
import { SidePanel } from '../SidePanel'
import { SidePanelSection } from '../SidePanelSection'
import { useContracts } from './useContracts'

export function SidePanelContract() {
  const { selectedId, setSelectedId } = useDataTableParams('contractList')
  const contracts = useContracts()
  const contract = useMemo(
    () => contracts.find((c) => c.id === selectedId),
    [selectedId, contracts],
  )
  const mapContract = useMemo(() => {
    if (!contract) return null
    return {
      id: contract.hostKey,
      publicKey: contract.hostKey,
      location: contract.host?.location,
      v2Settings: contract.host?.settings,
      usable: contract.host?.usable,
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
    <SidePanel
      onClose={() => setSelectedId(undefined)}
      heading={
        <Text size="18" weight="medium" ellipsis>
          Contract: {truncate(contract?.id, 24)}
        </Text>
      }
    >
      <HostMap
        hosts={mapContract ? [mapContract] : []}
        activeHost={null}
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
              <ValueCopyable value={contract.hostKey} type="hostPublicKey" />
            }
          />
          {contract.host?.addresses.map((address) => (
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
          usable={contract.host?.usable || false}
          usability={contract.host?.usability}
          className="w-full overflow-hidden flex-wrap"
        />
      </SidePanelSection>
    </SidePanel>
  )
}
