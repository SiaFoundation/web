import {
  Button,
  PoolCombo,
  Label,
  Popover,
  MenuItemRightSlot,
  BaseMenuItem,
  MenuSectionLabelToggleAll,
} from '@siafoundation/design-system'
import {
  CaretDown16,
  SettingsAdjust16,
  Reset16,
} from '@siafoundation/react-icons'
import { useAlerts } from '../../contexts/alerts'

export function AlertsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    resetDefaultColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    enabledColumns,
  } = useAlerts()

  const generalColumns = configurableColumns
    .filter((c) => c.category === 'general')
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
