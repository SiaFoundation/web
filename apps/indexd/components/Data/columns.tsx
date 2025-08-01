import { cn, Text } from '@siafoundation/design-system'

export function TableHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center justify-end', className)}>
      <Text className="truncate">{children}</Text>
    </div>
  )
}
