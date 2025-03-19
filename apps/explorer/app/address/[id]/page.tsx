import { Address } from '../../../components/Address'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { truncate } from '@siafoundation/design-system'
import {
  fetchAddressBalance,
  fetchAddressEvents,
  fetchAddressSiacoinUTXOs,
} from '../../../lib/fetchChainData'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Address ${truncate(id, 30)}`
  const description = 'View details for Sia address.'
  const url = routes.address.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }) {
  const address = params?.id as string

  const [balance, events, unspentOutputs] = await Promise.all([
    fetchAddressBalance(address),
    fetchAddressEvents(address, { limit: 500 }),
    fetchAddressSiacoinUTXOs(address),
  ])

  return (
    <Address
      id={address}
      addressInfo={{
        balance,
        events,
        unspentOutputs,
      }}
    />
  )
}
