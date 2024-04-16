import {
  useAppSettings,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralBlockParams,
  SiaCentralBlockResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralBlock(
  args?: HookArgsSwr<SiaCentralBlockParams, SiaCentralBlockResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/blocks/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
