import { useDataTableParams, useParamStr } from '@siafoundation/design-system'
import { HostFilters } from './types'

export function useHostsParams() {
  const tableParams = useDataTableParams<HostFilters>('hostList')
  const [panelId, setPanelId] = useParamStr('hostsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
