import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralExchangeRatesResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralExchangeRates(
  args?: HookArgsSwr<void, SiaCentralExchangeRatesResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/market/exchange-rate?currencies=sc',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
