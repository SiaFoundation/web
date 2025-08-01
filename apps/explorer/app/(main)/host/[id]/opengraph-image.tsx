import { getOGImage } from '../../../../components/OGImageEntity'
import {
  displayStoragePricePerTBPerMonth,
  displayEgressPricePerTBPerMonth,
  displayIngressPricePerTBPerMonth,
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
  const p = await params
  const id = p?.id

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
        size,
      )
    }

    const values = [
      {
        label: 'storage',
        value: displayStoragePricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.storagePrice
            : host.settings.storageprice,
          exchange: {
            currency,
            rate,
          },
        }),
      },
      {
        label: 'download',
        value: displayEgressPricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.egressPrice
            : host.settings.downloadbandwidthprice,
          exchange: {
            currency,
            rate,
          },
        }),
      },
      {
        label: 'upload',
        value: displayIngressPricePerTBPerMonth({
          price: host.v2
            ? host.v2Settings.prices.ingressPrice
            : host.settings.uploadbandwidthprice,
          exchange: {
            currency,
            rate,
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
      size,
    )
  } catch {
    return getOGImage(
      {
        id,
        title: truncate(id, 30),
        subtitle: 'host',
        initials: 'H',
      },
      size,
    )
  }
}
