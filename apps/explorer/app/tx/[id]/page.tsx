import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { Transaction } from '../../../components/Transaction'
import { getSiaCentralTransaction } from '@siafoundation/sia-central'
import { buildMetadata } from '../../../lib/utils'
import { siaCentralApi } from '../../../config'
import { notFound } from 'next/navigation'
import { truncate } from '@siafoundation/design-system'

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
  const { data: transaction, error } = await getSiaCentralTransaction({
    params: {
      id,
    },
    config: {
      api: siaCentralApi,
    },
  })

  if (error) {
    throw Error(error)
  }

  if (!transaction?.transaction) {
    return notFound()
  }

  return <Transaction transaction={transaction.transaction} />
}
