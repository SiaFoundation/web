import { Select, Option } from '@siafoundation/design-system'

// TODO: add contracts and accounts
const VIEWS = [
  { value: 'hosts', label: 'Hosts' },
  { value: 'contracts', label: 'Contracts' },
] as const

export type DataView = (typeof VIEWS)[number]['value']

interface DataViewSelectProps {
  value: DataView | undefined
  onValueChange: (value: DataView) => void
  className?: string
}

export function DataViewSelect({
  value,
  onValueChange,
  className,
}: DataViewSelectProps) {
  return (
    <Select
      value={value}
      onChange={(e) => onValueChange(e.target.value as DataView)}
      className={className}
      aria-label="Select data view"
    >
      {VIEWS.map((view) => (
        <Option key={view.value} value={view.value}>
          {view.label}
        </Option>
      ))}
    </Select>
  )
}
