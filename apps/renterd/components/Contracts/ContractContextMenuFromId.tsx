import { Button, DropdownMenu } from '@siafoundation/design-system'
import { CaretDown16 } from '@siafoundation/react-icons'
import { useContract } from '@siafoundation/renterd-react'
import { ContractContextMenuContent } from './ContractContextMenu'

type Props = {
  id: string
  trigger?: React.ReactNode
  contentProps?: React.ComponentProps<typeof DropdownMenu>['contentProps']
  buttonProps?: React.ComponentProps<typeof Button>
}

export function ContractContextMenuFromId({
  id,
  trigger,
  contentProps,
  buttonProps,
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
      <ContractContextMenuFromIdContent id={id} />
    </DropdownMenu>
  )
}

// Only trigger a fetch when the dropdown is opened
function ContractContextMenuFromIdContent({ id }: Props) {
  const contract = useContract({
    params: { id },
  })

  return <ContractContextMenuContent id={id} hostKey={contract.data?.hostKey} />
}
