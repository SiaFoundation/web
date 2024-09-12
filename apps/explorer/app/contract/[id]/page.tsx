import { SiaCentralContract } from '@siafoundation/sia-central-types'
import { ContractView } from '../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { siaCentral } from '../../../config/siaCentral'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import { explored } from '../../../config/explored'

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
  const id = params?.id as string
  const [[c, error], [r]] = await Promise.all([
    to(
      siaCentral.contract({
        params: {
          id,
        },
      })
    ),
    to(
      siaCentral.exchangeRates({
        params: {
          currencies: 'sc',
        },
      })
    ),
  ])

  if (error) {
    throw error
  }

  const contract = c?.contract

  if (!contract) {
    return notFound()
  }

  const formationTxnId = getFormationTxnId(contract)
  const finalRevisionTxnId = contract?.transaction_id || ''

  const [[ft], [rt]] = await Promise.all([
    to(
      siaCentral.transaction({
        params: {
          id: formationTxnId,
        },
      })
    ),
    to(
      siaCentral.transaction({
        params: {
          id: finalRevisionTxnId,
        },
      })
    ),
  ])

  const formationTransaction = ft?.transaction
  const renewedFrom = formationTransaction?.contract_revisions?.[0]
  const renewalTransaction = rt?.transaction
  const renewedTo = renewalTransaction?.storage_contracts?.[0]

  // The following is a temporary addition to satisfy new Transaction
  // component requirements for the Sia Central phase out on the
  // transaction route.
  const [
    [transaction, transactionError],
    [transactionChainIndices, transactionChainIndicesError],
    [currentTip, currentTipError],
  ] = await Promise.all([
    to(
      explored.transactionByID({
        params: { id: formationTransaction?.id || '' },
      })
    ),
    to(
      explored.transactionChainIndices({
        params: { id: formationTransaction?.id || '' },
      })
    ),
    to(explored.consensusTip()),
  ])

  if (transactionError) throw transactionError
  if (transactionChainIndicesError) throw transactionChainIndicesError
  if (currentTipError) throw currentTipError
  if (!transaction || !transactionChainIndices || !currentTip) return notFound()

  // Use the first chainIndex from the above call to get our parent block.
  const [parentBlock, parentBlockError] = await to(
    explored.blockByID({ params: { id: transactionChainIndices[0].id } })
  )

  if (parentBlockError) throw parentBlockError
  if (!parentBlock) return notFound()

  return (
    <ContractView
      contract={contract}
      rates={r?.rates}
      renewedFrom={renewedFrom}
      renewedTo={renewedTo}
      formationTransaction={transaction}
      formationTransactionHeaderData={{
        id: stripPrefix(transaction.id),
        blockHeight: transactionChainIndices[0].height,
        confirmations: currentTip.height - transactionChainIndices[0].height,
        timestamp: parentBlock.timestamp,
      }}
    />
  )
}

function getFormationTxnId(contract: SiaCentralContract) {
  let id = contract?.transaction_id
  if (contract?.previous_revisions?.length) {
    id =
      contract.previous_revisions[contract.previous_revisions?.length - 1]
        .transaction_id
  }
  return id
}
