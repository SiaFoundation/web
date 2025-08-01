import {
  Heading,
  HostMap,
  useDataTableParams,
} from '@siafoundation/design-system'
import { ContractData } from './types'
import { Row } from '@tanstack/react-table'
import { useMapHosts } from '../useMapHosts'

export function SidePanelContractList({
  contracts,
}: {
  contracts: Row<ContractData>[]
}) {
  const { setSelectedId } = useDataTableParams('contractList')
  const mapHosts = useMapHosts({
    hosts: contracts.map((contract) => ({
      ...contract.original,
      settings: contract.original.host?.settings,
      usable: contract.original.host?.usable,
      location: contract.original.host?.location,
    })),
  })
  return (
    <div className="flex flex-col overflow-hidden">
      <Heading size="24" className="mb-2">
        Contracts ({contracts.length})
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
