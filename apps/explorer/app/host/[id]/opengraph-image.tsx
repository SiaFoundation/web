import {
  getSiaCentralExchangeRates,
  getSiaCentralHost,
} from '@siafoundation/sia-central'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentralApi } from '../../../config'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '../../../lib/host'
import { humanBytes, humanSpeed } from '@siafoundation/sia-js'
import { truncate } from '@siafoundation/design-system'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'

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
  const [{ data: h }, { data: r }] = await Promise.all([
    getSiaCentralHost({
      params: {
        id,
      },
      config: {
        api: siaCentralApi,
      },
    }),
    getSiaCentralExchangeRates({
      config: {
        api: siaCentralApi,
      },
    }),
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
      subvalue: humanBytes(h.host.settings.remaining_storage),
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
      subvalue: humanSpeed(
        (h.host.benchmark.data_size * 8) /
          (h.host.benchmark.download_time / 1000)
      ),
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
      subvalue: humanSpeed(
        (h.host.benchmark.data_size * 8) / (h.host.benchmark.upload_time / 1000)
      ),
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
