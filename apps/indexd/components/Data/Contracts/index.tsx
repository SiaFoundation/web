import {
  DataTable,
  StateError,
  StateNoneMatching,
  StateNoneYet,
  StateNoneOnPage,
  useDataTable,
} from '@siafoundation/design-system'
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
import { ContractsFilterMenu } from './ContractsFilterMenu'

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

  const dataset = useContracts()
  const table = useDataTable<ContractData>({
    dataset,
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
      table={
        <DataTable
          {...table}
          header={<ContractsFilterMenu />}
          noneOnPage={
            <StateNoneOnPage message="No contracts on this page, reset pagination to continue." />
          }
          noneYet={<StateNoneYet message="There are no contracts yet." />}
          noneMatchingFilters={
            <StateNoneMatching message="No contracts matching filters." />
          }
          error={
            <StateError message="Error loading contracts. Please try again later." />
          }
        />
      }
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
