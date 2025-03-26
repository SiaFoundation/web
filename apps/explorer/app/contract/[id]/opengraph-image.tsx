import { humanBytes } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { truncate } from '@siafoundation/design-system'
import { hastingsToFiat } from '../../../lib/currency'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { to } from '@siafoundation/request'
import { getExplored } from '../../../lib/explored'
import { blockHeightToHumanDate } from '../../../lib/time'
import { determineContractStatus } from '../../../lib/contracts'
import BigNumber from 'bignumber.js'

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

  const [
    [contract, contractError],
    [currentTip, currentTipError],
    [rate, rateError],
  ] = await Promise.all([
    to(getExplored().contractByID({ params: { id } })),
    to(getExplored().consensusTip()),
    to(getExplored().exchangeRate({ params: { currency: 'usd' } })),
  ])

  if (
    contractError ||
    !contract ||
    currentTipError ||
    !currentTip ||
    rateError ||
    !rate
  ) {
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

  const values = [
    {
      label: 'data size',
      value: humanBytes(contract.filesize),
    },
    {
      label: 'expiration',
      value: blockHeightToHumanDate(
        currentTip.height,
        contract.windowStart,
        'short'
      ),
    },
    {
      label: 'payout',
      value: hastingsToFiat(contract.payout, {
        currency: currencyOpt,
        rate: new BigNumber(rate),
      }),
    },
  ]

  const contractStatus = determineContractStatus(contract)

  return getOGImage(
    {
      id,
      title: truncate(contract.id, 30),
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
