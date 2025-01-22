import {
  Button,
  Select,
  PoolCombo,
  Label,
  Popover,
  MenuItemRightSlot,
  BaseMenuItem,
  MenuSeparator,
  Option,
  TableColumn,
} from '@siafoundation/design-system'
import { CaretDown16, SettingsAdjust16 } from '@siafoundation/react-icons'
import { sortOptions, SortField } from '../../contexts/filesManager/types'
import { groupBy } from '@technically/lodash'

export function FilesViewDropdownMenu({
  tableState,
}: {
  tableState: {
    sortField: SortField
    sortDirection: 'asc' | 'desc'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visibleColumns: TableColumn<any, any, any>[]
    toggleColumnVisibility: (id: string) => void
    resetDefaultColumnVisibility: () => void
    setSortField: (field: SortField) => void
    setSortDirection: (direction: 'asc' | 'desc') => void
    configurableColumns: {
      label: string
      id: string
    }[]
  }
}) {
  return (
    <Popover
      trigger={
        <Button
          size="small"
          aria-label="configure view"
          tip="Configure view"
          tipAlign="end"
        >
          <SettingsAdjust16 />
          View
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        align: 'end',
        className: 'max-w-[300px]',
      }}
    >
      <BaseMenuItem>
        <Label htmlFor="sortField">Order by</Label>
        <MenuItemRightSlot>
          <Select
            id="sortField"
            name="sortField"
            value={tableState.sortField}
            onChange={(e) => {
              tableState.setSortField(e.currentTarget.value as SortField)
            }}
          >
            {Object.entries(groupBy(sortOptions, 'category')).map(
              ([category, options]) => (
                <optgroup key={category} label={category}>
                  {options.map((column) => (
                    <Option key={column.id} value={column.id}>
                      {column.label}
                    </Option>
                  ))}
                </optgroup>
              )
            )}
          </Select>
        </MenuItemRightSlot>
      </BaseMenuItem>
      <BaseMenuItem>
        <Label htmlFor="sortDirection">Direction</Label>
        <MenuItemRightSlot>
          <Select
            id="sortDirection"
            name="sortDirection"
            value={tableState.sortDirection}
            onClick={(e) => {
              e.stopPropagation()
            }}
            onChange={(e) => {
              tableState.setSortDirection(
                e.currentTarget.value as 'asc' | 'desc'
              )
            }}
          >
            <Option key="desc" value="desc">
              descending
            </Option>
            <Option key="asc" value="asc">
              ascending
            </Option>
          </Select>
        </MenuItemRightSlot>
      </BaseMenuItem>
      <MenuSeparator />
      <BaseMenuItem>
        <Label>Display properties</Label>
        <MenuItemRightSlot>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              tableState.resetDefaultColumnVisibility()
            }}
          >
            Reset default
          </Button>
        </MenuItemRightSlot>
      </BaseMenuItem>
      <BaseMenuItem>
        <PoolCombo
          options={tableState.configurableColumns.map((column) => ({
            label: column.label,
            value: column.id,
          }))}
          values={tableState.visibleColumns.map((column) => column.id)}
          onChange={(value) => tableState.toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
    </Popover>
  )
}
