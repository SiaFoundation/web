import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentral } from '../../../config/siaCentral'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { truncate } from '@siafoundation/design-system'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { to } from '@siafoundation/request'
import { explored } from '../../../config/explored'

export const revalidate = 0

export const alt = 'Host'
export const size = {
  width: 1200,
  height: 630,
}

const currency = currencyOptions.find((c) => c.id === 'usd') as CurrencyOption

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string
  const [[host, hostError], [r]] = await Promise.all([
    to(
      explored.hostByPubkey({
        params: {
          id,
        },
      })
    ),
    to(
      siaCentral.exchangeRates({
        params: {
          currencies: 'sc',
        },
      })
    ),
  ])

  if (hostError || !host) {
    return getOGImage(
      {
        id,
        title: truncate(id, 30),
        subtitle: 'host',
        initials: 'H',
      },
      size
    )
  }

  if (!host.settings) {
    return getOGImage(
      {
        id: host.publicKey,
        title: host.netAddress,
        subtitle: truncate(host.publicKey, 30),
        initials: 'H',
        avatar: true,
      },
      size
    )
  }

  const values = [
    {
      label: 'storage',
      value: getStorageCost({
        price: host.settings.storageprice,
        exchange: r && {
          currency,
          rate: r.rates.sc.usd,
        },
      }),
    },
    {
      label: 'download',
      value: getDownloadCost({
        price: host.settings.downloadbandwidthprice,
        exchange: r && {
          currency,
          rate: r.rates.sc.usd,
        },
      }),
    },
    {
      label: 'upload',
      value: getUploadCost({
        price: host.settings.uploadbandwidthprice,
        exchange: r && {
          currency,
          rate: r.rates.sc.usd,
        },
      }),
    },
  ]

  return getOGImage(
    {
      id: host.publicKey,
      title: host.netAddress,
      subtitle: truncate(host.publicKey, 30),
      initials: 'H',
      avatar: true,
      values,
    },
    size
  )
}
