import { Metadata } from 'next'
import { appLink, network } from '../config'
import { Home } from '../components/Home'
import { buildMetadata } from '../lib/utils'
import { humanBytes } from '@siafoundation/units'
import { getLatestBlocks } from '../lib/blocks'
import { siaCentral } from '../config/siaCentral'
import { to } from '@siafoundation/request'

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
    [exchangeRates, exchangeRatesError],
    [hosts, hostsError],
  ] = await Promise.all([
    to(siaCentral.hostsNetworkMetrics()),
    to(
      siaCentral.exchangeRates({
        params: { currencies: 'sc' },
      })
    ),
    to(
      siaCentral.hosts({
        params: {
          limit: 5,
        },
      })
    ),
  ])

  const [latestBlocks, latestBlocksError] = await getLatestBlocks()
  const latestHeight = latestBlocks ? latestBlocks[0].height : 0

  if (metricsError || latestBlocksError || exchangeRatesError || hostsError) {
    console.log(new Date().toISOString(), {
      metricsError,
      latestBlocksError,
      exchangeRatesError,
      hostsError,
    })
  }

  console.log(new Date().toISOString(), {
    metrics: humanBytes(Buffer.byteLength(JSON.stringify(metrics || ''))),
    latestBlocks: humanBytes(
      Buffer.byteLength(JSON.stringify(latestBlocks || ''))
    ),
    exchangeRates: humanBytes(
      Buffer.byteLength(JSON.stringify(exchangeRates || ''))
    ),
    hosts: humanBytes(Buffer.byteLength(JSON.stringify(hosts || ''))),
  })

  return (
    <Home
      metrics={metrics}
      blockHeight={latestHeight}
      blocks={latestBlocks || []}
      hosts={hosts?.hosts || []}
      rates={exchangeRates?.rates}
    />
  )
}
