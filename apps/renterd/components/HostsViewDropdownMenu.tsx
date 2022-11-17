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
  ComboPool,
} from '@siafoundation/design-system'
import { HostSortBy } from '@siafoundation/react-core'
import { useHosts } from '../hooks/useHosts'

export function HostsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumn,
    resetDefaultColumns,
    sortOptions,
    sortBy,
    setSortBy,
    sortDir,
    setSortDir,
    enabledColumns,
  } = useHosts()
  return (
    <DropdownMenu
      trigger={
        <Button>
          <SettingsAdjust16 />
          View
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        align: 'end',
      }}
      className="max-w-xs"
    >
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Order by
          <DropdownMenuRightSlot>
            <Select
              value={sortBy}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                setSortBy(e.target.value as HostSortBy)
              }}
            >
              {Object.entries(sortOptions).map(([category, options]) => (
                <optgroup key={category} label={category}>
                  {options.map((column) => (
                    <option key={column.key} value={column.key}>
                      {column.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </Select>
          </DropdownMenuRightSlot>
        </DropdownMenuItem>
        <DropdownMenuItem>
          Direction
          <DropdownMenuRightSlot>
            <Select
              value={sortDir}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                setSortDir(e.target.value as 'asc' | 'desc')
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
      <DropdownMenuItem>
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
        <ComboPool
          options={configurableColumns.map((column) => ({
            label: column.label,
            value: column.key,
          }))}
          values={enabledColumns}
          onChange={(value) => toggleColumn(value)}
        />
      </div>
    </DropdownMenu>
  )
}
