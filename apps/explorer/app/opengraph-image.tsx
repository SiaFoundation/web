import {
  getSiaCentralBlockLatest,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central'
import { getOGImage } from '../components/OGImage'
import { network, siaCentralApi } from '../config'
import { humanBytes } from '@siafoundation/sia-js'
import { PreviewValue } from '../components/OGImage/Preview'

export const revalidate = 60

export const alt = 'Contract'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const [{ data: metrics }, { data: latestBlock }] = await Promise.all([
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

  const lastBlockHeight = Number(latestBlock?.block.height || 0)

  const values: PreviewValue[] = []
  if (latestBlock) {
    values.push({
      label: 'Block height',
      value: lastBlockHeight.toLocaleString(),
    })
  }

  if (metrics) {
    values.push(
      {
        label: 'Active hosts',
        value: metrics.totals.active_hosts.toLocaleString(),
      },
      {
        label: 'Used storage',
        value: humanBytes(
          metrics.totals.total_storage - metrics.totals.remaining_storage
        ),
      }
    )
  }

  return getOGImage(
    {
      title: 'siascan',
      subtitle:
        network === 'mainnet'
          ? 'Sia blockchain and host explorer.'
          : 'Zen testnet blockchain and host explorer.',
      values: values.length ? values : undefined,
    },
    size
  )
}
