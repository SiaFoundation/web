import {
  DataTable,
  StateError,
  StateNoneMatching,
  StateNoneOnPage,
  StateNoneYet,
  useDataTable,
} from '@siafoundation/design-system'
import { SidePanelHost } from './SidePanelHost'
import { SidePanelHostList } from './SidePanelHostList'
import { HostData, HostFilters, HostSorts } from './types'
import { useCallback } from 'react'
import { columns } from './hostsColumns'
import { useHosts } from './useHosts'
import { Layout } from '../Layout'
import { useHostsParams } from './useHostsParams'
import { HostsFilterMenu } from './HostsFilterMenu'
import { SortControl } from '../SortControl'

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
  const table = useDataTable<HostData, HostFilters, HostSorts>({
    dataset: hosts,
    columns,
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
          localStorage="indexd/hosts"
          header={<HostsFilterMenu />}
          actions={<SortControl table={table.table} columns={columns} />}
          noneOnPage={
            <StateNoneOnPage message="No hosts on this page, reset pagination to continue." />
          }
          noneYet={
            <StateNoneYet message="There are no hosts in the database." />
          }
          noneMatchingFilters={
            <StateNoneMatching message="No hosts matching filters." />
          }
          error={
            <StateError message="Error loading hosts. Please try again later." />
          }
        />
      }
      panel={panelId ? <SidePanelHost /> : <SidePanelHostList table={table} />}
    />
  )
}
