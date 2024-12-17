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
    // If it is, we need the block ID at that height.
    const [tipAtHeightInfo, tipAtHeightInfoError] = await to(
      explored.consensusTipByHeight({ params: { height: params?.id } })
    )
    if (tipAtHeightInfoError) throw tipAtHeightInfoError
    if (!tipAtHeightInfo) throw notFound()

    id = tipAtHeightInfo.id
  } else {
    // If it is not the height, assume we're referencing ID. No call necessary.
    id = params?.id
  }

  // Get the block using the id from the previous sequence. Also grab the
  // currentTip for next block navigation handling.
  const [[block, blockError], [currentTipInfo, currentTipInfoError]] =
    await Promise.all([
      to(explored.blockByID({ params: { id } })),
      to(explored.consensusTip()),
    ])

  if (blockError) throw blockError
  if (currentTipInfoError) throw currentTipInfoError
  if (!block) return notFound()
  if (!currentTipInfo) throw notFound()

  return (
    <Block block={block} blockID={id} currentHeight={currentTipInfo.height} />
  )
}
