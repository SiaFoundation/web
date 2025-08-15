import { DataTable, useDataTable } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { keysColumns } from './keysColumns'
import { DataViewSelect, type DataView } from '../Views'
import { SidePanelKeyList } from './SidePanelKeyList'
import { SidePanelKey } from './SidePanelKey'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { KeyData } from './types'
import { useKeys } from './useKeys'
import { Layout } from '../Layout'
import { useKeysParams } from './useKeysParams'

export function KeysTab() {
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
    panelId,
    setPanelId,
    columnFilters,
    setColumnFilters,
    columnSorts,
    setColumnSorts,
  } = useKeysParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const keys = useKeys()
  const table = useDataTable<KeyData>({
    data: keys,
    columns: keysColumns,
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
      panel={panelId ? <SidePanelKey /> : <SidePanelKeyList table={table} />}
    />
  )
}
