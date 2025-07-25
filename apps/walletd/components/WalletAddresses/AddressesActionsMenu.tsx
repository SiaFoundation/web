import { Button } from '@siafoundation/design-system'
import { Add16 } from '@siafoundation/react-icons'
import { useWallets } from '../../contexts/wallets'
import { useParams } from 'next/navigation'
import { useDialog } from '../../contexts/dialog'
import { AddressesViewDropdownMenu } from './AddressesViewDropdownMenu'
import { Maybe } from '@siafoundation/types'

export function AddressesActionsMenu() {
  const { openDialog } = useDialog()
  const { wallet } = useWallets()
  const params = useParams<Maybe<{ id: Maybe<string> }>>()
  const id = params?.id
  return (
    <div className="flex gap-2">
      <Button
        variant="accent"
        onClick={() => {
          if (wallet?.metadata.type === 'seed') {
            openDialog('walletAddressesGenerate', { walletId: id })
            return
          }
          if (wallet?.metadata.type === 'ledger') {
            openDialog('walletLedgerAddressGenerate', { walletId: id })
            return
          }
          if (wallet?.metadata.type === 'watch') {
            openDialog('walletAddressesAdd', { walletId: id })
            return
          }
        }}
      >
        <Add16 />
        Add addresses
      </Button>
      <AddressesViewDropdownMenu />
    </div>
  )
}
