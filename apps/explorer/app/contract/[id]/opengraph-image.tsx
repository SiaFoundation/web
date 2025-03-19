import { humanBytes } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { truncate } from '@siafoundation/design-system'
import { hastingsToFiat } from '../../../lib/currency'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { blockHeightToHumanDate } from '../../../lib/time'
import {
  determineContractStatus,
  normalizeContract,
} from '../../../lib/contracts'
import BigNumber from 'bignumber.js'
import {
  ChainIndex,
  ExplorerFileContract,
  ExplorerV2FileContract,
} from '@siafoundation/explored-types'
import {
  fetchConsensusTip,
  fetchExchangeRateByCurrencyID,
  fetchSearchType,
  fetchV1Contract,
  fetchV2Contract,
} from '../../../lib/fetchChainData'

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

export default async function Image({ params }) {
  const id = params?.id as string

  const contractType = await fetchSearchType(id)

  let contract: ExplorerFileContract | ExplorerV2FileContract

  try {
    if (contractType === 'v2contract') {
      contract = await fetchV2Contract(id)
    } else {
      contract = await fetchV1Contract(id)
    }
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

  let currentTip: ChainIndex
  let rate: number

  try {
    currentTip = await fetchConsensusTip()
    rate = await fetchExchangeRateByCurrencyID('usd')
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

  const nContract = normalizeContract(contract)

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

  const contractStatus = determineContractStatus(contract)

  return getOGImage(
    {
      id,
      title: truncate(nContract.id, 30),
      subtitle: 'contract',
      status: contractStatus,
      statusColor:
        contractStatus === 'in progress'
          ? 'amber'
          : contractStatus === 'obligation succeeded'
          ? 'green'
          : 'red',
      initials: 'C',
      values,
    },
    size
  )
}
