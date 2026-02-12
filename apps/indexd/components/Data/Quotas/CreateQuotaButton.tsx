import { Button } from '@siafoundation/design-system'
import { Add16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

export function CreateQuotaButton() {
  const { openDialog } = useDialog()
  return (
    <Button variant="accent" onClick={() => openDialog('quotaCreate')}>
      <Add16 />
      Create quota
    </Button>
  )
}
