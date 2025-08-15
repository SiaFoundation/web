import { Text, Button, DataTableState } from '@siafoundation/design-system'
import { KeyData } from './types'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'

export function SidePanelKeyList({
  table,
}: {
  table: DataTableState<KeyData>
}) {
  const keys = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  return (
    <SidePanel
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected keys (${keys.length})`
            : table.isFiltered
              ? `Filtered keys (${keys.length})`
              : 'All keys'}
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
      <Text color="subtle" className="flex justify-center pt-[50px]">
        No information on keys yet
      </Text>
    </SidePanel>
  )
}
