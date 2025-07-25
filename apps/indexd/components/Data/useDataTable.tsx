import * as React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type PaginationState,
  type OnChangeFn,
  type ColumnFiltersState,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'

interface DataTableProps<T extends { id: string }> {
  columns: ColumnDef<T>[]
  data: T[]
  fixedFilters?: ColumnFiltersState
  columnFilters: ColumnFiltersState
  setColumnFilters?: OnChangeFn<ColumnFiltersState>
  // URL-based pagination props
  offset: number
  limit: number
  setOffset: (offset: number) => void
  setLimit: (limit: number) => void
  entityLabel: string
  onRowClick?: (id: string) => void
}

export function useDataTable<T extends { id: string }>({
  columns,
  data,
  columnFilters,
  fixedFilters,
  setColumnFilters,
  offset,
  limit,
  setOffset,
  setLimit,
  entityLabel,
  onRowClick,
}: DataTableProps<T>) {
  const tableContainerRef = React.useRef<HTMLDivElement>(null)

  // Convert URL offset/limit to TanStack pageIndex/pageSize
  const pagination = React.useMemo(() => {
    const pageIndex = Math.floor(offset / limit)
    const pageSize = limit
    return {
      pageIndex,
      pageSize,
    }
  }, [offset, limit])

  // Handle pagination changes from TanStack and sync to URL
  const handlePaginationChange = React.useCallback<OnChangeFn<PaginationState>>(
    (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater
      const newOffset = newPagination.pageIndex * newPagination.pageSize

      // Update URL params
      setOffset(newOffset)
      if (newPagination.pageSize !== limit) {
        setLimit(newPagination.pageSize)
      }
    },
    [pagination, setOffset, setLimit, limit]
  )

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 500,
    },
    state: {
      pagination,
      columnFilters,
    },
    onPaginationChange: handlePaginationChange,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: false,
    debugTable: false,
  })

  const rows = table.getRowModel().rows

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => tableContainerRef.current,
    estimateSize: () => 36,
    overscan: 36,
  })

  const virtualRows = rowVirtualizer.getVirtualItems()
  const totalSize = rowVirtualizer.getTotalSize()

  return {
    tableContainerRef,
    table,
    rowVirtualizer,
    rows,
    virtualRows,
    totalSize,
    pagination,
    handlePaginationChange,
    columnFilters,
    fixedFilters,
    setColumnFilters,
    offset,
    limit,
    setOffset,
    setLimit,
    entityLabel,
    datasetTotal: data.length,
    onRowClick,
  }
}
