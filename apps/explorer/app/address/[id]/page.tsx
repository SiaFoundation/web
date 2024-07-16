import { truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Address } from '../../../components/Address'
import { routes } from '../../../config/routes'
import { siaCentral } from '../../../config/siaCentral'
import { buildMetadata } from '../../../lib/utils'

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
  const id = params?.id as string
  const [a, error] = await to(
    siaCentral.address({
      params: {
        id,
      },
    }),
  )

  if (error) {
    throw error
  }

  if (a?.unspent_siacoins == undefined) {
    return notFound()
  }

  return <Address id={id} address={a} />
}
