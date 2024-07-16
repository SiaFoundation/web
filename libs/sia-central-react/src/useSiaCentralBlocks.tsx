import {
  type HookArgsWithPayloadSwr,
  useAppSettings,
  usePostSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralBlock,
  type SiaCentralBlocksPayload,
  defaultApi,
} from '@siafoundation/sia-central-types'

type SiaCentralBlocksResposne = {
  message: string
  blocks: SiaCentralBlock[]
}

export function useSiaCentralBlocks(
  args: HookArgsWithPayloadSwr<
    void,
    SiaCentralBlocksPayload,
    SiaCentralBlocksResposne
  >,
) {
  const { settings } = useAppSettings()
  return usePostSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/blocks',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
