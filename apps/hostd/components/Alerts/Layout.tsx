import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'
import { AlertsActionsMenu } from './AlertsActionsMenu'
import { AlertsFilterMenu } from './AlertsFilterMenu'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Alerts',
    routes,
    sidenav: <HostdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <AlertsActionsMenu />,
    stats: <AlertsFilterMenu />,
  }
}
