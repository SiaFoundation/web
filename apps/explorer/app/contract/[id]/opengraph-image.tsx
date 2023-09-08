import {
  getSiaCentralContract,
  getSiaCentralExchangeRates,
} from '@siafoundation/sia-central'
import { humanBytes, humanDate } from '@siafoundation/sia-js'
import { getOGImage } from '../../../components/OGImageEntity'
import { siaCentralApi } from '../../../config'
import { truncate } from '@siafoundation/design-system'
import { lowerCase } from 'lodash'
import { siacoinToDollars } from '../../../lib/currency'

export const revalidate = 60

export const alt = 'Contract'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }) {
  const id = params?.id as string

  const [c, r] = await Promise.all([
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
      value: siacoinToDollars(c.contract.payout, r.rates),
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
