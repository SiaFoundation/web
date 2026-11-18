import { useHostsParams } from '../useHostsParams'
import { ColumnBooleanFilter } from '../../ColumnBooleanFilter'

export function ColumnUsableFilter() {
  const { columnFilters, setColumnFilters } = useHostsParams()

  return (
    <ColumnBooleanFilter
      id="usable"
      labelPositive="Usable"
      labelNegative="Unusable"
      // The hosts list only shows usable hosts unless filtered.
      defaultValue={true}
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
    />
  )
}
