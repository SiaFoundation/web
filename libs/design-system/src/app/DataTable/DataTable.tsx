'use client'

import { cx } from 'class-variance-authority'
import React, { useMemo, useState, useEffect, useCallback, useRef } from 'react'
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
import { DataTablePaginatorUnknownTotal } from './DataTablePaginatorUnknownTotal'
import { RemoteDatasetStates } from '../../remoteData/RemoteDatasetStates'
import { StateNoneOnPage } from '../../components/EmptyState/StateNoneOnPage'
import { StateNoneYet } from '../../components/EmptyState/StateNoneYet'
import { StateNoneMatching } from '../../components/EmptyState/StateNoneMatching'
import { StateError } from '../../components/EmptyState/StateError'
import { times } from '@technically/lodash'
import { RemoteDataset } from '../../remoteData/types'
import useLocalStorageState from 'use-local-storage-state'

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
  header?: React.ReactNode
  actions?: React.ReactNode
  // custom state for loading, error, etc.
  noneOnPage?: React.ReactNode
  noneYet?: React.ReactNode
  noneMatchingFilters?: React.ReactNode
  error?: React.ReactNode
  /** Namespace for localStorage, will be used to store column widths. */
  localStorage: string
}

const defaultWidth = 100
const columnGap = 20

const borders = {
  headingBottom: 'border-b border-gray-300 dark:border-graydark-400',
  headingVertical: 'border-r border-gray-500/20 dark:border-graydark-500/20',
  rowBottom: 'border-b border-gray-500/30 dark:border-graydark-500/30',
  rowVertical: 'border-r border-gray-500/20 dark:border-graydark-500/20',
  footerTop: 'border-t border-gray-300 dark:border-graydark-400',
} as const

type ColumnMeta = {
  width?: number | string
  minWidth?: number | string
  maxWidth?: number | string
  className?: string
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
  stopPropagation?: boolean
}

function getColumnWidthsKey(localStorage: string): string {
  return `${localStorage}/columnWidths`
}

export function DataTable<T extends { id: string }>({
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
  header,
  actions,
  dataset,
  noneOnPage,
  noneYet,
  noneMatchingFilters,
  error,
  localStorage,
}: DataTableProps<T>) {
  const visibleLeafColumns = table.getVisibleLeafColumns()

  // Get default widths from column meta
  const defaultColumnWidths = useMemo(() => {
    const defaults: Record<string, number> = {}
    visibleLeafColumns.forEach((col) => {
      const meta = (col.columnDef.meta ?? {}) as ColumnMeta
      defaults[col.id] =
        typeof meta.width === 'number'
          ? meta.width
          : typeof meta.minWidth === 'number'
            ? meta.minWidth
            : defaultWidth
    })
    return defaults
  }, [visibleLeafColumns])

  // Store column widths in localStorage
  const [storedWidths, setStoredWidths] = useLocalStorageState<
    Record<string, number>
  >(getColumnWidthsKey(localStorage), {
    defaultValue: {},
  })

  // Merge stored widths with defaults, prioritizing stored values
  const columnWidths = useMemo(() => {
    const merged: Record<string, number> = {}
    visibleLeafColumns.forEach((col) => {
      merged[col.id] = storedWidths[col.id] ?? defaultColumnWidths[col.id]
    })
    return merged
  }, [visibleLeafColumns, storedWidths, defaultColumnWidths])

  // Resizing state - only for UI feedback, not for width updates
  const [resizingColumnId, setResizingColumnId] = useState<string | null>(null)

  // Use refs for resize state to avoid React re-renders during drag
  const resizeStateRef = useRef({
    columnId: null as string | null,
    startX: 0,
    startWidth: 0,
    columnIndex: -1,
  })
  const tableRef = useRef<HTMLTableElement | null>(null)

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, columnId: string) => {
      e.preventDefault()
      e.stopPropagation()
      const currentWidth = columnWidths[columnId] ?? defaultWidth
      const columnIndex = visibleLeafColumns.findIndex(
        (col) => col.id === columnId,
      )

      if (columnIndex === -1 || !tableRef.current) return

      tableRef.current.style.setProperty(
        `--col-width-${columnIndex}`,
        `${currentWidth}px`,
      )

      // Prevent text selection during resize
      document.body.style.userSelect = 'none'
      document.body.style.cursor = 'col-resize'

      setResizingColumnId(columnId)

      // Store in ref for use in mousemove handler
      resizeStateRef.current = {
        columnId,
        startX: e.clientX,
        startWidth: currentWidth,
        columnIndex,
      }
    },
    [columnWidths, visibleLeafColumns],
  )

  const handleResizeMove = useCallback((e: MouseEvent) => {
    const state = resizeStateRef.current
    if (!state.columnId || state.columnIndex === -1 || !tableRef.current) return

    // Calculate new width
    const delta = e.clientX - state.startX
    const newWidth = Math.max(50, state.startWidth + delta)

    // Directly update CSS width variable
    tableRef.current.style.setProperty(
      `--col-width-${state.columnIndex}`,
      `${newWidth}px`,
    )
  }, [])

  const handleResizeEnd = useCallback(() => {
    // Restore cursor and user selection
    document.body.style.userSelect = ''
    document.body.style.cursor = ''

    const state = resizeStateRef.current
    if (state.columnId && state.columnIndex !== -1 && tableRef.current) {
      // Get the final width from the CSS variable
      const finalWidthStr = tableRef.current.style.getPropertyValue(
        `--col-width-${state.columnIndex}`,
      )
      const finalWidth = finalWidthStr
        ? parseFloat(finalWidthStr)
        : state.startWidth

      // Only write to localStorage on mouseup
      setStoredWidths((prev) => {
        const updated = { ...prev }
        // Only store if different from default
        if (finalWidth !== defaultColumnWidths[state.columnId!]) {
          updated[state.columnId!] = finalWidth
        } else {
          // Remove from stored if it matches default
          delete updated[state.columnId!]
        }
        return updated
      })
    }

    // Clear resize state
    setResizingColumnId(null)
    resizeStateRef.current = {
      columnId: null,
      startX: 0,
      startWidth: 0,
      columnIndex: -1,
    }
  }, [setStoredWidths, defaultColumnWidths])

  // Set CSS variables when column widths change
  useEffect(() => {
    // Not during resize
    if (!tableRef.current || resizingColumnId) return

    visibleLeafColumns.forEach((col, index) => {
      const width = columnWidths[col.id] ?? defaultWidth
      tableRef.current!.style.setProperty(`--col-width-${index}`, `${width}px`)
    })
  }, [visibleLeafColumns, columnWidths, resizingColumnId])

  // Set up resize event listeners
  useEffect(() => {
    if (!resizingColumnId) return
    document.addEventListener('mousemove', handleResizeMove, { passive: true })
    document.addEventListener('mouseup', handleResizeEnd)
    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
      // Cleanup cursor and user-select in case component unmounts during resize
      document.body.style.userSelect = ''
      document.body.style.cursor = ''
    }
  }, [resizingColumnId, handleResizeMove, handleResizeEnd])

  // Build a shared grid template based on visible columns and their stored widths.
  // During resize, we can update these CSS variables directly.
  const gridTemplateColumns = useMemo(() => {
    return visibleLeafColumns
      .map((col, index) => {
        const width = columnWidths[col.id] ?? defaultWidth
        return `var(--col-width-${index}, ${width}px)`
      })
      .join(' ')
  }, [visibleLeafColumns, columnWidths])

  return (
    <Panel
      className={cx(
        '@container flex flex-col h-full w-full overflow-hidden',
        className,
      )}
    >
      <div
        className={cx(
          'z-10 h-[45px] flex items-center justify-between gap-4 bg-white dark:bg-graydark-200 py-2 pl-1.5 pr-2',
          borders.headingBottom,
        )}
      >
        <div className="flex items-center gap-2">{header}</div>
        <div className="flex items-center gap-2">{actions}</div>
      </div>
      <div className="flex-1 overflow-hidden relative">
        <div
          ref={tableContainerRef}
          id="data-table-scroll-area"
          className="relative w-full h-full overflow-auto"
        >
          <div className="min-w-fit">
            <table
              ref={tableRef}
              className="text-sm"
              style={{ display: 'grid' }}
            >
              <thead
                className={cx(
                  'sticky top-0 z-[1] bg-white dark:bg-graydark-200',
                  borders.headingBottom,
                )}
              >
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
                    {headerGroup.headers.map((header, index) => {
                      const meta = (header.column.columnDef.meta ??
                        {}) as ColumnMeta
                      const { className } = meta
                      const isLast = index === headerGroup.headers.length - 1
                      return (
                        <th
                          key={header.id}
                          className={cx(
                            'px-2 py-2 overflow-hidden relative group',
                            borders.headingVertical,
                            className,
                          )}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                          {!isLast && (
                            <div
                              onMouseDown={(e) =>
                                handleResizeStart(e, header.id)
                              }
                              className={cx(
                                'absolute top-0 right-0 h-full cursor-col-resize transition-colors',
                                resizingColumnId === header.id
                                  ? 'bg-blue-500/80 dark:bg-blue-400/80'
                                  : 'hover:bg-blue-500 dark:hover:bg-blue-400',
                              )}
                              style={{
                                width: '8px',
                                transform: 'translateX(50%)',
                                zIndex: 10,
                              }}
                            />
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
                            borders.rowBottom,
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
                                  borders.rowVertical,
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
                noneOnPage={null}
                noneYet={null}
                noneMatchingFilters={null}
                error={null}
                dataset={dataset}
              />
            </table>
          </div>
        </div>
        {/* Empty state overlay - positioned over the table so its centered regardless of horizontal scroll */}
        {dataset.state !== 'loaded' && dataset.state !== 'loading' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full flex items-center justify-center">
              {dataset.state === 'noneOnPage' &&
                (noneOnPage ?? <StateNoneOnPage />)}
              {dataset.state === 'noneYet' && (noneYet ?? <StateNoneYet />)}
              {dataset.state === 'noneMatchingFilters' &&
                (noneMatchingFilters ?? <StateNoneMatching />)}
              {dataset.state === 'error' && (error ?? <StateError />)}
            </div>
          </div>
        )}
      </div>
      <div
        className={cx(
          'z-10 flex items-center justify-end gap-4 bg-white dark:bg-graydark-200 py-2 px-2',
          borders.footerTop,
        )}
      >
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
              {[25, 50, 100, 500].map((size) => (
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
            borders.rowBottom,
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
                  borders.rowVertical,
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
