import { ContractView } from '../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { normalizeContract } from '../../../lib/contracts'
import { getExplored } from '../../../lib/explored'
import { to } from '@siafoundation/request'

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

  const { data: searchResultType } = await getExplored().searchResultType({
    params: { id },
  })

  if (searchResultType === 'contract') {
    const [c, contractError, contractResponse] = await to(
      getExplored().contractByID({ params: { id } })
    )

    if (contractError) {
      if (contractResponse?.status === 404) return notFound()
      throw contractError
    }

    const contract = normalizeContract(c)
    const { data: contractRevisions } = await getExplored().contractRevisions({
      params: { id },
    })

    const formationTxnID =
      contractRevisions[0].transactionID ?? contract.transactionID

    const { data: formationTransaction } = await getExplored().transactionByID({
      params: { id: formationTxnID },
    })
    const { data: formationTxnChainIndices } =
      await getExplored().transactionChainIndices({
        params: { id: formationTxnID },
      })

    const [{ data: parentBlock }, { data: currentTip }] = await Promise.all([
      getExplored().blockByID({
        params: { id: formationTxnChainIndices[0].id },
      }),
      getExplored().consensusTip(),
    ])

    return (
      <ContractView
        contractRevisions={contractRevisions}
        currentHeight={currentTip.height}
        contract={contract}
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
  } else if (searchResultType === 'v2Contract') {
    const [c, contractError, contractResponse] = await to(
      getExplored().v2ContractByID({ params: { id } })
    )

    if (contractError) {
      if (contractResponse?.status === 404) return notFound()
      throw contractError
    }

    const contract = normalizeContract(c)
    const { data: contractRevisions } =
      await getExplored().v2ContractRevisionsByID({ params: { id } })

    const formationTxnID =
      contractRevisions[0].transactionID ?? contract.transactionID

    const { data: formationTransaction } =
      await getExplored().v2TransactionByID({
        params: { id: formationTxnID },
      })
    const { data: formationTxnChainIndices } =
      await getExplored().v2TransactionChainIndices({
        params: { id: formationTxnID },
      })

    const [{ data: parentBlock }, { data: currentTip }] = await Promise.all([
      getExplored().blockByID({
        params: { id: formationTxnChainIndices[0].id },
      }),
      getExplored().consensusTip(),
    ])

    return (
      <ContractView
        contractRevisions={contractRevisions}
        currentHeight={currentTip.height}
        contract={contract}
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
  } else {
    return notFound()
  }
}
