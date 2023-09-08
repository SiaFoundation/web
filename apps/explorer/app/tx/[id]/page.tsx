import { Metadata } from 'next'
import { routes } from '../../../config/routes'
import { Transaction } from '../../../components/Transaction'
import { getSiaCentralTransaction } from '@siafoundation/sia-central'
import { buildMetadata } from '../../../lib/utils'
import { siaCentralApi } from '../../../config'
import { notFound } from 'next/navigation'

export function generateMetadata({ params }): Metadata {
  const id = decodeURIComponent((params?.id as string) || '')
  const title = `Transaction ${id}`
  const description = `View details for transaction ${id}`
  const url = routes.transaction.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 60

export default async function Page({ params }) {
  const id = params?.id as string
  const transaction = await getSiaCentralTransaction({
    params: {
      id,
    },
    config: {
      api: siaCentralApi,
    },
  })

  if (!transaction.transaction) {
    return notFound()
  }

  return <Transaction transaction={transaction.transaction} />
}
