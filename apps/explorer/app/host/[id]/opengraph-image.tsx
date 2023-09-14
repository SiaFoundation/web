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

export const revalidate = 60

export const alt = 'Host'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string
  const [h, r] = await Promise.all([
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

  const values = [
    {
      label: 'storage',
      value: getStorageCost({
        price: h.host.settings.storage_price,
        rates: r.rates,
      }),
      subvalue: humanBytes(h.host.settings.remaining_storage),
    },
    {
      label: 'download',
      value: getDownloadCost({
        price: h.host.settings.download_price,
        rates: r.rates,
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
        rates: r.rates,
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
