import {
  Text,
  TableColumn,
  ValueCopyable,
  ValueNum,
  CheckmarkFilled16,
  Misuse16,
  Tooltip,
  LoadingDots,
} from '@siafoundation/design-system'
import { humanNumber } from '@siafoundation/sia-js'
import { useMemo } from 'react'
import { HostData, TableColumnId, columnsMeta } from './types'
import { format, formatDistance, formatRelative } from 'date-fns'
import { HostDropdownMenu } from '../../components/Hosts/HostDropdownMenu'
import {
  RhpScanRequest,
  useWorkflows,
  workerRhpScanRoute,
} from '@siafoundation/react-core'

export function useColumns({
  isAllowlistActive,
}: {
  isAllowlistActive: boolean
}) {
  return useMemo(() => {
    const columns: TableColumn<TableColumnId, HostData>[] = [
      {
        id: 'actions',
        label: columnsMeta.actions.label,
        cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
        render: (host) => (
          <HostDropdownMenu
            address={host.netAddress}
            publicKey={host.publicKey}
          />
        ),
      },
      {
        id: 'allow',
        label: columnsMeta.allow.label,
        contentClassName: 'justify-center',
        render: (host) => (
          <Tooltip
            side="right"
            content={
              (isAllowlistActive
                ? `Allowlist ${
                    host.isOnAllowlist
                      ? 'allows this host.'
                      : 'does not allow this host.'
                  }`
                : `Allowlist is inactive.`) +
              ` Blocklist ${
                host.isOnBlocklist
                  ? 'blocks this host.'
                  : 'does not block this host.'
              }`
            }
          >
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text color={host.isBlocked ? 'red' : 'green'}>
                  {host.isBlocked ? <Misuse16 /> : <CheckmarkFilled16 />}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text
                  size="10"
                  color={host.isOnBlocklist ? 'red' : 'verySubtle'}
                  noWrap
                >
                  Blocklist
                </Text>
                <Text
                  size="10"
                  color={
                    isAllowlistActive
                      ? host.isOnAllowlist
                        ? 'green'
                        : 'red'
                      : 'verySubtle'
                  }
                  noWrap
                >
                  Allowlist
                </Text>
              </div>
            </div>
          </Tooltip>
        ),
      },
      {
        id: 'usable',
        label: columnsMeta.usable.label,
        render: (host) => (
          <Tooltip
            side="right"
            content={host.usable ? 'Host is usable' : 'Host is not usable'}
          >
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text color={host.usable ? 'green' : 'red'}>
                  {host.usable ? <CheckmarkFilled16 /> : <Misuse16 />}
                </Text>
              </div>
              <div className="flex flex-col">
                {host.unusableReasons.map((reason) => (
                  <Text key={reason} size="10" noWrap>
                    {reason}
                  </Text>
                ))}
              </div>
            </div>
          </Tooltip>
        ),
      },
      {
        id: 'lastScan',
        label: columnsMeta.lastScan.label,
        render: function LastScan(host) {
          const { workflows } = useWorkflows()
          const isPending = workflows.find(
            (wf: { path?: string; payload?: RhpScanRequest }) =>
              wf.path.startsWith(workerRhpScanRoute) &&
              wf.payload?.hostKey === host.publicKey
          )
          if (isPending) {
            return <LoadingDots />
          }
          return (
            <Tooltip
              side="right"
              content={`${
                host.lastScanSuccess ? 'succeeded' : 'failed'
              } ${formatDistance(new Date(host.lastScan), new Date(), {
                addSuffix: true,
              })}`}
            >
              <div className="flex gap-2 items-center">
                <div className="mt-[5px]">
                  <Text color={host.lastScanSuccess ? 'green' : 'red'}>
                    {host.lastScanSuccess ? (
                      <CheckmarkFilled16 />
                    ) : (
                      <Misuse16 />
                    )}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text size="12" noWrap>
                    {formatDistance(new Date(host.lastScan), new Date(), {
                      addSuffix: true,
                    })}
                  </Text>
                  <Text color="subtle" size="10" noWrap>
                    {format(new Date(host.lastScan), 'Pp')}
                  </Text>
                </div>
              </div>
            </Tooltip>
          )
        },
      },
      {
        id: 'netAddress',
        label: columnsMeta.netAddress.label,
        render: (host) => (
          <ValueCopyable
            value={host.netAddress}
            type="ip"
            size="12"
            label="host address"
          />
        ),
      },
      {
        id: 'publicKey',
        label: columnsMeta.publicKey.label,
        render: (host) => (
          <ValueCopyable
            value={host.publicKey}
            size="12"
            label="host public key"
          />
        ),
      },
      {
        id: 'knownSince',
        label: columnsMeta.knownSince.label,
        render: (host) => {
          return (
            <div className="flex flex-col">
              <Text size="12" noWrap>
                {formatDistance(new Date(), new Date(host.knownSince))} old
              </Text>
              <Text color="subtle" size="10" noWrap>
                {formatRelative(new Date(host.knownSince), new Date())}
              </Text>
            </div>
          )
        },
      },
      {
        id: 'totalScans',
        label: columnsMeta.totalScans.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.totalScans}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        id: 'uptime',
        label: columnsMeta.uptime.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => {
          return (
            <ValueNum
              size="12"
              value={host.uptime.div(1e9).div(60).div(60).div(24)}
              variant="value"
              format={(v) =>
                humanNumber(v, { fixed: v.isZero() ? 0 : 2, units: 'days' })
              }
            />
          )
        },
      },
      {
        id: 'downtime',
        label: columnsMeta.downtime.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => {
          return (
            <ValueNum
              size="12"
              value={host.downtime.div(1e9).div(60).div(60).div(24)}
              variant="value"
              format={(v) =>
                humanNumber(v, { fixed: v.isZero() ? 0 : 2, units: 'days' })
              }
            />
          )
        },
      },
      {
        id: 'totalInteractions',
        label: columnsMeta.totalInteractions.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => {
          return (
            <ValueNum
              size="12"
              value={host.totalInteractions}
              variant="value"
              format={(v) => humanNumber(v)}
            />
          )
        },
      },
      {
        id: 'successfulInteractions',
        label: columnsMeta.successfulInteractions.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.successfulInteractions}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        id: 'failedInteractions',
        label: columnsMeta.failedInteractions.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.failedInteractions}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        id: 'activeContracts',
        label: columnsMeta.activeContracts.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.activeContracts}
            variant="value"
            format={(v) => humanNumber(v.toNumber())}
          />
        ),
      },
      {
        id: 'scoreOverall',
        label: columnsMeta.scoreOverall.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.score}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scoreAge',
        label: columnsMeta.scoreAge.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.age}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scoreCollateral',
        label: columnsMeta.scoreCollateral.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.collateral}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scoreInteractions',
        label: columnsMeta.scoreInteractions.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.interactions}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scorePrices',
        label: columnsMeta.scorePrices.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.prices}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scoreStorageRemaining',
        label: columnsMeta.scoreStorageRemaining.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.storageRemaining}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scoreUptime',
        label: columnsMeta.scoreUptime.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.uptime}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
      {
        id: 'scoreVersion',
        label: columnsMeta.scoreVersion.label,
        contentClassName: 'w-[120px] justify-end',
        render: (host) => (
          <ValueNum
            size="12"
            value={host.scoreBreakdown.version}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        ),
      },
    ]
    return columns
  }, [isAllowlistActive])
}
