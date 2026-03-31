import { Metadata } from 'next'
import { routes } from '../../../../config/routes'
import { buildMetadata } from '../../../../lib/utils'
import { Host } from '../../../../components/Host'
import { truncate } from '@siafoundation/design-system'
import { generateTraceId, getExplored } from '../../../../lib/explored'
import { to } from '@siafoundation/request'
import { notFound } from 'next/navigation'
import { ExplorerPageProps } from '../../../../lib/pageProps'
import { getTime, logger } from '../../../../lib/logger'

export async function generateMetadata({
  params,
}: ExplorerPageProps): Promise<Metadata> {
  const id = decodeURIComponent(((await params)?.id as string) || '')
  const title = `Host ${truncate(id, 30)}`
  const description = `View details for Sia host.`
  const url = routes.host.view.replace(':id', id)
  return buildMetadata({
    title,
    description,
    url,
  })
}

export const revalidate = 0

export default async function Page({ params }: ExplorerPageProps) {
  const traceId = generateTraceId()
  const start = getTime()
  const p = await params
  const id = p?.id
  const explored = await getExplored(undefined, traceId)
  const [host, hostError, hostResponse] = await to(
    explored.hostByPubkey({ params: { id } }),
  )

  if (hostError) {
    logger.error('page.host', 'fetch_failed', {
      trace_id: traceId,
      id,
      status: hostResponse?.status,
      error: hostError.message,
      duration_ms: getTime() - start,
    })
    if (hostResponse?.status === 404) return notFound()
    throw hostError
  }

  logger.info('page.host', 'render_completed', {
    trace_id: traceId,
    id,
    duration_ms: getTime() - start,
  })
  return <Host host={host} />
}
