import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  WalletdAuthedLayout,
  WalletdAuthedPageLayoutProps,
} from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { WalletActionsMenu } from './WalletActionsMenu'
import { useWallets } from '../../contexts/wallets'
import { WalletNavMenu } from './WalletNavMenu'
import { EventsFilterBar } from './EventsFilterBar'

export const Layout = WalletdAuthedLayout
export function useLayoutProps(): WalletdAuthedPageLayoutProps {
  const { openDialog } = useDialog()
  const { wallet } = useWallets()
  return {
    routes,
    sidenav: <WalletdSidenav />,
    openSettings: () => openDialog('settings'),
    title: wallet?.name,
    nav: <WalletNavMenu />,
    actions: <WalletActionsMenu />,
    stats: <EventsFilterBar />,
    size: 'full',
  }
}
