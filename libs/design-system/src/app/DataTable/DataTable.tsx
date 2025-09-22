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
import { ActiveFilters } from './ActiveFilters'
import { DataTablePaginatorUnknownTotal } from './DataTablePaginatorUnknownTotal'
import { RemoteDatasetStates } from '../../remoteData/RemoteDatasetStates'
import { StateNoneOnPage } from '../../components/EmptyState/StateNoneOnPage'
import { StateNoneYet } from '../../components/EmptyState/StateNoneYet'
import { StateNoneMatching } from '../../components/EmptyState/StateNoneMatching'
import { StateError } from '../../components/EmptyState/StateError'
import { times } from '@technically/lodash'
import { RemoteDataset } from '../../remoteData/types'

interface DataTableProps<T extends { id: string }> {
  fixedFilters?: ColumnFiltersState
  table: Table<T>
  dataset: RemoteDataset<T[]>
  virtualRows: VirtualItem[]
  totalSize: number
  rowHeight: number
  tableContainerRef: React.RefObject<HTMLDivElement | null>
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
  rows: Row<T>[]
  isLoading?: boolean
  className?: string
  selectedRowId?: string
  onRowClick?: (id: string) => void
  offset: number
  limit: number
  onClickFilterIcon?: () => void
  /** Optional heading to render after the filter icon. */
  heading?: React.ReactNode
  actions?: React.ReactNode
  // custom state for loading, error, etc.
  noneOnPage?: React.ReactNode
  noneYet?: React.ReactNode
  noneMatchingFilters?: React.ReactNode
  error?: React.ReactNode
}

const defaultWidth = 100
const columnGap = 20

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
  isLoading,
  rows,
  className,
  selectedRowId,
  onRowClick,
  offset,
  limit,
  onClickFilterIcon,
  heading,
  actions,
  dataset,
  noneOnPage,
  noneYet,
  noneMatchingFilters,
  error,
}: DataTableProps<T>) {
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
      <div className="z-10 h-[45px] flex items-center justify-between gap-4 bg-white dark:bg-graydark-200 py-2 pl-1.5 pr-2 border-b border-gray-200 dark:border-graydark-400">
        <ActiveFilters
          fixedFilters={fixedFilters}
          table={table}
          onClickFilterIcon={onClickFilterIcon}
          heading={heading}
        />
        {actions}
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
                      columnGap,
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
              <RemoteDatasetStates
                loaded={
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
                            columnGap,
                            gridTemplateColumns,
                          }}
                          className={cx(
                            'cursor-pointer',
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
                                  'px-2 py-1 relative overflow-hidden whitespace-nowrap text-ellipsis',
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
                }
                loading={
                  <SkeletonRows
                    table={table}
                    pageSize={table.getState().pagination.pageSize}
                    rowHeight={rowHeight}
                    columnGap={columnGap}
                    gridTemplateColumns={gridTemplateColumns}
                    row={rows[0]}
                  />
                }
                noneOnPage={noneOnPage ?? <StateNoneOnPage />}
                noneYet={noneYet ?? <StateNoneYet />}
                noneMatchingFilters={
                  noneMatchingFilters ?? <StateNoneMatching />
                }
                error={error ?? <StateError />}
                dataset={dataset}
              />
            </table>
          </div>
        </div>
      </div>
      <div className="z-10 flex items-center justify-end gap-4 bg-white dark:bg-graydark-200 py-2 px-2 border-t border-gray-200 dark:border-graydark-400">
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
            <DataTablePaginatorUnknownTotal
              offset={offset}
              limit={limit}
              pageTotal={rows.length}
              isLoading={isLoading}
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

function SkeletonRows<T extends { id: string }>({
  table,
  pageSize,
  rowHeight,
  columnGap,
  gridTemplateColumns,
  row,
}: {
  table: Table<T>
  pageSize: number
  rowHeight: number
  columnGap: number
  gridTemplateColumns: string
  row: Row<T>
}) {
  return (
    <tbody
      style={{
        display: 'grid',
        position: 'relative',
      }}
    >
      {times(pageSize).map((i) => (
        <tr
          key={String(i)}
          style={{
            display: 'grid',
            height: `${rowHeight}px`,
            width: '100%',
            columnGap,
            gridTemplateColumns,
          }}
          className={cx(
            'cursor-pointer',
            'hover:bg-blue-100 dark:hover:bg-blue-900/40',
            'border-b border-gray-50 dark:border-graydark-300',
          )}
        >
          {table.getVisibleLeafColumns().map((column) => {
            const meta = (column.columnDef.meta ?? {}) as ColumnMeta
            const { className, stopPropagation } = meta
            return (
              <td
                key={column.id}
                onClick={(e) => {
                  if (stopPropagation) {
                    e.stopPropagation()
                  }
                }}
                className={cx(
                  'px-2 py-1 relative overflow-hidden whitespace-nowrap text-ellipsis',
                  'flex items-center',
                  'border-r border-gray-50/50 dark:border-graydark-300/20',
                  className,
                )}
              />
            )
          })}
        </tr>
      ))}
    </tbody>
  )
}
