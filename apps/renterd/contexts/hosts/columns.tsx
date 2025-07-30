import {
  Text,
  TableColumn,
  ValueCopyable,
  ValueNum,
  Tooltip,
  LoadingDots,
  ValueScFiat,
  Checkbox,
  Badge,
} from '@siafoundation/design-system'
import {
  WarningSquareFilled16,
  Plane16,
  Settings16,
  UndefinedFilled16,
  CheckboxCheckedFilled16,
} from '@siafoundation/react-icons'
import {
  humanBytes,
  humanNumber,
  monthsToBlocks,
  sectorsToBytes,
  TBToBytes,
} from '@siafoundation/units'
import { HostContext, HostData, TableColumnId } from './types'
import { format, formatDistance, formatRelative } from 'date-fns'
import { HostContextMenu } from '../../components/Hosts/HostContextMenu'
import { useWorkflows } from '@siafoundation/react-core'
import {
  HostScanPayload,
  busHostHostKeyScanRoute,
} from '@siafoundation/renterd-types'
import { V2HostPrices, V2HostSettings } from '@siafoundation/types'
import { useHostsAllowlist } from '@siafoundation/renterd-react'
import BigNumber from 'bignumber.js'
import { memo } from 'react'

type HostsTableColumn = TableColumn<TableColumnId, HostData, HostContext> & {
  fixed?: boolean
  category: 'general' | 'autopilot' | 'settings'
}

export const columns: HostsTableColumn[] = (
  [
    // general
    {
      id: 'actions',
      label: '',
      fixed: true,
      category: 'general',
      contentClassName: '!pl-3 !pr-4',
      cellClassName: 'w-[20px] !pl-0 !pr-0',
      heading: ({ context: { multiSelect } }) => (
        <Checkbox
          onClick={multiSelect.onSelectPage}
          checked={multiSelect.isPageAllSelected}
        />
      ),
      render: ({ data }) => (
        <HostContextMenu address={data.address} publicKey={data.publicKey} />
      ),
    },
    {
      id: 'allow',
      label: 'allowed',
      category: 'general',
      contentClassName: 'justify-center',
      render: function AllowColumn({ data }) {
        const allowlist = useHostsAllowlist({
          config: {
            swr: {
              dedupingInterval: 5_000,
            },
          },
        })
        const isAllowlistActive = !!allowlist.data?.length
        return (
          <Tooltip
            side="right"
            content={
              (isAllowlistActive
                ? `Allowlist ${
                    data.isOnAllowlist
                      ? 'allows this host.'
                      : 'does not allow this host.'
                  }`
                : `Allowlist is inactive.`) +
              ` Blocklist ${
                data.isOnBlocklist
                  ? 'blocks this host.'
                  : 'does not block this host.'
              }`
            }
          >
            <div
              className="flex gap-2 items-center"
              data-testid={data.isBlocked ? 'blocked' : 'allowed'}
            >
              <div className="mt-[5px]">
                <Text color={data.isBlocked ? 'red' : 'green'}>
                  {data.isBlocked ? (
                    <WarningSquareFilled16 />
                  ) : (
                    <CheckboxCheckedFilled16 />
                  )}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text
                  size="10"
                  color={data.isOnBlocklist ? 'red' : 'verySubtle'}
                  noWrap
                >
                  Blocklist
                </Text>
                <Text
                  size="10"
                  color={
                    isAllowlistActive
                      ? data.isOnAllowlist
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
        )
      },
    },
    {
      id: 'version',
      label: 'version',
      category: 'general',
      contentClassName: 'justify-center',
      render: ({ data }) => {
        return <Badge size="small">{data.v2 ? 'v2' : 'v1'}</Badge>
      },
    },
    {
      id: 'ap_usable',
      label: 'usable',
      category: 'autopilot',
      render: ({ data }) => {
        return (
          <Tooltip
            side="right"
            content={data.isUsable ? 'Host is usable' : 'Host is not usable'}
          >
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text
                  aria-label={data.isUsable ? 'usable' : 'not usable'}
                  color={data.isUsable ? 'green' : 'red'}
                >
                  {data.isUsable ? (
                    <CheckboxCheckedFilled16 />
                  ) : (
                    <WarningSquareFilled16 />
                  )}
                </Text>
              </div>
              <div className="flex flex-col">
                {data.unusableReasons.map((reason) => (
                  <Text key={reason} size="10" noWrap>
                    {reason}
                  </Text>
                ))}
              </div>
            </div>
          </Tooltip>
        )
      },
    },
    {
      id: 'ap_gouging',
      label: 'gouging',
      category: 'autopilot',
      render: ({ data }) => {
        return (
          <Tooltip
            side="right"
            content={
              data.isGouging
                ? 'Host is price gouging'
                : 'Host is not price gouging'
            }
          >
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text color={!data.isGouging ? 'subtle' : 'red'}>
                  {!data.isGouging ? (
                    <UndefinedFilled16 />
                  ) : (
                    <WarningSquareFilled16 />
                  )}
                </Text>
              </div>
              <div className="flex flex-col">
                {Object.entries(data.gougingBreakdown)
                  .filter(([_, reason]) => reason && typeof reason === 'string')
                  .map(([key, reason]) => (
                    <Text key={key} size="10" noWrap>
                      {reason}
                    </Text>
                  ))}
              </div>
            </div>
          </Tooltip>
        )
      },
    },
    {
      id: 'lastScan',
      label: 'last scan',
      category: 'general',
      render: function LastScan({ data }) {
        const { workflows } = useWorkflows()
        const isPending = workflows.find((w) => {
          const rhpw = w as { route?: string; payload?: HostScanPayload }
          return rhpw.route?.startsWith(
            busHostHostKeyScanRoute.replace(':hostkey', data.publicKey),
          )
        })
        if (isPending) {
          return <LoadingDots />
        }
        const ago = formatDistance(new Date(data.lastScan || 0), new Date(), {
          addSuffix: true,
        })
        let message = ''
        let icon = null
        let color: React.ComponentProps<typeof Text>['color'] = 'subtle'
        if (!data.lastScan) {
          message = 'host has not been scanned'
          icon = <UndefinedFilled16 />
          color = 'subtle'
        }

        if (data.lastScan && !data.lastScanSuccess) {
          message = `host scan failed ${ago}`
          icon = <WarningSquareFilled16 />
          color = 'red'
        }
        if (data.lastScan && data.lastScanSuccess) {
          message = `host scan succeeded ${ago}`
          icon = <CheckboxCheckedFilled16 />
          color = 'green'
        }
        return (
          <Tooltip side="right" content={message}>
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text color={color}>{icon}</Text>
              </div>
              {data.lastScan && (
                <div className="flex flex-col">
                  <Text size="12" noWrap>
                    {ago}
                  </Text>
                  <Text color="subtle" size="10" noWrap>
                    {format(new Date(data.lastScan), 'Pp')}
                  </Text>
                </div>
              )}
            </div>
          </Tooltip>
        )
      },
    },
    {
      id: 'hasContract',
      label: 'active contract',
      category: 'general',
      contentClassName: 'w-[50px]',
      render: ({ data }) => {
        const hasContract = data.activeContractsCount.gt(0)
        return (
          <Tooltip
            side="right"
            content={
              hasContract
                ? 'Host has active contract'
                : 'Host does not have an active contract'
            }
          >
            <div className="mt-[5px]">
              <Text color={hasContract ? 'green' : 'subtle'}>
                {hasContract ? (
                  <CheckboxCheckedFilled16 />
                ) : (
                  <UndefinedFilled16 />
                )}
              </Text>
            </div>
          </Tooltip>
        )
      },
    },
    {
      id: 'address',
      label: 'address',
      category: 'general',
      render: ({ data, context }) => {
        if (!data.address) {
          return <Text color="subtle">-</Text>
        }
        return (
          <ValueCopyable
            value={data.address}
            size="12"
            type="hostIp"
            siascanUrl={context.siascanUrl}
          />
        )
      },
    },
    {
      id: 'publicKey',
      label: 'public key',
      category: 'general',
      render: ({ data, context }) => (
        <ValueCopyable
          value={data.publicKey}
          size="12"
          type="hostPublicKey"
          siascanUrl={context.siascanUrl}
        />
      ),
    },
    {
      id: 'lastAnnouncement',
      label: 'last announcement',
      category: 'general',
      render: ({ data }) => {
        if (!data.lastAnnouncement) {
          return null
        }
        return (
          <div className="flex flex-col">
            <Text size="12" noWrap>
              {formatDistance(new Date(), new Date(data.lastAnnouncement))} ago
            </Text>
            <Text color="subtle" size="10" noWrap>
              {formatRelative(new Date(data.lastAnnouncement), new Date())}
            </Text>
          </div>
        )
      },
    },
    {
      id: 'totalScans',
      label: 'total scans',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => (
        <ValueNum
          size="12"
          value={data.totalScans}
          variant="value"
          format={(v) => humanNumber(v.toNumber())}
        />
      ),
    },
    {
      id: 'uptime',
      label: 'uptime',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.uptime.div(1e9).div(60).div(60).div(24)}
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
      label: 'downtime',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.downtime.div(1e9).div(60).div(60).div(24)}
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
      label: 'total interactions',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.totalInteractions}
            variant="value"
            format={(v) => humanNumber(v)}
          />
        )
      },
    },
    {
      id: 'successfulInteractions',
      label: 'successful interactions',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => (
        <ValueNum
          size="12"
          value={data.successfulInteractions}
          variant="value"
          format={(v) => humanNumber(v.toNumber())}
        />
      ),
    },
    {
      id: 'failedInteractions',
      label: 'failed interactions',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => (
        <ValueNum
          size="12"
          value={data.failedInteractions}
          variant="value"
          format={(v) => humanNumber(v.toNumber())}
        />
      ),
    },
    {
      id: 'contractCount',
      label: 'contract count',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => (
        <ValueNum
          size="12"
          value={data.activeContractsCount}
          variant="value"
          format={(v) => humanNumber(v.toNumber())}
        />
      ),
    },
    {
      id: 'ap_scoreOverall',
      label: 'overall score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.score}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scoreAge',
      label: 'age score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.age}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scoreCollateral',
      label: 'collateral score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.collateral}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scoreInteractions',
      label: 'interactions score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.interactions}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scorePrices',
      label: 'prices score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.prices}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scoreStorageRemaining',
      label: 'storage remaining score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.storageRemaining}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scoreUptime',
      label: 'uptime score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.uptime}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    {
      id: 'ap_scoreVersion',
      label: 'version score',
      category: 'autopilot',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data }) => {
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.version}
            variant="value"
            format={(v) => v.toPrecision(2)}
          />
        )
      },
    },
    // v2 settings
    {
      id: 'settings_acceptingContracts',
      label: 'accepting contracts',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBool('acceptingContracts'),
    },
    {
      id: 'settings_remainingStorage',
      label: 'remaining storage',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: function RenderRemainingStorage({ data }) {
        return (
          <ValueNum
            size="12"
            value={sectorsToBytes(data.v2Settings.remainingStorage || 0)}
            variant="value"
            format={(v) => humanBytes(v.toNumber())}
          />
        )
      },
    },
    {
      id: 'settings_totalStorage',
      label: 'total storage',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: function RenderTotalStorage({ data }) {
        return (
          <ValueNum
            size="12"
            value={sectorsToBytes(data.v2Settings.totalStorage || 0)}
            variant="value"
            format={(v) => humanBytes(v.toNumber())}
          />
        )
      },
    },
    {
      id: 'settings_storagePrice',
      label: 'storage price (per TB per month)',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: function RenderStoragePrice({ data }) {
        return (
          <ValueScFiat
            displayBoth
            size="12"
            value={new BigNumber(data.v2Settings.prices.storagePrice || 0)
              .times(TBToBytes(1))
              .times(monthsToBlocks(1))}
            fixedFiat={4}
            variant="value"
          />
        )
      },
    },
    {
      id: 'settings_ingressPrice',
      label: 'ingress price (per TB)',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: function RenderIngressPrice({ data }) {
        return (
          <ValueScFiat
            displayBoth
            size="12"
            value={new BigNumber(
              data.v2Settings.prices.ingressPrice || 0,
            ).times(TBToBytes(1))}
            fixedFiat={4}
            variant="value"
          />
        )
      },
    },
    {
      id: 'settings_egressPrice',
      label: 'egress price (per TB)',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: function RenderEgressPrice({ data }) {
        return (
          <ValueScFiat
            displayBoth
            size="12"
            value={new BigNumber(data.v2Settings.prices.egressPrice || 0).times(
              TBToBytes(1),
            )}
            fixedFiat={4}
            variant="value"
          />
        )
      },
    },
    {
      id: 'settings_contractPrice',
      label: 'contract price',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderV2Price('contractPrice'),
    },
    {
      id: 'settings_collateral',
      label: 'collateral',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderV2Price('collateral'),
    },
    {
      id: 'settings_freeSectorPrice',
      label: 'free sector price',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderV2Price('freeSectorPrice'),
    },
    {
      id: 'settings_maxCollateral',
      label: 'max collateral',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('maxCollateral'),
    },
    {
      id: 'settings_maxContractDuration',
      label: 'max contract duration (blocks)',
      category: 'settings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('maxContractDuration'),
    },
  ] as HostsTableColumn[]
).map(
  (col): HostsTableColumn => ({
    ...col,
    ...getFullLabelAndTip(col),
  }),
)

function getFullLabelAndTip(col: HostsTableColumn): {
  icon?: React.ReactNode
  label: string
  tip: string
} {
  if (col.category === 'autopilot') {
    return {
      icon: <Plane16 className="relative opacity-50 scale-75" />,
      label: col.label,
      tip: `autopilot: ${col.label}`,
    }
  }
  if (col.category === 'settings') {
    return {
      icon: <Settings16 className="relative top-px opacity-50 scale-75" />,
      label: col.label,
      tip: `settings: ${col.label}`,
    }
  }
  return {
    label: col.label,
    tip: col.label,
  }
}

type Key = keyof V2HostSettings

function makeRenderSc(name: Key) {
  return memo(function RenderPriceTableNumber({ data }: { data: HostData }) {
    if (!data.v2Settings) {
      return null
    }
    return (
      <ValueScFiat
        displayBoth
        size="12"
        value={new BigNumber((data.v2Settings[name] as string) || 0)}
        fixedFiat={4}
        variant="value"
      />
    )
  })
}

function makeRenderNumber(name: Key, abbreviated?: boolean) {
  return function RenderNumberColumn({ data }: { data: HostData }) {
    if (!data.v2Settings) {
      return null
    }
    return (
      <ValueNum
        size="12"
        value={new BigNumber((data.v2Settings[name] as string) || 0)}
        variant="value"
        format={(v) =>
          humanNumber(v, {
            abbreviated,
          })
        }
      />
    )
  }
}

function makeRenderBool(name: Key) {
  return function RenderBoolColumn({ data }: { data: HostData }) {
    const val = data.v2Settings[name]
    return (
      <div className="mt-[5px]">
        <Text color={val ? 'green' : 'red'}>
          {val ? <CheckboxCheckedFilled16 /> : <WarningSquareFilled16 />}
        </Text>
      </div>
    )
  }
}

function makeRenderV2Price(key: keyof V2HostPrices) {
  return function RenderV2PriceColumn({ data }: { data: HostData }) {
    if (!data.v2Settings) {
      return null
    }
    return (
      <ValueScFiat
        displayBoth
        size="12"
        value={new BigNumber(data.v2Settings.prices[key] || 0)}
        fixedFiat={4}
        variant="value"
      />
    )
  }
}
