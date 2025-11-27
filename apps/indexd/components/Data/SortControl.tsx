import { Button, Popover, Text, Tooltip } from '@siafoundation/design-system'
import { Close16 } from '@siafoundation/react-icons'
import { Table, ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'
import { SortIcon } from './SortIcon'

interface SortControlProps<T> {
  table: Table<T>
  columns: ColumnDef<T>[]
}

function formatColumnId(id: string): string {
  return id
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim()
}

export function SortControl<T>({ table, columns }: SortControlProps<T>) {
  const sortingState = table.getState().sorting

  const sortedColumns = useMemo(() => {
    return sortingState.map((sort) => {
      const column = table.getColumn(sort.id)
      const columnDef = columns.find((col) => col.id === sort.id)

      // Get header label - check if it's a string, otherwise format the ID
      let headerText = sort.id
      if (columnDef?.header && typeof columnDef.header === 'string') {
        headerText = columnDef.header
      } else {
        headerText = formatColumnId(sort.id)
      }

      return {
        id: sort.id,
        header: headerText,
        direction: (sort.desc ? 'desc' : 'asc') as 'asc' | 'desc',
        sortIndex: column?.getSortIndex() ?? -1,
      }
    })
  }, [sortingState, table, columns])

  if (sortingState.length === 0) {
    return null
  }

  const handleToggleDirection = (columnId: string, currentDesc: boolean) => {
    const column = table.getColumn(columnId)
    column?.toggleSorting(!currentDesc, true)
  }

  const handleRemove = (columnId: string) => {
    const column = table.getColumn(columnId)
    column?.clearSorting()
  }

  return (
    <Popover
      trigger={
        <Button size="small">
          <div className="flex items-center gap-1">
            <Text size="12" weight="medium" color="subtle">
              Order by
            </Text>
            <Text size="12" weight="medium" color="contrast">
              {sortingState.length === 1
                ? sortedColumns[0].header
                : `${sortingState.length} columns`}
            </Text>
          </div>
        </Button>
      }
      contentProps={{
        align: 'end',
        side: 'bottom',
        className: 'w-auto z-30',
        onOpenAutoFocus: (e) => e.preventDefault(),
      }}
    >
      <div className="p-1">
        {sortedColumns.map((sorted) => {
          return (
            <div
              key={sorted.id}
              className="flex items-center gap-1 justify-end min-w-0 p-1.5 rounded"
            >
              <Text size="12" className="truncate min-w-0 flex-1 text-right">
                {sorted.header}
              </Text>
              <div className="flex items-center gap-0.5 shrink-0">
                <Tooltip
                  content="Remove this sort"
                  side="bottom"
                  delayDuration={1200}
                >
                  <Button
                    variant="ghost"
                    size="none"
                    onClick={() => handleRemove(sorted.id)}
                    className="group shrink-0 w-3.5 h-3.5 p-0 relative flex items-center justify-center"
                  >
                    <span className="text-[10px] leading-none font-medium absolute inset-0 flex items-center justify-center group-hover:hidden">
                      {sorted.sortIndex + 1}
                    </span>
                    <Close16 className="w-2.5 h-2.5 hidden group-hover:block absolute inset-0 m-auto" />
                  </Button>
                </Tooltip>
                <Button
                  variant="ghost"
                  size="none"
                  icon="contrast"
                  onClick={() =>
                    handleToggleDirection(
                      sorted.id,
                      sorted.direction === 'desc',
                    )
                  }
                  className="shrink-0"
                >
                  <SortIcon direction={sorted.direction} />
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </Popover>
  )
}
