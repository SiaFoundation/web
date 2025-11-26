import {
  Button,
  Tooltip,
  DataTableColumnDef,
} from '@siafoundation/design-system'
import { Close16 } from '@siafoundation/react-icons'
import { Table } from '@tanstack/react-table'
import { SortIcon } from './SortIcon'

interface ColumnSortProps<T> {
  columnId: string
  table: Table<T>
}

export function ColumnSort<T>({ columnId, table }: ColumnSortProps<T>) {
  const column = table.getColumn(columnId)
  const isSorted = column?.getIsSorted()
  const columnDef = column?.columnDef as DataTableColumnDef<T> | undefined
  const sortKey = columnDef?.sortKey
  const sortingState = table.getState().sorting
  const sortIndex = column?.getSortIndex() ?? -1
  const hasMultipleSorts = sortingState.length > 1
  const sortOrder = sortIndex >= 0 ? sortIndex + 1 : null

  if (!sortKey) {
    return null
  }

  const handleCaretClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (isSorted === 'asc') {
      // Toggle to desc - always use multi-sort mode to preserve other sorts and position
      column?.toggleSorting(true, true)
    } else if (isSorted === 'desc') {
      // Toggle to asc - always use multi-sort mode to preserve other sorts and position
      column?.toggleSorting(false, true)
    } else {
      // Not sorted: add sort (asc by default)
      if (sortingState.length > 0) {
        // Other sorts exist
        if (e.shiftKey) {
          // Shift-click: add as additional sort
          column?.toggleSorting(false, true)
        } else {
          // Normal click: reset to just this sort (replace all)
          column?.toggleSorting(false, false)
        }
      } else {
        // No other sorts: add normally (single sort)
        column?.toggleSorting(false, false)
      }
    }
  }

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    column?.clearSorting()
  }

  return (
    <div className="flex items-center gap-0.5 group">
      {isSorted ? (
        <Tooltip content="Remove this sort" side="bottom" delayDuration={1200}>
          <Button
            size="none"
            onClick={handleRemoveClick}
            className="p-1 text-xxs"
          >
            {hasMultipleSorts ? (
              <>
                <div className="w-2.5 h-2.5 flex items-center justify-center group-hover:hidden">
                  {sortOrder}
                </div>
                <Close16 className="w-2.5 h-2.5 hidden group-hover:block" />
              </>
            ) : (
              <Close16 className="w-2.5 h-2.5" />
            )}
          </Button>
        </Tooltip>
      ) : null}
      {!isSorted && sortingState.length > 0 ? (
        <Tooltip content="Shift click to apply additional sort" side="bottom">
          <Button
            variant="ghost"
            size="none"
            icon="verySubtle"
            onClick={handleCaretClick}
            className="shrink-0"
          >
            <SortIcon direction={false} />
          </Button>
        </Tooltip>
      ) : (
        <Button
          variant="ghost"
          size="none"
          icon={isSorted ? 'contrast' : 'verySubtle'}
          onClick={handleCaretClick}
          className="shrink-0"
        >
          <SortIcon
            direction={
              isSorted === 'asc' ? 'asc' : isSorted === 'desc' ? 'desc' : false
            }
          />
        </Button>
      )}
    </div>
  )
}
