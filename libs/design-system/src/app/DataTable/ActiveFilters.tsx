'use client'

import { Button } from '../../core/Button'
import { countryCodeEmoji, getCountryName } from '@siafoundation/units'
import { truncate } from '../../lib/utils'
import { Close16, Filter20 } from '@siafoundation/react-icons'
import { ColumnFiltersState, type Table } from '@tanstack/react-table'

interface ActiveFiltersProps<T> {
  table: Table<T>
  fixedFilters?: ColumnFiltersState
  onClickFilterIcon?: () => void
  heading?: React.ReactNode
}

export function ActiveFilters<T>({
  table,
  fixedFilters,
  onClickFilterIcon,
  heading,
}: ActiveFiltersProps<T>) {
  const columnFilters = table.getState().columnFilters

  const getColumnDisplayName = (columnId: string): string => {
    const column = table.getColumn(columnId)
    if (!column) return columnId

    // Try to extract a readable name from the column definition
    const header = column.columnDef.header

    // If header is a string, use it
    if (typeof header === 'string') {
      return header
    }

    // Otherwise, use a formatted version of the column ID
    return columnId
      .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
      .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
      .trim()
  }

  const getValueDisplayName = (columnId: string, value: unknown): string => {
    const column = table.getColumn(columnId)

    // Check if column has meta information for custom formatting
    const meta = column?.columnDef.meta as {
      formatFilterValue?: (value: unknown) => string
    }
    if (meta?.formatFilterValue) {
      return meta.formatFilterValue(value)
    }

    // Handle boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }

    // Handle special known cases for better UX
    if (columnId === 'country' || columnId === 'countryCode') {
      const countryFlag = countryCodeEmoji(value as string)
      const countryName = getCountryName(value as string)
      return `${countryFlag} ${countryName}`
    }

    // Default: just stringify the value
    return truncate(String(value), 20)
  }

  const getBooleanDisplayLabel = (columnId: string, value: boolean): string => {
    const columnName = getColumnDisplayName(columnId)

    // Default boolean display
    return value ? columnName : `Not ${columnName}`
  }

  const getDisplayLabel = (columnId: string, value: unknown): string => {
    const columnName = getColumnDisplayName(columnId)
    return `${columnName} is ${getValueDisplayName(columnId, value)}`
  }

  const isBooleanFilter = (value: unknown): value is boolean => {
    return typeof value === 'boolean'
  }

  const clearFilter = (columnId: string) => {
    const column = table.getColumn(columnId)
    column?.setFilterValue(undefined)
  }

  const clearAllFilters = () => {
    table.resetColumnFilters()
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="ghost" size="none" onClick={onClickFilterIcon}>
        <Filter20 />
      </Button>
      {heading}
      <div className="flex items-center gap-2 flex-wrap">
        {columnFilters.map((filter) => {
          const isFixed = fixedFilters?.find((f) => f.id === filter.id)

          return (
            <Button
              key={filter.id}
              variant="gray"
              size="small"
              onClick={isFixed ? undefined : () => clearFilter(filter.id)}
              className={
                isFixed
                  ? undefined
                  : 'hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300'
              }
            >
              {isBooleanFilter(filter.value)
                ? getBooleanDisplayLabel(filter.id, filter.value)
                : getDisplayLabel(filter.id, filter.value)}
              {!isFixed && <Close16 className="ml-1 h-3 w-3" />}
            </Button>
          )
        })}

        {columnFilters.length > 1 &&
          columnFilters.length > (fixedFilters?.length ?? 0) && (
            <Button
              variant="ghost"
              size="small"
              onClick={clearAllFilters}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear all
            </Button>
          )}
      </div>
    </div>
  )
}
