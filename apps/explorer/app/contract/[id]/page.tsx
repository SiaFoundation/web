import { ContractView } from '../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { siaCentral } from '../../../config/siaCentral'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { explored } from '../../../config/explored'
import { ChainIndex, ExplorerFileContract } from '@siafoundation/explored-types'

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

  // Grab the contract and previous revisions data.
  const [
    [rate, rateError],
    [contract, contractError],
    [previousRevisions, previousRevisionsError],
    [currentTip, currentTipError],
  ] = await Promise.all([
    to(
      siaCentral.exchangeRates({
        params: {
          currencies: 'sc',
        },
      })
    ),
    to(explored.contractByID({ params: { id } })),
    to<ExplorerFileContract[]>(explored.contractRevisions({ params: { id } })),
    to(explored.consensusTip()),
  ])

  if (rateError) throw rateError
  if (!rate) throw 'No rate found in successful request'

  if (contractError) throw contractError
  if (!contract) return notFound()

  if (previousRevisionsError) throw previousRevisionsError
  if (!previousRevisions)
    throw 'No previousRevisions found in successful request'

  if (currentTipError) throw currentTipError
  if (!currentTip) throw 'No currentTip found in successful request'

  const formationTxnID =
    previousRevisions[0].transactionID ?? contract.transactionID
  const finalRevisionTxnID =
    previousRevisions[previousRevisions.length - 1].transactionID ??
    contract.transactionID

  // Fetch our formation and finalRevision transaction information.
  const [
    [formationTransaction, formationTransactionError],
    [renewalTransaction, renewalTransactionError],
  ] = await Promise.all([
    to(
      explored.transactionByID({
        params: {
          id: formationTxnID,
        },
      })
    ),
    to(
      explored.transactionByID({
        params: {
          id: finalRevisionTxnID,
        },
      })
    ),
  ])

  if (formationTransactionError) throw formationTransactionError
  if (!formationTransaction)
    throw 'No formation transaction found in successful reqeust'

  if (renewalTransactionError) throw renewalTransactionError
  if (!renewalTransaction)
    throw 'No renewal transaction found in successful reqeust'

  const renewedFromID =
    formationTransaction.fileContractRevisions?.[0].id ?? null
  const renewedToID = renewalTransaction.fileContracts?.[0].id ?? null

  const [formationTxnChainIndices, formationTxnChainIndicesError] = await to<
    ChainIndex[]
  >(
    explored.transactionChainIndices({
      params: { id: formationTransaction.id },
    })
  )

  if (formationTxnChainIndicesError) throw formationTxnChainIndicesError
  if (!formationTxnChainIndices)
    return 'No formationTxnChainIndices found in successful request'

  // Use the first chainIndex from the above call to get our parent block.
  const [parentBlock, parentBlockError] = await to(
    explored.blockByID({ params: { id: formationTxnChainIndices[0].id } })
  )

  if (parentBlockError) throw parentBlockError
  if (!parentBlock) return 'No parentBlock foudn in successful request'

  return (
    <ContractView
      previousRevisions={previousRevisions}
      currentHeight={currentTip.height}
      contract={contract}
      rates={rate.rates}
      renewedFromID={renewedFromID ? stripPrefix(renewedFromID) : renewedFromID}
      renewedToID={renewedToID ? stripPrefix(renewedToID) : renewedToID}
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
