import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { Host } from '../../../components/Host'
import { truncate } from '@siafoundation/design-system'
import { fetchHostByPubkey } from '../../../lib/fetchChainData'

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
  const host = await fetchHostByPubkey(id)

  return <Host host={host} />
}
