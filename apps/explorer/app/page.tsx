import { Metadata } from 'next'
import { appLink, network, siaCentralApi } from '../config'
import { Home } from '../components/Home'
import {
  SiaCentralBlock,
  getSiaCentralBlock,
  getSiaCentralBlockLatest,
  getSiaCentralExchangeRates,
  getSiaCentralHosts,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central'
import { buildMetadata } from '../lib/utils'
import { humanBytes } from '@siafoundation/sia-js'

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
  const [
    { data: m, error: metricsError },
    { data: lb, error: latestBlockError },
    { data: r, error: exchangeRatesError, },
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
  const [one, two, three, four] = await Promise.all([
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 1),
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 2),
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 3),
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralBlock({
      params: {
        id: String(lastBlockHeight - 4),
      },
      config: {
        api: siaCentralApi,
      },
    })
  ])

  const blocks: SiaCentralBlock[] = []
  if (lastBlockHeight) {
    if (lb) {
      blocks.push(lb.block)
    }
    if (one.data) {
      blocks.push(one.data.block)
    }
    if (two.data) {
      blocks.push(two.data.block)
    }
    if (three.data) {
      blocks.push(three.data.block)
    }
    if (four.data) {
      blocks.push(four.data.block)
    }
  }

  if (metricsError || latestBlockError || exchangeRatesError || hostsError || latestBlockError || one.error || two.error || three.error || four.error) {
    console.log(new Date().toISOString(), {
      metricsError,
      latestBlockError,
      blockOneError: one.error,
      blockTwoError: two.error,
      blockThreeError: three.error,
      blockFourError: four.error,
      exchangeRatesError,
      hostsError,
    })
  }

  console.log(new Date().toISOString(), {
    metrics: humanBytes(Buffer.byteLength(JSON.stringify(m || ''))),
    latestBlock: humanBytes(Buffer.byteLength(JSON.stringify(lb || ''))),
    blockOne: humanBytes(Buffer.byteLength(JSON.stringify(one || ''))),
    blockTwo: humanBytes(Buffer.byteLength(JSON.stringify(two || ''))),
    blockThree: humanBytes(Buffer.byteLength(JSON.stringify(three || ''))),
    blockFour: humanBytes(Buffer.byteLength(JSON.stringify(four || ''))),
    exchangeRates: humanBytes(Buffer.byteLength(JSON.stringify(r || ''))),
    hosts: humanBytes(Buffer.byteLength(JSON.stringify(h || ''))),
  })

  return (
    <Home
      metrics={m}
      blockHeight={lastBlockHeight}
      blocks={blocks}
      hosts={h?.hosts || []}
      rates={r?.rates}
    />
  )
}
