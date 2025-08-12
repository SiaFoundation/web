import { useHostsParams } from '../useHostsParams'
import { ColumnBooleanFilter } from '../../ColumnBooleanFilter'

export function UsableFilter() {
  const { columnFilters, setColumnFilters } = useHostsParams()

  return (
    <ColumnBooleanFilter
      id="usable"
      labelPositive="Usable"
      labelNegative="Unusable"
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
    />
  )
}
