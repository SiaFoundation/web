import { Button } from '@siafoundation/design-system'
import { walletTypes } from '../../config/walletTypes'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'

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
        tip={walletTypes[wallet?.metadata.type]?.title}
      >
        {walletTypes[wallet?.metadata.type]?.icon}
      </Button>
    </div>
  )
}
