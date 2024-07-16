import { Button } from '@siafoundation/design-system'
import {
  ArrowDownLeft16,
  ArrowUpRight16,
  Settings16,
} from '@siafoundation/react-icons'
import { useWalletBalance } from '@siafoundation/walletd-react'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/router'
import { useAddresses } from '../../contexts/addresses'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { WalletContextMenu } from '../WalletContextMenu'
import { AddressesButton } from './AddressesButton'
import { EventsViewDropdownMenu } from './EventsViewDropdownMenu'
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
  const { dataset } = useAddresses()
  return (
    <div className="flex gap-2">
      <WalletBalanceWithSf
        sc={new BigNumber(balance.data?.siacoins || 0)}
        sf={balance.data?.siafunds || 0}
        isSynced={status.isSynced}
      />
      <AddressesButton />
      {wallet?.metadata.type !== 'watch' && (
        <>
          <Button
            aria-label="receive"
            size="small"
            variant="accent"
            onClick={() => {
              const addressLowestIndex = dataset?.sort((a, b) =>
                a.metadata.index > b.metadata.index ? 1 : -1,
              )[0]?.address
              openDialog('addressUpdate', {
                walletId: walletId,
                address: addressLowestIndex,
              })
            }}
          >
            <ArrowDownLeft16 />
            Receive
          </Button>
          <Button
            aria-label="send"
            size="small"
            variant="accent"
            onClick={() => {
              if (wallet?.metadata.type === 'seed') {
                openDialog('walletSendSeed', {
                  walletId,
                })
              } else if (wallet?.metadata.type === 'ledger') {
                openDialog('walletSendLedger', {
                  walletId,
                })
              }
            }}
          >
            <ArrowUpRight16 />
            Send
          </Button>
        </>
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
