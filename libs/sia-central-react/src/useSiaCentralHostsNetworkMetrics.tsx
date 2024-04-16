import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralHostsNetworkMetricsResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHostsNetworkMetrics(
  args?: HookArgsSwr<void, SiaCentralHostsNetworkMetricsResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/hosts/network/metrics',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
