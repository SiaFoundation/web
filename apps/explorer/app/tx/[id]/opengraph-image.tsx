import { humanDate } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import {
  ChainIndex,
  ExplorerBlock,
  ExplorerTransaction,
  ExplorerV2Transaction,
  SearchResultType,
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

export default async function Image({ params }) {
  const id = params?.id as string
  let searchResult: SearchResultType
  let transaction: ExplorerTransaction | ExplorerV2Transaction
  let transactionChainIndices: ChainIndex | ChainIndex[]

  // Do we have a v1 or v2 transaction?
  try {
    searchResult = await fetchSearchType(id)
  } catch (e) {
    return NotFoundImage(id)
  }

  // Hit the v1 or v2 transaction-related endpoints.
  if (searchResult === 'transaction') {
    transaction = await fetchV1Transaction(id)
    transactionChainIndices = await fetchV1TransactionChainIndices(id)
  } else if (searchResult === 'v2Transaction') {
    transaction = await fetchV2Transaction(id)
    transactionChainIndices = await fetchV2TransactionChainIndices(id)
  } else {
    return NotFoundImage(id)
  }

  // Grab the current tip.
  let currentTip: ChainIndex
  let relatedBlock: ExplorerBlock

  try {
    currentTip = await fetchConsensusTip()
    relatedBlock = await fetchBlockByID(transactionChainIndices[0].id)
  } catch (e) {
    return NotFoundImage(id)
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
