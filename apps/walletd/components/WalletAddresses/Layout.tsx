import { Link, Text, truncate } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useDialog } from '../../contexts/dialog'
import {
  WalletdAuthedLayout,
  WalletdAuthedPageLayoutProps,
} from '../WalletdAuthedLayout'
import { WalletdSidenav } from '../WalletdSidenav'
import { AddressesActionsMenu } from './AddressesActionsMenu'
import { useRouter } from 'next/router'
import { useWallets } from '../../contexts/wallets'
import { AddressesFiltersBar } from './AddressesFilterBar'

export const Layout = WalletdAuthedLayout
export function useLayoutProps(): WalletdAuthedPageLayoutProps {
  const router = useRouter()
  const id = router.query.id as string
  const { openDialog } = useDialog()
  const { wallet } = useWallets()
  return {
    routes,
    sidenav: <WalletdSidenav />,
    openSettings: () => openDialog('settings'),
    title: wallet?.name,
    navTitle: (
      <div className="flex gap-2 relative -top-px">
        <Link
          underline="hover"
          font="mono"
          size="18"
          weight="bold"
          href={{
            pathname: routes.wallet.view,
            query: {
              id,
            },
          }}
        >
          {truncate(wallet?.name, 20)}
        </Link>
        <Text font="mono" size="18" weight="normal" color="verySubtle">
          /
        </Text>
        <Text font="mono" size="18" weight="bold">
          Addresses
        </Text>
      </div>
    ),
    actions: <AddressesActionsMenu />,
    stats: <AddressesFiltersBar />,
    size: '3',
  }
}
