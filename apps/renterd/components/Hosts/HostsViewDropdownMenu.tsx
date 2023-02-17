import {
  Button,
  CaretDown16,
  DropdownMenu,
  SettingsAdjust16,
  DropdownMenuItem,
  DropdownMenuRightSlot,
  ComboPool,
  Popover,
  BaseMenuItem,
  MenuItemRightSlot,
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
    <Popover
      trigger={
        <Button>
          <SettingsAdjust16 />
          View
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        align: 'end',
        className: 'max-w-xs',
      }}
    >
      <BaseMenuItem>
        Display properties
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
        <ComboPool
          options={configurableColumns.map((column) => ({
            label: column.label,
            value: column.id,
          }))}
          values={enabledColumns}
          onChange={(value) => toggleColumnVisibility(value)}
        />
      </BaseMenuItem>
    </Popover>
  )
}
