import {
  Heading,
  HostMap,
  Separator,
  Text,
  ValueCopyable,
} from '@siafoundation/design-system'
import { useDataTableParams } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { useContracts } from './useContracts'
import { UsabilityBadges } from '../UsabilityBadges'
import { StateBadge, StatusBadge } from './contractsColumns'
import { InfoRow } from '../InfoRow'

export function SidePanelContract() {
  const { selectedId } = useDataTableParams('contractList')
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
      <div className="flex flex-col items-center justify-center overflow-hidden">
        <Text>Contract not found</Text>
      </div>
    )
  }
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mr-[50px] truncate">
        Contract: {contract?.id}
      </Heading>
      <HostMap
        hosts={mapContract ? [mapContract] : []}
        activeHost={null}
        onHostMapClick={() => null}
        showLegend={false}
        scale={180}
      />
      <Separator className="mb-2" />
      <Text size="16" weight="medium" className="mb-2">
        Info
      </Text>
      <div className="flex flex-col gap-2">
        <InfoRow label="State" value={<StateBadge value={contract.state} />} />
        <InfoRow
          label="Status"
          value={<StatusBadge value={contract.good ? 'Good' : 'Bad'} />}
        />
        <InfoRow
          label="Host public key"
          value={
            <ValueCopyable value={contract.hostKey} type="hostPublicKey" />
          }
        />
        {contract.host?.addresses.map((address) => (
          <InfoRow
            key={address.address}
            label={address.protocol}
            value={<ValueCopyable value={address.address} maxLength={24} />}
          />
        ))}
      </div>
      <Separator className="mt-4 mb-2" />
      <Text size="16" weight="medium" className="mb-2">
        Usability
      </Text>
      <UsabilityBadges
        usable={contract.host?.usable || false}
        usability={contract.host?.usability}
        className="w-full overflow-hidden flex-wrap"
      />
    </div>
  )
}
