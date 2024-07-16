import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralBlockParams,
  type SiaCentralBlockResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralBlock(
  args?: HookArgsSwr<SiaCentralBlockParams, SiaCentralBlockResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/blocks/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
