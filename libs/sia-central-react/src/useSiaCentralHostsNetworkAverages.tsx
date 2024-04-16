import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralHostsNetworkAveragesResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHostsNetworkAverages(
  args?: HookArgsSwr<void, SiaCentralHostsNetworkAveragesResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/hosts/network/averages',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
