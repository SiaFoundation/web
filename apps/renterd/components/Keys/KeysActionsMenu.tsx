import { Button } from '@siafoundation/design-system'
import { Add16 } from '@siafoundation/react-icons'
import { useDialog } from '../../contexts/dialog'
import { KeysViewDropdownMenu } from './KeysViewDropdownMenu'

export function KeysActionsMenu() {
  const { openDialog } = useDialog()
  return (
    <div className="flex gap-2">
      <Button onClick={() => openDialog('keysCreate')}>
        <Add16 />
        Create keypair
      </Button>
      <KeysViewDropdownMenu />
    </div>
  )
}
