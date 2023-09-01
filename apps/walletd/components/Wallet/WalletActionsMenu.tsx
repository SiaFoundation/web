import {
  ArrowUpRight16,
  Button,
  Settings16,
  WalletBalance,
} from '@siafoundation/design-system'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import BigNumber from 'bignumber.js'
import { AddressesButton } from './AddressesButton'
import { EventsViewDropdownMenu } from './EventsViewDropdownMenu'
import { useWalletBalance } from '@siafoundation/react-walletd'
import { useRouter } from 'next/router'
import { useWallets } from '../../contexts/wallets'
import { useDialog } from '../../contexts/dialog'
import { WalletContextMenu } from '../WalletContextMenu'

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
          onClick={() => {
            if (wallet?.type === 'seed') {
              openDialog('walletSendSiacoinSeed', {
                walletId,
              })
            } else if (wallet?.type === 'ledger') {
              openDialog('walletSendSiacoinLedger', {
                walletId,
              })
            }
          }}
        >
          <ArrowUpRight16 />
          Send
        </Button>
      )}
      <EventsViewDropdownMenu />
      {wallet && (
        <WalletContextMenu
          wallet={wallet}
          trigger={
            <Button
              size="small"
              tip="Wallet settings"
              tipAlign="end"
              tipSide="bottom"
            >
              <Settings16 />
            </Button>
          }
          contentProps={{
            align: 'end',
          }}
        />
      )}
    </div>
  )
}
