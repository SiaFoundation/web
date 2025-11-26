import { cn, DataTableColumn, Text } from '@siafoundation/design-system'
import { Table } from '@tanstack/react-table'
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
  column?: DataTableColumn<T>
  filter?: React.ReactNode
  className?: string
}) {
  const hasSortKey = !!column?.columnDef?.sortKey

  return (
    <div
      className={cn('flex items-center gap-1 justify-end min-w-0', className)}
    >
      <Text className="truncate">{children}</Text>
      <div className="flex items-center gap-0.5 shrink-0">
        {table && column && filter && (
          <ColumnFilter columnId={column.id} table={table}>
            {filter}
          </ColumnFilter>
        )}
        {table && column && hasSortKey && (
          <ColumnSort columnId={column.id} table={table} />
        )}
      </div>
    </div>
  )
}
