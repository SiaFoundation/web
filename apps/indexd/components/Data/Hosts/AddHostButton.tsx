import { Button } from '@siafoundation/design-system'
import { Add16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

export function AddHostButton() {
  const { openDialog } = useDialog()
  return (
    <Button variant="accent" onClick={() => openDialog('hostImport')}>
      <Add16 />
      Add host
    </Button>
  )
}
