import { useDataTableParams, useParamStr } from '@siafoundation/design-system'

export function useAccountsParams() {
  const tableParams = useDataTableParams('accountList')
  const [panelId, setPanelId] = useParamStr('accountsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
