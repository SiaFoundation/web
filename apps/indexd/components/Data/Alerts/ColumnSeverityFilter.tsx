import { Select } from '@siafoundation/design-system'
import { AlertSeverity } from '@siafoundation/indexd-types'
import { useAlertsParams } from './useAlertsParams'

const severities: AlertSeverity[] = ['info', 'warning', 'error', 'critical']

export function ColumnSeverityFilter() {
  const { columnFilters, setColumnFilters } = useAlertsParams()
  const value = columnFilters.find((f) => f.id === 'severity')?.value

  return (
    <Select
      aria-label="severity filter"
      value={typeof value === 'string' ? value : ''}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        const severity = e.target.value
        setColumnFilters((filters) => [
          ...filters.filter((f) => f.id !== 'severity'),
          ...(severity ? [{ id: 'severity', value: severity }] : []),
        ])
      }}
    >
      <option value="">All</option>
      {severities.map((severity) => (
        <option key={severity} value={severity}>
          {severity}
        </option>
      ))}
    </Select>
  )
}
