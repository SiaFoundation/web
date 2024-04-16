import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { Host } from '../../../components/Host'
import { notFound } from 'next/navigation'
import { truncate } from '@siafoundation/design-system'
import { siaCentral } from '../../../config/siaCentral'
import { to } from '@siafoundation/request'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Host ${truncate(id, 30)}`
  const description = `View details for Sia host.`
  const url = routes.host.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }) {
  const id = params?.id as string
  const [[h, error], [r]] = await Promise.all([
    to(
      siaCentral.host({
        params: {
          id,
        },
      })
    ),
    to(
      siaCentral.exchangeRates({
        params: {
          currencies: 'sc',
        },
      })
    ),
  ])

  if (error) {
    throw error
  }

  if (!h?.host) {
    return notFound()
  }

  return <Host host={h.host} rates={r?.rates} />
}
