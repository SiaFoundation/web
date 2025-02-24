import { Metadata } from 'next'
import { appLink, network } from '../config'
import { Home } from '../components/Home'
import { buildMetadata } from '../lib/utils'
import { getLatestBlocks } from '../lib/blocks'
import { to } from '@siafoundation/request'
import { explored } from '../config/explored'
import { getTopHosts } from '../lib/hosts'
import { unstable_cache } from 'next/cache'

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

// Cache our top hosts fetch and ranking. Revalidate every 5 minutes.
const getCachedTopHosts = unstable_cache(getTopHosts, ['top-hosts'], {
  tags: ['top-hosts'],
  revalidate: 300,
})

export default async function HomePage() {
  const [[hostMetrics, hostMetricsError], [blockMetrics, blockMetricsError]] =
    await Promise.all([to(explored.hostMetrics()), to(explored.blockMetrics())])

  const selectedTopHosts = await getCachedTopHosts()

  const [latestBlocks, latestBlocksError] = await getLatestBlocks()
  const latestHeight = latestBlocks ? latestBlocks[0].height : 0

  if (latestBlocksError || hostMetricsError || blockMetricsError) {
    console.log(new Date().toISOString(), {
      latestBlocksError,
      hostMetricsError,
      blockMetrics,
    })
  }

  return (
    <Home
      metrics={hostMetrics}
      blockHeight={latestHeight}
      blocks={latestBlocks || []}
      hosts={selectedTopHosts || []}
      totalHosts={blockMetrics?.totalHosts}
    />
  )
}
