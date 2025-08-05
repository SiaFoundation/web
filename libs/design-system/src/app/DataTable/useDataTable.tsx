'use client'

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
  SortingState,
  getSortedRowModel,
  RowSelectionState,
  Row,
} from '@tanstack/react-table'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type DataTableProps<T extends { id: string }> = {
  columns: ColumnDef<T>[]
  data: T[]
  fixedFilters?: ColumnFiltersState
  columnFilters: ColumnFiltersState
  columnSorts: SortingState
  setColumnFilters?: OnChangeFn<ColumnFiltersState>
  setColumnSorts?: OnChangeFn<SortingState>
  offset: number
  limit: number
  setOffset: (offset: number) => void
  setLimit: (limit: number) => void
  onRowClick?: (id: string) => void
}

export type DataTableState<T extends { id: string }> = ReturnType<
  typeof useDataTable<T>
>

export function useDataTable<T extends { id: string }>({
  columns,
  data,
  columnFilters,
  fixedFilters,
  columnSorts,
  setColumnFilters,
  setColumnSorts,
  offset,
  limit,
  setOffset,
  setLimit,
  onRowClick,
}: DataTableProps<T>) {
  const tableContainerRef = useRef<HTMLDivElement>(null)

  // Convert URL offset/limit to TanStack pageIndex/pageSize
  const pagination = useMemo(() => {
    const pageIndex = Math.floor(offset / limit)
    const pageSize = limit
    return {
      pageIndex,
      pageSize,
    }
  }, [offset, limit])

  // Handle pagination changes from TanStack and sync to URL
  const handlePaginationChange = useCallback<OnChangeFn<PaginationState>>(
    (updater) => {
      const newPagination =
        typeof updater === 'function' ? updater(pagination) : updater
      const newOffset = newPagination.pageIndex * newPagination.pageSize

      // Update URL params
      if (newOffset !== offset) {
        setOffset(newOffset)
      }
      if (newPagination.pageSize !== limit) {
        setLimit(newPagination.pageSize)
      }
    },
    [pagination, setOffset, setLimit, limit, offset],
  )

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

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
      sorting: columnSorts,
      rowSelection,
    },
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: handlePaginationChange,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setColumnSorts,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedRowModel: getFacetedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
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

  const isSelection = useMemo(
    () => Object.keys(rowSelection).length > 0,
    [rowSelection],
  )

  const isFiltered = useMemo(() => columnFilters.length > 0, [columnFilters])

  const [selectedRows, setSelectedRows] = useState<Row<T>[]>([])

  useEffect(() => {
    setSelectedRows(table.getSelectedRowModel().rows)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  return {
    data,
    tableContainerRef,
    table,
    rowVirtualizer,
    rows,
    selectedRows,
    virtualRows,
    totalSize,
    pagination,
    rowSelection,
    isSelection,
    isFiltered,
    setRowSelection,
    handlePaginationChange,
    columnFilters,
    fixedFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
    offset,
    limit,
    setOffset,
    setLimit,
    datasetTotal: data.length,
    onRowClick,
  }
}
