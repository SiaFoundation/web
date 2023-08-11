import {
  Text,
  TableColumn,
  ValueCopyable,
  ValueNum,
  WarningSquareFilled16,
  Tooltip,
  LoadingDots,
  ValueSc,
  Plane16,
  Settings16,
  DataTable16,
  UndefinedFilled16,
  CheckboxCheckedFilled16,
} from '@siafoundation/design-system'
import { humanBytes, humanNumber } from '@siafoundation/sia-js'
import { HostData, TableColumnId } from './types'
import { format, formatDistance, formatRelative } from 'date-fns'
import { HostContextMenu } from '../../components/Hosts/HostContextMenu'
import { useWorkflows } from '@siafoundation/react-core'
import {
  AutopilotHost,
  RhpScanRequest,
  useHostsAllowlist,
  workerRhpScanRoute,
} from '@siafoundation/react-renterd'
import BigNumber from 'bignumber.js'
import React from 'react'

type HostsTableColumn = TableColumn<
  TableColumnId,
  HostData,
  { isAutopilotConfigured: boolean }
> & {
  fixed?: boolean
  category: string
}

export const columns: HostsTableColumn[] = (
  [
    // general
    {
      id: 'actions',
      label: '',
      fixed: true,
      category: 'general',
      cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
      render: ({ data }) => (
        <HostContextMenu address={data.netAddress} publicKey={data.publicKey} />
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
            <div className="flex gap-2 items-center">
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
      id: 'ap_usable',
      label: 'usable',
      category: 'autopilot',
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip side="right" content="Autopilot is not configured">
              <div className="mt-[5px]">
                <Text color="subtle">
                  <UndefinedFilled16 />
                </Text>
              </div>
            </Tooltip>
          )
        }
        return (
          <Tooltip
            side="right"
            content={data.usable ? 'Host is usable' : 'Host is not usable'}
          >
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text color={data.usable ? 'green' : 'red'}>
                  {data.usable ? (
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip side="right" content="Autopilot is not configured">
              <div className="mt-[5px]">
                <Text color="subtle">
                  <UndefinedFilled16 />
                </Text>
              </div>
            </Tooltip>
          )
        }
        return (
          <Tooltip
            side="right"
            content={
              data.gouging
                ? 'Host is price gouging'
                : 'Host is not price gouging'
            }
          >
            <div className="flex gap-2 items-center">
              <div className="mt-[5px]">
                <Text color={!data.gouging ? 'subtle' : 'red'}>
                  {!data.gouging ? (
                    <UndefinedFilled16 />
                  ) : (
                    <WarningSquareFilled16 />
                  )}
                </Text>
              </div>
              <div className="flex flex-col">
                {Object.entries(data.gougingBreakdown.v2)
                  .filter(([_, reason]) => reason && typeof reason === 'string')
                  .map(([key, reason]) => (
                    <Text key={'v2' + key} size="10" noWrap>
                      {reason}
                    </Text>
                  ))}
                {Object.entries(data.gougingBreakdown.v3)
                  .filter(([_, reason]) => reason && typeof reason === 'string')
                  .map(([key, reason]) => (
                    <Text key={'v3' + key} size="10" noWrap>
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
        const isPending = workflows.find(
          (wf: { path?: string; payload?: RhpScanRequest }) =>
            wf.path.startsWith(workerRhpScanRoute) &&
            wf.payload?.hostKey === data.publicKey
        )
        if (isPending) {
          return <LoadingDots />
        }
        const ago = formatDistance(new Date(data.lastScan), new Date(), {
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
              <div className="flex flex-col">
                <Text size="12" noWrap>
                  {ago}
                </Text>
                <Text color="subtle" size="10" noWrap>
                  {format(new Date(data.lastScan), 'Pp')}
                </Text>
              </div>
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
      id: 'netAddress',
      label: 'address',
      category: 'general',
      render: ({ data }) => (
        <ValueCopyable
          value={data.netAddress}
          type="ip"
          size="12"
          label="host address"
        />
      ),
    },
    {
      id: 'publicKey',
      label: 'public key',
      category: 'general',
      render: ({ data }) => (
        <ValueCopyable
          value={data.publicKey}
          size="12"
          label="host public key"
        />
      ),
    },
    {
      id: 'knownSince',
      label: 'known since',
      category: 'general',
      render: ({ data }) => {
        return (
          <div className="flex flex-col">
            <Text size="12" noWrap>
              {formatDistance(new Date(), new Date(data.knownSince))} old
            </Text>
            <Text color="subtle" size="10" noWrap>
              {formatRelative(new Date(data.knownSince), new Date())}
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
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
      render: ({ data, context }) => {
        if (!context.isAutopilotConfigured) {
          return (
            <Tooltip content="Autopilot is not configured">
              <Text color="verySubtle">-</Text>
            </Tooltip>
          )
        }
        return (
          <ValueNum
            size="12"
            value={data.scoreBreakdown.version}
            variant="value"
            format={(v) =>
              context.isAutopilotConfigured ? '-' : v.toPrecision(2)
            }
          />
        )
      },
    },
    // price table
    {
      id: 'hpt_accountbalancecost',
      label: 'account balance cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'accountbalancecost'),
    },
    {
      id: 'hpt_collateralcost',
      label: 'collateral cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'collateralcost'),
    },
    {
      id: 'hpt_contractprice',
      label: 'contract price',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'contractprice'),
    },
    {
      id: 'hpt_downloadbandwidthcost',
      label: 'download bandwidth cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'downloadbandwidthcost'),
    },
    {
      id: 'hpt_dropsectorsbasecost',
      label: 'drop sectors base cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'dropsectorsbasecost'),
    },
    {
      id: 'hpt_dropsectorsunitcost',
      label: 'drop sectors unit cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'dropsectorsunitcost'),
    },
    {
      id: 'hpt_expiry',
      label: 'expiry',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'dropsectorsunitcost'),
    },
    {
      id: 'hpt_fundaccountcost',
      label: 'fund account cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'fundaccountcost'),
    },
    {
      id: 'hpt_hassectorbasecost',
      label: 'has sector cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'hassectorbasecost'),
    },
    {
      id: 'hpt_hostblockheight',
      label: 'host block height',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'hostblockheight'),
    },
    {
      id: 'hpt_initbasecost',
      label: 'init base cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'initbasecost'),
    },
    {
      id: 'hpt_latestrevisioncost',
      label: 'latest revision cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'latestrevisioncost'),
    },
    {
      id: 'hpt_maxcollateral',
      label: 'max collateral',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'maxcollateral'),
    },
    {
      id: 'hpt_maxduration',
      label: 'max duration',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'maxduration'),
    },
    {
      id: 'hpt_memorytimecost',
      label: 'memory time cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'memorytimecost'),
    },
    {
      id: 'hpt_readbasecost',
      label: 'read base cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'readbasecost'),
    },
    {
      id: 'hpt_readlengthcost',
      label: 'read length cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'readlengthcost'),
    },
    {
      id: 'hpt_registryentriesleft',
      label: 'registry entries left',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'registryentriesleft'),
    },
    {
      id: 'hpt_registryentriestotal',
      label: 'registry entries total',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'registryentriestotal'),
    },
    {
      id: 'hpt_renewcontractcost',
      label: 'renew contract cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'renewcontractcost'),
    },
    {
      id: 'hpt_revisionbasecost',
      label: 'revision base cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'renewcontractcost'),
    },
    {
      id: 'hpt_subscriptionmemorycost',
      label: 'subscription memory cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'subscriptionmemorycost'),
    },
    {
      id: 'hpt_subscriptionnotificationcost',
      label: 'subscription notification cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'subscriptionnotificationcost'),
    },
    {
      id: 'hpt_swapsectorcost',
      label: 'swap sector cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'swapsectorcost'),
    },
    {
      id: 'hpt_txnfeemaxrecommended',
      label: 'txn fee max recommended',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'txnfeemaxrecommended'),
    },
    {
      id: 'hpt_txnfeeminrecommended',
      label: 'txn fee min recommended',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'txnfeeminrecommended'),
    },
    {
      id: 'hpt_uid',
      label: 'UID',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderString('priceTable', 'uid'),
    },
    {
      id: 'hpt_updatepricetablecost',
      label: 'update price table cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'updatepricetablecost'),
    },
    {
      id: 'hpt_uploadbandwidthcost',
      label: 'upload bandwidth cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'uploadbandwidthcost'),
    },
    {
      id: 'hpt_validity',
      label: 'validity',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'validity'),
    },
    {
      id: 'hpt_windowsize',
      label: 'window size',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('priceTable', 'windowsize'),
    },
    {
      id: 'hpt_writebasecost',
      label: 'write base cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'writebasecost'),
    },
    {
      id: 'hpt_writelengthcost',
      label: 'write length cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'writelengthcost'),
    },
    {
      id: 'hpt_writestorecost',
      label: 'write store cost',
      category: 'priceTable',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('priceTable', 'writestorecost'),
    },
    // host settings
    {
      id: 'hs_acceptingcontracts',
      label: 'accepting contracts',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBool('settings', 'acceptingcontracts'),
    },
    {
      id: 'hs_baserpcprice',
      label: 'base RPC price',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'baserpcprice'),
    },
    {
      id: 'hs_collateral',
      label: 'collateral',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'collateral'),
    },
    {
      id: 'hs_contractprice',
      label: 'contract price',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'contractprice'),
    },
    {
      id: 'hs_downloadbandwidthprice',
      label: 'download bandwidth price',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'downloadbandwidthprice'),
    },
    {
      id: 'hs_ephemeralaccountexpiry',
      label: 'ephemeral account expiry',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('settings', 'ephemeralaccountexpiry'),
    },
    {
      id: 'hs_maxcollateral',
      label: 'max collateral',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'maxcollateral'),
    },
    {
      id: 'hs_maxdownloadbatchsize',
      label: 'max download batch size',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBytes('settings', 'maxdownloadbatchsize'),
    },
    {
      id: 'hs_maxduration',
      label: 'max duration',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('settings', 'maxduration'),
    },
    {
      id: 'hs_maxephemeralaccountbalance',
      label: 'max ephemeral account balance',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'maxephemeralaccountbalance'),
    },
    {
      id: 'hs_maxrevisebatchsize',
      label: 'max revise batch size',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBytes('settings', 'maxrevisebatchsize'),
    },
    {
      id: 'hs_netaddress',
      label: 'net address',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderString('settings', 'netaddress'),
    },
    {
      id: 'hs_remainingstorage',
      label: 'remaining storage',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBytes('settings', 'remainingstorage'),
    },
    {
      id: 'hs_revisionnumber',
      label: 'revision number',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('settings', 'revisionnumber'),
    },
    {
      id: 'hs_sectoraccessprice',
      label: 'sector access price',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'sectoraccessprice'),
    },
    {
      id: 'hs_sectorsize',
      label: 'sector size',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBytes('settings', 'sectorsize'),
    },
    {
      id: 'hs_siamuxport',
      label: 'siamux port',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('settings', 'siamuxport'),
    },
    {
      id: 'hs_storageprice',
      label: 'storage price',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'storageprice'),
    },
    {
      id: 'hs_totalstorage',
      label: 'total storage',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderBytes('settings', 'totalstorage'),
    },
    {
      id: 'hs_unlockhash',
      label: 'unlock hash',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderString('settings', 'unlockhash'),
    },
    {
      id: 'hs_uploadbandwidthprice',
      label: 'upload bandwidth price',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderSc('settings', 'uploadbandwidthprice'),
    },
    {
      id: 'hs_version',
      label: 'verison',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderString('settings', 'version'),
    },
    {
      id: 'hs_windowsize',
      label: 'window size',
      category: 'hostSettings',
      contentClassName: 'w-[120px] justify-end',
      render: makeRenderNumber('settings', 'windowsize'),
    },
  ] as HostsTableColumn[]
).map(
  (col): HostsTableColumn => ({
    ...col,
    ...getFullLabelAndTip(col),
  })
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
  if (col.category === 'hostSettings') {
    return {
      icon: <Settings16 className="relative top-px opacity-50 scale-75" />,
      label: col.label,
      tip: `host settings (RHPv2): ${col.label}`,
    }
  }
  if (col.category === 'priceTable') {
    return {
      icon: <DataTable16 className="relative top-px opacity-50 scale-75" />,
      label: col.label,
      tip: `price table (RHPv3): ${col.label}`,
    }
  }
  return {
    label: col.label,
    tip: col.label,
  }
}

type Key =
  | keyof AutopilotHost['host']['priceTable']
  | keyof AutopilotHost['host']['settings']

function makeRenderSc(section: 'priceTable' | 'settings', name: Key) {
  return function RenderPriceTableNumber({ data }: { data: HostData }) {
    if (!data[section]) {
      return null
    }
    return (
      <ValueSc
        size="12"
        value={new BigNumber(data[section][name] || 0)}
        variant="value"
      />
    )
  }
}

function makeRenderNumber(
  section: 'priceTable' | 'settings',
  name: Key,
  abbreviated?: boolean
) {
  return function RenderNumberColumn({ data }: { data: HostData }) {
    if (!data[section]) {
      return null
    }
    return (
      <ValueNum
        size="12"
        value={new BigNumber(data[section][name] || 0)}
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

function makeRenderString(section: 'priceTable' | 'settings', name: Key) {
  return function RenderStringColumn({ data }: { data: HostData }) {
    if (!data[section]) {
      return null
    }
    return <ValueCopyable value={data[section][name]} size="12" />
  }
}

function makeRenderBytes(section: 'priceTable' | 'settings', name: Key) {
  return function RenderBytesColumn({ data }: { data: HostData }) {
    if (!data[section]) {
      return null
    }
    return (
      <Text size="12" weight="semibold" ellipsis>
        {humanBytes(data[section][name])}
      </Text>
    )
  }
}

function makeRenderBool(section: 'priceTable' | 'settings', name: Key) {
  return function RenderBoolColumn({ data }: { data: HostData }) {
    if (!data[section]) {
      return null
    }
    return (
      <div className="mt-[5px]">
        <Text color={data[section][name] ? 'green' : 'red'}>
          {data[section][name] ? (
            <CheckboxCheckedFilled16 />
          ) : (
            <WarningSquareFilled16 />
          )}
        </Text>
      </div>
    )
  }
}
