import { Button } from '@siafoundation/design-system'
import { CaretDown16 } from '@siafoundation/react-icons'
import { useHost } from '@siafoundation/react-renterd'
import { HostContextMenu } from './HostContextMenu'

type Props = {
  hostKey: string
  contentProps?: React.ComponentProps<typeof HostContextMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function HostContextMenuFromKey({
  hostKey,
  contentProps,
  buttonProps,
}: Props) {
  const host = useHost({
    params: { hostKey },
  })

  if (!host.data) {
    return (
      <Button
        size="none"
        icon="hover"
        variant="ghost"
        state="waiting"
        {...buttonProps}
      >
        <CaretDown16 />
      </Button>
    )
  }
  return (
    <HostContextMenu
      address={host.data.netAddress}
      publicKey={host.data.publicKey}
      contentProps={contentProps}
      buttonProps={buttonProps}
      trigger={
        <Button size="none" icon="hover" variant="ghost" {...buttonProps}>
          <CaretDown16 />
        </Button>
      }
    />
  )
}
