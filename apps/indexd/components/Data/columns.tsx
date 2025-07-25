import { Text } from '@siafoundation/design-system'

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center">
      <Text className="truncate">{children}</Text>
    </div>
  )
}

export function TableCellText({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center overflow-hidden">
      <Text className="truncate">{children}</Text>
    </div>
  )
}
