import { Text, Button, DataTableState } from '@siafoundation/design-system'
import { useMemo } from 'react'
import { SidePanel } from '../SidePanel'
import { BlockedObjectData } from './types'
import { BulkObjectUnblock } from './bulkActions/BulkObjectUnblock'

export function SidePanelBlockedObjectList({
  table,
}: {
  table: DataTableState<BlockedObjectData>
}) {
  const objects = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  return (
    <SidePanel
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected objects (${objects.length})`
            : 'All blocked objects'}
        </Text>
      }
      customCloseAction={
        table.isSelection ? (
          <Button onClick={() => table.setRowSelection({})}>
            Clear selection
          </Button>
        ) : null
      }
      actions={
        table.isSelection ? (
          <BulkObjectUnblock
            objects={objects}
            onSuccess={() => table.setRowSelection({})}
          />
        ) : null
      }
    >
      <Text color="subtle" className="flex justify-center pt-[50px]">
        Select an object to see its details
      </Text>
    </SidePanel>
  )
}
