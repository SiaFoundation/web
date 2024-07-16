import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralHostParams,
  type SiaCentralHostResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralHost(
  args?: HookArgsSwr<SiaCentralHostParams, SiaCentralHostResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/hosts/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
