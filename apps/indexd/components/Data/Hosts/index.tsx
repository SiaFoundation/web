import { DataTable, useDataTable } from '@siafoundation/design-system'
import { SidePanelHost } from './SidePanelHost'
import { SidePanelHostList } from './SidePanelHostList'
import { HostData } from './types'
import { useCallback } from 'react'
import { columns } from './hostsColumns'
import { useHosts } from './useHosts'
import { Layout } from '../Layout'
import { useHostsParams } from './useHostsParams'
import { OnChangeFn, SortingState } from '@tanstack/react-table'
import { ColumnFiltersState } from '@tanstack/react-table'

export function Hosts() {
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
      table={<DataTable {...table} />}
      panel={panelId ? <SidePanelHost /> : <SidePanelHostList table={table} />}
    />
  )
}
