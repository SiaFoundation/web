import {
  useAppSettings,
  useGetFunc,
  HookArgsCallback,
} from '@siafoundation/react-core'
import {
  api,
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
    api,
    ...args,
    route: '/explorer/search/:query',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
