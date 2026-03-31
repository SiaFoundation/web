import { ContractView } from '../../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../../config/routes'
import { buildMetadata } from '../../../../lib/utils'
import { notFound } from 'next/navigation'
import { stripPrefix, truncate } from '@siafoundation/design-system'
import { normalizeContract } from '../../../../lib/contracts'
import { generateTraceId, getExplored } from '../../../../lib/explored'
import { to } from '@siafoundation/request'
import { ExplorerPageProps } from '../../../../lib/pageProps'
import { logger } from '../../../../lib/logger'

export async function generateMetadata({
  params,
}: ExplorerPageProps): Promise<Metadata> {
  const id = decodeURIComponent(((await params)?.id as string) || '')
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

export default async function Page({ params }: ExplorerPageProps) {
  const traceId = generateTraceId()
  const p = await params
  const id = p?.id

  const explored = await getExplored(undefined, traceId)
  const [
    { data: searchResultType },
    {
      data: { height: currentHeight },
    },
  ] = await Promise.all([
    explored.searchResultType({
      params: { id },
    }),
    explored.consensusTip(),
  ])

  if (searchResultType === 'contract') {
    const [c, contractError, contractResponse] = await to(
      explored.contractByID({ params: { id } }),
    )

    if (contractError) {
      logger.error('page.contract', 'fetch_failed', {
        trace_id: traceId,
        id,
        version: 'v1',
        status: contractResponse?.status,
        error: contractError.message,
      })
      if (contractResponse?.status === 404) return notFound()
      throw contractError
    }

    const contract = normalizeContract(c, currentHeight)
    const { data: contractRevisions } = await explored.contractRevisions({
      params: { id },
    })

    const formationTxnID =
      contractRevisions[0].transactionID ?? contract.transactionID

    const { data: formationTransaction } = await explored.transactionByID({
      params: { id: formationTxnID },
    })
    const { data: formationTxnChainIndices } =
      await explored.transactionChainIndices({
        params: { id: formationTxnID },
      })

    const { data: parentBlock } = await explored.blockByID({
      params: { id: formationTxnChainIndices[0].id },
    })

    return (
      <ContractView
        contractRevisions={contractRevisions}
        currentHeight={currentHeight}
        contract={contract}
        formationTransaction={formationTransaction}
        formationTxnChainIndex={formationTxnChainIndices}
        formationTransactionHeaderData={{
          id: stripPrefix(formationTransaction.id),
          blockHeight: formationTxnChainIndices[0].height,
          confirmations: currentHeight - formationTxnChainIndices[0].height,
          timestamp: parentBlock.timestamp,
          version: 'v1',
        }}
      />
    )
  } else if (searchResultType === 'v2Contract') {
    const [c, contractError, contractResponse] = await to(
      explored.v2ContractByID({ params: { id } }),
    )

    if (contractError) {
      logger.error('page.contract', 'fetch_failed', {
        id,
        version: 'v2',
        status: contractResponse?.status,
        error: contractError.message,
      })
      if (contractResponse?.status === 404) return notFound()
      throw contractError
    }

    const contract = normalizeContract(c, currentHeight)
    const { data: contractRevisions } = await explored.v2ContractRevisionsByID({
      params: { id },
    })

    const formationTxnID =
      contractRevisions[0].transactionID ?? contract.transactionID

    const { data: formationTransaction } = await explored.v2TransactionByID({
      params: { id: formationTxnID },
    })
    const { data: formationTxnChainIndices } =
      await explored.v2TransactionChainIndices({
        params: { id: formationTxnID },
      })

    const { data: parentBlock } = await explored.blockByID({
      params: { id: formationTxnChainIndices[0].id },
    })

    return (
      <ContractView
        contractRevisions={contractRevisions}
        currentHeight={currentHeight}
        contract={contract}
        formationTransaction={formationTransaction}
        formationTxnChainIndex={formationTxnChainIndices}
        formationTransactionHeaderData={{
          id: stripPrefix(formationTransaction.id),
          blockHeight: formationTxnChainIndices[0].height,
          confirmations: currentHeight - formationTxnChainIndices[0].height,
          timestamp: parentBlock.timestamp,
          version: 'v2',
        }}
      />
    )
  } else {
    return notFound()
  }
}
