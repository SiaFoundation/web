import {
  useAppSettings,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralBlockParams,
  SiaCentralBlockResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralBlock(
  args?: HookArgsSwr<SiaCentralBlockParams, SiaCentralBlockResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/explorer/blocks/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
