import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralExchangeRatesResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralExchangeRates(
  args?: HookArgsSwr<void, SiaCentralExchangeRatesResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/market/exchange-rate?currencies=sc',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
