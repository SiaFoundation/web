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
  const [[h], [r]] = await Promise.all([
    to(
      siaCentral.host({
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

  if (!h || !h.host) {
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

  if (!h.host.settings) {
    return getOGImage(
      {
        id: h.host.public_key,
        title: h.host.net_address,
        subtitle: truncate(h.host.public_key, 30),
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
        price: h.host.settings.storage_price,
        exchange: r && {
          currency,
          rate: r.rates.sc.usd,
        },
      }),
    },
    {
      label: 'download',
      value: getDownloadCost({
        price: h.host.settings.download_price,
        exchange: r && {
          currency,
          rate: r.rates.sc.usd,
        },
      }),
    },
    {
      label: 'upload',
      value: getUploadCost({
        price: h.host.settings.upload_price,
        exchange: r && {
          currency,
          rate: r.rates.sc.usd,
        },
      }),
    },
  ]

  return getOGImage(
    {
      id: h.host.public_key,
      title: h.host.net_address,
      subtitle: truncate(h.host.public_key, 30),
      initials: 'H',
      avatar: true,
      values,
    },
    size
  )
}
