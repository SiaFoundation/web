import {
  Badge,
  Button,
  CaretDown16,
  Flex,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  SettingsAdjust16,
  DropdownMenuGroup,
  DropdownMenuItem,
  Select,
  DropdownMenuRightSlot,
  DropdownMenuSeparator,
} from '@siafoundation/design-system'
import { useContracts } from '../hooks/useContracts'

export function ContractsDropdownView() {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="1" icon>
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
                value={sortColumn}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onChange={(e) => {
                  setSortColumn(e.target.value)
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
                value={sortDirection}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onChange={(e) => {
                  setSortDirection(e.target.value)
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
        <Flex gap="0-5" wrap="wrap" css={{ padding: '$1' }}>
          {configurableColumns.map((column) => {
            return (
              <Badge
                key={column.key}
                interactive
                variant={
                  enabledColumns.includes(column.key) ? 'active' : 'inactive'
                }
                onClick={() => toggleColumn(column.key)}
              >
                {column.label}
              </Badge>
            )
          })}
        </Flex>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
