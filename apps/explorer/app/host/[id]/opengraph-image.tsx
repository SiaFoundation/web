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
      value: getStorageCost({ host: h.host, rates: r.rates }),
    },
    {
      label: 'download',
      value: getDownloadCost({ host: h.host, rates: r.rates }),
    },
    {
      label: 'upload',
      value: getUploadCost({ host: h.host, rates: r.rates }),
    },
  ]

  return getOGImage(
    {
      id: h.host.public_key,
      title: h.host.net_address,
      subtitle: h.host.public_key,
      initials: 'H',
      avatar: true,
      values,
    },
    size
  )
}
