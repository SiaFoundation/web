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
  ScrollArea,
  Button,
  LoadingDots,
} from '@siafoundation/design-system'
import {
  ArrowUpLeft16,
  Calculator16,
  CheckmarkFilled16,
  CheckmarkFilledError16,
  CheckmarkOutlineError16,
  Cut16,
  Hourglass16,
  Reset16,
} from '@siafoundation/react-icons'
import { humanBytes, humanDate } from '@siafoundation/units'
import { ContractData, ContractTableContext, TableColumnId } from './types'
import { ContractContextMenu } from '../../components/Contracts/ContractContextMenu'
import { ContractState } from '@siafoundation/renterd-types'
import { cx } from 'class-variance-authority'
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
    cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
    render: ({ data: { id, hostIp, hostKey } }) => (
      <ContractContextMenu id={id} hostAddress={hostIp} hostKey={hostKey} />
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
    id: 'contractSets',
    label: 'contract sets',
    contentClassName: 'w-[120px]',
    category: 'general',
    render: ({
      data: { contractSets },
      context: { defaultContractSet, autopilotContractSet },
    }) => {
      if (!contractSets.length) {
        return null
      }
      return (
        <div className="flex flex-col items-center overflow-hidden h-full">
          <ScrollArea>
            <div className="flex min-h-full gap-1 flex-wrap py-2 items-center">
              {contractSets.map((set) => {
                const isDefaultSet = defaultContractSet === set
                const isAutopilotSet = autopilotContractSet === set
                const isBothAutopilotAndDefaultSet =
                  isAutopilotSet && isDefaultSet
                let message = ''
                let icon = null

                if (isBothAutopilotAndDefaultSet) {
                  message = `This set is the default contract set and the autopilot contract set.`
                  icon = <CheckmarkFilled16 className="scale-75" />
                } else if (isAutopilotSet) {
                  message = `This set is the autopilot contract set but not the default contract set.`
                  icon = <CheckmarkFilledError16 className="scale-75" />
                } else if (isDefaultSet) {
                  message = `This set is the default contract set but not the autopilot contract set.`
                  icon = <CheckmarkOutlineError16 className="scale-75" />
                }

                return (
                  <Tooltip
                    content={
                      <>
                        Contract is part of set{' '}
                        <Badge size="small">{set}</Badge>. {message}
                      </>
                    }
                    key={set}
                  >
                    <Badge
                      interactive={false}
                      size="small"
                      className={cx(
                        'flex gap-px items-center',
                        isDefaultSet ? 'pl-px' : ''
                      )}
                    >
                      {icon}
                      {set}
                    </Badge>
                  </Tooltip>
                )
              })}
            </div>
          </ScrollArea>
        </div>
      )
    },
  },
  {
    id: 'hostIp',
    label: 'host address',
    category: 'general',
    render: ({ data: { hostIp }, context: { siascanUrl } }) => {
      return (
        <ValueCopyable
          size="12"
          value={hostIp}
          type="hostIp"
          siascanUrl={siascanUrl}
        />
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
                <Text className="flex-1" weight="medium">
                  pending
                </Text>
                <Text className="flex-[2]" color="subtle">
                  Contract has been added.
                </Text>
              </div>
              <Separator className="w-full" />
              <div className="flex">
                <Text className="flex-1" weight="medium">
                  active
                </Text>
                <Text className="flex-[2]" color="subtle">
                  Contract has appeared on chain.
                </Text>
              </div>
              <Separator className="w-full" />
              <div className="flex">
                <Text className="flex-1" weight="medium">
                  complete
                </Text>
                <Text className="flex-[2]" color="subtle">
                  Storage proof has appeared on chain.
                </Text>
              </div>
              <Separator className="w-full" />
              <div className="flex">
                <Text className="flex-1" weight="medium">
                  failed
                </Text>
                <Text className="flex-[2]" color="subtle">
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
      data: {
        fetchPrunableSize,
        isFetchingPrunableSize,
        prunableSize,
        inAutopilotSet,
      },
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
        <div className="flex items-center gap-2" aria-label="prunable sizes">
          {inAutopilotSet ? (
            <ValuePrunableSize
              value={new BigNumber(prunableSize)}
              tip="The amount of data that can be pruned from this autopilot contract"
              variant="prunable"
            />
          ) : (
            <ValuePrunableSize
              value={new BigNumber(prunableSize)}
              tip="The amount of data that will eventually expire from this non-autopilot contract"
              variant="expiring"
            />
          )}
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
        <div className="flex items-center gap-2" aria-label="prunable sizes">
          {context.filteredStats.prunableSizeTotal && (
            <ValuePrunableSize
              value={context.filteredStats.prunableSizeTotal}
              tip="The amount of data that can be pruned from autopilot contracts in the filtered set of active contracts"
              variant="prunable"
            />
          )}
          {context.filteredStats.expiringSizeTotal && (
            <ValuePrunableSize
              value={context.filteredStats.expiringSizeTotal}
              tip="The amount of data that will eventually expire from non-autopilot contracts in the filtered set of active contracts"
              variant="expiring"
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
    id: 'totalCost',
    label: 'total cost',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { totalCost } }) => (
      <ValueScFiat displayBoth size="12" value={totalCost.negated()} />
    ),
    summary: ({ context: { filteredStats } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={filteredStats.totalCostTotal.negated()}
        tooltip="Total cost across the filtered set of active contracts"
      />
    ),
  },
  {
    id: 'spendingUploads',
    label: 'uploads spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingUploads } }) => (
      <ValueScFiat displayBoth size="12" value={spendingUploads.negated()} />
    ),
    summary: ({ context: { filteredStats } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={filteredStats.spendingUploadsTotal.negated()}
        tooltip="Uploads spending across the filtered set of active contracts"
      />
    ),
  },
  {
    id: 'spendingDeletions',
    label: 'deletions spending',
    category: 'financial',
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { spendingDeletions } }) => (
      <ValueScFiat displayBoth size="12" value={spendingDeletions.negated()} />
    ),
    summary: ({ context: { filteredStats } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={filteredStats.spendingDeletionsTotal.negated()}
        tooltip="Deletions spending across the filtered set of active contracts"
      />
    ),
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
    summary: ({ context: { filteredStats } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={filteredStats.spendingFundAccountTotal.negated()}
        tooltip="Fund account spending across the filtered set of active contracts"
      />
    ),
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
    summary: ({ context: { filteredStats } }) => (
      <ValueScFiat
        displayBoth
        size="12"
        value={filteredStats.spendingSectorRootsTotal.negated()}
        tooltip="Sector roots spending across the filtered set of active contracts"
      />
    ),
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

function ValuePrunableSize({
  value,
  tip,
  variant,
}: {
  value: BigNumber
  tip: string
  variant: 'prunable' | 'expiring'
}) {
  return (
    <Tooltip content={tip}>
      <div className="flex items-center gap-0.5" aria-label={variant}>
        <ValueNum
          size="12"
          value={value}
          format={(d) => humanBytes(d)}
          variant="value"
        />
        {variant === 'prunable' ? (
          <Cut16 className="scale-75" />
        ) : (
          <Hourglass16 className="scale-75" />
        )}
      </div>
    </Tooltip>
  )
}
