import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralExchangeRatesResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralExchangeRates(
  args?: HookArgsSwr<void, SiaCentralExchangeRatesResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/market/exchange-rate?currencies=sc',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
