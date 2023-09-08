import {
  getSiaCentralBlockLatest,
  getSiaCentralHostsNetworkMetrics,
} from '@siafoundation/sia-central'
import { getOGImage } from '../components/OGImage'
import { networkName, siaCentralApi } from '../config'
import { humanBytes } from '@siafoundation/sia-js'

export const revalidate = 60

export const alt = 'Contract'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
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
  const lastBlockHeight = Number(lastestBlock?.block.height || 0)

  const values = [
    {
      label: 'Block height',
      value: lastBlockHeight.toLocaleString(),
    },
    {
      label: 'Active hosts',
      value: metrics.totals.active_hosts.toLocaleString(),
    },
    {
      label: 'Used storage',
      value: humanBytes(
        metrics.totals.total_storage - metrics.totals.remaining_storage
      ),
    },
  ]

  return getOGImage(
    {
      title: networkName === 'Sia Mainnet' ? 'Sia Explorer' : 'Zen Explorer',
      subtitle:
        networkName === 'Sia Mainnet'
          ? 'Sia blockchain and host explorer.'
          : 'Zen testnet blockchain and host explorer.',
      values,
    },
    size
  )
}
