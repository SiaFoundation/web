import { SiaCentralContract } from '@siafoundation/sia-central-types'
import { ContractView } from '../../../components/ContractView'
import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { buildMetadata } from '../../../lib/utils'
import { siaCentral } from '../../../config/siaCentral'
import { notFound } from 'next/navigation'
import { truncate } from '@siafoundation/design-system'
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
