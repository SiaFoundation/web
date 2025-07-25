import * as React from 'react'
import { Select } from '@siafoundation/design-system'
import { Table } from '@tanstack/react-table'

interface CountryFilterProps<T extends { countryCode: string }> {
  table: Table<T>
}

export function CountryFilter<T extends { countryCode: string }>({
  table,
}: CountryFilterProps<T>) {
  const column = table.getColumn('countryCode')
  const facets = React.useMemo(
    (): Map<string, number> => column?.getFacetedUniqueValues() || new Map(),
    [column]
  )
  const filterValue = column?.getFilterValue() as string | undefined

  const countryOptions = React.useMemo(() => {
    const options = [{ value: '', label: 'All Countries' }]
    for (const [code] of facets) {
      options.push({
        value: code,
        label: `${getCountryFlag(code)} ${getCountryName(code)}`,
      })
    }
    return options
  }, [facets])

  return (
    <div className="flex flex-col gap-1">
      <Select
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

function getCountryFlag(cc: string) {
  if (!cc) return '🌍'
  const codePoints = cc
    .toUpperCase()
    .split('')
    .map((c) => 127397 + c.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

function getCountryName(cc: string): string {
  const countryNames: Record<string, string> = {
    US: 'United States',
    CA: 'Canada',
    GB: 'United Kingdom',
    DE: 'Germany',
    FR: 'France',
    JP: 'Japan',
    AU: 'Australia',
    NL: 'Netherlands',
    SE: 'Sweden',
    SG: 'Singapore',
    // Add more as needed
  }
  return countryNames[cc] || cc
}
