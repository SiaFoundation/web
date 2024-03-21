import { Button, DropdownMenu } from '@siafoundation/design-system'
import { CaretDown16 } from '@siafoundation/react-icons'
import { useHost } from '@siafoundation/react-renterd'
import { HostContextMenuContent } from './HostContextMenu'

type Props = {
  hostKey: string
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
  trigger?: React.ReactNode
}

export function HostContextMenuFromKey({
  hostKey,
  contentProps,
  buttonProps,
  trigger,
}: Props) {
  return (
    <DropdownMenu
      trigger={
        trigger || (
          <Button variant="ghost" icon="hover" {...buttonProps}>
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
      <HostContextMenuFromKeyContent hostKey={hostKey} />
    </DropdownMenu>
  )
}

// Only trigger a fetch when the dropdown is opened
function HostContextMenuFromKeyContent({ hostKey }: { hostKey: string }) {
  const host = useHost({
    params: { hostKey },
  })

  return (
    <HostContextMenuContent
      address={host.data?.netAddress}
      publicKey={hostKey}
    />
  )
}
