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
  let id: string

  // Check if the incoming id is referencing height.
  if (!isNaN(Number(params?.id))) {
    // If it is, we need the block ID.

    // Grab the tip at this height.
    const [tipInfo, tipInfoError] = await to(
      explored.consensusTipByHeight({ params: { height: params?.id } })
    )

    if (tipInfoError) throw tipInfoError
    if (!tipInfo) throw notFound()

    id = tipInfo.id
  } else {
    // If it is not the height, it is referencing the ID. No call necessary.
    id = params?.id
  }

  // Get the block using the id from the previous request.
  const [block, blockError] = await to(explored.blockByID({ params: { id } }))

  if (blockError) {
    throw blockError
  }
  if (!block) {
    return notFound()
  }

  return <Block block={block} blockID={id} />
}
