import {
  Button,
  Earth16,
  ListChecked16,
  Tooltip,
} from '@siafoundation/design-system'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { useAppSettings } from '@siafoundation/react-core'

export function HostsActionsMenu() {
  const { openDialog } = useDialog()
  const { viewMode, setViewMode } = useHosts()
  const { gpu } = useAppSettings()
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => openDialog('hostsManageAllowBlock')}
        tip="Manage host blocklist and allowlist"
      >
        <ListChecked16 />
        Manage lists
      </Button>
      <Tooltip
        content={
          gpu.canGpuRender && gpu.isGpuEnabled
            ? 'Toggle interactive map'
            : 'Enable GPU to view interactive map'
        }
      >
        <Button
          disabled={!gpu.canGpuRender}
          onClick={() => {
            if (gpu.isGpuEnabled) {
              setViewMode(viewMode === 'map' ? 'list' : 'map')
            } else {
              openDialog('settings')
            }
          }}
        >
          <Earth16 />
        </Button>
      </Tooltip>
      <HostsViewDropdownMenu />
    </div>
  )
}
