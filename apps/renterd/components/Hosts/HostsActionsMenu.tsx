import {
  Button,
  ListChecked16,
  PaginatorUnknownTotal,
  Tooltip,
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
      <HostsViewDropdownMenu />
      <Tooltip content="Manage host blocklist and allowlist" align="end">
        <Button onClick={() => openDialog('hostsManageAllowBlock')}>
          <ListChecked16 />
        </Button>
      </Tooltip>
    </div>
  )
}
