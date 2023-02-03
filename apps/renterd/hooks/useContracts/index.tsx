import {
  Text,
  ValueSc,
  TableColumn,
  ContractTimeline,
  blockHeightToTime,
  weeksToBlocks,
  ValueCopyable,
  ArrowUpLeft16,
} from '@siafoundation/design-system'
import { humanDate } from '@siafoundation/sia-js'
import {
  useConsensusState,
  useContracts as useContractsData,
} from '@siafoundation/react-core'
import { useMemo } from 'react'
import { getContractsTimeRangeBlockHeight, getTimeRange } from './utils'
import BigNumber from 'bignumber.js'
import { ContractData, TableColumnId, columnMetadata } from './types'
import { useContractsFilters } from './filters'
import { useContractsSettings } from './settings'

export function useContracts() {
  const consensus = useConsensusState()
  const currentHeight = consensus.data?.BlockHeight
  const contracts = useContractsData()

  const dataset = useMemo(() => {
    const data: ContractData[] =
      contracts.data?.map((c) => {
        const isRenewed =
          c.renewedFrom !==
          'fcid:0000000000000000000000000000000000000000000000000000000000000000'
        const startTime = blockHeightToTime(currentHeight, c.startHeight)
        // TODO: get actual end / payout data
        const endHeight = c.startHeight + weeksToBlocks(6)
        const endTime = blockHeightToTime(currentHeight, endHeight)
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
  }, [contracts.data, currentHeight])

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
  } = useContractsSettings()

  const { filters, setFilter, removeFilter } = useContractsFilters()

  const filteredContracts = useMemo(() => {
    const filterList = Object.entries(filters).filter(([_, val]) => val)
    const datasetFiltered = filterList.length
      ? dataset.filter((contract) => {
          for (const [id, filter] of Object.entries(filters)) {
            const value = contract[id]
            if (id === 'startDate') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const range = getTimeRange(filter.value as any)
              if (!range) {
                return false
              }
              console.log(filter, range)
              return value >= range[0] && value <= range[1]
            }
            if (id === 'status') {
              return filter.values?.includes(value)
            }
          }
          return false
        })
      : dataset
    datasetFiltered.sort((a, b) => {
      const aVal = a[sortColumn]
      const bVal = b[sortColumn]
      if (sortDirection === 'desc') {
        if (aVal instanceof BigNumber) {
          return aVal.lte(bVal) ? 1 : -1
        }
        return aVal <= bVal ? 1 : -1
      }
      if (aVal instanceof BigNumber) {
        return aVal.gte(bVal) ? 1 : -1
      }
      return aVal >= bVal ? 1 : -1
    })
    return datasetFiltered
  }, [dataset, filters, sortColumn, sortDirection])

  const { range: contractsTimeRange } = useMemo(
    () => getContractsTimeRangeBlockHeight(currentHeight, filteredContracts),
    [currentHeight, filteredContracts]
  )

  const tableColumns = useMemo(() => {
    const columns: TableColumn<TableColumnId, ContractData>[] = [
      {
        id: 'contractId',
        label: columnMetadata.contractId.label,
        size: 2,
        render: ({ id, isRenewed, renewedFrom }) => {
          // const { label, color } = getStatus(row)
          return (
            <div className="flex flex-col gap-1 w-full">
              <ValueCopyable value={id.replace('fcid:', '')} />
              {isRenewed && (
                <div className="flex items-center gap-2">
                  <Text>
                    <ArrowUpLeft16 />
                  </Text>
                  {/* <Badge variant={color}>{label}</Badge> */}
                  {isRenewed && (
                    <ValueCopyable
                      size="10"
                      value={renewedFrom.replace('fcid:', '')}
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
        label: columnMetadata.hostIp.label,
        size: 2,
        render: ({ hostIp }) => {
          return <ValueCopyable value={hostIp} />
        },
      },
      {
        id: 'hostKey',
        label: columnMetadata.hostKey.label,
        size: 2,
        render: ({ hostKey }) => {
          return <ValueCopyable value={hostKey} />
        },
      },
      {
        id: 'timeline',
        label: columnMetadata.timeline.label,
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
        label: columnMetadata.startTime.label,
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
        label: columnMetadata.endTime.label,
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
        label: columnMetadata.totalCost.label,
        className: 'justify-end',
        render: ({ totalCost }) => <ValueSc value={totalCost} />,
      },
      {
        id: 'spendingUploads',
        label: columnMetadata.spendingUploads.label,
        className: 'justify-end',
        render: ({ spendingUploads }) => <ValueSc value={spendingUploads} />,
      },
      {
        id: 'spendingDownloads',
        label: columnMetadata.spendingDownloads.label,
        className: 'justify-end',
        render: ({ spendingDownloads }) => (
          <ValueSc value={spendingDownloads} />
        ),
      },
      {
        id: 'spendingFundAccount',
        label: columnMetadata.spendingFundAccount.label,
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
    columns: filteredTableColumns,
    contracts: filteredContracts,
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
