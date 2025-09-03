import { DataTable, useDataTable } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { contractsColumns } from './contractsColumns'
import { SidePanelContract } from './SidePanelContract'
import { SidePanelContractList } from './SidePanelContractList'
import { ContractData } from './types'
import { useContracts } from './useContracts'
import { Layout } from '../Layout'
import { useContractsParams } from './useContractsParams'
import { OnChangeFn } from '@tanstack/react-table'
import { ColumnFiltersState } from '@tanstack/react-table'

export function Contracts() {
  const {
    offset,
    limit,
    setOffset,
    setLimit,
    panelId,
    setPanelId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useContractsParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const contracts = useContracts()
  const table = useDataTable<ContractData>({
    data: contracts,
    columns: contractsColumns,
    columnFilters,
    setColumnFilters: setColumnFilters as OnChangeFn<ColumnFiltersState>,
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
      table={<DataTable {...table} />}
      panel={
        panelId ? (
          <SidePanelContract />
        ) : (
          <SidePanelContractList table={table} />
        )
      }
    />
  )
}
