import { ArrowDownLeft16, LinkButton } from '@siafoundation/design-system'
import { routes } from '../../config/routes'
import { useRouter } from 'next/router'

export function AddressesButton() {
  const router = useRouter()
  const id = router.query.id as string
  return (
    <LinkButton
      href={{
        pathname: routes.wallet.addresses,
        query: {
          id,
        },
      }}
    >
      <ArrowDownLeft16 />
      Addresses
    </LinkButton>
  )
}
