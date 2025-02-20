import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { Transaction } from '../../../components/Transaction'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { getExplored } from '../../../lib/explored'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Transaction ${truncate(id, 30)}`
  const description = `View details for Sia transaction.`
  const url = routes.transaction.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }) {
  const id = params?.id as string

  // Make all non-dependent requests together.
  const [
    [transaction, transactionError],
    [transactionChainIndices, transactionChainIndicesError],
    [currentTip, currentTipError],
  ] = await Promise.all([
    to(getExplored().transactionByID({ params: { id } })),
    to(getExplored().transactionChainIndices({ params: { id } })),
    to(getExplored().consensusTip()),
  ])

  if (transactionError) throw transactionError
  if (transactionChainIndicesError) throw transactionChainIndicesError
  if (currentTipError) throw currentTipError
  if (!transaction || !transactionChainIndices || !currentTip) return notFound()

  // Use the first chainIndex from the above call to get our parent block.
  const [parentBlock, parentBlockError] = await to(
    getExplored().blockByID({ params: { id: transactionChainIndices[0].id } })
  )

  if (parentBlockError) throw parentBlockError
  if (!parentBlock) return notFound()

  return (
    <Transaction
      transaction={transaction}
      transactionHeaderData={{
        id: stripPrefix(transaction.id),
        blockHeight: transactionChainIndices[0].height,
        confirmations: currentTip.height - transactionChainIndices[0].height,
        timestamp: parentBlock.timestamp,
      }}
    />
  )
}
