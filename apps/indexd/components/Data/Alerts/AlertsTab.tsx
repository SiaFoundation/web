import { DataTable, useDataTable } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { alertsColumns } from './alertsColumns'
import { DataViewSelect, type DataView } from '../Views'
import { SidePanelAlertList } from './SidePanelAlertList'
import { SidePanelAccount } from './SidePanelAlert'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AlertData } from './types'
import { useAlerts } from './useAlerts'
import { Layout } from '../Layout'
import { useAlertsParams } from './useAlertsParams'

export function AlertsTab() {
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
  } = useAlertsParams()
  const onRowClick = useCallback(
    (id: string) => {
      setPanelId(id)
    },
    [setPanelId],
  )

  const alerts = useAlerts()
  const table = useDataTable<AlertData>({
    data: alerts,
    columns: alertsColumns,
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
      panel={
        panelId ? <SidePanelAccount /> : <SidePanelAlertList table={table} />
      }
    />
  )
}
