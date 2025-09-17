import {
  DropdownMenuItem,
  DropdownMenuLeftSlot,
} from '@siafoundation/design-system'
import { useConfigEnabled } from '../useConfigEnabled'
import {
  PauseOutlineFilled16,
  PlayOutlineFilled16,
} from '@siafoundation/react-icons'

export function ConfigEnabledMenuItem() {
  const { toggleEnabled, enabled } = useConfigEnabled()
  return (
    <DropdownMenuItem onSelect={toggleEnabled}>
      <DropdownMenuLeftSlot>
        {enabled ? <PauseOutlineFilled16 /> : <PlayOutlineFilled16 />}
      </DropdownMenuLeftSlot>
      {enabled ? 'Disable system' : 'Enable system'}
    </DropdownMenuItem>
  )
}
