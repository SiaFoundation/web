import { humanSiacoin, humanSiafund } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { truncate } from '@siafoundation/design-system'
import { fetchAddressBalance } from '../../../lib/fetchChainData'
import { AddressBalance } from '@siafoundation/explored-types'

export const revalidate = 0

export const alt = 'Address'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const address = params?.id as string
  let balance: AddressBalance

  try {
    balance = await fetchAddressBalance(params?.id)
  } catch (e) {
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
}
