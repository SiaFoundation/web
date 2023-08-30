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
import { difference, times } from 'lodash'
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

  const dismissAll = useCallback(async () => {
    if (!alerts.data) {
      return
    }
    const response = await dismiss.post({
      payload: alerts.data.map((a) => a.id),
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
                {!!a.data.error && (
                  <Text color="contrast" className="mb-1">
                    {a.data.error}
                  </Text>
                )}
                <div className="flex justify-between w-full">
                  <Text color="subtle" ellipsis>
                    timestamp
                  </Text>
                  <Text color="contrast" ellipsis>
                    {humanDate(a.timestamp, { timeStyle: 'medium' })}
                  </Text>
                </div>
                {getOrderedKeys(a.data, skipFields).map((key) => {
                  const value = a.data[key]
                  if (
                    value === undefined ||
                    value === null ||
                    (typeof value === 'object' && !Object.keys(value).length)
                  ) {
                    return null
                  }
                  const label = dataFields[key]?.label || key
                  const Component = dataFields[key]?.render || DefaultDisplay
                  return <Component key={key} label={label} value={value} />
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </Dialog>
  )
}

function DefaultDisplay({ label, value }) {
  return (
    <div className="flex gap-3 justify-between w-full">
      <Text color="subtle">{label}</Text>
      <Text color="contrast" ellipsis>
        {String(value)}
      </Text>
    </div>
  )
}

const skipFields = ['error']

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

// Sort keys by dataFieldOrder, then alphabetically
function getOrderedKeys(obj, skip: string[] = []) {
  const orderedKeys = Object.keys(obj).sort((a, b) => {
    const aIndex = dataFieldOrder.indexOf(a)
    const bIndex = dataFieldOrder.indexOf(b)
    if (aIndex === -1 && bIndex === -1) {
      return 0
    }
    if (aIndex === -1) {
      return 1
    }
    if (bIndex === -1) {
      return -1
    }
    return aIndex - bIndex
  })
  return difference(orderedKeys, skip)
}

const dataFields = {
  contractId: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full">
        <Text color="subtle" ellipsis>
          contract ID
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  blockHeight: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full">
        <Text color="subtle" ellipsis>
          block height
        </Text>
        <ValueCopyable value={String(value)} type="block" />
      </div>
    ),
  },
  resolution: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full">
        <Text color="subtle" ellipsis>
          resolution
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  volume: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full">
        <Text color="subtle" ellipsis>
          volume
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  volumeID: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full">
        <Text color="subtle" ellipsis>
          volume ID
        </Text>
        <ValueCopyable value={String(value)} />
      </div>
    ),
  },
  elapsed: {
    render: ({ value }: { value: string }) => (
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
      <div className="flex justify-between w-full">
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
