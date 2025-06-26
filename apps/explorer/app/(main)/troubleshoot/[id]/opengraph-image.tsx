import { truncate } from '@siafoundation/design-system'
import { to } from '@siafoundation/request'

import { PreviewValue } from '../../../../components/OGImage/Preview'
import { getOGImage } from '../../../../components/OGImageEntity'
import { network } from '../../../../config'
import { getHostNetAddress } from '../../../../lib/hostType'
import { getExplored } from '../../../../lib/explored'
import {
  getTroubleshooterData,
  TroubleshooterResponse,
} from '../../../../lib/troubleshooter'
import { ExplorerPageProps } from '../../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Troubleshooter'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: ExplorerPageProps) {
  const p = await params
  const id = p?.id
  const explored = await getExplored()

  try {
    const [host, hostError] = await to(
      explored.hostByPubkey({ params: { id } }),
    )

    if (!host) throw hostError
    const response = await getTroubleshooterData({
      network,
      request: {
        publicKey: id,
        rhp4NetAddresses: 'v2NetAddresses' in host ? host.v2NetAddresses : [],
      },
    })

    const tsData: TroubleshooterResponse = response.data

    if (typeof tsData === 'string') {
      return getOGImage(
        {
          id,
          initials: 'TS',
          title: 'Troubleshooter',
          subtitle: '',
        },
        size,
      )
    }

    const siaMux = tsData.rhp4.filter(
      (rhp4) => rhp4.netAddress.protocol === 'siamux',
    )[0]

    const statusWord = () => {
      const { errors, warnings } = siaMux
      if (errors && errors.length) return 'Error'
      if (warnings && warnings.length) return 'Warning'
      return 'OK'
    }

    const values: PreviewValue[] = [
      { label: '', value: 'Troubleshooter' },
      {
        label: 'status',
        value: statusWord(),
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
        initials: 'TS',
        title: 'Troubleshooter',
        subtitle: '',
      },
      size,
    )
  }
}
