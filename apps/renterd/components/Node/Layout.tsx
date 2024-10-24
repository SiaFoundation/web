import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { RenterdSidenav } from '../RenterdSidenav'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Node',
    routes,
    sidenav: <RenterdSidenav />,
    openSettings: () => openDialog('settings'),
  }
}
