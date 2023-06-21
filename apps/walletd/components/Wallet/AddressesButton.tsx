import { ArrowDownLeft16, LinkButton } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'

export function AddressesButton() {
  const router = useRouter()
  const name = router.query.name as string
  return (
    <LinkButton href={routes.wallet.addresses.replace(':name', name)}>
      <ArrowDownLeft16 />
      Addresses
    </LinkButton>
  )
}
