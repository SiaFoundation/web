'use client'

import { useCallback, useMemo } from 'react'
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from 'next/navigation'
import {
  ColumnFiltersState,
  OnChangeFn,
  SortingState,
  Updater,
} from '@tanstack/react-table'

export function useDataTableParams<
  Filters extends ColumnFiltersState,
  Sorts extends SortingState = SortingState,
>(scope: string) {
  const params = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()
  const limit = getNumberParam(params, `${scope}Limit`, 100)
  const offset = getNumberParam(params, `${scope}Offset`, 0)

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
  const columnFilters = useMemo<Filters>(() => {
    return (
      columnFiltersParams ? JSON.parse(columnFiltersParams) : []
    ) as Filters
  }, [columnFiltersParams])

  const buildColumnFiltersParams = useCallback(
    (filtersFn: Updater<Filters>): ReadonlyURLSearchParams => {
      const filters =
        typeof filtersFn === 'function' ? filtersFn(columnFilters) : filtersFn
      const paramsObj = new URLSearchParams(Array.from(params.entries()))
      paramsObj.set(`${scope}Filters`, JSON.stringify(filters))
      return new ReadonlyURLSearchParams(paramsObj.toString())
    },
    [params, scope, columnFilters],
  )

  const setParams: (params: ReadonlyURLSearchParams) => void = useCallback(
    (params: ReadonlyURLSearchParams) => {
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname],
  )

  const setColumnFilters: OnChangeFn<Filters> = useCallback(
    (filtersFn) => {
      const paramsObj = buildColumnFiltersParams(filtersFn)
      setParams(paramsObj)
    },
    [setParams, buildColumnFiltersParams],
  )

  const removeColumnFilter = useCallback(
    (id: string) => {
      setColumnFilters(
        (columnFilters) => columnFilters.filter((f) => f.id !== id) as Filters,
      )
    },
    [setColumnFilters],
  )

  const removeLastColumnFilter = useCallback(() => {
    setColumnFilters((columnFilters) => columnFilters.slice(0, -1) as Filters)
  }, [setColumnFilters])

  const buildAddColumnFilterParams = useCallback(
    (filter: Filters[number]) => {
      return buildColumnFiltersParams(
        (columnFilters) =>
          [
            ...columnFilters.filter((f) => f.id !== filter.id),
            filter,
          ] as Filters,
      )
    },
    [buildColumnFiltersParams],
  )

  const addColumnFilter = useCallback(
    (filter: Filters[number]) => {
      const paramsObj = buildAddColumnFilterParams(filter)
      setParams(paramsObj)
    },
    [setParams, buildAddColumnFilterParams],
  )

  const columnSortsParams = params.get(`${scope}Sorts`)
  const columnSorts = useMemo<Sorts>(() => {
    return (columnSortsParams ? JSON.parse(columnSortsParams) : []) as Sorts
  }, [columnSortsParams])

  const setColumnSorts: OnChangeFn<Sorts> = useCallback(
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
    setOffset,
    setLimit,
    columnFilters,
    setColumnFilters,
    removeColumnFilter,
    removeLastColumnFilter,
    addColumnFilter,
    columnSorts,
    setColumnSorts,
    buildColumnFiltersParams,
    buildAddColumnFilterParams,
  }
}

function getNumberParam(
  params: URLSearchParams,
  key: string,
  defaultValue: number,
) {
  const value = params.get(key)
  if (value === null) {
    return defaultValue
  }
  try {
    const num = parseInt(value, 10)
    if (isNaN(num)) {
      return defaultValue
    }
    return num
  } catch {
    return defaultValue
  }
}
