import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralHostsNetworkMetricsResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHostsNetworkMetrics(
  args?: HookArgsSwr<void, SiaCentralHostsNetworkMetricsResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/hosts/network/metrics',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
