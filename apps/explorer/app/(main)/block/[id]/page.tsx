import { getTitleId } from '@siafoundation/design-system'
import { Block } from '../../../../components/Block'
import { routes } from '../../../../config/routes'
import { Metadata } from 'next'
import { buildMetadata } from '../../../../lib/utils'
import { getExplored } from '../../../../lib/explored'
import { to } from '@siafoundation/request'
import { notFound } from 'next/navigation'
import { ExplorerPageProps } from '../../../../lib/pageProps'

export async function generateMetadata({
  params,
}: ExplorerPageProps): Promise<Metadata> {
  const id = decodeURIComponent(((await params)?.id as string) || '')
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

export default async function Page({ params }: ExplorerPageProps) {
  const p = await params
  let id: string

  const explored = await getExplored()
  // Check if the incoming id is referencing height.
  if (!isNaN(Number(p?.id))) {
    // If it is, we need the block ID at that height.
    const { data: tipAtHeight } = await explored.consensusTipByHeight({
      params: { height: Number(p?.id) },
    })
    id = tipAtHeight.id
  } else {
    // If it is not the height, assume we're referencing ID. No call necessary.
    id = p?.id
  }

  // Get the block using the id from the previous sequence. Also grab the
  // currentTip for next block navigation handling.
  const [[block, blockError, blockResponse], { data: currentTipInfo }] =
    await Promise.all([
      to(explored.blockByID({ params: { id } })),
      explored.consensusTip(),
    ])

  if (blockError) {
    if (blockResponse?.status === 404) return notFound()
    throw blockError
  }

  return (
    <Block block={block} blockID={id} currentHeight={currentTipInfo.height} />
  )
}
