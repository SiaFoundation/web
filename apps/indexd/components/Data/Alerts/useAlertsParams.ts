import { useDataTableParams, useParamStr } from '@siafoundation/design-system'

export function useAlertsParams() {
  const tableParams = useDataTableParams('alertList')
  const [panelId, setPanelId] = useParamStr('alertsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
