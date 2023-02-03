import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  Settings20,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'

type Props = {
  id: string
}

export function HostDropdownMenu({ id }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu
      trigger={
        <Button>
          <Settings20 />
        </Button>
      }
      contentProps={{ align: 'end' }}
    >
      <DropdownMenuItem onClick={() => openDialog('hostScoreSet', id)}>
        Change score
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => openDialog('hostBlocklistRemove', id)}>
        Remove from blocklist
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
