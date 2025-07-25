import { IndexdSidenav } from '../IndexdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  IndexdAuthedLayout,
  IndexdAuthedPageLayoutProps,
} from '../IndexdAuthedLayout'

export const Layout = IndexdAuthedLayout
export function useLayoutProps(): IndexdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Data',
    routes,
    sidenav: <IndexdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <div></div>,
    size: 'full',
    scroll: false,
  }
}
