import {
  HostMap,
  useDataTableParams,
  Text,
  Button,
  DataTableState,
} from '@siafoundation/design-system'
import { ContractData } from './types'
import { useMapHosts } from '../useMapHosts'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'

export function SidePanelContractList({
  table,
}: {
  table: DataTableState<ContractData>
}) {
  const { setSelectedId } = useDataTableParams('contractList')
  const contracts = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  const mapHosts = useMapHosts({
    hosts: contracts.map((contract) => ({
      ...contract.original,
      settings: contract.original.host?.settings,
      usable: contract.original.host?.usable,
      location: contract.original.host?.location,
    })),
  })
  return (
    <SidePanel
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected contracts (${contracts.length})`
            : table.isFiltered
              ? `Filtered contracts (${contracts.length})`
              : 'All contracts'}
        </Text>
      }
      customCloseAction={
        table.isSelection ? (
          <Button onClick={() => table.setRowSelection({})}>
            Clear selection
          </Button>
        ) : null
      }
    >
      <HostMap
        hosts={mapHosts}
        activeHost={null}
        onHostMapClick={(id) => setSelectedId(id)}
        scale={180}
        mapClassName="-mt-[20px]"
      />
    </SidePanel>
  )
}
