'use client'

import { useAppSettings } from '@siafoundation/react-core'
import { SiaCentralExchangeRates } from '@siafoundation/sia-central'

export function useExchangeRate(rates?: SiaCentralExchangeRates) {
  const {
    settings: { currency },
  } = useAppSettings()
  const rate = rates?.sc[currency.id]
  if (!rate) {
    return undefined
  }
  return {
    currency,
    rate,
  }
}
