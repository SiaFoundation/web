import {
  Button,
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuLeftSlot,
} from '@siafoundation/design-system'
import { CloudUpload16, Error16 } from '@siafoundation/react-icons'

type Props = {
  abort?: () => void
}

export function UploadContextMenu({ abort }: Props) {
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <CloudUpload16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem onSelect={abort}>
        <DropdownMenuLeftSlot>
          <Error16 />
        </DropdownMenuLeftSlot>
        Cancel upload
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
