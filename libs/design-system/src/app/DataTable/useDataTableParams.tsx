'use client'

import { useCallback, useMemo } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
} from '@tanstack/react-table'

export function useDataTableParams(scope: string) {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const limit = parseInt(params.get(`${scope}Limit`) || '1000', 10) || 1000
  const offset = parseInt(params.get(`${scope}Offset`) || '0', 10) || 0
  const selectedId = params.get(`${scope}Id`) as string | undefined

  const setPage = useCallback(
    (offset: number) => {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Offset`, String(offset))
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, scope, pathname],
  )

  const setPageSize = useCallback(
    (size: number) => {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Limit`, String(size))
      paramsObj.set(`${scope}Offset`, '0') // reset to first page
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, scope, pathname],
  )

  const setSelectedId = useCallback(
    (id: string | undefined) => {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      if (id) {
        paramsObj.set(`${scope}Id`, id)
      } else {
        paramsObj.delete(`${scope}Id`)
      }
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, pathname, scope],
  )

  const setOffset = useCallback(
    (offset: number) => {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Offset`, String(offset))
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, pathname, scope],
  )

  const setLimit = useCallback(
    (limit: number) => {
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Limit`, String(limit))
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, pathname, scope],
  )

  const columnFiltersParams = params.get(`${scope}Filters`)
  const columnFilters = useMemo(() => {
    return columnFiltersParams
      ? (JSON.parse(columnFiltersParams) as ColumnFiltersState)
      : []
  }, [columnFiltersParams])

  const setColumnFilters: OnChangeFn<ColumnFiltersState> = useCallback(
    (filtersFn) => {
      const filters =
        typeof filtersFn === 'function' ? filtersFn(columnFilters) : filtersFn
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Filters`, JSON.stringify(filters))
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, pathname, scope, columnFilters],
  )

  const columnSortsParams = params.get(`${scope}Sorts`)
  const columnSorts = useMemo(() => {
    return columnSortsParams
      ? (JSON.parse(columnSortsParams) as SortingState)
      : []
  }, [columnSortsParams])

  const setColumnSorts: OnChangeFn<SortingState> = useCallback(
    (sortsFn) => {
      const sorts =
        typeof sortsFn === 'function' ? sortsFn(columnSorts) : sortsFn
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Sorts`, JSON.stringify(sorts))
      router.push(`${pathname}?${paramsObj.toString()}`)
    },
    [router, params, pathname, scope, columnSorts],
  )

  return {
    offset,
    limit,
    setPage,
    setPageSize,
    selectedId,
    setSelectedId,
    setOffset,
    setLimit,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  }
}
