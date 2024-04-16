import { getOGImage } from '../components/OGImage'
import { network } from '../config'
import { humanBytes } from '@siafoundation/units'
import { PreviewValue } from '../components/OGImage/Preview'
import { siaCentral } from '../config/siaCentral'
import { to } from '@siafoundation/request'

export const revalidate = 0

export const alt = 'Contract'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const [[metrics], [latestBlock]] = await Promise.all([
    to(siaCentral.hostsNetworkMetrics()),
    to(siaCentral.blockLatest()),
  ])

  const lastBlockHeight = Number(latestBlock?.block?.height || 0)

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
          ? 'Siascan is a block explorer with host statistics and pricing details. Siascan is built for Sia, a decentralized storage network.'
          : 'Siascan Zen is a block explorer with host statistics and pricing details. Siascan Zen is built for the Sia Zen Testnet.',
      values: values.length ? values : undefined,
    },
    size
  )
}
