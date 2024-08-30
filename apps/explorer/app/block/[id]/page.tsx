import { getTitleId } from '@siafoundation/design-system'
import { Block } from '../../../components/Block'
import { routes } from '../../../config/routes'
import { Metadata } from 'next'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { to } from '@siafoundation/request'
import { explored } from '../../../config/explored'

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
  const id = params?.id as number

  // 1. Grab the tip at this height.
  const [tipInfo, tipInfoError] = await to(
    explored.consensusTipByHeight({ params: { height: id } })
  )

  if (tipInfoError) {
    throw tipInfoError
  }
  if (!tipInfo) {
    throw notFound()
  }

  // 2. Get the block using the id from the previous request.
  const [block, blockError] = await to(
    explored.blockByID({ params: { id: tipInfo.id } })
  )

  if (blockError) {
    throw blockError
  }
  if (!block) {
    return notFound()
  }

  return <Block block={block} blockID={tipInfo.id} />
}
