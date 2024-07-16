import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralAddressParams,
  type SiaCentralAddressResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralAddress(
  args?: HookArgsSwr<SiaCentralAddressParams, SiaCentralAddressResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/wallet/addresses/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
