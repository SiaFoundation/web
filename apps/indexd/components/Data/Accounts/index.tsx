import { DataTable, useDataTable } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { accountsColumns } from './accountsColumns'
import { SidePanelAccountList } from './SidePanelAccountList'
import { SidePanelAccount } from './SidePanelAccount'
import { AccountData } from './types'
import { useAccounts } from './useAccounts'
import { Layout } from '../Layout'
import { useAccountsParams } from './useAccountsParams'

export function Accounts() {
  const {
    offset,
    limit,
    setOffset,
    setLimit,
    panelId,
    setPanelId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useAccountsParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
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
      table={<DataTable {...table} />}
      panel={
        panelId ? <SidePanelAccount /> : <SidePanelAccountList table={table} />
      }
    />
  )
}
