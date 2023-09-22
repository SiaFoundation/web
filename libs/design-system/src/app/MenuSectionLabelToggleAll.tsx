import { View16, ViewOff16 } from '@siafoundation/react-icons'
import { Button } from '../core/Button'
import { Label } from '../core/Label'
import { BaseMenuItem, MenuItemRightSlot } from '../core/Menu'
import { difference } from 'lodash'

export function MenuSectionLabelToggleAll({
  label,
  columns,
  enabled,
  setColumnsVisible,
  setColumnsHidden,
}: {
  label: string
  columns: string[]
  enabled: string[]
  setColumnsVisible: (ids: string[]) => void
  setColumnsHidden: (ids: string[]) => void
}) {
  const allVisible = difference(columns, enabled).length === 0
  const allHidden = difference(columns, enabled).length === columns.length
  return (
    <BaseMenuItem>
      <Label>{label}</Label>
      <MenuItemRightSlot>
        <Button
          tip={`${label}: show all`}
          icon={allVisible ? 'contrast' : 'hover'}
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            setColumnsVisible(columns)
          }}
        >
          <View16 />
        </Button>
        <Button
          icon={allHidden ? 'contrast' : 'hover'}
          tip={`${label}: hide all`}
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation()
            setColumnsHidden(columns)
          }}
        >
          <ViewOff16 />
        </Button>
      </MenuItemRightSlot>
    </BaseMenuItem>
  )
}
