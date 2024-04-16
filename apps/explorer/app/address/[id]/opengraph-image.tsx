import { humanSiacoin, humanSiafund } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentral } from '../../../config/siaCentral'
import { truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'

export const revalidate = 0

export const alt = 'Address'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string
  const [a] = await to(
    siaCentral.address({
      params: {
        id,
      },
    })
  )

  if (!a) {
    return getOGImage(
      {
        id,
        title: truncate(id, 30),
        subtitle: 'address',
        initials: 'A',
      },
      size
    )
  }

  const values = [
    {
      label: 'siacoin balance',
      value: humanSiacoin(a?.unspent_siacoins || 0),
    },
  ]

  if (a.unspent_siafunds !== '0') {
    values.push({
      label: 'siafund balance',
      value: humanSiafund(Number(a?.unspent_siafunds) || 0),
    })
  }

  return getOGImage(
    {
      id,
      title: truncate(id, 44),
      subtitle: 'address',
      initials: 'A',
      values,
    },
    size
  )
}
