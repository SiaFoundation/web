import { Button, Edit16 } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'
import { useDialog } from '../../contexts/dialog'

export function WalletNavMenu() {
  const { wallet } = useWallets()
  const { openDialog } = useDialog()
  return (
    <div className="pl-1 flex gap-2">
      <Button
        variant="ghost"
        icon="hover"
        onClick={() =>
          openDialog('walletUpdate', {
            id: wallet.id,
          })
        }
      >
        <Edit16 />
      </Button>
    </div>
  )
}
