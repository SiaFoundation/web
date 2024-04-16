import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  defaultApi,
  SiaCentralTransactionParams,
  SiaCentralTransactionResponse,
} from '@siafoundation/sia-central-types'

export function useSiaCentralTransaction(
  args?: HookArgsSwr<SiaCentralTransactionParams, SiaCentralTransactionResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/transactions/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
