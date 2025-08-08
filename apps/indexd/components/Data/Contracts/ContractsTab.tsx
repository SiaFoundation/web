import {
  DataTable,
  useDataTable,
  useDataTableParams,
} from '@siafoundation/design-system'
import { useCallback } from 'react'
import { contractsColumns } from './contractsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { SidePanelContract } from './SidePanelContract'
import { SidePanelContractList } from './SidePanelContractList'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ContractData } from './types'
import { useContracts } from './useContracts'
import { Layout } from '../Layout'

export function ContractsTab() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const view = params.get('view') as DataView
  const setView = (view: DataView) => {
    const paramsObj = new URLSearchParams(Array.from(params.entries()))
    paramsObj.set('view', view)
    router.push(`${pathname}?${paramsObj.toString()}`)
  }
  const {
    offset,
    limit,
    setOffset,
    setLimit,
    selectedId,
    setSelectedId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useDataTableParams('contractList')
  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId],
  )

  const contracts = useContracts()
  const table = useDataTable<ContractData>({
    data: contracts,
    columns: contractsColumns,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
  })

  return (
    <Layout
      table={
        <DataTable
          {...table}
          heading={<DataViewSelect value={view} onValueChange={setView} />}
        />
      }
      panel={
        selectedId ? (
          <SidePanelContract />
        ) : (
          <SidePanelContractList table={table} />
        )
      }
    />
  )
}
