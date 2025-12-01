import {
  DataTable,
  StateNoneOnPage,
  StateNoneYet,
  StateNoneMatching,
  StateError,
  useDataTable,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { accountsColumns } from './accountsColumns'
import { SidePanelAccountList } from './SidePanelAccountList'
import { SidePanelAccount } from './SidePanelAccount'
import { AccountData } from './types'
import { useAccounts } from './useAccounts'
import { Layout } from '../Layout'
import { useAccountsParams } from './useAccountsParams'
import { AccountsFilterMenu } from './AccountsFilterMenu'
import { ColumnFiltersState, OnChangeFn } from '@tanstack/react-table'

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
    dataset: accounts,
    columns: accountsColumns,
    columnFilters,
    setColumnFilters: setColumnFilters as OnChangeFn<ColumnFiltersState>,
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
          localStorage="indexd/accounts"
          header={<AccountsFilterMenu />}
          noneOnPage={
            <StateNoneOnPage message="No accounts on this page, reset pagination to continue." />
          }
          noneYet={<StateNoneYet message="There are no accounts yet." />}
          noneMatchingFilters={
            <StateNoneMatching message="No accounts matching filters." />
          }
          error={
            <StateError message="Error loading accounts. Please try again later." />
          }
        />
      }
      panel={
        panelId ? <SidePanelAccount /> : <SidePanelAccountList table={table} />
      }
    />
  )
}
