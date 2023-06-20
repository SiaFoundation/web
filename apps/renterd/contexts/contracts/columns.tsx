import {
  Text,
  ValueSc,
  TableColumn,
  ContractTimeline,
  ValueCopyable,
  ArrowUpLeft16,
  stripPrefix,
  Tooltip,
  ValueNum,
} from '@siafoundation/design-system'
import { humanBytes, humanDate } from '@siafoundation/sia-js'
import { ContractData, TableColumnId } from './types'
import { ContractDropdownMenu } from '../../components/Contracts/ContractDropdownMenu'

type Context = {
  currentHeight: number
  contractsTimeRange: {
    startHeight: number
    endHeight: number
  }
}

type ContractsTableColumn = TableColumn<
  TableColumnId,
  ContractData,
  Context
> & {
  fixed?: boolean
  category?: string
}

export const columns: ContractsTableColumn[] = [
  {
    id: 'actions',
    label: '',
    fixed: true,
    cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
    render: ({ data: { hostIp, hostKey } }) => (
      <ContractDropdownMenu address={hostIp} publicKey={hostKey} />
    ),
  },
  {
    id: 'contractId',
    label: 'contract ID',
    category: 'general',
    render: ({ data: { id, isRenewed, renewedFrom } }) => {
      // const { label, color } = getStatus(row)
      return (
        <div className="flex flex-col gap-1 w-full">
          <ValueCopyable
            size="12"
            value={stripPrefix(id)}
            label="contract ID"
          />
          {isRenewed && (
            <Tooltip content="Renewed from" align="start">
              <div className="flex items-center">
                <Text color="subtle">
                  <ArrowUpLeft16 className="scale-75" />
                </Text>
                <ValueCopyable
                  color="subtle"
                  size="10"
                  value={stripPrefix(renewedFrom)}
                  label="contract ID"
                />
              </div>
            </Tooltip>
          )}
        </div>
      )
    },
  },
  {
    id: 'hostIp',
    label: 'host address',
    category: 'general',
    render: ({ data: { hostIp } }) => {
      return (
        <ValueCopyable
          size="12"
          value={hostIp}
          type="ip"
          label="host address"
        />
      )
    },
  },
  {
    id: 'hostKey',
    label: 'host public key',
    category: 'general',
    render: ({ data: { hostKey } }) => {
      return <ValueCopyable size="12" value={hostKey} label="host public key" />
    },
  },
  {
    id: 'timeline',
    label: 'timeline',
    category: 'time',
    render: ({
      data: {
        contractHeightStart,
        contractHeightEnd,
        proofWindowHeightStart,
        proofWindowHeightEnd,
        revisionHeight,
        proofHeight,
      },
      context: { currentHeight, contractsTimeRange },
    }) => {
      return (
        <div className="w-[400px]">
          <ContractTimeline
            currentHeight={currentHeight}
            contractHeightStart={contractHeightStart}
            contractHeightEnd={contractHeightEnd}
            proofWindowHeightStart={proofWindowHeightStart}
            proofWindowHeightEnd={proofWindowHeightEnd}
            proofHeight={proofHeight}
            revisionHeight={revisionHeight}
            range={contractsTimeRange}
          />
        </div>
      )
    },
  },
  {
    id: 'startTime',
    label: 'start date',
    category: 'time',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { startTime } }) => {
      return (
        <Text size="12" font="mono" ellipsis>
          {humanDate(startTime)}
        </Text>
      )
    },
  },
  {
    id: 'endTime',
    label: 'end date',
    category: 'time',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { endTime } }) => {
      return (
        <Text size="12" font="mono" ellipsis>
          {humanDate(endTime)}
        </Text>
      )
    },
  },
  {
    id: 'size',
    label: 'size',
    category: 'general',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { size } }) => (
      <ValueNum
        size="12"
        value={size}
        variant="value"
        format={(d) => humanBytes(d)}
      />
    ),
  },
  {
    id: 'totalCost',
    label: 'total cost',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { totalCost } }) => (
      <ValueSc size="12" value={totalCost.negated()} />
    ),
  },
  {
    id: 'spendingUploads',
    label: 'uploads spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingUploads } }) => (
      <ValueSc size="12" value={spendingUploads.negated()} />
    ),
  },
  {
    id: 'spendingDownloads',
    label: 'downloads spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingDownloads } }) => (
      <ValueSc size="12" value={spendingDownloads.negated()} />
    ),
  },
  {
    id: 'spendingFundAccount',
    label: 'fund account spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingFundAccount } }) => (
      <ValueSc size="12" value={spendingFundAccount.negated()} />
    ),
  },
]
