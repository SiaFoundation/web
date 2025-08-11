import { useDataTableParams, useParamStr } from '@siafoundation/design-system'
import { ContractFilters } from './types'

export function useContractsParams() {
  const tableParams = useDataTableParams<ContractFilters>('contractList')
  const [panelId, setPanelId] = useParamStr('contractsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
