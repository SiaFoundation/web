import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
} from '@siafoundation/design-system'
import { Delete16, BucketIcon, Rule16 } from '@siafoundation/react-icons'
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
      contentProps={{
        align: 'start',
        onClick: (e) => {
          e.stopPropagation()
        },
      }}
    >
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          openDialog('filesBucketPolicy', name)
        }}
      >
        <DropdownMenuLeftSlot>
          <Rule16 />
        </DropdownMenuLeftSlot>
        Change policy
      </DropdownMenuItem>
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
