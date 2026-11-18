import { Select } from '@siafoundation/design-system'
import { ColumnFiltersState, OnChangeFn, Table } from '@tanstack/react-table'

export function ColumnBooleanFilter<Filters extends ColumnFiltersState>({
  table,
  id,
  labelPositive,
  labelNegative,
  columnFilters,
  setColumnFilters,
  defaultValue,
}: {
  table?: Table<{ [id: string]: boolean }>
  id: string
  labelPositive?: string
  labelNegative?: string
  columnFilters: Filters
  setColumnFilters: OnChangeFn<Filters>
  // The value the table uses when there is no filter. When set, there is no
  // "All" option, and picking the default removes the filter.
  defaultValue?: boolean
}) {
  const meta = table?.getColumn(id)?.columnDef.meta as {
    filterLabelPositive?: string
    filterLabelNegative?: string
  }
  const positive = labelPositive || meta?.filterLabelPositive || 'Yes'
  const negative = labelNegative || meta?.filterLabelNegative || 'No'
  const options = [
    ...(defaultValue === undefined ? [{ value: '', label: 'All' }] : []),
    { value: 'true', label: positive },
    { value: 'false', label: negative },
  ]
  const filterValue =
    columnFilters.find((f) => f.id === id)?.value ?? defaultValue

  return (
    <div className="flex flex-col gap-1">
      <Select
        aria-label={`${id} filter`}
        value={filterValue === undefined ? '' : String(filterValue)}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          if (
            e.target.value === '' ||
            e.target.value === String(defaultValue)
          ) {
            setColumnFilters((filters) => {
              return filters.filter((f) => f.id !== id) as Filters
            })
            return
          }
          const value = e.target.value === 'true'
          setColumnFilters((filters) => {
            const index = filters.findIndex((f) => f.id === id)
            if (index !== -1) {
              filters[index].value = value
            } else {
              filters.push({ id, value })
            }
            return filters
          })
        }}
      >
        {options.map((option) => (
          <option key={option.label} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
