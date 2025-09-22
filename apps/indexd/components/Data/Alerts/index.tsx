import {
  DataTable,
  StateNoneMatching,
  StateError,
  StateNoneYet,
  useDataTable,
  StateNoneOnPage,
} from '@siafoundation/design-system'
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
    dataset: alerts,
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
          noneOnPage={
            <StateNoneOnPage message="No alerts on this page, reset pagination to continue." />
          }
          noneYet={<StateNoneYet message="There are currently no alerts." />}
          noneMatchingFilters={
            <StateNoneMatching message="No alerts matching filters." />
          }
          error={
            <StateError message="Error loading alerts. Please try again later." />
          }
        />
      }
      panel={
        panelId ? <SidePanelAccount /> : <SidePanelAlertList table={table} />
      }
    />
  )
}
