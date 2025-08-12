import { cn, Text } from '@siafoundation/design-system'
import { Column, Table } from '@tanstack/react-table'
import { ColumnFilter } from './ColumnFilter'
import { ColumnSort } from './ColumnSort'

export function TableHeader<T>({
  children,
  table,
  column,
  filter,
  sortable,
  className,
}: {
  children: React.ReactNode
  table?: Table<T>
  column?: Column<T>
  filter?: React.ReactNode
  sortable?: boolean
  className?: string
}) {
  return (
    <div className={cn('flex items-center gap-0.5 justify-end', className)}>
      <Text className="truncate">{children}</Text>
      {table && column && filter && (
        <ColumnFilter columnId={column.id} table={table}>
          {filter}
        </ColumnFilter>
      )}
      {table && column && sortable && (
        <ColumnSort columnId={column.id} table={table} />
      )}
    </div>
  )
}
