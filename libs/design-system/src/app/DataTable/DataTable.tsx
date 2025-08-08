'use client'

import { cx } from 'class-variance-authority'
import React, { useMemo } from 'react'
import {
  ColumnFiltersState,
  flexRender,
  type Row,
  type Table,
} from '@tanstack/react-table'
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual'
import { Label } from '../../core/Label'
import { Panel } from '../../core/Panel'
import { Select, Option } from '../../core/Select'
import { DataTablePaginatorKnownTotal } from './DataTablePaginatorKnownTotal'
import { ActiveFilters } from './ActiveFilters'

interface DataTableProps<T extends { id: string }> {
  fixedFilters?: ColumnFiltersState
  table: Table<T>
  virtualRows: VirtualItem[]
  totalSize: number
  rowHeight: number
  tableContainerRef: React.RefObject<HTMLDivElement | null>
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
  rows: Row<T>[]
  className?: string
  selectedRowId?: string
  onRowClick?: (id: string) => void
  offset: number
  limit: number
  onClickFilterIcon?: () => void
  /** Optional heading to render after the filter icon. */
  heading?: React.ReactNode
}

const defaultWidth = 100

type ColumnMeta = {
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  stopPropagation?: boolean
}

export function DataTable<T extends { id: string }>({
  fixedFilters,
  table,
  virtualRows,
  totalSize,
  rowHeight,
  tableContainerRef,
  rowVirtualizer,
  rows,
  className,
  selectedRowId,
  onRowClick,
  offset,
  limit,
  onClickFilterIcon,
  heading,
}: DataTableProps<T>) {
  const filteredTotal = table.getFilteredRowModel().rows.length

  // Build a shared grid template based on visible columns and their meta.
  const visibleLeafColumns = table.getVisibleLeafColumns()
  const gridTemplateColumns = useMemo(() => {
    return visibleLeafColumns
      .map((col) => {
        const meta = (col.columnDef.meta ?? {}) as ColumnMeta
        const width = toCssSize(meta.width)
        if (width) return width
        const min = toCssSize(meta.minWidth) ?? `${defaultWidth}px`
        const max = toCssSize(meta.maxWidth) ?? '1fr'
        return `minmax(${min}, ${max})`
      })
      .join(' ')
  }, [visibleLeafColumns])

  return (
    <Panel
      className={cx(
        '@container flex flex-col h-full w-full overflow-hidden',
        className,
      )}
    >
      <div className="z-10 flex items-center justify-between gap-4 bg-white dark:bg-graydark-200 py-2 px-1.5 border-b border-gray-200 dark:border-graydark-400">
        <ActiveFilters
          fixedFilters={fixedFilters}
          table={table}
          onClickFilterIcon={onClickFilterIcon}
          heading={heading}
        />
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={tableContainerRef}
          className="relative w-full h-full overflow-auto"
        >
          <div className="min-w-fit">
            <table className="text-sm" style={{ display: 'grid' }}>
              <thead className="sticky top-0 z-10 bg-white dark:bg-graydark-200 border-b border-gray-100 dark:border-graydark-300">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    style={{
                      display: 'grid',
                      width: '100%',
                      gridTemplateColumns,
                    }}
                  >
                    {headerGroup.headers.map((header) => {
                      const meta = (header.column.columnDef.meta ??
                        {}) as ColumnMeta
                      const { className } = meta
                      return (
                        <th
                          key={header.id}
                          className={cx(
                            'px-2 py-2 overflow-hidden border-r border-gray-50/50 dark:border-graydark-300/20',
                            className,
                          )}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </th>
                      )
                    })}
                  </tr>
                ))}
              </thead>
              <tbody
                style={{
                  display: 'grid',
                  height: `${totalSize}px`,
                  position: 'relative',
                }}
              >
                {virtualRows.map((virtualRow) => {
                  const row = rows[virtualRow.index]
                  return (
                    <tr
                      key={row.id}
                      data-index={virtualRow.index}
                      ref={(node) => rowVirtualizer.measureElement(node)}
                      style={{
                        display: 'grid',
                        position: 'absolute',
                        transform: `translateY(${virtualRow.start}px)`,
                        height: `${rowHeight}px`,
                        width: '100%',
                        gridTemplateColumns,
                      }}
                      className={cx(
                        'cursor-pointer transition-colors',
                        selectedRowId === row.original.id
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-blue-100 dark:hover:bg-blue-900/40',
                        'border-b border-gray-50 dark:border-graydark-300',
                      )}
                      onClick={() => onRowClick?.(row.original.id)}
                    >
                      {row.getVisibleCells().map((cell) => {
                        const meta = (cell.column.columnDef.meta ??
                          {}) as ColumnMeta
                        const { className, stopPropagation } = meta
                        return (
                          <td
                            key={cell.id}
                            onClick={(e) => {
                              if (stopPropagation) {
                                e.stopPropagation()
                              }
                            }}
                            className={cx(
                              'relative overflow-hidden whitespace-nowrap text-ellipsis px-2 py-1',
                              'flex items-center',
                              'border-r border-gray-50/50 dark:border-graydark-300/20',
                              className,
                            )}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="z-10 flex items-center justify-end gap-4 bg-white dark:bg-graydark-200 py-2 px-4 border-t border-gray-200 dark:border-graydark-400">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Label
              htmlFor="page-size"
              className="text-xs text-neutral-500 hidden @md:block"
            >
              Rows per page
            </Label>
            <Select
              id="page-size"
              className="border rounded px-2 py-1 text-xs"
              value={table.getState().pagination.pageSize.toString()}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[25, 50, 100, 1000, 10000].map((size) => (
                <Option key={size} value={size.toString()}>
                  {size.toLocaleString()}
                </Option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <DataTablePaginatorKnownTotal
              offset={offset}
              limit={limit}
              total={filteredTotal}
              isLoading={false}
              firstPage={() => table.firstPage()}
              previousPage={() => table.previousPage()}
              nextPage={() => table.nextPage()}
              lastPage={() => table.lastPage()}
            />
          </div>
        </div>
      </div>
    </Panel>
  )
}

function toCssSize(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined
  if (typeof value === 'number') return `${value}px`
  return value
}
