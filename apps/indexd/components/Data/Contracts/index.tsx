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
import { ContractData, ContractFilters, ContractSorts } from './types'
import { useContracts } from './useContracts'
import { Layout } from '../Layout'
import { useContractsParams } from './useContractsParams'
import { ContractsFilterMenu } from './ContractsFilterMenu'
import { SortControl } from '../SortControl'

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
  const table = useDataTable<ContractData, ContractFilters, ContractSorts>({
    dataset,
    columns: contractsColumns,
    columnFilters,
    columnSorts,
    setColumnFilters,
    setColumnSorts,
    enableMultiSort: true,
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
          actions={
            <SortControl table={table.table} columns={contractsColumns} />
          }
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
