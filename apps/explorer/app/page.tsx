import { Metadata } from 'next'
import { appLink, appName, networkName, siaCentralApi } from '../config'
import { Home } from '../components/Home'
import {
  getSiaCentralBlockLatest,
  getSiaCentralBlocks,
  getSiaCentralHosts,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central'
import { range } from 'lodash'

export function generateMetadata(): Metadata {
  const title = 'Home'
  const description =
    networkName === 'Sia Mainnet'
      ? 'Sia blockchain explorer'
      : 'Zen blockchain explorer'
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: appLink,
      siteName: appName,
    },
  }
}

export const revalidate = 60

export default async function HomePage() {
  const [metrics, lastestBlock] = await Promise.all([
    getSiaCentralHostsNetworkMetrics({
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlockLatest({
      config: {
        api: siaCentralApi,
      },
    }),
  ])
  const lastBlockHeight = lastestBlock?.block.height || 0
  const blocks = await getSiaCentralBlocks({
    payload: {
      heights: range(lastBlockHeight - 5, lastBlockHeight),
    },
    config: {
      api: siaCentralApi,
    },
  })
  const hosts = await getSiaCentralHosts({
    params: {
      limit: 5,
    },
    config: {
      api: siaCentralApi,
    },
  })
  return (
    <Home
      metrics={metrics}
      blockHeight={lastBlockHeight}
      blocks={blocks.blocks}
      hosts={hosts.hosts}
    />
  )
}
