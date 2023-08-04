import { Button, Draggable16 } from '@siafoundation/design-system'
import { useContract } from '@siafoundation/react-renterd'
import { ContractContextMenu } from './ContractContextMenu'

type Props = {
  id: string
  contentProps?: React.ComponentProps<
    typeof ContractContextMenu
  >['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function ContractContextMenuFromId({
  id,
  contentProps,
  buttonProps,
}: Props) {
  const contract = useContract({
    params: { id },
  })

  if (!contract.data) {
    return (
      <Button variant="ghost" icon="hover" state="waiting" {...buttonProps}>
        <Draggable16 />
      </Button>
    )
  }
  return (
    <ContractContextMenu
      id={id}
      address={contract.data.hostIP}
      publicKey={contract.data.hostKey}
      contentProps={contentProps}
      buttonProps={buttonProps}
    />
  )
}
