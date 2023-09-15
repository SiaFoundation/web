import { Metadata } from 'next'
import { appLink, network, siaCentralApi } from '../config'
import { Home } from '../components/Home'
import {
  getSiaCentralBlockLatest,
  getSiaCentralBlocks,
  getSiaCentralExchangeRates,
  getSiaCentralHosts,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central'
import { range } from 'lodash'
import { buildMetadata } from '../lib/utils'

export function generateMetadata(): Metadata {
  const title = 'siascan'
  const description =
    network === 'mainnet'
      ? 'Sia blockchain and host explorer.'
      : 'Zen blockchain and host explorer.'
  return buildMetadata({
    title,
    description,
    url: appLink,
  })
}

export const revalidate = 60

export default async function HomePage() {
  const [m, lb, r, h] = await Promise.all([
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
    getSiaCentralExchangeRates({
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralHosts({
      params: {
        limit: 5,
      },
      config: {
        api: siaCentralApi,
      },
    }),
  ])

  const lastBlockHeight = lb?.block.height || 0
  const bs = await getSiaCentralBlocks({
    payload: {
      heights: range(lastBlockHeight - 5, lastBlockHeight),
    },
    config: {
      api: siaCentralApi,
    },
  })

  return (
    <Home
      metrics={m}
      blockHeight={lastBlockHeight}
      blocks={bs.blocks}
      hosts={h.hosts}
      rates={r.rates}
    />
  )
}
