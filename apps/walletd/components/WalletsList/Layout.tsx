import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  WalletdAuthedLayout,
  WalletdAuthedPageLayoutProps,
} from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { WalletsActionsMenu } from './WalletsActionsMenu'
import { WalletsFiltersBar } from './WalletsFiltersBar'

export const Layout = WalletdAuthedLayout
export function useLayoutProps(): WalletdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  return {
    title: 'Wallets',
    routes,
    sidenav: <WalletdSidenav />,
    openSettings: () => openDialog('settings'),
    actions: <WalletsActionsMenu />,
    stats: <WalletsFiltersBar />,
    size: '3',
  }
}
