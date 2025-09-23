import {
  Badge,
  Button,
  RemoteDataStates,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
  useRemoteData,
  ValueCopyable,
} from '@siafoundation/design-system'
import { SidePanel } from '../SidePanel'
import { Checkmark16 } from '@siafoundation/react-icons'
import { useAlertsParams } from './useAlertsParams'
import { SidePanelSection } from '../SidePanelSection'
import { InfoRow } from '../PanelInfoRow'
import {
  useAdminAlert,
  useAdminAlertsDismiss,
} from '@siafoundation/indexd-react'
import { getAlertTypeLabel } from './utils'
import { SidePanelHeadingCopyable } from '../SidePanelHeadingCopyable'
import { transformAlert } from './transform'
import { SidePanelSkeleton } from '../SidePanelSkeleton'

export function SidePanelAccount() {
  const { panelId, setPanelId } = useAlertsParams()
  const dismissAlert = useAdminAlertsDismiss()
  const alert = useAdminAlert({
    disabled: !panelId,
    params: {
      id: panelId!,
    },
  })
  const data = useRemoteData(
    {
      alert,
    },
    ({ alert }) => transformAlert(alert),
  )
  return (
    <RemoteDataStates
      data={data}
      loading={
        <SidePanelSkeleton withActions onClose={() => setPanelId(undefined)} />
      }
      notFound={
        <SidePanel heading={null}>
          <div className="flex justify-center pt-[50px]">
            <Text color="subtle">Alert not found</Text>
          </div>
        </SidePanel>
      }
      loaded={(alert) => (
        <SidePanel
          onClose={() => setPanelId(undefined)}
          heading={
            <SidePanelHeadingCopyable
              heading={
                <Text size="18" weight="medium" ellipsis>
                  {getAlertTypeLabel(alert)}
                </Text>
              }
              value={alert.id}
              label="alert"
            />
          }
          actions={
            <Button
              onClick={async () => {
                try {
                  await dismissAlert.post({ payload: [alert.id] })
                  setPanelId(undefined)
                  triggerSuccessToast({
                    title: 'Alert dismissed',
                  })
                } catch (error) {
                  console.error(error)
                  triggerErrorToast({
                    title: 'Failed to dismiss alert',
                  })
                }
              }}
              variant="red"
            >
              <Checkmark16 />
              Dismiss alert
            </Button>
          }
        >
          <SidePanelSection heading="Info">
            <div className="flex flex-col gap-2">
              <InfoRow
                label="Type"
                value={<Badge>{getAlertTypeLabel(alert)}</Badge>}
              />
              <InfoRow label="Severity" value={alert.severity} />
              <InfoRow label="Message" value={alert.message} />
              <InfoRow
                label="Timestamp"
                value={alert.displayFields.timestamp}
              />
              {alert.data && alert.data.type === 'unknown' && (
                <div className="flex flex-col gap-2">
                  <InfoRow label="Data" value={JSON.stringify(alert.data)} />
                </div>
              )}
              {alert.data && alert.data.type === 'lostSectors' && (
                <InfoRow
                  variant="column"
                  label="Hint"
                  value={alert.data.hint}
                />
              )}
            </div>
          </SidePanelSection>
          {alert.data && alert.data.type === 'lostSectors' && (
            <SidePanelSection heading="Host keys">
              <div className="flex flex-col gap-2">
                {alert.data.hostKeys.map((hk) => (
                  <InfoRow
                    key={hk}
                    label="Host Key"
                    value={<ValueCopyable value={hk} type="hostPublicKey" />}
                  />
                ))}
              </div>
            </SidePanelSection>
          )}
        </SidePanel>
      )}
    />
  )
}
