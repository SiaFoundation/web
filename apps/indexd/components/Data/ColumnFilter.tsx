import * as React from 'react'
import { Popover, Button, Text } from '@siafoundation/design-system'
import { Filter16 } from '@siafoundation/react-icons'
import { Table } from '@tanstack/react-table'
import { CountryFilter } from './CountryFilter'

interface ColumnFilterProps<T extends { countryCode: string }> {
  columnId: string
  table: Table<T>
}

export function ColumnFilter<T extends { countryCode: string }>({
  columnId,
  table,
}: ColumnFilterProps<T>) {
  const [open, setOpen] = React.useState(false)
  const column = table.getColumn(columnId)
  const isFiltered = column?.getIsFiltered()

  // Don't render if column can't be filtered
  if (!column?.getCanFilter()) {
    return null
  }

  const trigger = (
    <Button
      variant="ghost"
      size="none"
      className={`block transition-colors ${
        isFiltered
          ? 'text-blue-600 dark:text-blue-400 opacity-100'
          : 'text-gray-300 hover:text-gray-500 dark:text-graydark-200 dark:hover:text-white opacity-60 hover:opacity-80'
      }`}
    >
      <Filter16 />
    </Button>
  )

  return (
    <Popover
      trigger={trigger}
      rootProps={{ open, onOpenChange: setOpen }}
      contentProps={{ align: 'end', className: 'w-64' }}
    >
      <div className="p-3 space-y-3">
        <Text size="14" weight="medium">
          Filter {column.id === 'countryCode' ? 'Country' : column.id}
        </Text>

        {/* Render specific filter component based on column */}
        {column.id === 'countryCode' && <CountryFilter table={table} />}

        {/* Clear filter button */}
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
