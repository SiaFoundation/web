import * as React from 'react'
import { Button } from '@siafoundation/design-system'
import { Filter16 } from '@siafoundation/react-icons'
import { type Column } from '@tanstack/react-table'

interface CellFilterProps<T, V> {
  column: Column<T, V>
  value: string | boolean
  children: React.ReactNode
}

export function CellFilter<T, V>({
  column,
  value,
  children,
}: CellFilterProps<T, V>) {
  const currentFilter = column.getFilterValue()

  // Check if this value is currently being filtered
  const isCurrentFilter = currentFilter === value

  const handleFilter = (e: React.MouseEvent) => {
    e.stopPropagation() // Prevent row click

    if (isCurrentFilter) {
      // If this value is already filtered, clear the filter
      column.setFilterValue(undefined)
    } else {
      // Apply filter for this value
      column.setFilterValue(value)
    }
  }

  return (
    <div className="w-full relative group">
      {children}

      {/* Filter button appears on hover or when this value is filtered - absolutely positioned relative to td */}
      <div
        className={`hidden group-hover:flex absolute right-1 top-0 h-full items-center justify-center`}
      >
        <Button
          variant="ghost"
          size="none"
          onClick={handleFilter}
          className={`transition-opacity z-10 ${
            isCurrentFilter
              ? 'opacity-100 text-blue-600 dark:text-blue-400'
              : 'opacity-0 group-hover:opacity-100 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300'
          }`}
        >
          <div>
            <Filter16 className="h-3 w-3" />
          </div>
        </Button>
      </div>
    </div>
  )
}
