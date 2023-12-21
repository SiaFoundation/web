import {
  Button,
  Select,
  PoolCombo,
  Label,
  Popover,
  MenuItemRightSlot,
  BaseMenuItem,
  MenuSeparator,
  MenuSectionLabelToggleAll,
  Option,
} from '@siafoundation/design-system'
import {
  CaretDown16,
  SettingsAdjust16,
  Reset16,
} from '@siafoundation/react-icons'
import { sortOptions, SortField } from '../../contexts/contracts/types'
import { useContracts } from '../../contexts/contracts'
import { groupBy } from '@technically/lodash'

export function ContractsViewDropdownMenu() {
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
  } = useContracts()

  const generalColumns = configurableColumns
    .filter((c) => c.category === 'general')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  const timeColumns = configurableColumns
    .filter((c) => c.category === 'time')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  const spendingColumns = configurableColumns
    .filter((c) => c.category === 'financial')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
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
      <MenuSectionLabelToggleAll
        label="Time"
        columns={timeColumns.map((c) => c.value)}
        enabled={enabledColumns}
        setColumnsVisible={setColumnsVisible}
        setColumnsHidden={setColumnsHidden}
      />
      <BaseMenuItem>
        <PoolCombo
          options={timeColumns}
          values={enabledColumns}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
      <MenuSectionLabelToggleAll
        label="Financial"
        columns={spendingColumns.map((c) => c.value)}
        enabled={enabledColumns}
        setColumnsVisible={setColumnsVisible}
        setColumnsHidden={setColumnsHidden}
      />
      <BaseMenuItem>
        <PoolCombo
          options={spendingColumns}
          values={enabledColumns}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
    </Popover>
  )
}
