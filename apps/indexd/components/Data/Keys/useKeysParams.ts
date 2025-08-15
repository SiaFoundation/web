import { useDataTableParams, useParamStr } from '@siafoundation/design-system'

export function useKeysParams() {
  const tableParams = useDataTableParams('keyList')
  const [panelId, setPanelId] = useParamStr('keysPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
