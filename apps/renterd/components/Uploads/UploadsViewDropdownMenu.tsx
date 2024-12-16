import {
  Button,
  PoolCombo,
  Label,
  Popover,
  MenuItemRightSlot,
  BaseMenuItem,
} from '@siafoundation/design-system'
import { CaretDown16, SettingsAdjust16 } from '@siafoundation/react-icons'
import { useUploads } from '../../contexts/uploads'

export function UploadsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    visibleColumnIds,
  } = useUploads()
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
