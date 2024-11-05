import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { ConfigActions } from './ConfigActions'
import { ConfigNav } from './ConfigNav'
import { HangingNav } from './HangingNav'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Configuration',
    routes,
    nav: <ConfigNav />,
    sidenav: <RenterdSidenav />,
    actions: <ConfigActions />,
    after: <HangingNav />,
    openSettings: () => openDialog('settings'),
    size: '3',
  }
}
