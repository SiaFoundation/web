import { DataTable, useDataTable } from '@siafoundation/design-system'
import { useCallback } from 'react'
import { alertsColumns } from './alertsColumns'
import { SidePanelAlertList } from './SidePanelAlertList'
import { SidePanelAccount } from './SidePanelAlert'
import { AlertData } from './types'
import { useAlerts } from './useAlerts'
import { Layout } from '../Layout'
import { useAlertsParams } from './useAlertsParams'

export function Alerts() {
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
      table={<DataTable {...table} />}
      panel={
        panelId ? <SidePanelAccount /> : <SidePanelAlertList table={table} />
      }
    />
  )
}
