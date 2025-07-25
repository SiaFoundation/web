import { mock, type Contract } from '../mockData'
import { DataTable } from '../DataTable'
import * as React from 'react'
import { useCallback } from 'react'
import { useTableParams } from '../useTableParams'
import { useDataTable } from '../useDataTable'
import { Drawer } from '../Drawer'
import { ContractDetailsDrawer } from './ContractDetailsDrawer'
import { ContractListDrawer } from './ContractListDrawer'
import { contractsColumns } from './contractsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  } = useTableParams('contractList')
  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId]
  )

  const table = useDataTable<Contract>({
    data: mock.contracts,
    columns: contractsColumns,
    columnFilters,
    setColumnFilters,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
    entityLabel: 'contracts',
  })

  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="flex flex-row flex-1 overflow-hidden w-full">
        <div className="flex-1 h-full overflow-hidden p-4">
          <DataTable
            {...table}
            viewSelect={<DataViewSelect value={view} onValueChange={setView} />}
          />
        </div>
        <div className="py-4 pr-4">
          {selectedId ? (
            <Drawer showCloseButton onClose={() => setSelectedId(undefined)}>
              <ContractDetailsDrawer />
            </Drawer>
          ) : (
            <Drawer
              showCloseButton={false}
              onClose={() => setSelectedId(undefined)}
            >
              <ContractListDrawer />
            </Drawer>
          )}
        </div>
      </div>
    </div>
  )
}
