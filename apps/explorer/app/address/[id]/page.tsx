import { Address } from '../../../components/Address'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../lib/explored'
import { to } from '@siafoundation/request'
import { notFound } from 'next/navigation'

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
    [balance, balanceError, balanceResponse],
    { data: events },
    { data: unconfirmedEvents },
    { data: unspentOutputs },
  ] = await Promise.all([
    to(getExplored().addressBalance({ params: { address } })),
    getExplored().addressEvents({ params: { address, limit: 500 } }),
    getExplored().addressUnconfirmedEvents({ params: { address } }),
    getExplored().addressSiacoinUTXOs({ params: { address } }),
  ])

  if (balanceError) {
    if (balanceResponse?.status === 404) return notFound()
    throw balanceError
  }

  return (
    <Address
      id={address}
      addressInfo={{
        balance,
        events,
        unconfirmedEvents,
        unspentOutputs,
      }}
    />
  )
}
