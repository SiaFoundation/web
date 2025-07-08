import { getOGImage } from '../../../../components/OGImageEntity'
import {
  getDownloadCost,
  getStorageCost,
  getUploadCost,
} from '@siafoundation/units'
import { truncate } from '@siafoundation/design-system'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { getHostNetAddress } from '../../../../lib/hostType'
import { getExplored } from '../../../../lib/explored'
import { ExplorerPageProps } from '../../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Host'
export const size = {
  width: 1200,
  height: 630,
}

const currency = currencyOptions.find((c) => c.id === 'usd') as CurrencyOption

export const contentType = 'image/png'

export default async function Image({ params }: ExplorerPageProps) {
  const id = params?.id as string

  try {
    const explored = await getExplored()
    const { data: host } = await explored.hostByPubkey({ params: { id } })
    const { data: rate } = await explored.exchangeRate({
      params: { currency: 'usd' },
    })

    if (host.v2 ? !host.v2Settings : !host.settings) {
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
            ? host.v2Settings.prices.storagePrice
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
            ? host.v2Settings.prices.egressPrice
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
            ? host.v2Settings.prices.ingressPrice
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
  } catch {
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
}
