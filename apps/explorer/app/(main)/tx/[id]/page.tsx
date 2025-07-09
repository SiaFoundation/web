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

export async function generateMetadata({
  params,
}: ExplorerPageProps): Promise<Metadata> {
  const p = await params
  const id = decodeURIComponent(p?.id as string)
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
  const p = await params
  const id = p?.id

  const explored = await getExplored()
  // Do we have a v1 or v2 transaction?
  const { data: searchResult } = await explored.searchResultType({
    params: { id },
  })

  // Hit the v1 or v2 transaction-related endpoints.
  if (searchResult === 'transaction') {
    const [
      [transaction, transactionError, transactionResponse],
      { data: transactionChainIndices },
      { data: currentTip },
    ] = await Promise.all([
      to(explored.transactionByID({ params: { id } })),
      explored.transactionChainIndices({ params: { id } }),
      explored.consensusTip(),
    ])

    if (transactionError) {
      if (transactionResponse?.status === 404) return notFound()
      throw transactionError
    }

    const { data: parentBlock } = await explored.blockByID({
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
      to(explored.v2TransactionByID({ params: { id } })),
      explored.v2TransactionChainIndices({ params: { id } }),
      explored.consensusTip(),
    ])

    if (transactionError) {
      if (transactionResponse?.status === 404) return notFound()
      throw transactionError
    }

    const { data: parentBlock } = await explored.blockByID({
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
