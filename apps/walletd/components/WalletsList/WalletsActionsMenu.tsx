import { Button } from '@siafoundation/design-system'
import { Add16, Locked16, Settings16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'
import { WalletsContextMenu } from '../WalletsContextMenu'
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
      <WalletsContextMenu
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
    </div>
  )
}
