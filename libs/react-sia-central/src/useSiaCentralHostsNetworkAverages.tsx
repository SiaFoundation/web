import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralHostsNetworkAveragesResponse,
} from '@siafoundation/sia-central'

export function useSiaCentralHostsNetworkAverages(
  args?: HookArgsSwr<void, SiaCentralHostsNetworkAveragesResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/hosts/network/averages',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
