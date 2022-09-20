import {
  Badge,
  Flex,
  Text,
  ValueNum,
  ValueSc,
  getMonthsInMs,
  getNowInMs,
  getWeeksInMs,
  getYearsInMs,
  getDaysInMs,
  TableColumn,
  ContractTimeline,
} from '@siafoundation/design-system'
import { humanBytes, humanDate } from '@siafoundation/sia-js'
import { countBy, upperFirst } from 'lodash'
import { useCallback, useMemo } from 'react'
import { contractsData, contractsTimeRange } from './mockContracts'
import BigNumber from 'bignumber.js'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import useLocalStorageState from 'use-local-storage-state'

export type ContractColumn =
  | 'overview'
  | 'timeline'
  | 'proofWindowDate'
  | 'startDate'
  | 'expirationDate'
  | 'dataSize'
  | 'contractFee'
  | 'storagePrice'
  | 'uploadPrice'
  | 'downloadPrice'
  | 'spending'

export type Row = {
  id: string
  key: string
  status: 'active' | 'successful' | 'failed'
  renewed: boolean
  proofWindowDate: number
  startDate: number
  expirationDate: number
  dataSize: number
  storagePrice: BigNumber
  uploadPrice: BigNumber
  downloadPrice: BigNumber
  contractFee: BigNumber
  spending: BigNumber
}

export type ContractFilter = {
  key: string
  timeRange?: [number, number]
  values?: string[]
  value?: string
}

const defaultColumns: ContractColumn[] = [
  'overview',
  'timeline',
  'dataSize',
  'spending',
  'storagePrice',
  'uploadPrice',
  'downloadPrice',
]

function getStatus({ status }: Row): {
  label: string
  color: 'red' | 'yellow' | 'green'
} {
  const label = upperFirst(status)
  const color =
    status === 'active' ? 'yellow' : status === 'successful' ? 'green' : 'red'

  return {
    label,
    color,
  }
}

export function useContracts() {
  const [enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    'renterd/v0/contracts/enabledColumns',
    {
      defaultValue: defaultColumns,
    }
  )

  const [sortColumn, setSortColumn] = useLocalStorageState<ContractColumn>(
    'renterd/v0/contracts/sortColumn',
    {
      defaultValue: 'expirationDate',
    }
  )

  const [sortDirection, setSortDirection] = useLocalStorageState<
    'desc' | 'asc'
  >('renterd/v0/contracts/sortDirection', {
    defaultValue: 'desc',
  })

  const toggleColumn = useCallback(
    (column: string) => {
      setEnabledColumns((columns) => {
        if (columns.includes(column)) {
          return columns.filter((c) => c != column)
        }
        return columns.concat(column)
      })
    },
    [setEnabledColumns]
  )

  const resetDefaultColumns = useCallback(() => {
    setEnabledColumns(defaultColumns)
  }, [setEnabledColumns])

  const [filters, _setFilters] = useLocalStorageState<
    Record<string, ContractFilter>
  >('renterd/v0/contracts/filters', {
    defaultValue: {},
  })

  const setFilter = useCallback(
    (value: ContractFilter) => {
      _setFilters((filters) => ({
        ...filters,
        [value.key]: value,
      }))
    },
    [_setFilters]
  )

  const removeFilter = useCallback(
    (key: string) => {
      _setFilters((filters) => ({
        ...filters,
        [key]: undefined,
      }))
    },
    [_setFilters]
  )

  const filteredContracts = useMemo(() => {
    const filterList = Object.entries(filters).filter(([_, val]) => val)
    const filtered = filterList.length
      ? contractsData.filter((contract) => {
          for (const [key, filter] of Object.entries(filters)) {
            const value = contract[key]
            if (key === 'expirationDate') {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const range = getTimeRange(filter.value as any)
              if (!range) {
                return false
              }
              console.log(filter, range)
              return value >= range[0] && value <= range[1]
            }
            if (key === 'status') {
              return filter.values?.includes(value)
            }
          }
          return false
        })
      : contractsData
    const sorted = filtered.sort((a, b) => {
      if (sortDirection === 'desc') {
        return a[sortColumn] < b[sortColumn] ? 1 : -1
      }
      return a[sortColumn] > b[sortColumn] ? 1 : -1
    })
    return sorted
  }, [filters, sortColumn, sortDirection])

  const columns = useMemo(
    () =>
      [
        {
          key: 'overview',
          label: 'Overview',
          type: 'fixed',
          size: 2,
          render: (row) => {
            const { id, renewed } = row
            const { label, color } = getStatus(row)
            return (
              <Flex direction="column" gap="1" css={{ width: '100%' }}>
                <Text font="mono" ellipsis>
                  {id}
                </Text>
                <Flex gap="1" align="center">
                  <Badge variant={color}>{label}</Badge>
                  {renewed && <Badge variant="gray">Renewed</Badge>}
                </Flex>
              </Flex>
            )
          },
          summary: () => {
            const counts = countBy(filteredContracts, 'status')
            return (
              <Flex direction="row" gap="1" css={{ width: '100%' }}>
                <Text size="12" css={{ color: '$amber9' }}>
                  {counts.active || 0} active
                </Text>
                <Text size="12" css={{ color: '$green9' }}>
                  {counts.successful || 0} successful
                </Text>
                <Text size="12" css={{ color: '$red11' }}>
                  {counts.failed || 0} failed
                </Text>
              </Flex>
            )
          },
        },
        {
          key: 'timeline',
          label: 'Timeline',
          size: 4,
          render: (row) => {
            const { startDate, expirationDate, proofWindowDate } = row
            const { color } = getStatus(row)
            return (
              <ContractTimeline
                start={startDate}
                end={expirationDate}
                payout={proofWindowDate}
                color={color}
                range={contractsTimeRange}
              />
            )
          },
        },
        {
          key: 'startDate',
          label: 'Start date',
          sortable: 'time',
          render: ({ startDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(startDate)}
            </Text>
          ),
          props: {
            justify: 'end',
          },
        },
        {
          key: 'expirationDate',
          label: 'Expiration date',
          sortable: 'time',
          render: ({ expirationDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(expirationDate)}
            </Text>
          ),
          props: {
            justify: 'end',
          },
        },
        {
          key: 'proofWindowDate',
          label: 'Proof window date',
          sortable: 'time',
          render: ({ proofWindowDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(proofWindowDate)}
            </Text>
          ),
          props: {
            justify: 'end',
          },
        },
        {
          key: 'dataSize',
          label: 'Data size',
          props: {
            justify: 'end',
          },
          sortable: 'data',
          render: ({ dataSize }) => (
            <ValueNum
              value={new BigNumber(dataSize)}
              format={(val) => humanBytes(val.toNumber())}
              variant="value"
            />
          ),
          summary: () => (
            <Text font="mono" ellipsis weight="semibold">
              {humanBytes(5_323_000_300_000)}
            </Text>
          ),
        },
        {
          key: 'storagePrice',
          label: 'Storage price',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ storagePrice }) => <ValueSc value={storagePrice} />,
        },
        {
          key: 'uploadPrice',
          label: 'Upload price',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ uploadPrice }) => <ValueSc value={uploadPrice} />,
        },
        {
          key: 'downloadPrice',
          label: 'Download price',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ downloadPrice }) => <ValueSc value={downloadPrice} />,
        },
        {
          key: 'spending',
          label: 'Spending',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ spending }) => <ValueSc value={spending} />,
        },
        {
          key: 'contractFee',
          label: 'Contract fee',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ contractFee }) => <ValueSc value={contractFee} />,
        },
      ] as TableColumn<Row>[],
    [filteredContracts]
  )

  const configurableColumns = useMemo(
    () => columns.filter((c) => c.type !== 'fixed'),
    [columns]
  )

  const filteredColumns = useMemo(
    () =>
      columns.filter(
        (column) =>
          column.type === 'fixed' || enabledColumns.includes(column.key)
      ),
    [columns, enabledColumns]
  )

  const sortOptions = useMemo(
    () => groupBy(filter(columns, 'sortable'), 'sortable'),
    [columns]
  )

  return {
    columns: filteredColumns,
    contracts: filteredContracts,
    configurableColumns,
    enabledColumns,
    toggleColumn,
    setSortDirection,
    setSortColumn,
    sortColumn,
    filters,
    setFilter,
    removeFilter,
    sortDirection,
    sortOptions,
    resetDefaultColumns,
  }
}

function getTimeRange(range: 'day' | 'week' | 'month' | 'year') {
  const now = getNowInMs()
  if (range === 'month') {
    return [now - getMonthsInMs(1), now]
  }
  if (range === 'week') {
    return [now - getWeeksInMs(1), now]
  }
  if (range === 'year') {
    return [now - getYearsInMs(1), now]
  }
  if (range === 'day') {
    return [now - getDaysInMs(1), now]
  }
}
