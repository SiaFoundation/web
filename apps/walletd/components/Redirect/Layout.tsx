import {
  WalletdAuthedLayout,
  WalletdAuthedPageLayoutProps,
} from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'

export const Layout = WalletdAuthedLayout
export function useLayoutProps(): WalletdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Home',
    routes,
    sidenav: <WalletdSidenav />,
    openSettings: () => openDialog('settings'),
  }
}
