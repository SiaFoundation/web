import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralHostsNetworkMetricsResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHostsNetworkMetrics(
  args?: HookArgsSwr<void, SiaCentralHostsNetworkMetricsResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/hosts/network/metrics',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
