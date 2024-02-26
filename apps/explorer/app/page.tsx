import { Metadata } from 'next'
import { appLink, network, siaCentralApi } from '../config'
import { Home } from '../components/Home'
import {
  getSiaCentralBlockLatest,
  getSiaCentralExchangeRates,
  getSiaCentralHosts,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central'
import { buildMetadata } from '../lib/utils'
import { humanBytes } from '@siafoundation/units'
import { getLastFewBlocks } from '../lib/blocks'

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

export default async function HomePage() {
  const [
    { data: m, error: metricsError },
    { data: lb, error: latestBlockError },
    { data: r, error: exchangeRatesError },
    { data: h, error: hostsError },
  ] = await Promise.all([
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
  const blocks = await getLastFewBlocks(lb?.block)

  if (
    metricsError ||
    latestBlockError ||
    exchangeRatesError ||
    hostsError ||
    latestBlockError ||
    blocks.error
  ) {
    console.log(new Date().toISOString(), {
      metricsError,
      latestBlockError,
      exchangeRatesError,
      blocksError: blocks.error,
      hostsError,
    })
  }

  console.log(new Date().toISOString(), {
    metrics: humanBytes(Buffer.byteLength(JSON.stringify(m || ''))),
    latestBlock: humanBytes(Buffer.byteLength(JSON.stringify(lb || ''))),
    blocks: humanBytes(Buffer.byteLength(JSON.stringify(blocks || ''))),
    exchangeRates: humanBytes(Buffer.byteLength(JSON.stringify(r || ''))),
    hosts: humanBytes(Buffer.byteLength(JSON.stringify(h || ''))),
  })

  return (
    <Home
      metrics={m}
      blockHeight={lastBlockHeight}
      blocks={blocks?.blocks || []}
      hosts={h?.hosts || []}
      rates={r?.rates}
    />
  )
}
