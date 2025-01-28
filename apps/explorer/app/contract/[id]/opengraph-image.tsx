import { humanBytes } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentral } from '../../../config/siaCentral'
import { truncate } from '@siafoundation/design-system'
import { siacoinToFiat } from '../../../lib/currency'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'
import { to } from '@siafoundation/request'
import { explored } from '../../../config/explored'
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

const currency = currencyOptions.find((c) => c.id === 'usd') as CurrencyOption

export default async function Image({ params }) {
  const id = params?.id as string

  const [[contract, contractError], [currentTip, currentTipError], [r]] =
    await Promise.all([
      to(explored.contractByID({ params: { id } })),
      to(explored.consensusTip()),
      to(
        siaCentral.exchangeRates({
          params: {
            currencies: 'sc',
          },
        })
      ),
    ])

  if (contractError || !contract || currentTipError || !currentTip) {
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
      value: blockHeightToHumanDate(currentTip.height, contract.windowStart),
    },
    {
      label: 'payout',
      value: siacoinToFiat(
        contract.payout,
        r && {
          currency,
          rate: new BigNumber(r.rates.sc.usd),
        }
      ),
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
