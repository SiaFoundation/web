import {
  ArrowUpRight16,
  Button,
  WalletBalance,
} from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import BigNumber from 'bignumber.js'
import { AddressesButton } from './AddressesButton'
import { EventsViewDropdownMenu } from './EventsViewDropdownMenu'
import { useWalletBalance } from '@siafoundation/react-walletd'
import { useRouter } from 'next/router'
import { useWallets } from '../../contexts/wallets'

export function WalletActionsMenu() {
  const status = useSyncStatus()
  const router = useRouter()
  const balance = useWalletBalance({
    params: {
      id: router.query.id as string,
    },
  })
  const { wallet } = useWallets()
  return (
    <div className="flex gap-2">
      <WalletBalance
        sc={new BigNumber(balance.data?.siacoins || 0)}
        isSynced={status.isSynced}
      />
      <AddressesButton />
      {wallet?.type !== 'watch' && (
        <Button size="small" variant="accent">
          <ArrowUpRight16 />
          Send
        </Button>
      )}
      <EventsViewDropdownMenu />
    </div>
  )
}
