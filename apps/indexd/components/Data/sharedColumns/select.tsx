import { Checkbox } from '@siafoundation/design-system'
import { ColumnDef } from '@tanstack/react-table'

export const selectColumn = <T extends { id: string }>(): ColumnDef<T> => ({
  id: 'select',
  header: ({ table }) => (
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-full flex items-center justify-start"
    >
      <Checkbox
        checked={
          table.getIsAllRowsSelected()
            ? true
            : table.getIsSomeRowsSelected()
              ? 'indeterminate'
              : false
        }
        onCheckedChange={(checked) => {
          table.getToggleAllRowsSelectedHandler()({
            target: {
              checked: checked === true,
            },
          })
        }}
      />
    </div>
  ),
  cell: ({ row }) => (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center"
    >
      <Checkbox
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        onCheckedChange={(checked) => {
          row.getToggleSelectedHandler()({
            target: {
              checked: checked === true,
            },
          })
        }}
      />
    </div>
  ),
  meta: {
    stopPropagation: true,
    width: 35,
  },
})
