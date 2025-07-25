import { mock } from '../mockData'
import { DatumCard, Heading, HostMap } from '@siafoundation/design-system'
import { useTableParams } from '../useTableParams'
import { useMemo } from 'react'
import { uniqBy } from '@technically/lodash'

export function ContractListDrawer() {
  const { offset, limit } = useTableParams('contractList')
  const mapContracts = useMemo(() => {
    const hosts = mock.contracts.slice(offset, offset + limit).map((c) => ({
      id: c.host.id,
      activeContractsCount: c.host.contracts.length,
      isUsable: c.state === 'active',
      activeContracts: [c],
      publicKey: c.host.id,
      location: c.host.location,
      v2Settings: c.host.v2Settings,
    }))
    return uniqBy(hosts, 'publicKey')
  }, [offset, limit])

  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Contracts
      </Heading>
      <DatumCard
        label="Total Filtered Contracts"
        value={mock.contracts.length}
      />
      <HostMap
        hosts={mapContracts}
        activeHost={null}
        onHostMapClick={() => null}
        showLegend={false}
        scale={180}
      />
    </div>
  )
}
