import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralHostsNetworkAveragesResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHostsNetworkAverages(
  args?: HookArgsSwr<void, SiaCentralHostsNetworkAveragesResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/hosts/network/averages',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
