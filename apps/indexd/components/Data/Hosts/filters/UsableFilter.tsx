import { Select } from '@siafoundation/design-system'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

type UsableFilterProps<T extends { usable: boolean }> = {
  table: Table<T>
}

export function UsableFilter<T extends { usable: boolean }>({
  table,
}: UsableFilterProps<T>) {
  const column = table.getColumn('usable')
  const facets = useMemo(
    (): Map<boolean, number> => column?.getFacetedUniqueValues() || new Map(),
    [column],
  )
  const filterValue = column?.getFilterValue() as boolean | undefined

  const usableOptions = useMemo(() => {
    const options: { value: boolean; label: string }[] = []
    for (const [value, count] of facets) {
      if (value === true) {
        options.push({
          value: true,
          label: `Usable (${count})`,
        })
      } else if (value === false) {
        options.push({
          value: false,
          label: `Unusable (${count})`,
        })
      }
    }

    return options
  }, [facets])

  return (
    <div className="flex flex-col gap-1">
      <Select
        aria-label="usable filter"
        value={filterValue === undefined ? '' : String(filterValue)}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value
          column?.setFilterValue(value === '' ? undefined : value === 'true')
        }}
      >
        {usableOptions.map((option) => (
          <option key={option.label} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
