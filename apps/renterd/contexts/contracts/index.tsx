import {
  Text,
  ValueSc,
  TableColumn,
  ContractTimeline,
  blockHeightToTime,
  weeksToBlocks,
  ValueCopyable,
  ArrowUpLeft16,
  daysToBlocks,
} from '@siafoundation/design-system'
import { humanDate } from '@siafoundation/sia-js'
import {
  useConsensusState,
  useContracts as useContractsData,
} from '@siafoundation/react-core'
import { createContext, useContext, useMemo } from 'react'
import { getContractsTimeRangeBlockHeight } from './utils'
import BigNumber from 'bignumber.js'
import {
  ContractData,
  TableColumnId,
  columnsMeta,
  columnsDefaultVisible,
  columnsDefaultSort,
} from './types'
import { useClientFilters } from '../../hooks/useClientFilters'
import { useTableState } from '../../../../libs/design-system/src/hooks/useTableState'
import { useRouter } from 'next/router'

function useContractsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || 20)
  const offset = Number(router.query.offset || 0)
  const consensus = useConsensusState()
  const currentHeight = consensus.data?.BlockHeight
  const response = useContractsData()

  const dataset = useMemo(() => {
    const data: ContractData[] =
      response.data?.map((c) => {
        const isRenewed =
          c.renewedFrom !==
          'fcid:0000000000000000000000000000000000000000000000000000000000000000'
        const startTime = blockHeightToTime(currentHeight, c.startHeight)
        // TODO: get actual end / payout data
        const endHeight = c.startHeight + weeksToBlocks(8) - daysToBlocks(1)
        const endTime = blockHeightToTime(currentHeight, endHeight)
        console.log(c.startHeight, startTime)
        return {
          id: c.id,
          contractId: c.id,
          hostIp: c.hostIP,
          hostKey: c.hostKey,
          timeline: startTime,
          startTime,
          endTime,
          startHeight: c.startHeight,
          endHeight,
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

  console.log('')
  dataset.map((d) => console.log(d.startHeight, d.startTime))

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

  const { filters, setFilter, removeFilter } = useClientFilters<ContractData>()

  const datasetFiltered = useMemo(() => {
    const filterList = Object.entries(filters).map(([_, f]) => f)
    const datasetFiltered = filterList.length
      ? dataset.filter((datum) => {
          for (const filter of filterList) {
            if (!filter.fn(datum)) {
              return false
            }
          }
          return true
        })
      : dataset
    return datasetFiltered.sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]
      if (sortDirection === 'desc') {
        if (aVal instanceof BigNumber && bVal instanceof BigNumber) {
          return aVal.lte(bVal) ? 1 : -1
        }
        return aVal <= bVal ? 1 : -1
      }
      if (aVal instanceof BigNumber && bVal instanceof BigNumber) {
        return aVal.gte(bVal) ? 1 : -1
      }
      return aVal >= bVal ? 1 : -1
    })
  }, [dataset, filters, sortColumn, sortDirection])

  const datasetPage = useMemo(
    () => datasetFiltered.slice(offset, offset + limit),
    [datasetFiltered, offset, limit]
  )

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, datasetPage),
    [currentHeight, datasetPage]
  )

  const tableColumns = useMemo(() => {
    const columns: TableColumn<TableColumnId, ContractData>[] = [
      {
        id: 'contractId',
        label: columnsMeta.contractId.label,
        size: 2,
        render: ({ id, isRenewed, renewedFrom }) => {
          // const { label, color } = getStatus(row)
          return (
            <div className="flex flex-col gap-1 w-full">
              <ValueCopyable
                value={id.replace('fcid:', '')}
                label="contract ID"
              />
              {isRenewed && (
                <div className="flex items-center">
                  <Text color="subtle">
                    <ArrowUpLeft16 className="scale-75" />
                  </Text>
                  {/* <Badge variant={color}>{label}</Badge> */}
                  {isRenewed && (
                    <ValueCopyable
                      color="subtle"
                      size="10"
                      value={renewedFrom.replace('fcid:', '')}
                      label="contract ID"
                    />
                  )}
                </div>
              )}
            </div>
          )
        },
      },
      {
        id: 'hostIp',
        label: columnsMeta.hostIp.label,
        size: 2,
        render: ({ hostIp }) => {
          return <ValueCopyable value={hostIp} type="ip" label="host address" />
        },
      },
      {
        id: 'hostKey',
        label: columnsMeta.hostKey.label,
        size: 2,
        render: ({ hostKey }) => {
          return <ValueCopyable value={hostKey} label="host public key" />
        },
      },
      {
        id: 'timeline',
        label: columnsMeta.timeline.label,
        size: 4,
        render: ({ startHeight, endHeight }) => {
          return (
            <ContractTimeline
              currentHeight={currentHeight}
              startHeight={startHeight}
              endHeight={endHeight}
              color="green"
              range={contractsTimeRange}
            />
          )
        },
      },
      {
        id: 'startTime',
        label: columnsMeta.startTime.label,
        sortable: 'time',
        render: ({ startTime }) => {
          return (
            <Text font="mono" ellipsis>
              {humanDate(startTime)}
            </Text>
          )
        },
        className: 'justify-end',
      },
      {
        id: 'endTime',
        label: columnsMeta.endTime.label,
        render: ({ endTime }) => {
          return (
            <Text font="mono" ellipsis>
              {humanDate(endTime)}
            </Text>
          )
        },
        className: 'justify-end',
      },
      {
        id: 'totalCost',
        label: columnsMeta.totalCost.label,
        className: 'justify-end',
        render: ({ totalCost }) => <ValueSc value={totalCost} />,
      },
      {
        id: 'spendingUploads',
        label: columnsMeta.spendingUploads.label,
        className: 'justify-end',
        render: ({ spendingUploads }) => <ValueSc value={spendingUploads} />,
      },
      {
        id: 'spendingDownloads',
        label: columnsMeta.spendingDownloads.label,
        className: 'justify-end',
        render: ({ spendingDownloads }) => (
          <ValueSc value={spendingDownloads} />
        ),
      },
      {
        id: 'spendingFundAccount',
        label: columnsMeta.spendingFundAccount.label,
        className: 'justify-end',
        render: ({ spendingFundAccount }) => (
          <ValueSc value={spendingFundAccount} />
        ),
      },
    ]
    return columns
  }, [currentHeight, contractsTimeRange])

  const filteredTableColumns = useMemo(
    () => tableColumns.filter((column) => enabledColumns.includes(column.id)),
    [tableColumns, enabledColumns]
  )

  return {
    isLoading: response.isValidating,
    limit,
    offset,
    pageCount: datasetPage.length,
    datasetCount: datasetFiltered.length,
    columns: filteredTableColumns,
    contracts: datasetPage,
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
