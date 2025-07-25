import { mock, type Account } from './mockData'
import { DataTable } from './DataTable'
import * as React from 'react'
import { useCallback } from 'react'
import { useTableParams } from './useTableParams'
import { columns } from './Accounts/accountsColumns'
import { useDataTable } from './useDataTable'

export function DrawerAccountsTable({ scope }: { scope: string }) {
  const {
    offset,
    limit,
    setOffset,
    setLimit,
    setSelectedId,
    columnFilters,
    setColumnFilters,
  } = useTableParams(scope)

  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId]
  )

  const table = useDataTable<Account>({
    data: mock.accounts,
    columns,
    columnFilters,
    setColumnFilters,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
    entityLabel: 'accounts',
  })

  return (
    <div className="flex-1 h-full overflow-hidden p-4">
      <DataTable {...table} />
    </div>
  )
}
