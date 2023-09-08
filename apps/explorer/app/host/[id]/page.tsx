import {
  getSiaCentralExchangeRates,
  getSiaCentralHost,
} from '@siafoundation/sia-central'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { Host } from '../../../components/Host'
import { siaCentralApi } from '../../../config'
import { notFound } from 'next/navigation'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Host ${id}`
  const description = `View details for host ${id}`
  const url = routes.host.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 60

export default async function Page({ params }) {
  const id = params?.id as string
  const [h, r] = await Promise.all([
    getSiaCentralHost({
      params: {
        id,
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralExchangeRates({
      config: {
        api: siaCentralApi,
      },
    }),
  ])

  if (!h.host) {
    return notFound()
  }

  return <Host host={h.host} rates={r?.rates} />
}
