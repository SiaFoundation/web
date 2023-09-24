import { getSiaCentralTransaction } from '@siafoundation/sia-central'
import { humanDate } from '@siafoundation/sia-js'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentralApi } from '../../../config'
import { truncate } from '@siafoundation/design-system'

export const revalidate = 60

export const alt = 'Transaction'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string

  const { data: t } = await getSiaCentralTransaction({
    params: {
      id,
    },
    config: {
      api: siaCentralApi,
    },
  })

  if (!t || !t.transaction) {
    return getOGImage(
      {
        id,
        title: truncate(id, 30),
        subtitle: 'transaction',
        initials: 'T',
      },
      size
    )
  }

  const values = [
    {
      label: 'block height',
      value: t.transaction.block_height.toLocaleString(),
    },
    {
      label: 'time',
      value: humanDate(t.transaction.timestamp, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    },
  ]

  return getOGImage(
    {
      id,
      title: truncate(t.transaction.id, 30),
      subtitle: 'transaction',
      status:
        t.transaction.confirmations >= 72
          ? '72+ confirmations'
          : `${t.transaction.confirmations} confirmations`,
      statusColor: t.transaction.confirmations >= 6 ? 'green' : 'amber',
      initials: 'T',
      values,
    },
    size
  )
}
