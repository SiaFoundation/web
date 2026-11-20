import { Button } from '@siafoundation/design-system'
import { Locked16, Search16 } from '@siafoundation/react-icons'
import { useDialog } from '../../../contexts/dialog'

export function BlockedObjectsActions() {
  const { openDialog } = useDialog()
  return (
    <div className="flex gap-2">
      <Button onClick={() => openDialog('objectFind')}>
        <Search16 />
        Find blocked object
      </Button>
      <Button variant="red" onClick={() => openDialog('objectBlock')}>
        <Locked16 />
        Block object
      </Button>
    </div>
  )
}
