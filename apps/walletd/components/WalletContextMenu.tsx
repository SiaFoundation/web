import {
  DropdownMenu,
  DropdownMenuItem,
  Locked16,
  Unlocked16,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Edit16,
  Delete16,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'
import { WalletData } from '../contexts/wallets/types'

type Props = {
  wallet: WalletData
} & Omit<React.ComponentProps<typeof DropdownMenu>, 'children'>

export function WalletContextMenu({
  wallet: { id, type, status, lock, unlock },
  ...props
}: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu {...props}>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {type === 'seed' ? (
        status === 'unlocked' ? (
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={() => lock()}
          >
            <DropdownMenuLeftSlot>
              <Locked16 />
            </DropdownMenuLeftSlot>
            Lock wallet
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={() => unlock()}
          >
            <DropdownMenuLeftSlot>
              <Unlocked16 />
            </DropdownMenuLeftSlot>
            Unlock wallet
          </DropdownMenuItem>
        )
      ) : null}
      <DropdownMenuItem
        onClick={(e) => e.stopPropagation()}
        onSelect={() => openDialog('walletUpdate', { walletId: id })}
      >
        <DropdownMenuLeftSlot>
          <Edit16 />
        </DropdownMenuLeftSlot>
        Edit wallet
      </DropdownMenuItem>
      <DropdownMenuItem
        onClick={(e) => e.stopPropagation()}
        onSelect={() => openDialog('walletRemove', { walletId: id })}
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete wallet
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
