import { Metadata } from 'next'
import { routes } from '../../../../config/routes'
import { Transaction } from '../../../../components/Transaction'
import { buildMetadata } from '../../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../../lib/explored'
import { to } from '@siafoundation/request'
import { ExplorerPageProps } from '../../../../lib/pageProps'
import {
  getV1TransactionType,
  getV2TransactionType,
} from '@siafoundation/units'
import { explorerV2TransactionToGetV2TransactionTypeParam } from '../../../../lib/tx'

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
        txType={getV1TransactionType(transaction)}
        transaction={transaction}
        transactionHeaderData={{
          id: stripPrefix(transaction.id),
          blockHeight: transactionChainIndices[0].height,
          confirmations:
            currentTip.height - transactionChainIndices[0].height + 1,
          timestamp: parentBlock.timestamp,
          version: 'v1',
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
        txType={getV2TransactionType(
          explorerV2TransactionToGetV2TransactionTypeParam(transaction)
        )}
        transaction={transaction}
        transactionHeaderData={{
          id: stripPrefix(transaction.id),
          blockHeight: transactionChainIndices[0].height,
          confirmations:
            currentTip.height - transactionChainIndices[0].height + 1,
          timestamp: parentBlock.timestamp,
          version: 'v2',
        }}
      />
    )
  } else {
    return notFound()
  }
}
