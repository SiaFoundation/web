import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { Transaction } from '../../../components/Transaction'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../lib/explored'
import { to } from '@siafoundation/request'
import { ExplorerPageProps } from '../../../lib/pageProps'

export function generateMetadata({ params }: ExplorerPageProps): Metadata {
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

export default async function Page({ params }: ExplorerPageProps) {
  const id = params?.id as string

  // Do we have a v1 or v2 transaction?
  const { data: searchResult } = await getExplored().searchResultType({
    params: { id },
  })

  // Hit the v1 or v2 transaction-related endpoints.
  if (searchResult === 'transaction') {
    const [
      [transaction, transactionError, transactionResponse],
      { data: transactionChainIndices },
      { data: currentTip },
    ] = await Promise.all([
      to(getExplored().transactionByID({ params: { id } })),
      getExplored().transactionChainIndices({ params: { id } }),
      getExplored().consensusTip(),
    ])

    if (transactionError) {
      if (transactionResponse?.status === 404) return notFound()
      throw transactionError
    }

    const { data: parentBlock } = await getExplored().blockByID({
      params: { id: transactionChainIndices[0].id },
    })
    return (
      <Transaction
        transaction={transaction}
        transactionHeaderData={{
          id: stripPrefix(transaction.id),
          blockHeight: transactionChainIndices[0].height,
          confirmations:
            currentTip.height - transactionChainIndices[0].height + 1,
          timestamp: parentBlock.timestamp,
        }}
      />
    )
  } else if (searchResult === 'v2Transaction') {
    const [
      [transaction, transactionError, transactionResponse],
      { data: transactionChainIndices },
      { data: currentTip },
    ] = await Promise.all([
      to(getExplored().v2TransactionByID({ params: { id } })),
      getExplored().v2TransactionChainIndices({ params: { id } }),
      getExplored().consensusTip(),
    ])

    if (transactionError) {
      if (transactionResponse?.status === 404) return notFound()
      throw transactionError
    }

    const { data: parentBlock } = await getExplored().blockByID({
      params: { id: transactionChainIndices[0].id },
    })
    return (
      <Transaction
        transaction={transaction}
        transactionHeaderData={{
          id: stripPrefix(transaction.id),
          blockHeight: transactionChainIndices[0].height,
          confirmations:
            currentTip.height - transactionChainIndices[0].height + 1,
          timestamp: parentBlock.timestamp,
        }}
      />
    )
  } else {
    return notFound()
  }
}
