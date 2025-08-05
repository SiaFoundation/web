import { Select } from '@siafoundation/design-system'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

type BlockedFilterProps<T extends { blocked: boolean }> = {
  table: Table<T>
}

export function BlockedFilter<T extends { blocked: boolean }>({
  table,
}: BlockedFilterProps<T>) {
  const column = table.getColumn('blocked')
  const facets = useMemo(
    (): Map<boolean, number> => column?.getFacetedUniqueValues() || new Map(),
    [column],
  )
  const filterValue = column?.getFilterValue() as boolean | undefined

  const blockedOptions = useMemo(() => {
    const options: { value: boolean; label: string }[] = []
    for (const [value, count] of facets) {
      if (value === false) {
        options.push({
          value: false,
          label: `Not Blocked (${count})`,
        })
      } else if (value === true) {
        options.push({
          value: true,
          label: `Blocked (${count})`,
        })
      }
    }
    return options
  }, [facets])

  return (
    <div className="flex flex-col gap-1">
      <Select
        aria-label="blocked filter"
        value={filterValue === undefined ? '' : String(filterValue)}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value
          column?.setFilterValue(value === 'true')
        }}
      >
        {blockedOptions.map((option) => (
          <option key={option.label} value={String(option.value)}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
