import { Text, Button, DataTableState } from '@siafoundation/design-system'
import { AccountData } from './types'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'

export function SidePanelAccountList({
  table,
}: {
  table: DataTableState<AccountData>
}) {
  const accounts = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  return (
    <SidePanel
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected accounts (${accounts.length})`
            : table.isFiltered
              ? `Filtered accounts (${accounts.length})`
              : 'All accounts'}
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
        No information on accounts yet
      </Text>
    </SidePanel>
  )
}
