import { getOGImage } from '../../components/OGImage'
import { network } from '../../config'
import { humanBytes } from '@siafoundation/units'
import { PreviewValue } from '../../components/OGImage/Preview'
import { getExplored } from '../../lib/explored'

export const revalidate = 0

export const alt = 'Sia Network'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const explored = await getExplored()
  const [{ data: tip }, { data: hostMetrics }] = await Promise.all([
    explored.consensusTip(),
    explored.hostMetrics(),
  ])

  const values: PreviewValue[] = []
  if (tip) {
    values.push({
      label: 'Block height',
      value: tip.height.toLocaleString(),
    })
  }

  if (hostMetrics) {
    values.push(
      {
        label: 'Active hosts',
        value: hostMetrics.activeHosts.toLocaleString(),
      },
      {
        label: 'Used storage',
        value: humanBytes(
          hostMetrics.totalStorage - hostMetrics.remainingStorage,
        ),
      },
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
    size,
  )
}
