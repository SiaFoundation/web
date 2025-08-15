import {
  Text,
  Button,
  DataTableState,
  triggerSuccessToast,
  triggerErrorToast,
} from '@siafoundation/design-system'
import { AlertData } from './types'
import { SidePanel } from '../SidePanel'
import { useMemo } from 'react'
import { useAdminAlertsDismiss } from '@siafoundation/indexd-react'
import { Checkmark16 } from '@siafoundation/react-icons'

export function SidePanelAlertList({
  table,
}: {
  table: DataTableState<AlertData>
}) {
  const alerts = useMemo(() => {
    return table.isSelection ? table.selectedRows : table.rows
  }, [table.isSelection, table.selectedRows, table.rows])
  const dismissAlerts = useAdminAlertsDismiss()
  return (
    <SidePanel
      heading={
        <Text size="18" weight="medium">
          {table.isSelection
            ? `Selected alerts (${alerts.length})`
            : table.isFiltered
              ? `Filtered alerts (${alerts.length})`
              : 'All alerts'}
        </Text>
      }
      actions={
        table.isSelection ? (
          <Button
            onClick={async () => {
              try {
                await dismissAlerts.post({ payload: alerts.map((a) => a.id) })
                triggerSuccessToast({
                  title: 'Alerts dismissed',
                })
                table.setRowSelection({})
              } catch (error) {
                console.error(error)
                triggerErrorToast({
                  title: 'Failed to dismiss alerts',
                })
              }
            }}
          >
            <Checkmark16 />
            Dismiss alerts
          </Button>
        ) : null
      }
      customCloseAction={
        table.isSelection ? (
          <Button onClick={() => table.setRowSelection({})}>
            Clear selection
          </Button>
        ) : null
      }
    >
      <Text color="subtle" className="flex justify-center pt-[50px]">
        No information on alerts yet
      </Text>
    </SidePanel>
  )
}
