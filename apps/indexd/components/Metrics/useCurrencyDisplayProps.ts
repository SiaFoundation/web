import {
  getCurrencyDisplayPropsPreferred,
  useActiveDaemonExplorerExchangeRate,
} from '@siafoundation/design-system'
import { useAppSettings } from '@siafoundation/react-core'
import { Currency } from '@siafoundation/types'
import BigNumber from 'bignumber.js'
import { useCallback } from 'react'

// Formats a siacoin amount in the user's preferred currency, the same way the
// data tables do.
export function useCurrencyDisplayProps() {
  const exchangeRate = useActiveDaemonExplorerExchangeRate()
  const { settings } = useAppSettings()
  return useCallback(
    (value: Currency) =>
      getCurrencyDisplayPropsPreferred({
        sc: new BigNumber(value),
        currencyDisplay: settings.currencyDisplay,
        exchange: exchangeRate.currency &&
          exchangeRate.rate && {
            currency: exchangeRate.currency,
            rate: exchangeRate.rate,
          },
      }),
    [settings.currencyDisplay, exchangeRate.currency, exchangeRate.rate],
  )
}
