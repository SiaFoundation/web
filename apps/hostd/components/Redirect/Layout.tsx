import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'
import { HostdSidenav } from '../HostdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Home',
    routes,
    sidenav: <HostdSidenav />,
    openSettings: () => openDialog('settings'),
  }
}
