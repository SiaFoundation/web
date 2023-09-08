import {
  useAppSettings,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
import { api, SiaCentralBlock } from '@siafoundation/sia-central'

type SiaCentralBlockLatestResponse = {
  message: string
  block: Omit<SiaCentralBlock, 'transactions'>
}

export function useSiaCentralBlockLatest(
  args?: HookArgsSwr<void, SiaCentralBlockLatestResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/explorer/blocks',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
