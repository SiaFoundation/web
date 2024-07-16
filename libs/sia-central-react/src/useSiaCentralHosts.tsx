import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralHostsResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHosts(
  args?: HookArgsSwr<void, SiaCentralHostsResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route:
      '/hosts/list?showinactive=false&sort=download_speed&dir=desc&protocol=rhp3&page=0&limit=1000',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
