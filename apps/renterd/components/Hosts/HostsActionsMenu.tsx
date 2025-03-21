import {
  Button,
  Tooltip,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { Earth16, ListChecked16 } from '@siafoundation/react-icons'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'
import { useAppSettings } from '@siafoundation/react-core'

export function HostsActionsMenu() {
  const { openDialog } = useDialog()
  const { viewMode, setViewMode } = useHosts()
  const { daemonExplorer, settings, gpu } = useAppSettings()
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
          !settings.siascan
            ? 'Configure an explorer to view interactive map'
            : gpu.canGpuRender && gpu.isGpuEnabled
            ? 'Toggle interactive map'
            : 'Enable GPU to view interactive map'
        }
      >
        <Button
          disabled={!gpu.canGpuRender}
          onClick={() => {
            if (!daemonExplorer.enabled) {
              triggerErrorToast({
                title: 'Explorer not configured',
                body: 'Configure an explorer in the startup configuration to enable the interactive map.',
              })
              return
            }
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
