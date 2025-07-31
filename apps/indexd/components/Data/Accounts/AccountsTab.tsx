import {
  DataTable,
  useDataTable,
  useDataTableParams,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { accountsColumns } from './accountsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { SidePanelAccountList } from './SidePanelAccountList'
import { SidePanelAccount } from './SidePanelAccount'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AccountData } from './types'
import { useAccounts } from './useAccounts'
import { Layout } from '../Layout'

export function AccountsTab() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const view = params.get('view') as DataView
  const setView = (view: DataView) => {
    const paramsObj = new URLSearchParams(Array.from(params.entries()))
    paramsObj.set('view', view)
    router.push(`${pathname}?${paramsObj.toString()}`)
  }
  const {
    offset,
    limit,
    setOffset,
    setLimit,
    selectedId,
    setSelectedId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useDataTableParams('accountList')
  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId],
  )

  const accounts = useAccounts()
  const table = useDataTable<AccountData>({
    data: accounts,
    columns: accountsColumns,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
  })

  return (
    <Layout
      table={
        <DataTable
          {...table}
          heading={<DataViewSelect value={view} onValueChange={setView} />}
        />
      }
      panel={
        selectedId ? (
          <SidePanelAccount />
        ) : (
          <SidePanelAccountList table={table} />
        )
      }
    />
  )
}
