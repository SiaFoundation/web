import { RenterdSidenav } from '../RenterdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  RenterdAuthedLayout,
  RenterdAuthedPageLayoutProps,
} from '../RenterdAuthedLayout'
import { ConfigStats } from './ConfigStats'
import { ConfigActions } from './ConfigActions'
import { ConfigNav } from './ConfigNav'
import { Recommendations } from './Recommendations'

export const Layout = RenterdAuthedLayout
export function useLayoutProps(): RenterdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Configuration',
    routes,
    nav: <ConfigNav />,
    sidenav: <RenterdSidenav />,
    stats: <ConfigStats />,
    actions: <ConfigActions />,
    after: <Recommendations />,
    openSettings: () => openDialog('settings'),
    size: '3',
  }
}
