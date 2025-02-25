import { humanDate } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { getExplored } from '../../../lib/explored'

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

export default async function Image({ params }) {
  const id = params?.id as string

  // Grab chainIndex at height.
  const [chainIndex, chainIndexError] = await to(
    getExplored().consensusTipByHeight({ params: { height: Number(id) } })
  )

  if (!chainIndex || chainIndexError) {
    return formatOGImage(id)
  }

  // Grab block for id at ChainIndex in request above.
  const [block, blockError] = await to(
    getExplored().blockByID({ params: { id: stripPrefix(chainIndex.id) } })
  )

  if (!block || blockError) {
    return formatOGImage(id)
  }

  const values = [
    {
      label: 'transactions',
      value: (block.transactions.length || 0).toLocaleString(),
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
      title: block.height.toLocaleString(),
      subtitle: 'block',
      initials: 'B',
      values,
    },
    size
  )
}
