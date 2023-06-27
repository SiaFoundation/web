import { Add16, Button } from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { useDialog } from '../../contexts/dialog'
import { AddressesViewDropdownMenu } from './AddressesViewDropdownMenu'

export function AddressesActionsMenu() {
  const { openDialog } = useDialog()
  const router = useRouter()
  const id = router.query.id as string
  return (
    <div className="flex gap-2">
      <Button
        variant="accent"
        onClick={() => openDialog('walletGenerateAddresses', { id })}
      >
        <Add16 />
        Add addresses
      </Button>
      <AddressesViewDropdownMenu />
    </div>
  )
}
