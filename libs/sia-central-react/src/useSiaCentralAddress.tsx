import {
  useAppSettings,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralAddressParams,
  SiaCentralAddressResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralAddress(
  args?: HookArgsSwr<SiaCentralAddressParams, SiaCentralAddressResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/wallet/addresses/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
