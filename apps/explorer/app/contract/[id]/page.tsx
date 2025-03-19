import { ContractView } from '../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerTransaction,
  ExplorerV2FileContract,
  ExplorerV2Transaction,
} from '@siafoundation/explored-types'
import { normalizeContract } from '../../../lib/contracts'
import {
  fetchV1Contract,
  fetchV1ContractRevisions,
  fetchV2Contract,
  fetchV2ContractRevisions,
  fetchV1Transaction,
  fetchV1TransactionChainIndices,
  fetchV2Transaction,
  fetchV2TransactionChainIndices,
  fetchSearchType,
  fetchBlockByID,
  fetchConsensusTip,
} from '../../../lib/fetchChainData'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Contract ${truncate(id, 30)}`
  const description = `View details for Sia contract.`
  const url = routes.contract.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }) {
  const id = params?.id
  let contract: ExplorerFileContract | ExplorerV2FileContract
  let contractRevisions: ExplorerFileContract[] | ExplorerV2FileContract[]

  const searchResultType = await fetchSearchType(id)

  // Grab the v1 or v2 contract and revisions.
  if (searchResultType === 'contract') {
    contract = await fetchV1Contract(id)
    contractRevisions = await fetchV1ContractRevisions(id)
  } else if (searchResultType === 'v2contract') {
    contract = await fetchV2Contract(id)
    contractRevisions = await fetchV2ContractRevisions(id)
  } else {
    return notFound()
  }

  const formationTxnID =
    contractRevisions[0].transactionID ?? contract.transactionID

  let formationTransaction: ExplorerTransaction | ExplorerV2Transaction
  let formationTxnChainIndices: ChainIndex[]
  // let renewedToID: string | null
  // let renewedFromID: string | null

  if (searchResultType === 'contract') {
    formationTransaction = await fetchV1Transaction(formationTxnID)
    formationTxnChainIndices = await fetchV1TransactionChainIndices(
      formationTxnID
    )
  } else {
    formationTransaction = await fetchV2Transaction(formationTxnID)
    formationTxnChainIndices = await fetchV2TransactionChainIndices(
      formationTxnID
    )
  }

  // Use the first chainIndex from the above call to get our parent block
  // and our currentTip.
  const [parentBlock, currentTip] = await Promise.all([
    fetchBlockByID(formationTxnChainIndices[0].id),
    fetchConsensusTip(),
  ])

  const normalizedContractData = normalizeContract(contract)

  return (
    <ContractView
      contractRevisions={contractRevisions}
      currentHeight={currentTip.height}
      contract={normalizedContractData}
      // renewedFromID={renewedFromID ? stripPrefix(renewedFromID) : renewedFromID}
      // renewedToID={renewedToID ? stripPrefix(renewedToID) : renewedToID}
      formationTransaction={formationTransaction}
      formationTxnChainIndex={formationTxnChainIndices}
      formationTransactionHeaderData={{
        id: stripPrefix(formationTransaction.id),
        blockHeight: formationTxnChainIndices[0].height,
        confirmations: currentTip.height - formationTxnChainIndices[0].height,
        timestamp: parentBlock.timestamp,
      }}
    />
  )
}
