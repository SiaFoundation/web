import { humanSiacoin, humanSiafund } from '@siafoundation/units'
import { getOGImage } from '../../../../components/OGImageEntity'
import { truncate } from '@siafoundation/design-system'
import { getExplored } from '../../../../lib/explored'
import { ExplorerPageProps } from '../../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Address'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: ExplorerPageProps) {
  const address = params?.id as string

  try {
    const explored = await getExplored()
    const { data: balance } = await explored.addressBalance({
      params: { address },
    })

    const values = [
      {
        label: 'siacoin balance',
        value: humanSiacoin(balance.unspentSiacoins || 0),
      },
    ]

    if (balance.unspentSiafunds !== 0) {
      values.push({
        label: 'siafund balance',
        value: humanSiafund(balance.unspentSiafunds || 0),
      })
    }

    return getOGImage(
      {
        id: address,
        title: truncate(address, 44),
        subtitle: 'address',
        initials: 'A',
        values,
      },
      size
    )
  } catch {
    return getOGImage(
      {
        id: address,
        title: truncate(address, 30),
        subtitle: 'address',
        initials: 'A',
      },
      size
    )
  }
}
