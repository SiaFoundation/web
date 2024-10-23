import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import { WalletdSidenav } from '../WalletdSidenav'
import {
  WalletdAuthedLayout,
  WalletdAuthedPageLayoutProps,
} from '../WalletdAuthedLayout'

export const Layout = WalletdAuthedLayout
export function useLayoutProps(): WalletdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Node',
    routes,
    sidenav: <WalletdSidenav />,
    openSettings: () => openDialog('settings'),
  }
}
