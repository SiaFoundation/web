import { Popover, Button } from '@siafoundation/design-system'
import { Filter16 } from '@siafoundation/react-icons'
import { Table } from '@tanstack/react-table'
import { useState } from 'react'

interface ColumnFilterProps<T> {
  columnId: string
  table: Table<T>
  children: React.ReactNode
}

export function ColumnFilter<T>({
  columnId,
  table,
  children,
}: ColumnFilterProps<T>) {
  const [open, setOpen] = useState(false)
  const column = table.getColumn(columnId)
  const isFiltered = column?.getIsFiltered()

  if (!column?.getCanFilter()) {
    return null
  }

  return (
    <Popover
      trigger={
        <Button
          variant="ghost"
          size="none"
          icon={isFiltered ? 'contrast' : 'verySubtle'}
        >
          <Filter16 />
        </Button>
      }
      rootProps={{ open, onOpenChange: setOpen }}
      contentProps={{ align: 'end', className: 'w-64' }}
    >
      <div className="p-3 space-y-3">
        {children}
        {isFiltered && (
          <Button
            variant="ghost"
            size="small"
            onClick={() => {
              column.setFilterValue(undefined)
              setOpen(false)
            }}
            className="w-full"
          >
            Clear Filter
          </Button>
        )}
      </div>
    </Popover>
  )
}
