import * as React from 'react'
import { cx } from 'class-variance-authority'
import {
  ColumnFiltersState,
  flexRender,
  type Row,
  type Table,
} from '@tanstack/react-table'
import { type VirtualItem, type Virtualizer } from '@tanstack/react-virtual'
import {
  Label,
  Option,
  Panel,
  ScrollArea,
  Select,
  TsPaginatorKnownTotal,
} from '@siafoundation/design-system'
import { ActiveFilters } from './ActiveFilters'

interface DataTableProps<T extends { id: string }> {
  entityLabel: string
  fixedFilters?: ColumnFiltersState
  table: Table<T>
  virtualRows: VirtualItem[]
  totalSize: number
  tableContainerRef: React.RefObject<HTMLDivElement | null>
  rowVirtualizer: Virtualizer<HTMLDivElement, Element>
  rows: Row<T>[]
  className?: string
  selectedRowId?: string
  onRowClick?: (id: string) => void
  offset: number
  limit: number
  onClickFilterIcon?: () => void
  /** Optional view select dropdown to render after the filter icon. */
  viewSelect?: React.ReactNode
}

const defaultWidth = 100

export function DataTable<T extends { id: string }>({
  entityLabel,
  fixedFilters,
  table,
  virtualRows,
  totalSize,
  tableContainerRef,
  rowVirtualizer,
  rows,
  className,
  selectedRowId,
  onRowClick,
  offset,
  limit,
  onClickFilterIcon,
  viewSelect,
}: DataTableProps<T>) {
  const filteredTotal = table.getFilteredRowModel().rows.length

  return (
    <Panel
      className={cx(
        '@container flex flex-col h-full w-full overflow-hidden',
        className
      )}
    >
      <div className="z-10 flex items-center justify-between gap-4 bg-graydark-200 py-2 px-4 border-b border-gray-200 dark:border-graydark-400">
        <ActiveFilters
          fixedFilters={fixedFilters}
          table={table}
          entityLabel={entityLabel}
          onClickFilterIcon={onClickFilterIcon}
          viewSelect={viewSelect}
        />
      </div>
      <div className="flex-1 overflow-hidden relative">
        <ScrollArea ref={tableContainerRef} className="relative">
          <div className="min-w-fit">
            <table className="text-sm" style={{ display: 'grid' }}>
              <thead className="sticky top-0 z-10 bg-graydark-200 border-b border-gray-100/60 dark:border-graydark-300">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr
                    key={headerGroup.id}
                    style={{ display: 'flex', width: '100%' }}
                  >
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className="px-2 py-2 overflow-hidden border-r border-gray-100/60 dark:border-graydark-300/20"
                        style={{
                          width:
                            (header.column.columnDef.meta as any)?.width ||
                            defaultWidth,
                        }}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))}
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
                        display: 'flex',
                        position: 'absolute',
                        transform: `translateY(${virtualRow.start}px)`,
                        willChange: 'transform',
                        width: '100%',
                      }}
                      className={cx(
                        'cursor-pointer transition-colors',
                        selectedRowId === row.original.id
                          ? 'bg-blue-50 dark:bg-blue-900/30'
                          : 'hover:bg-blue-100 dark:hover:bg-blue-900/40',
                        'border-b border-gray-100 dark:border-graydark-300'
                      )}
                      onClick={() => onRowClick?.(row.original.id)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={cx(
                            'relative overflow-hidden whitespace-nowrap text-ellipsis px-2 py-1',
                            'flex items-center',
                            'border-r border-gray-100 dark:border-graydark-300/20'
                          )}
                          style={{
                            width:
                              (cell.column.columnDef.meta as any)?.width ||
                              defaultWidth,
                          }}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </ScrollArea>
      </div>
      <div className="z-10 flex items-center justify-end gap-4 bg-graydark-200 py-2 px-4 border-t border-gray-200 dark:border-graydark-400">
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
            <TsPaginatorKnownTotal
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
