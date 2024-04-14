import {
  useAppSettings,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralAddressParams,
  SiaCentralAddressResponse,
} from '@siafoundation/sia-central'

export function useSiaCentralAddress(
  args?: HookArgsSwr<SiaCentralAddressParams, SiaCentralAddressResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/wallet/addresses/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
