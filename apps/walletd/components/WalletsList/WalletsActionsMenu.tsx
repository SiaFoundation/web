import { Add16, Button, Locked16 } from '@siafoundation/design-system'
import { useWallets } from '../../contexts/wallets'
import { useDialog } from '../../contexts/dialog'
import { WalletsViewDropdownMenu } from './WalletsViewDropdownMenu'

export function WalletsActionsMenu() {
  const { lockAllWallets, unlockedCount } = useWallets()
  const { openDialog } = useDialog()
  return (
    <div className="flex gap-2">
      {!!unlockedCount && (
        <Button
          tip="Lock all wallets"
          tipSide="bottom"
          onClick={() => lockAllWallets()}
        >
          <Locked16 />
          Lock wallets
        </Button>
      )}
      <Button variant="accent" onClick={() => openDialog('walletAddType')}>
        <Add16 />
        Add wallet
      </Button>
      <WalletsViewDropdownMenu />
    </div>
  )
}
