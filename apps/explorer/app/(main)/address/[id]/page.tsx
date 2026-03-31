import { Address } from '../../../../components/Address'
import { Metadata } from 'next'
import { routes } from '../../../../config/routes'
import { buildMetadata } from '../../../../lib/utils'
import { truncate } from '@siafoundation/design-system'
import { generateTraceId, getExplored } from '../../../../lib/explored'
import { to } from '@siafoundation/request'
import { notFound } from 'next/navigation'
import { ExplorerPageProps } from '../../../../lib/pageProps'
import { logger } from '../../../../lib/logger'

export async function generateMetadata({
  params,
}: ExplorerPageProps): Promise<Metadata> {
  const id = decodeURIComponent(((await params)?.id as string) || '')
  const title = `Address ${truncate(id, 30)}`
  const description = 'View details for Sia address.'
  const url = routes.address.view.replace(':id', id)
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
  const address = p?.id

  const explored = await getExplored(undefined, traceId)
  const [
    [balance, balanceError, balanceResponse],
    { data: unconfirmedEvents },
    { data: unspentOutputs },
    { data: explorerTip },
  ] = await Promise.all([
    to(explored.addressBalance({ params: { address } })),
    explored.addressUnconfirmedEvents({ params: { address } }),
    explored.addressSiacoinUTXOs({ params: { address } }),
    explored.explorerTip(),
  ])

  if (balanceError) {
    logger.error('page.address', 'fetch_failed', {
      trace_id: traceId,
      id: address,
      status: balanceResponse?.status,
      error: balanceError.message,
    })
    if (balanceResponse?.status === 404) return notFound()
    throw balanceError
  }

  return (
    <Address
      id={address}
      networkHeight={explorerTip.height}
      addressInfo={{
        balance,
        unconfirmedEvents,
        unspentOutputs,
      }}
    />
  )
}
