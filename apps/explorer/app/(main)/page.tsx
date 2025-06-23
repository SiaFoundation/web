import { Metadata } from 'next'
import { appLink, network } from '../../config'
import { Home } from '../../components/Home'
import { buildMetadata } from '../../lib/utils'
import { getLatestBlocks } from '../../lib/blocks'
import { getTopHosts } from '../../lib/hosts'
import { getExplored, getExploredAddress } from '../../lib/explored'
import { unstable_cache } from 'next/cache'
import { getNetworkVersion } from '../../lib/networkVersion'
import { AutoRefresh } from '../../components/AutoRefresh'

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
  }
)

export default async function HomePage() {
  const [{ data: hostMetrics }, { data: blockMetrics }] = await Promise.all([
    getExplored().hostMetrics(),
    getExplored().blockMetrics(),
  ])

  const exploredAddress = getExploredAddress()
  const selectedTopHosts = await getCachedTopHosts(exploredAddress)

  const [latestBlocks, latestBlocksError] = await getLatestBlocks()
  const latestHeight = latestBlocks ? latestBlocks[0].height : 0
  const version = await getNetworkVersion()

  if (latestBlocksError) {
    console.log(new Date().toISOString(), {
      latestBlocksError,
      version,
    })
  }

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
