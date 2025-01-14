import { Address } from '../../../components/Address'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { explored } from '../../../config/explored'

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

  const [
    [balance, balanceError],
    [events, eventsError],
    [unspentOutputs, unspentOutputsError],
  ] = await Promise.all([
    to(explored.addressBalance({ params: { address } })),
    to(explored.addressEvents({ params: { address, limit: 500 } })),
    to(explored.addressSiacoinUTXOs({ params: { address } })),
  ])

  if (balanceError) throw balanceError
  if (eventsError) throw eventsError
  if (unspentOutputsError) throw unspentOutputsError
  if (!balance || !events || !unspentOutputs) return notFound()

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
