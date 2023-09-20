import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  Delete16,
  DropdownMenuLabel,
  BucketIcon,
} from '@siafoundation/design-system'
import { useDialog } from '../../contexts/dialog'

type Props = {
  name: string
}

export function BucketContextMenu({ name }: Props) {
  const { openDialog } = useDialog()
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <BucketIcon size={16} />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        disabled={name === 'default'}
        onSelect={() => {
          openDialog('filesDeleteBucket', name)
        }}
      >
        <DropdownMenuLeftSlot>
          <Delete16 />
        </DropdownMenuLeftSlot>
        Delete bucket
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
