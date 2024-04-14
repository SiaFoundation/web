import {
  DropdownMenu,
  DropdownMenuItem,
  Button,
  DropdownMenuLeftSlot,
  DropdownMenuLabel,
  Text,
  copyToClipboard,
} from '@siafoundation/design-system'
import { Copy16, ResetAlt16, CaretDown16 } from '@siafoundation/react-icons'
import { useAccountResetDrift } from '@siafoundation/renterd-react'

type Props = {
  id: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
  trigger?: React.ReactNode
}

export function AccountContextMenu({
  id,
  contentProps,
  buttonProps,
  trigger,
}: Props) {
  const resetDrift = useAccountResetDrift()
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button icon="hover" variant="ghost" {...buttonProps}>
            <CaretDown16 />
          </Button>
        )
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
          Account {id.slice(0, 20)}...
        </Text>
      </div>
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem
        onSelect={() =>
          resetDrift.post({
            params: {
              id,
            },
          })
        }
      >
        <DropdownMenuLeftSlot>
          <ResetAlt16 />
        </DropdownMenuLeftSlot>
        Reset account drift
      </DropdownMenuItem>
      <DropdownMenuLabel>Copy</DropdownMenuLabel>
      <DropdownMenuItem onSelect={() => copyToClipboard(id, 'account ID')}>
        <DropdownMenuLeftSlot>
          <Copy16 />
        </DropdownMenuLeftSlot>
        Account ID
      </DropdownMenuItem>
    </DropdownMenu>
  )
}
