import {
  useAppSettings,
  HookArgsSwr,
  useGetSwr,
} from '@siafoundation/react-core'
import { defaultApi, SiaCentralBlock } from '@siafoundation/sia-central-types'

type SiaCentralBlockLatestResponse = {
  message: string
  block: Omit<SiaCentralBlock, 'transactions'>
}

export function useSiaCentralBlockLatest(
  args?: HookArgsSwr<void, SiaCentralBlockLatestResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/blocks',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
