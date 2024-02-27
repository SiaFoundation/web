import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Text,
} from '@siafoundation/design-system'
import { Draggable16, Checkmark16 } from '@siafoundation/react-icons'
import { useAlerts } from '../../contexts/alerts'

type Props = {
  id: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function AlertContextMenu({ id, contentProps, buttonProps }: Props) {
  const { dismissOne } = useAlerts()

  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover" {...buttonProps}>
          <Draggable16 />
        </Button>
      }
      contentProps={{
        align: 'start',
        ...contentProps,
        onClick: (e) => {
          e.stopPropagation()
        },
      }}
    >
      <div className="px-1.5 py-1">
        <Text size="14" weight="medium" color="subtle">
          Alert {id.slice(0, 24)}...
        </Text>
      </div>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() => {
          dismissOne(id)
        }}
      >
        <DropdownMenuLeftSlot>
          <Checkmark16 />
        </DropdownMenuLeftSlot>
        Clear alert
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
