import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { KeysActionsMenu } from './KeysActionsMenu'
import { KeysStatsMenu } from './KeysStatsMenu'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Keys',
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <KeysActionsMenu />,
    stats: <KeysStatsMenu />,
  }
}
