import { Text, Button, DataTableState } from '@siafoundation/design-system'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'
import { QuotaData } from '../../../lib/quota'
import { BulkQuotaDelete } from './bulkActions/BulkQuotaDelete'

export function SidePanelQuotaList({
  table,
}: {
  table: DataTableState<QuotaData>
}) {
  const quotas = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  return (
    <SidePanel
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected quotas (${quotas.length})`
            : table.isFiltered
              ? `Filtered quotas (${quotas.length})`
              : 'All quotas'}
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
          <BulkQuotaDelete
            quotas={quotas}
            onSuccess={() => table.setRowSelection({})}
          />
        ) : null
      }
    >
      <Text color="subtle" className="flex justify-center pt-[50px]">
        No information on quotas yet
      </Text>
    </SidePanel>
  )
}
