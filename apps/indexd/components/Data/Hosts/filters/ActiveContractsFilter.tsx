import { useHostsParams } from '../useHostsParams'
import { ColumnBooleanFilter } from '../../ColumnBooleanFilter'

export function ActiveContractsFilter() {
  const { columnFilters, setColumnFilters } = useHostsParams()

  return (
    <ColumnBooleanFilter
      id="activecontracts"
      labelPositive="Has Active Contracts"
      labelNegative="Has No Active Contracts"
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
    />
  )
}
