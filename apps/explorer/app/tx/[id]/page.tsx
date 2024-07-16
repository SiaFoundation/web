import { truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Transaction } from '../../../components/Transaction'
import { routes } from '../../../config/routes'
import { siaCentral } from '../../../config/siaCentral'
import { buildMetadata } from '../../../lib/utils'

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
  const [transaction, error] = await to(
    siaCentral.transaction({
      params: {
        id,
      },
    }),
  )

  if (error) {
    throw error
  }

  if (!transaction?.transaction) {
    return notFound()
  }

  return <Transaction transaction={transaction.transaction} />
}
