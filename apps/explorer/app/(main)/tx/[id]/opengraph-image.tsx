import { humanDate } from '@siafoundation/units'
import { getOGImage } from '../../../../components/OGImageEntity'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../../lib/explored'
import { ExplorerPageProps } from '../../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Transaction'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const NotFoundImage = (id: string) =>
  getOGImage(
    {
      id,
      title: truncate(id, 30),
      subtitle: 'transaction',
      initials: 'T',
    },
    size
  )

export default async function Image({ params }: ExplorerPageProps) {
  const id = params?.id as string

  try {
    const explored = await getExplored()
    const { data: searchResult } = await explored.searchResultType({
      params: { id },
    })
    if (searchResult === 'transaction') {
      const [
        { data: transaction },
        { data: transactionChainIndices },
        { data: currentTip },
      ] = await Promise.all([
        explored.transactionByID({ params: { id } }),
        explored.transactionChainIndices({ params: { id } }),
        explored.consensusTip(),
      ])
      const { data: relatedBlock } = await explored.blockByID({
        params: { id: transactionChainIndices[0].id },
      })

      const confirmations =
        currentTip.height - transactionChainIndices[0].height

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
    } else if (searchResult === 'v2Transaction') {
      const [
        { data: transaction },
        { data: transactionChainIndices },
        { data: currentTip },
      ] = await Promise.all([
        explored.v2TransactionByID({ params: { id } }),
        explored.v2TransactionChainIndices({ params: { id } }),
        explored.consensusTip(),
      ])
      const { data: relatedBlock } = await explored.blockByID({
        params: { id: transactionChainIndices[0].id },
      })
      const confirmations =
        currentTip.height - transactionChainIndices[0].height

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
    } else {
      return NotFoundImage(id)
    }
  } catch {
    return NotFoundImage(id)
  }
}
