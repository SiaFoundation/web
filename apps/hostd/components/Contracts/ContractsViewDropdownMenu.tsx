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
} from '@siafoundation/design-system'
import { TableColumnId } from '../../contexts/contracts/types'
import { useContracts } from '../../contexts/contracts'

export function ContractsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    sortOptions,
    sortColumn,
    setSortColumn,
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
  const financialColumns = configurableColumns
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
            value={sortColumn}
            onChange={(e) => {
              setSortColumn(e.currentTarget.value as TableColumnId)
            }}
          >
            {Object.entries(sortOptions).map(([category, options]) => (
              <optgroup key={category} label={category}>
                {options.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.label}
                  </option>
                ))}
              </optgroup>
            ))}
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
            <option key="desc" value="desc">
              Descending
            </option>
            <option key="asc" value="asc">
              Ascending
            </option>
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
        label="Usage"
        columns={financialColumns.map((c) => c.value)}
        enabled={enabledColumns}
        setColumnsVisible={setColumnsVisible}
        setColumnsHidden={setColumnsHidden}
      />
      <BaseMenuItem>
        <PoolCombo
          options={financialColumns}
          values={enabledColumns}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
    </Popover>
  )
}
