import {
  SiaCentralContract,
  getSiaCentralContract,
  getSiaCentralExchangeRates,
  getSiaCentralTransaction,
} from '@siafoundation/sia-central'
import { ContractView } from '../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { siaCentralApi } from '../../../config'
import { notFound } from 'next/navigation'
import { truncate } from '@siafoundation/design-system'

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

export const revalidate = 60

export default async function Page({ params }) {
  const id = params?.id as string
  const [{ data: c, error }, { data: r }] = await Promise.all([
    getSiaCentralContract({
      params: {
        id,
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralExchangeRates({
      config: {
        api: siaCentralApi,
      },
    }),
  ])

  if (error) {
    throw Error(error)
  }

  if (!c?.contract) {
    return notFound()
  }

  const contract = c.contract
  const formationTxnId = getFormationTxnId(contract)
  const finalRevisionTxnId = contract?.transaction_id || ''

  const [{ data: ft }, { data: rt }] = await Promise.all([
    getSiaCentralTransaction({
      params: {
        id: formationTxnId,
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralTransaction({
      params: {
        id: finalRevisionTxnId,
      },
      config: {
        api: siaCentralApi,
      },
    }),
  ])

  const formationTransaction = ft?.transaction
  const renewedFrom = formationTransaction?.contract_revisions?.[0]
  const renewalTransaction = rt?.transaction
  const renewedTo = renewalTransaction?.storage_contracts?.[0]

  return (
    <ContractView
      contract={contract}
      rates={r?.rates}
      renewedFrom={renewedFrom}
      renewedTo={renewedTo}
      formationTransaction={formationTransaction}
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
