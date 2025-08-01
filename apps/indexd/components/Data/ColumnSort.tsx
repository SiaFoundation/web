import { Button } from '@siafoundation/design-system'
import {
  ChevronSort16,
  ChevronSortDown16,
  ChevronSortUp16,
} from '@siafoundation/react-icons'
import { Table } from '@tanstack/react-table'

interface ColumnSortProps<T> {
  columnId: string
  table: Table<T>
}

export function ColumnSort<T>({ columnId, table }: ColumnSortProps<T>) {
  const column = table.getColumn(columnId)
  const isSorted = column?.getIsSorted()

  if (!column?.getCanSort()) {
    return null
  }

  return (
    <Button
      variant="ghost"
      size="none"
      icon={isSorted ? 'contrast' : 'verySubtle'}
      onClick={() => {
        if (isSorted === 'asc') {
          column?.toggleSorting(true)
        } else if (isSorted === 'desc') {
          column?.clearSorting()
        } else {
          column?.toggleSorting(false)
        }
      }}
    >
      {isSorted === 'asc' ? (
        <ChevronSortUp16 />
      ) : isSorted === 'desc' ? (
        <ChevronSortDown16 />
      ) : (
        <ChevronSort16 />
      )}
    </Button>
  )
}
