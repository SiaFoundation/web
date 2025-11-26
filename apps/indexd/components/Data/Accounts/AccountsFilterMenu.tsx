import { AccountsFilterCmd } from './AccountsCmd/AccountsFilterCmd'
import { useAccountsParams } from './useAccountsParams'
import { getFilterLabel } from './types'
import { FilterMenu } from '../../FilterMenu'

export function AccountsFilterMenu() {
  const { columnFilters, removeColumnFilter, removeLastColumnFilter } =
    useAccountsParams()

  return (
    <FilterMenu
      name="accounts"
      columnFilters={columnFilters}
      removeColumnFilter={removeColumnFilter}
      removeLastColumnFilter={removeLastColumnFilter}
      getFilterLabel={getFilterLabel}
    >
      {({ currentPage, beforeSelect, afterSelect, pushPage }) => (
        <AccountsFilterCmd
          currentPage={currentPage}
          beforeSelect={beforeSelect}
          afterSelect={afterSelect}
          pushPage={pushPage}
        />
      )}
    </FilterMenu>
  )
}
