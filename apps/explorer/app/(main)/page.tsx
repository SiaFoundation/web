import { Metadata } from 'next'
import { appLink, network } from '../../config'
import { Home } from '../../components/Home'
import { buildMetadata } from '../../lib/utils'
import { getLatestBlocks } from '../../lib/blocks'
import { getTopHosts } from '../../lib/hosts'
import {
  generateTraceId,
  getExplored,
  getExploredAddress,
} from '../../lib/explored'
import { unstable_cache } from 'next/cache'
import { getNetworkVersion } from '../../lib/networkVersion'
import { AutoRefresh } from '../../components/AutoRefresh'
import { getTime, logger } from '../../lib/logger'

export function generateMetadata(): Metadata {
  const title = 'siascan'
  const description =
    network === 'mainnet'
      ? 'Siascan is a block explorer with host statistics and pricing details. Siascan is built for Sia, a decentralized storage network.'
      : 'Siascan Zen is a block explorer with host statistics and pricing details. Siascan Zen is built for the Sia Zen Testnet.'
  return buildMetadata({
    title,
    description,
    url: appLink,
  })
}

export const revalidate = 0

// Cache our top hosts response and ranking. Revalidate every 5 minutes.
const getCachedTopHosts = unstable_cache(
  (exploredAddress: string) => getTopHosts(exploredAddress),
  [],
  {
    tags: ['top-hosts'],
    revalidate: 300,
  },
)

export default async function HomePage() {
  const traceId = generateTraceId()
  const start = getTime()
  const explored = await getExplored(undefined, traceId)

  const [{ data: hostMetrics }, { data: blockMetrics }] = await Promise.all([
    explored.hostMetrics(),
    explored.blockMetrics(),
  ])

  const exploredAddress = await getExploredAddress()
  const selectedTopHosts = await getCachedTopHosts(exploredAddress)

  const [latestBlocks, latestBlocksError] = await getLatestBlocks(6, traceId)
  const latestHeight = latestBlocks ? latestBlocks[0].height : 0
  const version = await getNetworkVersion(traceId)

  if (latestBlocksError) {
    logger.error('page.home', 'latest_blocks_failed', {
      trace_id: traceId,
      error: latestBlocksError.message,
      version,
    })
  }

  logger.info('page.home', 'render_completed', {
    trace_id: traceId,
    duration_ms: getTime() - start,
    block_height: latestHeight,
    host_count: selectedTopHosts?.length ?? 0,
  })

  return (
    <AutoRefresh interval={30000}>
      <Home
        version={version}
        metrics={hostMetrics}
        blockHeight={latestHeight}
        blocks={latestBlocks || []}
        hosts={selectedTopHosts || []}
        totalHosts={blockMetrics?.totalHosts}
      />
    </AutoRefresh>
  )
}
