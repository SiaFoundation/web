import { Button, Earth16, ListChecked16 } from '@siafoundation/design-system'
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
      {gpu.canGpuRender && (
        <Button
          onClick={() => setViewMode(viewMode === 'map' ? 'list' : 'map')}
          tip="Toggle interactive map"
        >
          <Earth16 />
        </Button>
      )}
      <HostsViewDropdownMenu />
    </div>
  )
}
