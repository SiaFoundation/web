import {
  Button,
  ListChecked16,
  PaginatorUnknownTotal,
} from '@siafoundation/design-system'
import { HostsViewDropdownMenu } from './HostsViewDropdownMenu'
import { useDialog } from '../../contexts/dialog'
import { useHosts } from '../../contexts/hosts'

export function HostsActionsMenu() {
  const { offset, limit, pageCount } = useHosts()
  const { openDialog } = useDialog()
  return (
    <div className="flex gap-2">
      <PaginatorUnknownTotal
        offset={offset}
        limit={limit}
        pageTotal={pageCount}
      />
      <Button
        onClick={() => openDialog('hostsManageAllowBlock')}
        tip="Manage host blocklist and allowlist"
        tipAlign="end"
      >
        <ListChecked16 />
      </Button>
      <HostsViewDropdownMenu />
    </div>
  )
}
