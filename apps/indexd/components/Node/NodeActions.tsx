import { useDialog } from '../../contexts/dialog'
import { Button } from '@siafoundation/design-system'

export function NodeActions() {
  const { openDialog } = useDialog()
  return (
    <Button key="connectPeer" onClick={() => openDialog('connectPeer')}>
      Connect peer
    </Button>
  )
}
