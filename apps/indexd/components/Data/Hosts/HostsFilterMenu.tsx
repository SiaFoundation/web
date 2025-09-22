import { HostsFilterCmd } from './HostsCmd/HostsFilterCmd'
import { useHostsParams } from './useHostsParams'
import { getFilterLabel } from './types'
import { FilterMenu } from '../../FilterMenu'

export function HostsFilterMenu() {
  const { columnFilters, removeColumnFilter, removeLastColumnFilter } =
    useHostsParams()

  return (
    <FilterMenu
      name="hosts"
      columnFilters={columnFilters}
      removeColumnFilter={removeColumnFilter}
      removeLastColumnFilter={removeLastColumnFilter}
      getFilterLabel={getFilterLabel}
    >
      {({ currentPage, beforeSelect, afterSelect, pushPage }) => (
        <HostsFilterCmd
          currentPage={currentPage}
          beforeSelect={beforeSelect}
          afterSelect={afterSelect}
          pushPage={pushPage}
        />
      )}
    </FilterMenu>
  )
}
