import { Button, Tooltip } from '@siafoundation/design-system'
import {
  ArrowDownLeft16,
  ArrowUpRight16,
  Settings16,
} from '@siafoundation/react-icons'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import BigNumber from 'bignumber.js'
import { AddressesButton } from './AddressesButton'
import { EventsViewDropdownMenu } from './EventsViewDropdownMenu'
import { useWalletBalance } from '@siafoundation/walletd-react'
import { useParams } from 'next/navigation'
import { useWallets } from '../../contexts/wallets'
import { useDialog } from '../../contexts/dialog'
import { WalletContextMenu } from '../WalletContextMenu'
import { WalletBalanceWithSf } from './WalletBalanceWithSf'
import { useAddresses } from '../../contexts/addresses'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { walletTypes } from '../../config/walletTypes'
import { Maybe } from '@siafoundation/types'

export function WalletActionsMenu() {
  const status = useSyncStatus()
  const { openDialog } = useDialog()
  const params = useParams<Maybe<{ id: Maybe<string> }>>()
  const walletId = params?.id
  const balance = useWalletBalance({
    disabled: !walletId,
    params: {
      id: walletId,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const { wallet } = useWallets()
  const { dataset } = useAddresses()

  const isSendDisabled = wallet?.metadata.type === 'watch'

  return (
    <div className="flex gap-2">
      <WalletBalanceWithSf
        sc={new BigNumber(balance.data?.siacoins || 0)}
        sf={balance.data?.siafunds || 0}
        isSynced={status.isSynced}
      />
      <AddressesButton />
      <Tooltip
        content={
          isSendDisabled
            ? walletTypes[wallet?.metadata.type]?.sendDisabledTip
            : undefined
        }
        side="bottom"
      >
        <div>
          <Button
            aria-label="receive"
            size="small"
            variant="accent"
            disabled={isSendDisabled}
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
        </div>
      </Tooltip>
      <Tooltip
        content={
          isSendDisabled
            ? walletTypes[wallet?.metadata.type]?.sendDisabledTip
            : undefined
        }
        side="bottom"
      >
        <div>
          <Button
            aria-label="send"
            size="small"
            variant="accent"
            disabled={isSendDisabled}
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
        </div>
      </Tooltip>
      <EventsViewDropdownMenu />
      {wallet && (
        <WalletContextMenu
          wallet={wallet}
          trigger={
            <Button
              aria-label="wallet context menu"
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
