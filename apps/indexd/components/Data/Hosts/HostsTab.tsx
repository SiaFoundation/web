import { Drawer } from '../Drawer'
import { HostDetailsDrawer } from './HostDetailsDrawer'
import { HostListDrawer } from './HostListDrawer'
import { useDataTable } from '../useDataTable'
import { useTableParams } from '../useTableParams'
import { mock } from '../mockData'
import { useCallback } from 'react'
import { DataTable } from '../DataTable'
import { Host } from '../mockData'
import { columns } from './hostsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

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
  const { selectedId, setSelectedId, columnFilters, setColumnFilters } =
    useTableParams('hostList')
  const { offset, limit, setOffset, setLimit } = useTableParams('hostList')

  const onRowClick = useCallback(
    (id: string) => {
      setSelectedId(id)
    },
    [setSelectedId]
  )

  const table = useDataTable<Host>({
    data: mock.hosts,
    columns,
    columnFilters,
    setColumnFilters,
    offset,
    limit,
    onRowClick,
    setOffset,
    setLimit,
    entityLabel: 'hosts',
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
              <HostDetailsDrawer />
            </Drawer>
          ) : (
            <Drawer
              showCloseButton={false}
              onClose={() => setSelectedId(undefined)}
            >
              <HostListDrawer hosts={table.rows} />
            </Drawer>
          )}
        </div>
      </div>
    </div>
  )
}
