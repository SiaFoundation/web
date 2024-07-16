import {
  type HookArgsSwr,
  useAppSettings,
  useGetSwr,
} from '@siafoundation/react-core'
import {
  type SiaCentralTransactionParams,
  type SiaCentralTransactionResponse,
  defaultApi,
} from '@siafoundation/sia-central-types'

export function useSiaCentralTransaction(
  args?: HookArgsSwr<
    SiaCentralTransactionParams,
    SiaCentralTransactionResponse
  >,
) {
  const { settings } = useAppSettings()
  return useGetSwr({
    api: defaultApi,
    ...args,
    route: '/explorer/transactions/:id',
    disabled: args?.disabled || !settings.siaCentral,
  })
}
