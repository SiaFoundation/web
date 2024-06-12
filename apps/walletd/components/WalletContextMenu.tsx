import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import {
  Locked16,
  Unlocked16,
  Edit16,
  Delete16,
  Scan16,
} from '@siafoundation/react-icons'
import { useDialog } from '../contexts/dialog'
import { WalletData } from '../contexts/wallets/types'

type Props = {
  wallet: WalletData
} & Omit<React.ComponentProps<typeof DropdownMenu>, 'children'>

export function WalletContextMenu({
  wallet: { id, metadata, state, actions },
  ...props
}: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu {...props}>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      {metadata.type === 'seed' ? (
        state.status === 'unlocked' ? (
          <DropdownMenuItem
            aria-label="Wallet context menu"
            onClick={(e) => e.stopPropagation()}
            onSelect={() => actions.lock()}
          >
            <DropdownMenuLeftSlot>
              <Locked16 />
            </DropdownMenuLeftSlot>
            Lock wallet
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={(e) => e.stopPropagation()}
            onSelect={() => actions.unlock()}
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
      <DropdownMenuItem
        onClick={(e) => e.stopPropagation()}
        onSelect={() => openDialog('walletsRescan')}
      >
        <DropdownMenuLeftSlot>
          <Scan16 />
        </DropdownMenuLeftSlot>
        Rescan blockchain
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
