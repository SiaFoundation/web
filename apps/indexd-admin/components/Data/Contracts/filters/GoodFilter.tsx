import { useContractsParams } from '../useContractsParams'
import { ColumnBooleanFilter } from '../../ColumnBooleanFilter'

export function GoodFilter() {
  const { columnFilters, setColumnFilters } = useContractsParams()

  return (
    <ColumnBooleanFilter
      id="status"
      labelPositive="Good"
      labelNegative="Bad"
      columnFilters={columnFilters}
      setColumnFilters={setColumnFilters}
    />
  )
}
