import { Add16, Button } from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'
import { WalletsViewDropdownMenu } from './WalletsViewDropdownMenu'

export function WalletsActionsMenu() {
  const { openDialog } = useDialog()
  return (
    <div className="flex gap-2">
      <Button variant="accent" onClick={() => openDialog('walletAddType')}>
        <Add16 />
        Add wallet
      </Button>
      <WalletsViewDropdownMenu />
    </div>
  )
}
