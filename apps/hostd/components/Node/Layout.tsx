import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { HostdSidenav } from '../HostdSidenav'
import {
  HostdAuthedLayout,
  HostdAuthedPageLayoutProps,
} from '../HostdAuthedLayout'

export const Layout = HostdAuthedLayout
export function useLayoutProps(): HostdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Node',
    routes,
    sidenav: <HostdSidenav />,
    openSettings: () => openDialog('settings'),
  }
}
