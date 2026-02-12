import { useDataTableParams, useParamStr } from '@siafoundation/design-system'

export function useQuotasParams() {
  const tableParams = useDataTableParams('quotaList')
  const [panelId, setPanelId] = useParamStr('quotasPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
