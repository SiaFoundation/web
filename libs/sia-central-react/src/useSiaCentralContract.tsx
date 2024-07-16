import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralContractParams,
  type SiaCentralContractResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralContract(
  args?: HookArgsSwr<SiaCentralContractParams, SiaCentralContractResponse>,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/contracts/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
