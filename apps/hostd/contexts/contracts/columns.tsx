import {
  Text,
  ValueSc,
  TableColumn,
  ValueCopyable,
  ArrowUpLeft16,
  stripPrefix,
  Tooltip,
  ValueNum,
} from '@siafoundation/design-system'
import { humanBytes } from '@siafoundation/sia-js'
import { ContractData, TableColumnId } from './types'

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
    render: () =>
      // <ContractDropdownMenu address={hostIp} publicKey={hostKey} />
      null,
  },
  {
    id: 'contractId',
    label: 'contract ID',
    category: 'general',
    sortable: true,
    render: ({ data: { id, renewedFrom } }) => {
      // const { label, color } = getStatus(row)
      return (
        <div className="flex flex-col gap-1 w-full">
          <ValueCopyable
            size="12"
            value={stripPrefix(id)}
            label="contract ID"
          />
          {renewedFrom && (
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
  // {
  //   id: 'timeline',
  //   label: 'timeline',
  //   category: 'time',
  //   sortable: true,
  //   render: ({
  //     data: {
  //       contractHeightStart,
  //       contractHeightEnd,
  //       proofWindowHeightStart,
  //       proofWindowHeightEnd,
  //       revisionHeight,
  //       proofHeight,
  //     },
  //     context: { currentHeight, contractsTimeRange },
  //   }) => {
  //     return (
  //       <div className="w-[400px]">
  //         <ContractTimeline
  //           currentHeight={currentHeight}
  //           contractHeightStart={contractHeightStart}
  //           contractHeightEnd={contractHeightEnd}
  //           proofWindowHeightStart={proofWindowHeightStart}
  //           proofWindowHeightEnd={proofWindowHeightEnd}
  //           proofHeight={proofHeight}
  //           revisionHeight={revisionHeight}
  //           range={contractsTimeRange}
  //         />
  //       </div>
  //     )
  //   },
  // },
  {
    id: 'usage',
    label: 'usage',
    category: 'data',
    sortable: true,
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { usage } }) => (
      <ValueNum
        size="12"
        value={usage}
        format={(v) => humanBytes(v.toNumber())}
      />
    ),
  },
  {
    id: 'lockedCollateral',
    label: 'locked collateral',
    category: 'financial',
    sortable: true,
    contentClassName: 'w-[120px] justify-end',
    render: ({ data: { lockedCollateral } }) => (
      <ValueSc size="12" value={lockedCollateral} />
    ),
  },
]
