import { Button, ListChecked16 } from '@siafoundation/design-system'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'

export function HostsActionsMenu() {
  const { openDialog } = useDialog()
  return (
    <div className="flex gap-2">
      <Button
        onClick={() => openDialog('hostsManageAllowBlock')}
        tip="Manage host blocklist and allowlist"
      >
        <ListChecked16 />
      </Button>
      <HostsViewDropdownMenu />
    </div>
  )
}
