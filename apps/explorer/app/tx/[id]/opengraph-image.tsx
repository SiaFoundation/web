import { humanDate } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { getExplored } from '../../../lib/explored'

export const revalidate = 0

export const alt = 'Transaction'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string

  const [
    [transaction, transactionError],
    [transactionChainIndices, transactionChainIndicesError],
    [currentTip, currentTipError],
  ] = await Promise.all([
    to(
      getExplored().transactionByID({
        params: {
          id,
        },
      })
    ),
    to(
      getExplored().transactionChainIndices({
        params: {
          id,
        },
      })
    ),
    to(getExplored().consensusTip()),
  ])

  if (
    !transaction ||
    !transactionChainIndices ||
    !currentTip ||
    transactionError ||
    transactionChainIndicesError ||
    currentTipError
  ) {
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

  // Get the related block
  const [relatedBlock, relatedBlockError] = await to(
    getExplored().blockByID({ params: { id: transactionChainIndices[0].id } })
  )

  if (!relatedBlock || relatedBlockError) {
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

  const confirmations = currentTip.height - transactionChainIndices[0].height

  const values = [
    {
      label: 'block height',
      value: currentTip.height.toLocaleString(),
    },
    {
      label: 'time',
      value: humanDate(relatedBlock.timestamp, {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    },
  ]

  return getOGImage(
    {
      id,
      title: truncate(stripPrefix(transaction.id), 30),
      subtitle: 'transaction',
      status:
        confirmations >= 72
          ? '72+ confirmations'
          : `${confirmations} confirmations`,
      statusColor: confirmations >= 6 ? 'green' : 'amber',
      initials: 'T',
      values,
    },
    size
  )
}
