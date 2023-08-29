import {
  Button,
  CaretDown16,
  SettingsAdjust16,
  Select,
  PoolCombo,
  Label,
  Popover,
  MenuItemRightSlot,
  BaseMenuItem,
  MenuSeparator,
  Reset16,
  MenuSectionLabelToggleAll,
  Option,
} from '@siafoundation/design-system'
import { SortField, sortOptions } from '../../contexts/addresses/types'
import { groupBy } from 'lodash'
import { useAddresses } from '../../contexts/addresses'

export function AddressesViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    enabledColumns,
  } = useAddresses()

  const generalColumns = configurableColumns
    .filter((c) => c.category === 'general')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  return (
    <Popover
      trigger={
        <Button
          size="small"
          tip="Configure view"
          tipAlign="end"
          tipSide="bottom"
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
            tip="Reset all to defaults"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation()
              resetDefaultColumnVisibility()
            }}
          >
            <Reset16 />
          </Button>
        </MenuItemRightSlot>
      </BaseMenuItem>
      <MenuSectionLabelToggleAll
        label="General"
        columns={generalColumns.map((c) => c.value)}
        enabled={enabledColumns}
        setColumnsVisible={setColumnsVisible}
        setColumnsHidden={setColumnsHidden}
      />
      <BaseMenuItem>
        <PoolCombo
          options={generalColumns}
          values={enabledColumns}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
    </Popover>
  )
}
