import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralContractParams,
  SiaCentralContractResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralContract(
  args?: HookArgsSwr<SiaCentralContractParams, SiaCentralContractResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/explorer/contracts/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
