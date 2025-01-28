'use client'

import {
  currencyOptions,
  useAppSettings,
  useSiascanExchangeRate,
} from '@siafoundation/react-core'
import { siacoinToFiat } from '../lib/currency'
import { Skeleton } from '@siafoundation/design-system'

type Props = {
  sc: string
}

export function SCToFiatDisplay({ sc }: Props) {
  const {
    settings: { currency },
  } = useAppSettings()

  const { rate, error, isLoading } = useSiascanExchangeRate({
    currency: currency.id,
    api: 'https://api.beta.siascan.com/zen/api',
  })

  const currencyOption = currencyOptions.filter(
    (option) => option.id === currency.id
  )[0]

  if (isLoading) return <Skeleton className="h=[28px] w-[54px]" />
  if (error) return ''

  return siacoinToFiat(sc, { currency: currencyOption, rate: rate })
}
