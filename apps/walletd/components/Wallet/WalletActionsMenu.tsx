import { Button } from '@siafoundation/design-system'
import { ArrowUpRight16, Settings16 } from '@siafoundation/react-icons'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import BigNumber from 'bignumber.js'
import { AddressesButton } from './AddressesButton'
import { EventsViewDropdownMenu } from './EventsViewDropdownMenu'
import { useWalletBalance } from '@siafoundation/react-walletd'
import { useRouter } from 'next/router'
import { useWallets } from '../../contexts/wallets'
import { useDialog } from '../../contexts/dialog'
import { WalletContextMenu } from '../WalletContextMenu'
import { WalletBalanceWithSf } from './WalletBalanceWithSf'

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
      <WalletBalanceWithSf
        sc={new BigNumber(balance.data?.siacoins || 0)}
        sf={balance.data?.siafunds || 0}
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
