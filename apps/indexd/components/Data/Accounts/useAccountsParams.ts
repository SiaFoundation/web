import { useDataTableParams, useParamStr } from '@siafoundation/design-system'
import { AccountFilters } from './types'

export function useAccountsParams() {
  const tableParams = useDataTableParams<AccountFilters>('accountList')
  const [panelId, setPanelId] = useParamStr('accountsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
