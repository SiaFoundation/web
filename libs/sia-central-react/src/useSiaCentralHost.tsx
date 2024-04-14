import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  SiaCentralHostResponse,
  SiaCentralHostParams,
  api,
} from '@siafoundation/sia-central'

export function useSiaCentralHost(
  args?: HookArgsSwr<SiaCentralHostParams, SiaCentralHostResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/hosts/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
