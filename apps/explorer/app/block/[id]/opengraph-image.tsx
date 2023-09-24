import { getSiaCentralBlock } from '@siafoundation/sia-central'
import { humanDate } from '@siafoundation/sia-js'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentralApi } from '../../../config'
import { truncate } from '@siafoundation/design-system'

export const revalidate = 60

export const alt = 'Block'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string
  const { data: b } = await getSiaCentralBlock({
    params: {
      id,
    },
    config: {
      api: siaCentralApi,
    },
  })

  if (!b || !b.block) {
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

  const values = [
    {
      label: 'transactions',
      value: (b.block.transactions?.length || 0).toLocaleString(),
    },
    {
      label: 'time',
      value: humanDate(b.block.timestamp, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    },
  ]

  return getOGImage(
    {
      id,
      title: b.block.height.toLocaleString(),
      subtitle: 'block',
      initials: 'B',
      values,
    },
    size
  )
}
