import { Select } from '@siafoundation/design-system'
import { countryCodeEmoji, getCountryName } from '@siafoundation/units'
import { Table } from '@tanstack/react-table'
import { useMemo } from 'react'

type CountryFilterProps<T extends { location?: { countryCode: string } }> = {
  table: Table<T>
}

export function CountryFilter<
  T extends { location?: { countryCode: string } },
>({ table }: CountryFilterProps<T>) {
  const column = table.getColumn('location')
  const facets = useMemo(
    (): Map<string, number> => column?.getFacetedUniqueValues() || new Map(),
    [column],
  )
  const filterValue = column?.getFilterValue() as string | undefined

  const countryOptions = useMemo(() => {
    const options: { value: string | undefined; label: string }[] = [
      { value: '', label: 'All Countries' },
    ]
    for (const [code] of facets) {
      if (code && code !== 'unknown') {
        options.push({
          value: code,
          label: `${countryCodeEmoji(code)} ${getCountryName(code)}`,
        })
      }
    }
    options.push({
      value: 'unknown',
      label: `❓ Unknown`,
    })
    return options
  }, [facets])

  return (
    <div className="flex flex-col gap-1">
      <Select
        aria-label="country filter"
        value={filterValue || ''}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          const value = e.target.value
          column?.setFilterValue(value === '' ? undefined : value)
        }}
      >
        {countryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  )
}
