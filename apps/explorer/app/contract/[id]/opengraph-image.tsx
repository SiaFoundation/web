import { humanBytes } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { truncate } from '@siafoundation/design-system'
import { hastingsToFiat } from '../../../lib/currency'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { blockHeightToHumanDate } from '../../../lib/time'
import {
  determineContractStatusColor,
  normalizeContract,
} from '../../../lib/contracts'
import BigNumber from 'bignumber.js'
import { getExplored } from '../../../lib/explored'
import { ExplorerPageProps } from '../../../lib/pageProps'

export const revalidate = 0

export const alt = 'Contract'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

const currencyOpt = currencyOptions.find(
  (c) => c.id === 'usd'
) as CurrencyOption

export default async function Image({ params }: ExplorerPageProps) {
  const id = params?.id as string

  const { data: contractType } = await getExplored().searchResultType({
    params: { id },
  })

  try {
    const { data: c } =
      contractType === 'v2Contract'
        ? await getExplored().v2ContractByID({ params: { id } })
        : await getExplored().contractByID({ params: { id } })

    const nContract = normalizeContract(c)
    const { data: currentTip } = await getExplored().consensusTip()
    const { data: rate } = await getExplored().exchangeRate({
      params: { currency: 'usd' },
    })

    const values = [
      {
        label: 'data size',
        value: humanBytes(nContract.filesize),
      },
      {
        label: 'expiration',
        value: blockHeightToHumanDate(
          currentTip.height,
          nContract.resolutionWindowStart,
          'short'
        ),
      },
      {
        label: 'payout',
        value: hastingsToFiat(nContract.payout, {
          currency: currencyOpt,
          rate: new BigNumber(rate),
        }),
      },
    ]

    return getOGImage(
      {
        id,
        title: truncate(nContract.id, 30),
        subtitle: 'contract',
        status: nContract.status,
        statusColor: determineContractStatusColor(nContract.status),
        initials: 'C',
        values,
      },
      size
    )
  } catch (e) {
    return getOGImage(
      {
        id,
        title: truncate(id, 30),
        subtitle: 'contract',
        initials: 'C',
      },
      size
    )
  }
}
