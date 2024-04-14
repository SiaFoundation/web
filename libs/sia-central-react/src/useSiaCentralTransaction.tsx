import {
  useGetSwr,
  useAppSettings,
  HookArgsSwr,
} from '@siafoundation/react-core'
import {
  api,
  SiaCentralTransactionParams,
  SiaCentralTransactionResponse,
} from '@siafoundation/sia-central'

export function useSiaCentralTransaction(
  args?: HookArgsSwr<SiaCentralTransactionParams, SiaCentralTransactionResponse>
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api,
    ...args,
    route: '/explorer/transactions/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
