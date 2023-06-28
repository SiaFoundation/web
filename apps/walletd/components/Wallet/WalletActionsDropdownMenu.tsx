import {
  Button,
  Delete16,
  Edit16,
  DropdownMenuLeftSlot,
  DropdownMenu,
  DropdownMenuItem,
  Settings16,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { useWallets } from '../../contexts/wallets'

export function WalletActionsDropdownMenu() {
  const { openDialog } = useDialog()
  const { wallet } = useWallets()
  return (
    <DropdownMenu
      trigger={
        <Button size="small" tip="Wallet settings" tipAlign="end">
          <Settings16 />
        </Button>
      }
      contentProps={{
        align: 'end',
      }}
    >
      <DropdownMenuItem
        onSelect={() =>
          openDialog('walletUpdate', {
            walletId: wallet?.id,
          })
        }
      >
        <DropdownMenuLeftSlot>
          <Edit16 />
        </DropdownMenuLeftSlot>
        Edit wallet
      </DropdownMenuItem>
      <DropdownMenuItem
        onSelect={() =>
          openDialog('walletRemove', {
            walletId: wallet?.id,
          })
        }
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete wallet
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
