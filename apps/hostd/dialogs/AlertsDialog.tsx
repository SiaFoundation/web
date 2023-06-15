import {
  Button,
  Checkmark16,
  Dialog,
  Heading,
  Skeleton,
  Text,
  triggerErrorToast,
  triggerSuccessToast,
  useDatasetEmptyState,
  ValueCopyable,
} from '@siafoundation/design-system'
import { useAlerts, useAlertsDismiss } from '@siafoundation/react-hostd'
import { humanDate, humanTime } from '@siafoundation/sia-js'
import { cx } from 'class-variance-authority'
import { times } from 'lodash'
import { useCallback } from 'react'

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

const filters = []

export function AlertsDialog({ open, onOpenChange }: Props) {
  const alerts = useAlerts()
  const dismiss = useAlertsDismiss()

  const loadingState = useDatasetEmptyState(
    alerts.data,
    alerts.isValidating,
    alerts.error,
    filters
  )

  const dismissOne = useCallback(
    async (id: string) => {
      const response = await dismiss.post({
        payload: {
          alertIDs: [id],
        },
      })
      if (response.error) {
        triggerErrorToast('Error dismissing alert.')
      } else {
        triggerSuccessToast('Alert has been dismissed.')
      }
    },
    [dismiss]
  )

  const dismissAll = useCallback(async () => {
    if (!alerts.data) {
      return
    }
    const response = await dismiss.post({
      payload: {
        alertIDs: alerts.data.map((a) => a.id),
      },
    })
    if (response.error) {
      triggerErrorToast('Error dismissing all alerts.')
    } else {
      triggerSuccessToast('All alerts have been dismissed.')
    }
  }, [dismiss, alerts])

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
      }}
      contentVariants={{
        className: 'w-[500px]',
      }}
      title={
        <div className="flex flex-col gap-2">
          <Heading size="20">
            Alerts {alerts.data ? `(${alerts.data.length})` : ''}
          </Heading>
          <div className="flex justify-end gap-2">
            {!loadingState && (
              <Button onClick={dismissAll}>
                <Checkmark16 />
                Dismiss all
              </Button>
            )}
          </div>
        </div>
      }
    >
      <div
        className={cx(
          'flex flex-col overflow-hidden -m-4',
          'border-t border-gray-200 dark:border-graydark-300'
        )}
      >
        {loadingState === 'noneYet' && (
          <div
            className={cx(
              'flex items-center justify-center h-[100px]',
              itemBorderStyles()
            )}
          >
            <Text size="18" color="subtle">
              There are currently no alerts.
            </Text>
          </div>
        )}
        {loadingState === 'error' && (
          <div
            className={cx(
              'flex items-center justify-center h-[100px]',
              itemBorderStyles()
            )}
          >
            <Text size="18" color="subtle">
              {alerts.error.message}
            </Text>
          </div>
        )}
        {loadingState === 'loading' && <EntityListSkeleton />}
        {!loadingState && (
          <div className="flex flex-col">
            {alerts.data.map((a) => (
              <div
                key={a.id}
                className={cx(
                  'flex flex-col gap-1 w-full p-4',
                  'border-t border-gray-200 dark:border-graydark-300',
                  'first:border-none'
                )}
              >
                <div className="flex justify-between w-full">
                  <Text weight="medium">
                    {a.severity}: {a.message}
                  </Text>
                  <Button
                    icon="hover"
                    variant="ghost"
                    tip="Dismiss alert"
                    onClick={() => dismissOne(a.id)}
                  >
                    <Checkmark16 />
                  </Button>
                </div>
                <div className="flex justify-between w-full">
                  <Text color="subtle" ellipsis>
                    timestamp
                  </Text>
                  <Text color="contrast" ellipsis>
                    {humanDate(a.timestamp, { timeStyle: 'medium' })}
                  </Text>
                </div>
                {dataFieldOrder
                  .map((key) => [key, a.data[key]])
                  .map(([key, value]) => {
                    if (value === undefined) {
                      return null
                    }
                    const label = dataFields[key]?.label || key
                    const el = dataFields[key]?.render(value) || (
                      <Text color="contrast">{value}</Text>
                    )
                    return (
                      <div key={key} className="flex justify-between w-full">
                        <Text color="subtle" ellipsis>
                          {label}
                        </Text>
                        {el}
                      </div>
                    )
                  })}
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}

const dataFieldOrder = [
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

const dataFields = {
  contractID: {
    label: 'contract ID',
    render: (value: number) => <ValueCopyable value={String(value)} />,
  },
  blockHeight: {
    label: 'block height',
    render: (value: number) => (
      <ValueCopyable value={String(value)} type="block" />
    ),
  },
  resolution: {
    label: 'resolution',
    render: (value: string) => <ValueCopyable value={value} />,
  },
  volume: {
    label: 'volume',
    render: (value: string) => <ValueCopyable value={value} />,
  },
  volumeID: {
    label: 'volume ID',
    render: (value: number) => <ValueCopyable value={String(value)} />,
  },
  elapsed: {
    label: 'elapsed',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {humanTime(value)}
      </Text>
    ),
  },
  error: {
    label: 'error',
    render: (value: string) => (
      <Text color="contrast" ellipsis>
        {value}
      </Text>
    ),
  },
  checked: {
    label: 'checked',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  missing: {
    label: 'missing',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  corrupt: {
    label: 'corrupt',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  total: {
    label: 'total',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  oldSectors: {
    label: 'old sectors',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  currentSectors: {
    label: 'current sectors',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  targetSectors: {
    label: 'target sectors',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  migratedSectors: {
    label: 'migrated sectors',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  migrated: {
    label: 'migrated',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },
  target: {
    label: 'target',
    render: (value: number) => (
      <Text color="contrast" ellipsis>
        {value.toLocaleString()}
      </Text>
    ),
  },

  force: {
    label: 'force',
    render: (value: boolean) => (
      <Text color="contrast" ellipsis>
        {value ? 'true' : 'false'}
      </Text>
    ),
  },
}

export function EntityListSkeleton() {
  return (
    <>
      {times(10, (i) => (
        <div
          key={i}
          className={cx('relative flex gap-4 p-3.5', itemBorderStyles())}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-between gap-2 w-full">
              <Skeleton className="w-[160px] h-[20px]" />
              <Skeleton className="w-[160px] h-[20px]" />
            </div>
            <Skeleton className="w-[100px] h-[20px]" />
            <Skeleton className="w-full h-[120px]" />
          </div>
        </div>
      ))}
    </>
  )
}

export function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}
