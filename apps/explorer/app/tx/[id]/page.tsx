import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { Transaction } from '../../../components/Transaction'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import {
  ChainIndex,
  ExplorerTransaction,
  ExplorerV2Transaction,
} from '@siafoundation/explored-types'
import {
  fetchBlockByID,
  fetchConsensusTip,
  fetchSearchType,
  fetchV1Transaction,
  fetchV1TransactionChainIndices,
  fetchV2Transaction,
  fetchV2TransactionChainIndices,
} from '../../../lib/fetchChainData'

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
  let transaction: ExplorerTransaction | ExplorerV2Transaction
  let transactionChainIndices: ChainIndex | ChainIndex[]

  // Do we have a v1 or v2 transaction?
  const searchResult = await fetchSearchType(id)

  // Hit the v1 or v2 transaction-related endpoints.
  if (searchResult === 'transaction') {
    transaction = await fetchV1Transaction(id)
    transactionChainIndices = await fetchV1TransactionChainIndices(id)
  } else if (searchResult === 'v2Transaction') {
    transaction = await fetchV2Transaction(id)
    transactionChainIndices = await fetchV2TransactionChainIndices(id)
  } else {
    return notFound()
  }

  const currentTip = await fetchConsensusTip()
  const parentBlock = await fetchBlockByID(transactionChainIndices[0].id)

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
}
