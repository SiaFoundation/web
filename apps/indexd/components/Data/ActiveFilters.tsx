import * as React from 'react'
import {
  Button,
  ControlGroup,
  Text,
  truncate,
} from '@siafoundation/design-system'
import { Close16, Filter20 } from '@siafoundation/react-icons'
import { ColumnFiltersState, type Table } from '@tanstack/react-table'

interface ActiveFiltersProps<T> {
  table: Table<T>
  entityLabel: string
  fixedFilters?: ColumnFiltersState
  onClickFilterIcon?: () => void
  /** Optional view select dropdown to render after the filter icon. */
  viewSelect?: React.ReactNode
}

export function ActiveFilters<T>({
  table,
  entityLabel,
  fixedFilters,
  onClickFilterIcon,
  viewSelect,
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

  const getValueDisplayName = (columnId: string, value: any): string => {
    const column = table.getColumn(columnId)

    // Check if column has meta information for custom formatting
    const meta = column?.columnDef.meta as any
    if (meta?.formatFilterValue) {
      return meta.formatFilterValue(value)
    }

    // Handle boolean values
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }

    // Handle special known cases for better UX
    if (columnId === 'country' || columnId === 'countryCode') {
      const countryFlag = getCountryFlag(value)
      const countryName = getCountryName(value)
      return `${countryFlag} ${countryName}`
    }

    // Default: just stringify the value
    return truncate(String(value), 20)
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
      {viewSelect && viewSelect}
      <div className="flex items-center gap-2 flex-wrap">
        {columnFilters.map((filter) => (
          <ControlGroup key={filter.id}>
            <Button variant="gray" size="small">
              {getColumnDisplayName(filter.id)}
            </Button>
            <Button variant="gray" size="small">
              is
            </Button>
            <Button variant="gray" size="small">
              {getValueDisplayName(filter.id, filter.value)}
            </Button>
            {fixedFilters?.find((f) => f.id === filter.id) ? null : (
              <Button
                variant="gray"
                size="small"
                onClick={() => clearFilter(filter.id)}
                className="hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300"
              >
                <Close16 className="h-3 w-3" />
              </Button>
            )}
          </ControlGroup>
        ))}

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

function getCountryFlag(cc: string) {
  if (!cc) return '🌍'
  const codePoints = cc
    .toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

function getCountryName(cc: string): string {
  const countryNames: Record<string, string> = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    JP: 'Japan',
    AU: 'Australia',
    NL: 'Netherlands',
    SE: 'Sweden',
    SG: 'Singapore',
    // Add more as needed
  }
  return countryNames[cc] || cc
}
