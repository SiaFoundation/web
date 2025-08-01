import { SidePanel } from '../SidePanel'
import {
  DataTable,
  useDataTable,
  useDataTableParams,
} from '@siafoundation/design-system'
import { SidePanelHost } from './SidePanelHost'
import { SidePanelHostList } from './SidePanelHostList'
import { HostData } from './types'
import { useCallback } from 'react'
import { columns } from './hostsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useHosts } from './useHosts'

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
    selectedId,
    setSelectedId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useDataTableParams('hostList')
  const { offset, limit, setOffset, setLimit } = useDataTableParams('hostList')

  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId],
  )

  const hosts = useHosts()
  const table = useDataTable<HostData>({
    data: hosts,
    columns,
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
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div className="flex flex-row flex-1 overflow-hidden w-full">
        <div className="flex-1 h-full overflow-hidden p-4">
          <DataTable
            {...table}
            heading={<DataViewSelect value={view} onValueChange={setView} />}
          />
        </div>
        <div className="py-4 pr-4">
          {selectedId ? (
            <SidePanel showCloseButton onClose={() => setSelectedId(undefined)}>
              <SidePanelHost />
            </SidePanel>
          ) : (
            <SidePanel
              showCloseButton={false}
              onClose={() => setSelectedId(undefined)}
            >
              <SidePanelHostList hosts={table.rows} />
            </SidePanel>
          )}
        </div>
      </div>
    </div>
  )
}
