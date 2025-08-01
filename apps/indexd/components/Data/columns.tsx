import { cn, Text } from '@siafoundation/design-system'
import { Column, Table } from '@tanstack/react-table'
import { ColumnFilter } from './ColumnFilter'
import { ColumnSort } from './ColumnSort'

export function TableHeader<T>({
  children,
  table,
  column,
  filter,
  className,
}: {
  children: React.ReactNode
  table?: Table<T>
  column?: Column<T>
  filter?: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-0.5 justify-end', className)}>
      <Text className="truncate">{children}</Text>
      {filter && table && column && (
        <ColumnFilter columnId={column.id} table={table}>
          {filter}
        </ColumnFilter>
      )}
      {table && column && <ColumnSort columnId={column.id} table={table} />}
    </div>
  )
}
