import { getTitleId } from '@siafoundation/design-system'
import { Block } from '../../../components/Block'
import { routes } from '../../../config/routes'
import { Metadata } from 'next'
import { buildMetadata } from '../../../lib/utils'
import { siaCentral } from '../../../config/siaCentral'
import { notFound } from 'next/navigation'
import { to } from '@siafoundation/request'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const height = Number(id || 0) as number
  if (isNaN(height)) {
    const title = getTitleId('Block', id, 30)
    const description = 'View details for Sia block.'
    const url = routes.block.view.replace(':id', id)
    return buildMetadata({
      title,
      description,
      url,
    })
  }
  const title = `Block ${height.toLocaleString()}`
  const description = 'View details for Sia block.'
  const url = routes.block.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }) {
  const id = params?.id as string
  const [b, error] = await to(
    siaCentral.block({
      params: {
        id,
      },
    })
  )

  if (error) {
    throw error
  }

  if (!b?.block) {
    return notFound()
  }

  return <Block block={b.block} />
}
