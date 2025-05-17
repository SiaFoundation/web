import { humanDate } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../lib/explored'
import { ExplorerPageProps } from '../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Block'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const formatOGImage = (id: string) => {
  return getOGImage(
    {
      id,
      title: truncate(id, 30),
      subtitle: 'block',
      initials: 'B',
    },
    size
  )
}

export default async function Image({ params }: ExplorerPageProps) {
  let id: string

  // Check if the incoming id is referencing height.
  if (!isNaN(Number(params.id))) {
    // If it is, we need the block ID at that height.
    const { data: tipAtHeight } = await getExplored().consensusTipByHeight({
      params: { height: Number(params.id) },
    })
    id = tipAtHeight.id
  } else {
    // If it is not the height, assume we're referencing ID. No call necessary.
    id = params?.id
  }

  try {
    const { data: block } = await getExplored().blockByID({ params: { id } })
    const values = [
      {
        label: 'transactions',
        value: (
          (block.transactions?.length ?? 0) +
          (block.v2?.transactions?.length ?? 0)
        ).toLocaleString(),
      },
      {
        label: 'time',
        value: humanDate(block.timestamp, {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
      },
    ]

    return getOGImage(
      {
        id,
        title: (block.v2?.height || block.height).toLocaleString(),
        subtitle: 'block',
        initials: 'B',
        values,
      },
      size
    )
  } catch (e) {
    return formatOGImage(id)
  }
}
