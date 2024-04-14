import {
  useAppSettings,
  usePostSwr,
  HookArgsWithPayloadSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralBlock,
  SiaCentralBlocksPayload,
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
  >
) {
  const { settings } = useAppSettings()
  return usePostSwr({
    api,
    ...args,
    route: '/explorer/blocks',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
