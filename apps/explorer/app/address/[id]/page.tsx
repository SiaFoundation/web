import { getSiaCentralAddress } from '@siafoundation/sia-central'
import { Address } from '../../../components/Address'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { siaCentralApi } from '../../../config'
import { notFound } from 'next/navigation'
import { truncate } from '@siafoundation/design-system'

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

export const revalidate = 60

export default async function Page({ params }) {
  const id = params?.id as string
  const a = await getSiaCentralAddress({
    params: {
      id,
    },
    config: {
      api: siaCentralApi,
    },
  })

  if (a.unspent_siacoins == undefined) {
    return notFound()
  }

  return <Address id={id} address={a} />
}
