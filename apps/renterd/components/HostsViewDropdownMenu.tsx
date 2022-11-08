import {
  Button,
  CaretDown16,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  SettingsAdjust16,
  DropdownMenuGroup,
  DropdownMenuItem,
  Select,
  DropdownMenuRightSlot,
  DropdownMenuSeparator,
  Box,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="1">
          <SettingsAdjust16 />
          View
          <CaretDown16 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" css={{ maxWidth: '300px' }}>
        <DropdownMenuGroup>
          <DropdownMenuItem
            css={{
              padding: '$2-5 $1',
            }}
          >
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
          <DropdownMenuItem
            css={{
              padding: '$2-5 $1',
            }}
          >
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
        <DropdownMenuItem
          css={{
            padding: '$2-5 $1',
          }}
        >
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
        <Box css={{ padding: '$1' }}>
          <ComboPool
            options={configurableColumns.map((column) => ({
              label: column.label,
              value: column.key,
            }))}
            values={enabledColumns}
            onChange={(value) => toggleColumn(value)}
          />
        </Box>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
