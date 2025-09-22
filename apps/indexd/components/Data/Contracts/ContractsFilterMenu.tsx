import { ContractsFilterCmd } from './ContractsCmd/ContractsFilterCmd'
import { useContractsParams } from './useContractsParams'
import { getFilterLabel } from './types'
import { FilterMenu } from '../../FilterMenu'

export function ContractsFilterMenu() {
  const { columnFilters, removeColumnFilter, removeLastColumnFilter } =
    useContractsParams()

  return (
    <FilterMenu
      name="contracts"
      columnFilters={columnFilters}
      removeColumnFilter={removeColumnFilter}
      removeLastColumnFilter={removeLastColumnFilter}
      getFilterLabel={getFilterLabel}
    >
      {({ currentPage, beforeSelect, afterSelect, pushPage }) => (
        <ContractsFilterCmd
          currentPage={currentPage}
          beforeSelect={beforeSelect}
          afterSelect={afterSelect}
          pushPage={pushPage}
        />
      )}
    </FilterMenu>
  )
}
