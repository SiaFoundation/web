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
import { WalletActionsDropdownMenu } from './WalletActionsDropdownMenu'
import { useDialog } from '../../contexts/dialog'

export function WalletActionsMenu() {
  const status = useSyncStatus()
  const router = useRouter()
  const { openDialog } = useDialog()
  const walletId = router.query.id as string
  const balance = useWalletBalance({
    params: {
      id: walletId,
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
        <Button
          size="small"
          variant="accent"
          onClick={() =>
            openDialog('sendSiacoin', {
              walletId,
            })
          }
        >
          <ArrowUpRight16 />
          Send
        </Button>
      )}
      <EventsViewDropdownMenu />
      <WalletActionsDropdownMenu />
    </div>
  )
}
