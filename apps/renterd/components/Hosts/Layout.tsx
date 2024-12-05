import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { HostsActionsMenu } from './HostsActionsMenu'
import { HostsFilterBar } from './HostsFilterBar'
import { HostsBulkMenu } from './HostsBulkMenu'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Hosts',
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    size: 'full',
    actions: <HostsActionsMenu />,
    stats: <HostsFilterBar />,
    scroll: false,
    dockedControls: <HostsBulkMenu />,
  }
}
