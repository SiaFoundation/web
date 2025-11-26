import { useDataTableParams, useParamStr } from '@siafoundation/design-system'
import { HostFilters, HostSorts } from './types'

export function useHostsParams() {
  const tableParams = useDataTableParams<HostFilters, HostSorts>('hostList')
  const [panelId, setPanelId] = useParamStr('hostsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
