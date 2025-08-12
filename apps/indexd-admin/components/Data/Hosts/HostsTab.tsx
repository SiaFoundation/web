import { DataTable, useDataTable } from '@siafoundation/design-system'
import { SidePanelHost } from './SidePanelHost'
import { SidePanelHostList } from './SidePanelHostList'
import { HostData } from './types'
import { useCallback } from 'react'
import { columns } from './hostsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useHosts } from './useHosts'
import { Layout } from '../Layout'
import { useHostsParams } from './useHostsParams'
import { OnChangeFn, SortingState } from '@tanstack/react-table'
import { ColumnFiltersState } from '@tanstack/react-table'

export function HostsTab() {
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
    panelId,
    setPanelId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
    offset,
    limit,
    setOffset,
    setLimit,
  } = useHostsParams()

  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const hosts = useHosts()
  const table = useDataTable<HostData>({
    data: hosts,
    columns,
    columnFilters,
    columnSorts,
    setColumnSorts: setColumnSorts as OnChangeFn<SortingState>,
    setColumnFilters: setColumnFilters as OnChangeFn<ColumnFiltersState>,
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
      panel={panelId ? <SidePanelHost /> : <SidePanelHostList table={table} />}
    />
  )
}
