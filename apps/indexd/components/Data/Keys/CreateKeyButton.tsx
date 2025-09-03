import { Button } from '@siafoundation/design-system'
import { Add16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

export function CreateKeyButton() {
  const { openDialog } = useDialog()
  return (
    <Button variant="accent" onClick={() => openDialog('connectKeyCreate')}>
      <Add16 />
      Create key
    </Button>
  )
}
