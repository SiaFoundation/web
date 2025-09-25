import {
  HostMap,
  Text,
  Button,
  DataTableState,
} from '@siafoundation/design-system'
import { ContractData } from './types'
import { useMapHosts } from '../useMapHosts'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'
import { useContractsParams } from './useContractsParams'
import { MetricsContracts } from '../../Metrics/MetricsContracts'

export function SidePanelContractList({
  table,
}: {
  table: DataTableState<ContractData>
}) {
  const { setPanelId } = useContractsParams()
  const contracts = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  const mapHosts = useMapHosts({
    hosts: contracts.map((contract) => ({
      ...contract.original,
      settings: contract.original.host?.v2Settings,
      location: contract.original.host?.location,
      usable: contract.original.good,
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
        onHostMapClick={(id) => setPanelId(id)}
        scale={180}
        mapClassName="-mt-[20px]"
      />
      {!table.isFiltered && !table.isSelection && <MetricsContracts />}
    </SidePanel>
  )
}
