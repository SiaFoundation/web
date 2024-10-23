import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { AlertsActionsMenu } from './AlertsActionsMenu'
import { AlertsFilterMenu } from './AlertsFilterMenu'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Alerts',
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <AlertsActionsMenu />,
    stats: <AlertsFilterMenu />,
  }
}
