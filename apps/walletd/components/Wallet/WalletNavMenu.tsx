import { Button, Sprout16, Usb16, View16 } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'
import { useDialog } from '../../contexts/dialog'
import { walletTypes } from '../../config/walletTypes'

export function WalletNavMenu() {
  const { wallet } = useWallets()
  const { openDialog } = useDialog()
  return (
    <div className="pl-1 flex gap-2 items-center">
      <Button
        variant="ghost"
        icon="contrast"
        onClick={() =>
          openDialog('walletUpdate', {
            walletId: wallet.id,
          })
        }
        className="!p-0"
        tip={walletTypes[wallet?.type]?.title}
      >
        {wallet?.type === 'seed' && <Sprout16 />}
        {wallet?.type === 'watch' && <View16 />}
        {wallet?.type === 'ledger' && <Usb16 />}
      </Button>
    </div>
  )
}
