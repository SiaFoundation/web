import { Text, Button } from '@siafoundation/design-system'
import { ContractDataTableState } from './types'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'
import { MetricsContracts } from '../../Metrics/MetricsContracts'

export function SidePanelContractList({
  table,
}: {
  table: ContractDataTableState
}) {
  const contracts = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
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
      {!table.isFiltered && !table.isSelection && <MetricsContracts />}
    </SidePanel>
  )
}
