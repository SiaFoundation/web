import {
  Text,
  ValueSc,
  TableColumn,
  ContractTimeline,
  blockHeightToTime,
  ValueCopyable,
  ArrowUpLeft16,
  stripPrefix,
  useTableState,
  getContractsTimeRangeBlockHeight,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
  Tooltip,
} from '@siafoundation/design-system'
import { useRouter } from 'next/router'
import { humanDate } from '@siafoundation/sia-js'
import {
  useConsensusState,
  useContracts as useContractsData,
} from '@siafoundation/react-core'
import { createContext, useContext, useMemo } from 'react'
import BigNumber from 'bignumber.js'
import {
  ContractData,
  TableColumnId,
  columnsMeta,
  columnsDefaultVisible,
  columnsDefaultSort,
} from './types'
import { ContractDropdownMenu } from '../../components/Contracts/ContractDropdownMenu'

const defaultLimit = 20

function useContractsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const consensus = useConsensusState()
  const currentHeight = consensus.data?.BlockHeight
  const response = useContractsData()

  const dataset = useMemo<ContractData[] | null>(() => {
    if (!response.data) {
      return null
    }
    const data: ContractData[] =
      response.data?.map((c) => {
        const isRenewed =
          c.renewedFrom !==
          'fcid:0000000000000000000000000000000000000000000000000000000000000000'
        const startTime = blockHeightToTime(currentHeight, c.startHeight)
        const endHeight = c.windowStart
        const endTime = blockHeightToTime(currentHeight, endHeight)
        return {
          id: c.id,
          contractId: c.id,
          hostIp: c.hostIP,
          hostKey: c.hostKey,
          timeline: startTime,
          startTime,
          endTime,
          contractHeightStart: c.startHeight,
          contractHeightEnd: endHeight,
          proofWindowHeightStart: c.windowStart,
          proofWindowHeightEnd: c.windowEnd,
          proofHeight: c.proofHeight,
          revisionHeight: c.revisionHeight,
          isRenewed,
          renewedFrom: c.renewedFrom,
          totalCost: new BigNumber(c.totalCost),
          spendingUploads: new BigNumber(c.spending.uploads),
          spendingDownloads: new BigNumber(c.spending.downloads),
          spendingFundAccount: new BigNumber(c.spending.fundAccount),
        }
      }) || []
    return data
  }, [response.data, currentHeight])

  const {
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  } = useTableState(
    'renterd/v0/contracts',
    columnsMeta,
    columnsDefaultVisible,
    columnsDefaultSort
  )

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<ContractData>()

  const datasetFiltered = useClientFilteredDataset({
    dataset,
    filters,
    sortColumn,
    sortDirection,
  })

  const datasetPage = useMemo<ContractData[] | null>(() => {
    if (!datasetFiltered) {
      return null
    }
    return datasetFiltered.slice(offset, offset + limit)
  }, [datasetFiltered, offset, limit])

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, datasetPage || []),
    [currentHeight, datasetPage]
  )

  const tableColumns = useMemo(() => {
    const columns: TableColumn<TableColumnId, ContractData>[] = [
      {
        id: 'actions',
        label: columnsMeta.actions.label,
        cellClassName: 'w-[50px] !pl-2 !pr-4 [&+*]:!pl-0',
        render: ({ hostIp, hostKey }) => (
          <ContractDropdownMenu address={hostIp} publicKey={hostKey} />
        ),
      },
      {
        id: 'contractId',
        label: columnsMeta.contractId.label,
        sortable: columnsMeta.contractId.sortable,
        render: ({ id, isRenewed, renewedFrom }) => {
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
        label: columnsMeta.hostIp.label,
        sortable: columnsMeta.hostIp.sortable,
        render: ({ hostIp }) => {
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
        label: columnsMeta.hostKey.label,
        sortable: columnsMeta.hostKey.sortable,
        render: ({ hostKey }) => {
          return (
            <ValueCopyable size="12" value={hostKey} label="host public key" />
          )
        },
      },
      {
        id: 'timeline',
        label: columnsMeta.timeline.label,
        sortable: columnsMeta.timeline.sortable,
        render: ({
          contractHeightStart,
          contractHeightEnd,
          proofWindowHeightStart,
          proofWindowHeightEnd,
          revisionHeight,
          proofHeight,
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
        label: columnsMeta.startTime.label,
        sortable: columnsMeta.startTime.sortable,
        render: ({ startTime }) => {
          return (
            <Text size="12" font="mono" ellipsis>
              {humanDate(startTime)}
            </Text>
          )
        },
        contentClassName: 'justify-end',
      },
      {
        id: 'endTime',
        label: columnsMeta.endTime.label,
        sortable: columnsMeta.endTime.sortable,
        render: ({ endTime }) => {
          return (
            <Text size="12" font="mono" ellipsis>
              {humanDate(endTime)}
            </Text>
          )
        },
        contentClassName: 'justify-end',
      },
      {
        id: 'totalCost',
        label: columnsMeta.totalCost.label,
        sortable: columnsMeta.totalCost.sortable,
        contentClassName: 'w-[120px] justify-end',
        render: ({ totalCost }) => (
          <ValueSc size="12" value={totalCost.negated()} />
        ),
      },
      {
        id: 'spendingUploads',
        label: columnsMeta.spendingUploads.label,
        sortable: columnsMeta.spendingUploads.sortable,
        contentClassName: 'w-[120px] justify-end',
        render: ({ spendingUploads }) => (
          <ValueSc size="12" value={spendingUploads.negated()} />
        ),
      },
      {
        id: 'spendingDownloads',
        label: columnsMeta.spendingDownloads.label,
        sortable: columnsMeta.spendingDownloads.sortable,
        contentClassName: 'w-[120px] justify-end',
        render: ({ spendingDownloads }) => (
          <ValueSc size="12" value={spendingDownloads.negated()} />
        ),
      },
      {
        id: 'spendingFundAccount',
        label: columnsMeta.spendingFundAccount.label,
        sortable: columnsMeta.spendingFundAccount.sortable,
        contentClassName: 'w-[120px] justify-end',
        render: ({ spendingFundAccount }) => (
          <ValueSc size="12" value={spendingFundAccount.negated()} />
        ),
      },
    ]
    return columns
  }, [currentHeight, contractsTimeRange])

  const filteredTableColumns = useMemo(
    () =>
      tableColumns.filter(
        (column) =>
          columnsMeta[column.id].fixed || enabledColumns.includes(column.id)
      ),
    [tableColumns, enabledColumns]
  )

  const dataState = useDatasetEmptyState(
    datasetFiltered,
    response.isValidating,
    response.error,
    filters
  )

  return {
    dataState,
    limit,
    offset,
    pageCount: datasetPage?.length || 0,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    dataset,
    datasetPage,
    configurableColumns,
    enabledColumns,
    toggleColumnVisibility,
    toggleSort,
    setSortDirection,
    setSortColumn,
    sortColumn,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    sortOptions,
    resetDefaultColumnVisibility,
  }
}

type State = ReturnType<typeof useContractsMain>

const ContractsContext = createContext({} as State)
export const useContracts = () => useContext(ContractsContext)

type Props = {
  children: React.ReactNode
}

export function ContractsProvider({ children }: Props) {
  const state = useContractsMain()
  return (
    <ContractsContext.Provider value={state}>
      {children}
    </ContractsContext.Provider>
  )
}
