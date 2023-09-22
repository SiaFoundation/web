import { Button } from '../../core/Button'
import { Dialog } from '../../core/Dialog'
import { Heading } from '../../core/Heading'
import { Checkmark16 } from '../../icons/carbon'
import { Skeleton } from '../../core/Skeleton'
import { Text } from '../../core/Text'
import { useDatasetEmptyState } from '../../hooks/useDatasetEmptyState'
import { humanDate } from '@siafoundation/sia-js'
import { cx } from 'class-variance-authority'
import { times } from 'lodash'
import { useCallback, useMemo, useState } from 'react'
import { StateEmpty } from './StateEmpty'
import { SWRResponse } from 'swr'

type AlertSeverity = 'info' | 'warning' | 'error' | 'critical'
type Alert = {
  id: string
  severity: AlertSeverity
  message: string
  timestamp: string
  data: Record<string, unknown>
}

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
  alerts: SWRResponse<Alert[]>
  dismissOne: (id: string) => void
  dismissMany: (ids: string[], filter?: AlertSeverity) => void
  dataFieldOrder: string[]
  dataFields?: Record<
    string,
    { render: (props: { label: string; value: unknown }) => JSX.Element }
  >
}

const stubFilters: unknown[] = []

export function AlertsDialog({
  open,
  onOpenChange,
  dismissOne,
  dismissMany,
  alerts,
  dataFieldOrder,
  dataFields,
}: Props) {
  const loadingState = useDatasetEmptyState(
    alerts.data,
    alerts.isValidating,
    alerts.error,
    stubFilters
  )

  const [filter, setFilter] = useState<AlertSeverity>()
  const dataset = useMemo(
    () =>
      alerts.data?.filter((a) => (filter ? a.severity === filter : true)) || [],
    [alerts.data, filter]
  )

  // Sort keys by dataFieldOrder, then alphabetically
  const getOrderedKeys = useCallback(
    (obj: Record<string, unknown>) => {
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
      return orderedKeys
    },
    [dataFieldOrder]
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(val) => {
        onOpenChange(val)
      }}
      contentVariants={{
        className: 'w-[500px] h-[80vh]',
      }}
      title={
        <div className="flex flex-col gap-2">
          <Heading size="20">
            Alerts {alerts.data ? `(${alerts.data.length})` : ''}
          </Heading>
          <div className="flex gap-1">
            <Button
              variant={filter === 'info' ? 'accent' : 'gray'}
              onClick={() =>
                filter === 'info' ? setFilter(undefined) : setFilter('info')
              }
            >
              info
            </Button>
            <Button
              variant={filter === 'warning' ? 'accent' : 'gray'}
              onClick={() =>
                filter === 'warning'
                  ? setFilter(undefined)
                  : setFilter('warning')
              }
            >
              warning
            </Button>
            <Button
              variant={filter === 'error' ? 'accent' : 'gray'}
              onClick={() =>
                filter === 'error' ? setFilter(undefined) : setFilter('error')
              }
            >
              error
            </Button>
            <Button
              variant={filter === 'critical' ? 'accent' : 'gray'}
              onClick={() =>
                filter === 'critical'
                  ? setFilter(undefined)
                  : setFilter('critical')
              }
            >
              critical
            </Button>
            <div className="flex-1" />
            {!loadingState && !!dataset.length && (
              <Button
                tip={filter ? `dismiss ${dataset.length}` : 'dismiss all'}
                onClick={() =>
                  dismissMany(
                    dataset.map((a) => a.id),
                    filter
                  )
                }
              >
                <Checkmark16 />
                {dataset.length > 0 ? ` ${dataset.length}` : ''}
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
        {loadingState === 'noneYet' && <StateEmpty filtered={false} />}
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
            {dataset.length ? (
              dataset.map((a) => (
                <div
                  key={a.id}
                  className={cx(
                    'flex flex-col gap-1 w-full p-4',
                    'border-t border-gray-200 dark:border-graydark-300',
                    'first:border-none'
                  )}
                >
                  <div className="flex justify-between gap-1 w-full">
                    <div className="flex-1 overflow-hidden">
                      <Text weight="medium" className="w-full">
                        {a.severity}: {a.message}
                      </Text>
                    </div>
                    <Button
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
                  {getOrderedKeys(a.data).map((key) => {
                    const value = a.data[key]
                    if (
                      value === undefined ||
                      value === null ||
                      (typeof value === 'object' && !Object.keys(value).length)
                    ) {
                      return null
                    }
                    const Component =
                      dataFields?.[key]?.render || DefaultDisplay
                    return <Component key={key} label={key} value={value} />
                  })}
                </div>
              ))
            ) : (
              <StateEmpty filtered={!!filter} />
            )}
          </div>
        )}
      </div>
    </Dialog>
  )
}

function DefaultDisplay({ label, value }: { label: string; value: unknown }) {
  return (
    <div className="flex justify-between w-full gap-2">
      <Text color="subtle">{label}</Text>
      <Text color="contrast" ellipsis>
        {String(value)}
      </Text>
    </div>
  )
}

function EntityListSkeleton() {
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

function itemBorderStyles() {
  return cx(
    'border-t border-gray-200 dark:border-graydark-300',
    'first:border-none'
  )
}
