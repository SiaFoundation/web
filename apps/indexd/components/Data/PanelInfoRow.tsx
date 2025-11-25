import { Text } from '@siafoundation/design-system'

export function InfoRow({
  label,
  value,
  variant = 'row',
}: {
  label: string
  value: React.ReactNode
  variant?: 'row' | 'column'
}) {
  if (variant === 'column') {
    return (
      <div className="flex flex-col gap-1">
        <Text color="verySubtle" size="14" weight="medium" className="truncate">
          {label}
        </Text>
        <Text color="contrast">{value}</Text>
      </div>
    )
  }
  return (
    <div className="flex gap-1">
      <div className="flex-1 flex justify-start items-center">
        <Text color="verySubtle" size="14" weight="medium" className="truncate">
          {label}
        </Text>
      </div>
      <div className="flex-1 flex justify-end items-center">
        {typeof value === 'string' ? (
          value ? (
            <Text className="truncate">{value}</Text>
          ) : (
            <Text color="verySubtle">-</Text>
          )
        ) : (
          value || <Text color="verySubtle">-</Text>
        )}
      </div>
    </div>
  )
}
