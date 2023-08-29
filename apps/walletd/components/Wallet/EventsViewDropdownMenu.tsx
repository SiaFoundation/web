import {
  Button,
  CaretDown16,
  SettingsAdjust16,
  PoolCombo,
  Label,
  Popover,
  MenuItemRightSlot,
  BaseMenuItem,
  Reset16,
  MenuSectionLabelToggleAll,
} from '@siafoundation/design-system'
import { useEvents } from '../../contexts/events'

export function EventsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    enabledColumns,
  } = useEvents()

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
