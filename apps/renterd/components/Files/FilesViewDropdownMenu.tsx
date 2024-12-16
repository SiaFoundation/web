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
} from '@siafoundation/design-system'
import { CaretDown16, SettingsAdjust16 } from '@siafoundation/react-icons'
import { sortOptions, SortField } from '../../contexts/filesManager/types'
import { useFilesManager } from '../../contexts/filesManager'
import { groupBy } from '@technically/lodash'

export function FilesViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    visibleColumnIds,
  } = useFilesManager()
  return (
    <Popover
      trigger={
        <Button size="small" tip="Configure view" tipAlign="end">
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
        <Label>Order by</Label>
        <MenuItemRightSlot>
          <Select
            value={sortField}
            onChange={(e) => {
              setSortField(e.currentTarget.value as SortField)
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
        <Label>Direction</Label>
        <MenuItemRightSlot>
          <Select
            value={sortDirection}
            onClick={(e) => {
              e.stopPropagation()
            }}
            onChange={(e) => {
              setSortDirection(e.currentTarget.value as 'asc' | 'desc')
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
              resetDefaultColumnVisibility()
            }}
          >
            Reset default
          </Button>
        </MenuItemRightSlot>
      </BaseMenuItem>
      <BaseMenuItem>
        <PoolCombo
          options={configurableColumns.map((column) => ({
            label: column.label,
            value: column.id,
          }))}
          values={visibleColumnIds}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
    </Popover>
  )
}
