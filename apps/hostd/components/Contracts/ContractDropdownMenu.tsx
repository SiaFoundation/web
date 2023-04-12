import {
  DropdownMenu,
  Button,
  Draggable16,
  DropdownMenuLabel,
} from '@siafoundation/design-system'

type Props = {
  address: string
  publicKey: string
}

export function ContractDropdownMenu({ address, publicKey }: Props) {
  return (
    <DropdownMenu
      trigger={
        <Button variant="ghost" icon="hover">
          <Draggable16 />
        </Button>
      }
      contentProps={{ align: 'start' }}
    >
      <DropdownMenuLabel>Contract filters</DropdownMenuLabel>
      <DropdownMenuLabel>Contract actions</DropdownMenuLabel>
    </DropdownMenu>
  )
}
