import {
  useAppSettings,
  useGetFunc,
  HookArgsCallback,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralSearchParams,
  SiaCentralSearchResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralSearch(
  args?: HookArgsCallback<
    SiaCentralSearchParams,
    void,
    SiaCentralSearchResponse
  >
) {
  const { settings } = useAppSettings()
  return useGetFunc({
    api: defaultApi,
    ...args,
    route: '/explorer/search/:query',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
