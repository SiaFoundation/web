import { getOGImage } from '../../../components/OGImageEntity'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { truncate } from '@siafoundation/design-system'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { to } from '@siafoundation/request'
import { getExplored } from '../../../lib/explored'
import { getHostNetAddress } from '../../../lib/hostType'

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
  const [[host, hostError], [rate, rateError]] = await Promise.all([
    to(
      getExplored().hostByPubkey({
        params: {
          id,
        },
      })
    ),
    to(
      getExplored().exchangeRate({
        params: {
          currency: 'usd',
        },
      })
    ),
  ])

  if (hostError || !host || rateError || !rate) {
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

  if (host.v2 ? !host.rhpV4Settings : !host.settings) {
    return getOGImage(
      {
        id: host.publicKey,
        title: getHostNetAddress(host),
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
        price: host.v2
          ? host.rhpV4Settings.prices.storagePrice
          : host.settings.storageprice,
        exchange: {
          currency,
          rate: rate.toString(),
        },
      }),
    },
    {
      label: 'download',
      value: getDownloadCost({
        price: host.v2
          ? host.rhpV4Settings.prices.egressPrice
          : host.settings.downloadbandwidthprice,
        exchange: {
          currency,
          rate: rate.toString(),
        },
      }),
    },
    {
      label: 'upload',
      value: getUploadCost({
        price: host.v2
          ? host.rhpV4Settings.prices.ingressPrice
          : host.settings.uploadbandwidthprice,
        exchange: {
          currency,
          rate: rate.toString(),
        },
      }),
    },
  ]

  return getOGImage(
    {
      id: host.publicKey,
      title: getHostNetAddress(host),
      subtitle: truncate(host.publicKey, 30),
      initials: 'H',
      avatar: true,
      values,
    },
    size
  )
}
