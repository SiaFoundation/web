import {
  Button,
  CaretDown16,
  DropdownMenu,
  SettingsAdjust16,
  DropdownMenuItem,
  DropdownMenuRightSlot,
  ComboPool,
} from '@siafoundation/design-system'
// import { HostSortBy } from '@siafoundation/react-core'
import { useHosts } from '../../contexts/hosts'

export function HostsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    // sortOptions,
    // sortBy,
    // setSortBy,
    // sortDir,
    // setSortDir,
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
      {/* <DropdownMenuGroup>
        <DropdownMenuItem>
          Order by
          <DropdownMenuRightSlot>
            <Select
              value={sortBy}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                setSortBy(e.currentTarget.value as HostSortBy)
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
        <DropdownMenuItem>
          Direction
          <DropdownMenuRightSlot>
            <Select
              value={sortDir}
              onClick={(e) => {
                e.stopPropagation()
              }}
              onChange={(e) => {
                setSortDir(e.currentTarget.value as 'asc' | 'desc')
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
      <DropdownMenuSeparator /> */}
      <DropdownMenuItem>
        Display properties
        <DropdownMenuRightSlot>
          <Button
            onClick={(e) => {
              e.stopPropagation()
              resetDefaultColumnVisibility()
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
            value: column.id,
          }))}
          values={enabledColumns}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </div>
    </DropdownMenu>
  )
}
