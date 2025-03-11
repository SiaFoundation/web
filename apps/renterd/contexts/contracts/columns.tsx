import {
  Text,
  ValueScFiat,
  TableColumn,
  ContractTimeline,
  ValueCopyable,
  stripPrefix,
  Tooltip,
  ValueNum,
  Badge,
  Separator,
  Button,
  LoadingDots,
  Checkbox,
} from '@siafoundation/design-system'
import {
  ArrowUpLeft16,
  Calculator16,
  CheckmarkFilled16,
  CheckmarkFilledError16,
  Cut16,
  Reset16,
} from '@siafoundation/react-icons'
import { humanBytes, humanDate } from '@siafoundation/units'
import { ContractData, ContractTableContext, TableColumnId } from './types'
import { ContractContextMenu } from '../../components/Contracts/ContractContextMenu'
import { ContractState } from '@siafoundation/renterd-types'
import BigNumber from 'bignumber.js'

type ContractsTableColumn = TableColumn<
  TableColumnId,
  ContractData,
  ContractTableContext
> & {
  fixed?: boolean
  category?: string
}

export const columns: ContractsTableColumn[] = [
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
    render: ({ data: { id, hostKey } }) => (
      <ContractContextMenu id={id} hostKey={hostKey} />
    ),
  },
  {
    id: 'contractId',
    label: 'contract ID',
    category: 'general',
    render: ({
      data: { id, isRenewed, renewedFrom },
      context: { siascanUrl },
    }) => {
      return (
        <div className="flex flex-col gap-1 w-full">
          <ValueCopyable
            size="12"
            value={stripPrefix(id)}
            type="contract"
            label="contract ID"
            siascanUrl={siascanUrl}
          />
          {isRenewed && (
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
                  siascanUrl={siascanUrl}
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
    id: 'usability',
    label: 'usability',
    contentClassName: 'w-[120px]',
    category: 'general',
    render: ({ data: { usability } }) => {
      let label = ''
      let message = ''
      let icon = null
      let color = 'green' as 'green' | 'red'

      if (usability === 'good') {
        label = 'good'
        message = 'This contract is usable and good for renewal.'
        icon = <CheckmarkFilled16 className="scale-75" />
        color = 'green'
      } else if (usability === 'bad') {
        label = 'bad'
        message = 'This contract is unusable and will not be renewed.'
        icon = <CheckmarkFilledError16 className="scale-75" />
        color = 'red'
      } else {
        return null
      }

      return (
        <Tooltip content={message}>
          <Badge
            variant={color}
            interactive={false}
            size="small"
            className="flex gap-px items-center pl-px"
          >
            {icon}
            {label}
          </Badge>
        </Tooltip>
      )
    },
  },
  {
    id: 'hostKey',
    label: 'host public key',
    category: 'general',
    render: ({ data: { hostKey }, context: { siascanUrl } }) => {
      return (
        <ValueCopyable
          size="12"
          value={hostKey}
          type="hostPublicKey"
          siascanUrl={siascanUrl}
        />
      )
    },
  },
  {
    id: 'state',
    label: 'state',
    category: 'general',
    render: ({ data: { state } }) => {
      return (
        <Tooltip
          content={
            <div className="flex flex-col gap-1.5">
              <div className="flex">
                <Text size="12" className="flex-1" weight="medium">
                  pending
                </Text>
                <Text size="12" className="flex-[2]" color="subtle">
                  Contract has been added.
                </Text>
              </div>
              <Separator className="w-full" />
              <div className="flex">
                <Text size="12" className="flex-1" weight="medium">
                  active
                </Text>
                <Text size="12" className="flex-[2]" color="subtle">
                  Contract has appeared on chain.
                </Text>
              </div>
              <Separator className="w-full" />
              <div className="flex">
                <Text size="12" className="flex-1" weight="medium">
                  complete
                </Text>
                <Text size="12" className="flex-[2]" color="subtle">
                  Storage proof has appeared on chain.
                </Text>
              </div>
              <Separator className="w-full" />
              <div className="flex">
                <Text size="12" className="flex-1" weight="medium">
                  failed
                </Text>
                <Text size="12" className="flex-[2]" color="subtle">
                  Storage proof was not submitted before the end of proof
                  window.
                </Text>
              </div>
            </div>
          }
        >
          <Badge variant={getContractStateColor(state)}>{state}</Badge>
        </Tooltip>
      )
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
            resolutionHeight={proofHeight}
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
    summary: ({ context }) => {
      if (!context.filteredStats.sizeTotal) {
        return null
      }
      return (
        <ValueNum
          size="12"
          value={context.filteredStats.sizeTotal}
          format={(d) => humanBytes(d)}
          variant="value"
        />
      )
    },
  },
  {
    id: 'prunableSize',
    label: 'prunable size',
    category: 'general',
    contentClassName: 'px-1 justify-end',
    render: function PrunableSizeCell({
      data: { fetchPrunableSize, isFetchingPrunableSize, prunableSize },
      context: { isFetchingPrunableSizeAll },
    }) {
      const isFetching = isFetchingPrunableSize || isFetchingPrunableSizeAll
      if (prunableSize === undefined) {
        return (
          <Button
            tip="Calculate prunable size for contract"
            onClick={(e) => {
              e.stopPropagation()
              fetchPrunableSize()
            }}
          >
            {isFetching ? <LoadingDots /> : <Calculator16 />}
          </Button>
        )
      }
      return (
        <div className="flex items-center gap-2">
          <ValuePrunableSize
            value={new BigNumber(prunableSize)}
            tip="The amount of data that can be pruned from this contract"
          />
          <Button
            tip="Realculate prunable size for contract"
            onClick={(e) => {
              e.stopPropagation()
              fetchPrunableSize()
            }}
          >
            {isFetching ? <LoadingDots /> : <Reset16 />}
          </Button>
        </div>
      )
    },
    summary: ({ context }) => {
      if (!context.hasFetchedAllPrunableSize) {
        return (
          <Button
            tip="Calculate prunable size for all contracts"
            state={context.isFetchingPrunableSizeAll ? 'waiting' : undefined}
            onClick={context.fetchPrunableSizeAll}
          >
            {context.isFetchingPrunableSizeAll ? (
              <LoadingDots />
            ) : (
              <Calculator16 />
            )}
          </Button>
        )
      }

      return (
        <div className="flex items-center gap-2">
          {context.filteredStats.prunableSizeTotal && (
            <ValuePrunableSize
              value={context.filteredStats.prunableSizeTotal}
              tip="The amount of data that can be pruned from contracts in the filtered set of active contracts"
            />
          )}
          <Button
            tip="Recalculate prunable size for all contracts"
            state={context.isFetchingPrunableSizeAll ? 'waiting' : undefined}
            onClick={context.fetchPrunableSizeAll}
          >
            {context.isFetchingPrunableSizeAll ? <LoadingDots /> : <Reset16 />}
          </Button>
        </div>
      )
    },
  },
  {
    id: 'initialRenterFunds',
    label: 'initial renter funds',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { initialRenterFunds } }) => (
      <ValueScFiat displayBoth size="12" value={initialRenterFunds.negated()} />
    ),
    summary: ({ context: { filteredStats } }) => {
      if (!filteredStats.initialRenterFundsTotal) {
        return null
      }
      return (
        <ValueScFiat
          displayBoth
          size="12"
          value={filteredStats.initialRenterFundsTotal.negated()}
          tooltip="Total initial renter funds across the filtered set of active contracts"
        />
      )
    },
  },
  {
    id: 'spendingUploads',
    label: 'uploads spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingUploads } }) => (
      <ValueScFiat displayBoth size="12" value={spendingUploads.negated()} />
    ),
    summary: ({ context: { filteredStats } }) => {
      if (!filteredStats.spendingUploadsTotal) {
        return null
      }
      return (
        <ValueScFiat
          displayBoth
          size="12"
          value={filteredStats.spendingUploadsTotal.negated()}
          tooltip="Uploads spending across the filtered set of active contracts"
        />
      )
    },
  },
  {
    id: 'spendingDeletions',
    label: 'deletions spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingDeletions } }) => (
      <ValueScFiat displayBoth size="12" value={spendingDeletions.negated()} />
    ),
    summary: ({ context: { filteredStats } }) => {
      if (!filteredStats.spendingDeletionsTotal) {
        return null
      }
      return (
        <ValueScFiat
          displayBoth
          size="12"
          value={filteredStats.spendingDeletionsTotal.negated()}
          tooltip="Deletions spending across the filtered set of active contracts"
        />
      )
    },
  },
  {
    id: 'spendingFundAccount',
    label: 'fund account spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingFundAccount } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={spendingFundAccount.negated()}
      />
    ),
    summary: ({ context: { filteredStats } }) => {
      if (!filteredStats.spendingFundAccountTotal) {
        return null
      }
      return (
        <ValueScFiat
          displayBoth
          size="12"
          value={filteredStats.spendingFundAccountTotal.negated()}
          tooltip="Fund account spending across the filtered set of active contracts"
        />
      )
    },
  },
  {
    id: 'spendingSectorRoots',
    label: 'sector roots spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingSectorRoots } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={spendingSectorRoots.negated()}
      />
    ),
    summary: ({ context: { filteredStats } }) => {
      if (!filteredStats.spendingSectorRootsTotal) {
        return null
      }
      return (
        <ValueScFiat
          displayBoth
          size="12"
          value={filteredStats.spendingSectorRootsTotal.negated()}
          tooltip="Sector roots spending across the filtered set of active contracts"
        />
      )
    },
  },
]

function getContractStateColor(state: ContractState) {
  if (state === 'active') {
    return 'amber'
  }
  if (state === 'failed') {
    return 'red'
  }
  if (state === 'pending') {
    return 'amber'
  }
  if (state === 'complete') {
    return 'green'
  }
}

function ValuePrunableSize({ value, tip }: { value: BigNumber; tip: string }) {
  return (
    <Tooltip content={tip}>
      <div className="flex items-center gap-0.5" aria-label="prunable size">
        <ValueNum
          size="12"
          value={value}
          format={(d) => humanBytes(d)}
          variant="value"
        />
        <Cut16 className="scale-75" />
      </div>
    </Tooltip>
  )
}
