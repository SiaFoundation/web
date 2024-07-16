import { to } from '@siafoundation/request'
import { humanBytes } from '@siafoundation/units'
import type { Metadata } from 'next'
import { Home } from '../components/Home'
import { appLink, network } from '../config'
import { siaCentral } from '../config/siaCentral'
import { getLastFewBlocks } from '../lib/blocks'
import { buildMetadata } from '../lib/utils'

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
    [metrics, metricsError],
    [latestBlock, latestBlockError],
    [exchangeRates, exchangeRatesError],
    [hosts, hostsError],
  ] = await Promise.all([
    to(siaCentral.hostsNetworkMetrics()),
    to(siaCentral.blockLatest()),
    to(
      siaCentral.exchangeRates({
        params: { currencies: 'sc' },
      }),
    ),
    to(
      siaCentral.hosts({
        params: {
          limit: 5,
        },
      }),
    ),
  ])

  const lastBlockHeight = latestBlock?.block?.height || 0
  const [blocks, blocksError] = await getLastFewBlocks(latestBlock?.block)

  if (
    metricsError ||
    latestBlockError ||
    exchangeRatesError ||
    hostsError ||
    blocksError
  ) {
    console.log(new Date().toISOString(), {
      metricsError,
      latestBlockError,
      exchangeRatesError,
      blocksError,
      hostsError,
    })
  }

  console.log(new Date().toISOString(), {
    metrics: humanBytes(Buffer.byteLength(JSON.stringify(metrics || ''))),
    latestBlock: humanBytes(
      Buffer.byteLength(JSON.stringify(latestBlock || '')),
    ),
    blocks: humanBytes(Buffer.byteLength(JSON.stringify(blocks || ''))),
    exchangeRates: humanBytes(
      Buffer.byteLength(JSON.stringify(exchangeRates || '')),
    ),
    hosts: humanBytes(Buffer.byteLength(JSON.stringify(hosts || ''))),
  })

  return (
    <Home
      metrics={metrics}
      blockHeight={lastBlockHeight}
      blocks={blocks || []}
      hosts={hosts?.hosts || []}
      rates={exchangeRates?.rates}
    />
  )
}
