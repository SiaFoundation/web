import {
  getSiaCentralContract,
  getSiaCentralExchangeRates,
} from '@siafoundation/sia-central'
import { humanBytes, humanDate } from '@siafoundation/units'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentralApi } from '../../../config'
import { truncate } from '@siafoundation/design-system'
import lowerCase from 'lodash-es/lowerCase'
import { siacoinToFiat } from '../../../lib/currency'
import { CurrencyOption, currencyOptions } from '@siafoundation/react-core'

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

  const [{ data: c }, { data: r }] = await Promise.all([
    getSiaCentralContract({
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

  if (!c || !c.contract) {
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
      value: humanBytes(c.contract.file_size),
    },
    {
      label: 'expiration',
      value: humanDate(c.contract.expiration_timestamp, {
        dateStyle: 'short',
        timeStyle: 'short',
      }),
    },
    {
      label: 'payout',
      value: siacoinToFiat(
        c.contract.payout,
        r && {
          currency,
          rate: r.rates.sc.usd,
        }
      ),
    },
  ]

  return getOGImage(
    {
      id,
      title: truncate(c.contract.id, 30),
      subtitle: 'contract',
      status: lowerCase(c.contract.status),
      statusColor:
        c.contract.status === 'obligationSucceeded'
          ? 'green'
          : c.contract.status === 'obligationFailed'
          ? 'red'
          : 'amber',
      initials: 'C',
      values,
    },
    size
  )
}
