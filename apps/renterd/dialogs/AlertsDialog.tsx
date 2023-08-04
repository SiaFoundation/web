import {
  Dialog,
  Heading,
  Skeleton,
  Text,
  useDatasetEmptyState,
  ValueCopyable,
  ValueMenu,
} from '@siafoundation/design-system'
import { useAlerts, useHost } from '@siafoundation/react-renterd'
import { humanDate } from '@siafoundation/sia-js'
import { cx } from 'class-variance-authority'
import { times } from 'lodash'
import { useMemo } from 'react'
import { ContractContextMenuFromId } from '../components/Contracts/ContractContextMenuFromId'
import { HostContextMenu } from '../components/Hosts/HostContextMenu'

type Props = {
  open: boolean
  onOpenChange: (val: boolean) => void
}

const filters = []

export function AlertsDialog({ open, onOpenChange }: Props) {
  const alerts = useAlerts()

  const loadingState = useDatasetEmptyState(
    alerts.data,
    alerts.isValidating,
    alerts.error,
    filters
  )

  const dataFields = useMemo(
    () => ({
      hostKey: {
        label: 'host key',
        render: function HostField({ value }: { value: string }) {
          const host = useHost({ params: { hostKey: value } })
          if (!host.data) {
            return null
          }
          return (
            <div className="flex gap-1 items-center">
              <ValueMenu
                value={value}
                menu={
                  <HostContextMenu
                    publicKey={host.data.publicKey}
                    address={host.data.netAddress}
                    contentProps={{
                      align: 'end',
                    }}
                    buttonProps={{
                      size: 'none',
                    }}
                  />
                }
              />
            </div>
          )
        },
      },
      contractID: {
        label: 'contract ID',
        render: function ContractField({ value }: { value: string }) {
          return (
            <div className="flex gap-1 items-center">
              <ValueMenu
                value={value}
                menu={
                  <ContractContextMenuFromId
                    id={value}
                    contentProps={{
                      align: 'end',
                    }}
                    buttonProps={{
                      size: 'none',
                    }}
                  />
                }
              />
            </div>
          )
        },
      },
      account: {
        label: 'account',
        render: ({ value }: { value: string }) => (
          <ValueCopyable value={value} />
        ),
      },
    }),
    []
  )

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
                  if (value === undefined) {
                    return null
                  }
                  const label = dataFields[key]?.label || key
                  const Component = dataFields[key]?.render || DefaultDisplay
                  return (
                    <div key={key} className="flex justify-between w-full">
                      <Text color="subtle" ellipsis>
                        {label}
                      </Text>
                      <Component value={value} />
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

function DefaultDisplay({ value }) {
  return <Text color="contrast">{value}</Text>
}

const dataFieldOrder = ['hostKey', 'contractID', 'account']

// Sort keys by dataFieldOrder, then alphabetically
function getOrderedKeys(obj) {
  return Object.keys(obj).sort((a, b) => {
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
