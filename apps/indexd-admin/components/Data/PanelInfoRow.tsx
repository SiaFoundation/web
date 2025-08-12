import { Text } from '@siafoundation/design-system'

export function InfoRow({
  label,
  value,
}: {
  label: string
  value: React.ReactNode
}) {
  return (
    <div className="flex gap-1">
      <div className="flex-1 flex justify-start items-center">
        <Text color="subtle" className="truncate">
          {label}
        </Text>
      </div>
      <div className="flex-1 flex justify-end items-center">
        <Text color="subtle" className="truncate">
          {value}
        </Text>
      </div>
    </div>
  )
}
