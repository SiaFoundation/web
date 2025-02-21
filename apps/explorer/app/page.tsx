import { Metadata } from 'next'
import { appLink, network } from '../config'
import { Home } from '../components/Home'
import { buildMetadata } from '../lib/utils'
import { getLatestBlocks } from '../lib/blocks'
import { to } from '@siafoundation/request'
import { explored } from '../config/explored'
import { rankHosts } from '../lib/hosts'
import { unstable_cache } from 'next/cache'

export function generateMetadata(): Metadata {
  const title = 'siascan'
  const description =
    network === 'mainnet'
      ? 'Siascan iss a block explorer with host statistics and pricing details. Siascan is built for Sia, a decentralized storage network.'
      : 'Siascan Zen is a block explorer with host statistics and pricing details. Siascan Zen is built for the Sia Zen Testnet.'
  return buildMetadata({
    title,
    description,
    url: appLink,
  })
}

export const revalidate = 0

// Cache our top hosts fetch and ranking. Revalidate every 24 hours.
const getCachedTopHosts = unstable_cache(
  async () => {
    const [hosts, hostsError] = await to(
      explored.hostsList({
        params: { sortBy: 'date_created', dir: 'asc', limit: 500 },
        data: { online: true },
      })
    )
    if (hostsError) return []
    return rankHosts(hosts)
      .slice(0, 5) // Select the top 5.
      .map((result) => result.host) // Strip score key.
  },
  ['top-hosts'],
  { revalidate: 86400 }
)

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
