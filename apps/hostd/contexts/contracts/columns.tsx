import {
  Text,
  TableColumn,
  ValueCopyable,
  stripPrefix,
  Tooltip,
  Badge,
  ContractTimeline,
  ValueNum,
  ValueScFiat,
  Checkbox,
  MultiSelect,
} from '@siafoundation/design-system'
import {
  ArrowUpLeft16,
  ArrowDownRight16,
  Money16,
} from '@siafoundation/react-icons'
import { blockHeightToTime, humanBytes, humanDate } from '@siafoundation/units'
import { ContractContextMenu } from '../../components/Contracts/ContractContextMenu'
import { ContractData, TableColumnId } from './types'

type Context = {
  currentHeight: number
  contractsTimeRange: {
    startHeight: number
    endHeight: number
  }
  siascanUrl: string
  multiSelect: MultiSelect<ContractData>
}

type ContractsTableColumn = TableColumn<
  TableColumnId,
  ContractData,
  Context
> & {
  fixed?: boolean
  category?: string
}

export const columns: ContractsTableColumn[] = (
  [
    {
      id: 'actions',
      label: '',
      fixed: true,
      contentClassName: '!pl-3 !pr-4',
      cellClassName: 'w-[20px] !pl-0 !pr-0',
      heading: ({ context: { multiSelect } }) => (
        <Checkbox
          onClick={multiSelect.onSelectPage}
          checked={multiSelect.isPageAllSelected}
        />
      ),
      render: ({ data: { id, status } }) => (
        <ContractContextMenu id={id} status={status} />
      ),
    },
    {
      id: 'contractId',
      label: 'contract ID',
      category: 'general',
      render: ({ data, context }) => {
        const { id, renewedFrom, isRenewedFrom, renewedTo, isRenewedTo } = data
        return (
          <div className="flex flex-col gap-1 w-full">
            <ValueCopyable
              size="12"
              value={stripPrefix(id)}
              type="contract"
              siascanUrl={context.siascanUrl}
            />
            {isRenewedFrom && (
              <Tooltip content="Renewed from" align="start">
                <div className="flex items-center">
                  <Text color="subtle">
                    <ArrowUpLeft16 className="scale-75" />
                  </Text>
                  <ValueCopyable
                    testId="renewedFrom"
                    color="subtle"
                    size="10"
                    type="contract"
                    value={stripPrefix(renewedFrom)}
                    siascanUrl={context.siascanUrl}
                  />
                </div>
              </Tooltip>
            )}
            {isRenewedTo && (
              <Tooltip content="Renewed to" align="start">
                <div className="flex items-center">
                  <Text color="subtle">
                    <ArrowDownRight16 className="scale-75" />
                  </Text>
                  <ValueCopyable
                    testId="renewedTo"
                    color="subtle"
                    size="10"
                    value={stripPrefix(renewedTo)}
                    type="contract"
                    siascanUrl={context.siascanUrl}
                  />
                </div>
              </Tooltip>
            )}
          </div>
        )
      },
    },
    {
      id: 'status',
      label: 'status',
      category: 'general',
      render: ({ data: { status } }) => {
        return <Badge variant={getStatusColor(status)}>{status}</Badge>
      },
    },
    {
      id: 'version',
      label: 'version',
      category: 'general',
      render: ({ data: { version } }) => {
        return <Badge variant="gray">v{version}</Badge>
      },
    },
    {
      id: 'timeline',
      label: 'timeline',
      category: 'time',
      render: ({ data, context: { currentHeight, contractsTimeRange } }) => {
        const {
          contractHeightStart,
          contractHeightEnd,
          proofWindowHeightStart,
          proofWindowHeightEnd,
          resolutionHeight,
          status,
          payoutHeight,
        } = data
        if (contractHeightStart === 0) {
          return null
        }
        return (
          <div className="w-[400px]">
            <ContractTimeline
              currentHeight={currentHeight}
              contractHeightStart={contractHeightStart}
              contractHeightEnd={
                status === 'rejected' ? undefined : contractHeightEnd
              }
              proofWindowHeightStart={
                status === 'rejected' ? undefined : proofWindowHeightStart
              }
              proofWindowHeightEnd={
                status === 'rejected' ? undefined : proofWindowHeightEnd
              }
              resolutionHeight={resolutionHeight}
              payoutHeight={payoutHeight}
              range={contractsTimeRange}
            />
          </div>
        )
      },
    },
    {
      id: 'negotiationHeight',
      label: 'negotiation height',
      category: 'time',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { negotiationHeight }, context: { currentHeight } }) => (
        <Text size="12">
          {humanDate(blockHeightToTime(currentHeight, negotiationHeight))}
        </Text>
      ),
    },
    {
      id: 'contractHeightStart',
      label: 'formation height',
      category: 'time',
      contentClassName: 'w-[120px] justify-end',
      render: ({
        data: { contractHeightStart },
        context: { currentHeight },
      }) => (
        <Text size="12">
          {humanDate(blockHeightToTime(currentHeight, contractHeightStart))}
        </Text>
      ),
    },
    {
      id: 'proofWindowHeightEnd',
      label: 'expiration height',
      category: 'time',
      contentClassName: 'w-[120px] justify-end',
      render: ({
        data: { proofWindowHeightEnd },
        context: { currentHeight },
      }) => (
        <Text size="12">
          {humanDate(blockHeightToTime(currentHeight, proofWindowHeightEnd))}
        </Text>
      ),
    },
    {
      id: 'resolutionHeight',
      label: 'resolution height',
      category: 'time',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { resolutionHeight }, context: { currentHeight } }) => {
        if (resolutionHeight === 0) {
          return (
            <Text size="12" color="subtle">
              -
            </Text>
          )
        }
        return (
          <Text size="12">
            {humanDate(blockHeightToTime(currentHeight, resolutionHeight))}
          </Text>
        )
      },
    },
    {
      id: 'payoutHeight',
      label: 'payout height',
      category: 'time',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { payoutHeight }, context: { currentHeight } }) => {
        if (payoutHeight === 0) {
          return (
            <Text size="12" color="subtle">
              -
            </Text>
          )
        }
        return (
          <Text size="12">
            {humanDate(blockHeightToTime(currentHeight, payoutHeight))}
          </Text>
        )
      },
    },
    {
      id: 'filesize',
      label: 'data size',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { filesize } }) => (
        <ValueNum
          size="12"
          value={filesize}
          variant="value"
          format={(v) => humanBytes(v.toNumber())}
        />
      ),
    },
    {
      id: 'fileMerkleRoot',
      label: 'merkle root',
      category: 'general',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { fileMerkleRoot } }) => (
        <ValueCopyable size="12" value={stripPrefix(fileMerkleRoot)} />
      ),
    },
    {
      id: 'payout',
      label: 'payout',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { payoutHeight, payout } }) => {
        if (payoutHeight === 0) {
          return (
            <Text size="12" color="subtle">
              -
            </Text>
          )
        }
        if (payout === null) {
          return (
            <Text size="12" color="subtle">
              unknown
            </Text>
          )
        }
        return <ValueScFiat displayBoth size="12" value={payout} />
      },
    },
    {
      id: 'remainingRenterFunds',
      label: 'remaining renter funds',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { remainingRenterFunds } }) => (
        <ValueScFiat displayBoth size="12" value={remainingRenterFunds} />
      ),
    },
    {
      id: 'lockedCollateral',
      label: 'locked collateral',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { lockedCollateral } }) => (
        <ValueScFiat displayBoth size="12" value={lockedCollateral} />
      ),
    },
    {
      id: 'usageRiskedCollateral',
      label: 'risked collateral',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.riskedCollateral} />
      ),
    },
    {
      id: 'usageTotal',
      label: 'total usage',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.total} />
      ),
    },
    {
      id: 'usageStorage',
      label: 'storage usage',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.storage} />
      ),
    },
    {
      id: 'usageIngress',
      label: 'ingress usage',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.ingress} />
      ),
    },
    {
      id: 'usageEgress',
      label: 'egress usage',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.egress} />
      ),
    },
    {
      id: 'usageAccountFunding',
      label: 'account funding usage',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.accountFunding} />
      ),
    },
    {
      id: 'usageRpc',
      label: 'RPC usage',
      category: 'financial',
      contentClassName: 'w-[120px] justify-end',
      render: ({ data: { usage } }) => (
        <ValueScFiat displayBoth size="12" value={usage.rpc} />
      ),
    },
  ] as ContractsTableColumn[]
).map(
  (col): ContractsTableColumn => ({
    ...col,
    ...getFullLabelAndTip(col),
  }),
)

function getFullLabelAndTip(col: ContractsTableColumn): {
  icon?: React.ReactNode
  label: string
  tip: string
} {
  if (col.category === 'financial') {
    return {
      icon: <Money16 className="relative opacity-50 scale-75" />,
      label: col.label,
      tip: `financial: ${col.label}`,
    }
  }
  return {
    label: col.label,
    tip: col.label,
  }
}

function getStatusColor(
  status:
    | 'pending'
    | 'active'
    | 'rejected'
    | 'failed'
    | 'renewed'
    | 'successful',
) {
  if (status === 'active') {
    return 'amber'
  }
  if (status === 'failed') {
    return 'red'
  }
  if (status === 'pending') {
    return 'amber'
  }
  if (status === 'rejected') {
    return 'red'
  }
  if (status === 'renewed') {
    return 'green'
  }
  if (status === 'successful') {
    return 'green'
  }
}
