import { mock, type Contract } from './mockData'
import { DataTable } from './DataTable'
import * as React from 'react'
import { useCallback } from 'react'
import { useTableParams } from './useTableParams'
import { ColumnFiltersState } from '@tanstack/react-table'
import { contractsColumns } from './Contracts/contractsColumns'
import { useDataTable } from './useDataTable'
import { useRouter } from 'next/navigation'
import { routes } from '../../config/routes'

export function DrawerContractsTable({
  scope,
  fixedFilters,
}: {
  scope: string
  fixedFilters?: ColumnFiltersState
}) {
  const { offset, limit, setOffset, setLimit, setSelectedId } =
    useTableParams(scope)
  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId]
  )

  const table = useDataTable<Contract>({
    fixedFilters: fixedFilters ? fixedFilters : [],
    columnFilters: fixedFilters ? fixedFilters : [],
    data: mock.contracts,
    columns: contractsColumns,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
    entityLabel: 'contracts',
  })

  const router = useRouter()
  const onClickFilterIcon = useCallback(() => {
    // take the fixed filters and navigate to the contracts page with those parameters applied
    const params = new URLSearchParams(window.location.search)
    params.set('view', 'contracts')
    params.set(`${scope}Filters`, JSON.stringify(table.columnFilters))
    router.push(`${routes.home}?${params.toString()}`)
  }, [router, table.columnFilters, scope])

  return (
    <div className="flex-1 h-full overflow-hidden p-4">
      <DataTable {...table} onClickFilterIcon={onClickFilterIcon} />
    </div>
  )
}
