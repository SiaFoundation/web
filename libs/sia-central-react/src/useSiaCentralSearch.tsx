import {
  type HookArgsCallback,
  useAppSettings,
  useGetFunc,
} from '@siafoundation/react-core'
import {
  type SiaCentralSearchParams,
  type SiaCentralSearchResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralSearch(
  args?: HookArgsCallback<
    SiaCentralSearchParams,
    void,
    SiaCentralSearchResponse
  >,
) {
  const { settings } = useAppSettings()
  return useGetFunc({
    api: defaultApi,
    ...args,
    route: '/explorer/search/:query',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
