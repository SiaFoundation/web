import {
  AlertsDialog as DSAlertsDialog,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
  ValueCopyable,
} from '@siafoundation/design-system'
import {
  AlertSeverity,
  useAlerts,
  useAlertsDismiss,
} from '@siafoundation/react-hostd'
import { humanTime } from '@siafoundation/sia-js'
import { useCallback } from 'react'

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

export function AlertsDialog({ open, onOpenChange }: Props) {
  const alerts = useAlerts()
  const dismiss = useAlertsDismiss()

  const dismissOne = useCallback(
    async (id: string) => {
      const response = await dismiss.post({
        payload: [id],
      })
      if (response.error) {
        triggerErrorToast('Error dismissing alert.')
      } else {
        triggerSuccessToast('Alert has been dismissed.')
      }
    },
    [dismiss]
  )

  const dismissMany = useCallback(
    async (ids: string[], filter?: AlertSeverity) => {
      if (!alerts.data) {
        return
      }
      const response = await dismiss.post({
        payload: ids,
      })
      if (response.error) {
        triggerErrorToast(
          filter
            ? `Error dismissing all ${filter} alerts.`
            : 'Error dismissing all alerts.'
        )
      } else {
        triggerSuccessToast(
          filter
            ? `All ${filter} alerts have been dismissed.`
            : 'All alerts have been dismissed.'
        )
      }
    },
    [dismiss, alerts]
  )

  return (
    <DSAlertsDialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
      }}
      alerts={alerts}
      dataFieldOrder={dataFieldOrder}
      dataFields={dataFields}
      dismissMany={dismissMany}
      dismissOne={dismissOne}
    />
  )
}

const dataFieldOrder = [
  'error',
  'contractID',
  'blockHeight',
  'resolution',
  'volume',
  'volumeID',
  'elapsed',
  'error',
  'checked',
  'missing',
  'corrupt',
  'total',
  'oldSectors',
  'currentSectors',
  'targetSectors',
  'migratedSectors',
  'migrated',
  'target',
  'force',
]

const dataFields: Record<
  string,
  { render: (props: { value: unknown }) => JSX.Element }
> = {
  error: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          error
        </Text>
        <Text color="contrast">{value}</Text>
      </div>
    ),
  },
  contractId: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          contract ID
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  blockHeight: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          block height
        </Text>
        <ValueCopyable value={String(value)} type="block" />
      </div>
    ),
  },
  resolution: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          resolution
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  volume: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          volume
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  volumeID: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          volume ID
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  elapsed: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          elapsed
        </Text>
        <Text color="contrast" ellipsis>
          {humanTime(Number(value))}
        </Text>
      </div>
    ),
  },
  checked: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          checked
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  missing: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          missing
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  corrupt: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          corrupt
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  total: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          total
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  oldSectors: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          old sectors
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  currentSectors: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          current sectors
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  targetSectors: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          target sectors
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  migratedSectors: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          migrated sectors
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  migrated: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          migrated
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  target: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          target
        </Text>
        <Text color="contrast" ellipsis>
          {value.toLocaleString()}
        </Text>
      </div>
    ),
  },
  force: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full gap-2">
        <Text color="subtle" ellipsis>
          force
        </Text>
        <Text color="contrast" ellipsis>
          {value ? 'true' : 'false'}
        </Text>
      </div>
    ),
  },
}
