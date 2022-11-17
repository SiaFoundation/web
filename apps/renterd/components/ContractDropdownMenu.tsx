import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Button,
  Settings20,
} from '@siafoundation/design-system'
import { useDialog } from '../contexts/dialog'

type Props = {
  id: string
}

export function ContractDropdownMenu({ id }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <Settings20 />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => openDialog('hostScoreSet', id)}>
          Change score
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
