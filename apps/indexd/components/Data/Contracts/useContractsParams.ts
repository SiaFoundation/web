import { useDataTableParams, useParamStr } from '@siafoundation/design-system'
import { ContractFilters, ContractSorts } from './types'

export function useContractsParams() {
  const tableParams = useDataTableParams<ContractFilters, ContractSorts>(
    'contractList',
  )
  const [panelId, setPanelId] = useParamStr('contractsPanelId')
  return {
    ...tableParams,
    panelId,
    setPanelId,
  }
}
