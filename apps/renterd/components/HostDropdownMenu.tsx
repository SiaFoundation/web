import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  IconButton,
  Settings20,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'

type Props = {
  id: string
}

export function HostDropdownMenu({ id }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton>
          <Settings20 />
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openDialog('hostScoreSet', id)}>
          Change score
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => openDialog('hostBlocklistRemove', id)}>
          Remove from blocklist
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
