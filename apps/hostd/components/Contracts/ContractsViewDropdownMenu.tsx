import {
  Button,
  CaretDown16,
  DropdownMenu,
  SettingsAdjust16,
  DropdownMenuGroup,
  DropdownMenuItem,
  Select,
  DropdownMenuRightSlot,
  DropdownMenuSeparator,
  PoolCombo,
} from '@siafoundation/design-system'
import { useContracts, ContractColumn } from '../hooks/useContracts'

export function ContractsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumn,
    resetDefaultColumns,
    sortOptions,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    enabledColumns,
  } = useContracts()
  return (
    <DropdownMenu
      trigger={
        <Button size="small">
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
      <DropdownMenuGroup>
        <DropdownMenuItem className="py-5 px-2">
          Order by
          <DropdownMenuRightSlot>
            <Select
              value={sortColumn}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                setSortColumn(e.currentTarget.value as ContractColumn)
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
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
        <DropdownMenuItem className="py-5 px-2">
          Direction
          <DropdownMenuRightSlot>
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
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem className="py-5 px-2">
        Display properties
        <DropdownMenuRightSlot>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              resetDefaultColumns()
            }}
          >
            Reset default
          </Button>
        </DropdownMenuRightSlot>
      </DropdownMenuItem>
      <div className="p-2">
        <PoolCombo
          options={configurableColumns.map((column) => ({
            label: column.label,
            value: column.id,
          }))}
          values={enabledColumns}
          onChange={(value) => toggleColumn(value)}
        />
      </div>
    </DropdownMenu>
  )
}
