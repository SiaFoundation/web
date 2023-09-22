import {
  Button,
  PoolCombo,
  Popover,
  BaseMenuItem,
  MenuItemRightSlot,
  Label,
  MenuSectionLabelToggleAll,
} from '@siafoundation/design-system'
import {
  CaretDown16,
  SettingsAdjust16,
  Reset16,
} from '@siafoundation/react-icons'
import { useHosts } from '../../contexts/hosts'

export function HostsViewDropdownMenu() {
  const {
    configurableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    resetDefaultColumnVisibility,
    enabledColumns,
  } = useHosts()

  const generalColumns = configurableColumns
    .filter((c) => c.category === 'general')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  const autopilotColumns = configurableColumns
    .filter((c) => c.category === 'autopilot')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  const priceTableColumns = configurableColumns
    .filter((c) => c.category === 'priceTable')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  const settingsColumns = configurableColumns
    .filter((c) => c.category === 'hostSettings')
    .map((column) => ({
      label: column.label,
      value: column.id,
    }))
  return (
    <Popover
      trigger={
        <Button tip="Configure view" tipAlign="end">
          <SettingsAdjust16 />
          View
          <CaretDown16 />
        </Button>
      }
      contentProps={{
        align: 'end',
        className: '!max-w-md !h-[400px]',
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
      {autopilotColumns.length ? (
        <>
          <MenuSectionLabelToggleAll
            label="Autopilot"
            columns={autopilotColumns.map((c) => c.value)}
            enabled={enabledColumns}
            setColumnsVisible={setColumnsVisible}
            setColumnsHidden={setColumnsHidden}
          />
          <BaseMenuItem>
            <PoolCombo
              options={autopilotColumns}
              values={enabledColumns}
              onChange={(value) => toggleColumnVisibility(value)}
            />
          </BaseMenuItem>
        </>
      ) : null}
      {priceTableColumns.length ? (
        <>
          <MenuSectionLabelToggleAll
            label="Price table (RHPv3)"
            columns={priceTableColumns.map((c) => c.value)}
            enabled={enabledColumns}
            setColumnsVisible={setColumnsVisible}
            setColumnsHidden={setColumnsHidden}
          />
          <BaseMenuItem>
            <PoolCombo
              options={priceTableColumns}
              values={enabledColumns}
              onChange={(value) => toggleColumnVisibility(value)}
            />
          </BaseMenuItem>
        </>
      ) : null}
      {settingsColumns.length ? (
        <>
          <MenuSectionLabelToggleAll
            label="Host settings (RHPv2)"
            columns={settingsColumns.map((c) => c.value)}
            enabled={enabledColumns}
            setColumnsVisible={setColumnsVisible}
            setColumnsHidden={setColumnsHidden}
          />
          <BaseMenuItem>
            <PoolCombo
              options={settingsColumns}
              values={enabledColumns}
              onChange={(value) => toggleColumnVisibility(value)}
            />
          </BaseMenuItem>
        </>
      ) : null}
    </Popover>
  )
}
