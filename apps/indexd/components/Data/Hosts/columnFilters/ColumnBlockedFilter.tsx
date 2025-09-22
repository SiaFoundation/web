import { useHostsParams } from '../useHostsParams'
import { ColumnBooleanFilter } from '../../ColumnBooleanFilter'

export function ColumnBlockedFilter() {
  const { columnFilters, setColumnFilters } = useHostsParams()
  return (
    <ColumnBooleanFilter
      id="blocked"
      labelPositive="Blocked"
      labelNegative="Not Blocked"
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
    />
  )
}
