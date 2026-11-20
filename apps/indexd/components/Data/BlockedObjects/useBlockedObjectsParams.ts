import { useDataTableParams, useParamStr } from '@siafoundation/design-system'

export function useBlockedObjectsParams() {
  const tableParams = useDataTableParams('blockedObjectList')
  const [panelId, setPanelId] = useParamStr('blockedObjectsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
