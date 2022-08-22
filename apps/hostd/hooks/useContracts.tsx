import {
  Badge,
  Box,
  ChartXY,
  Flex,
  Text,
  ValueNum,
  ValueSc,
  getMonthsInMs,
  getNowInMs,
  getWeeksInMs,
  getYearsInMs,
  getDaysInMs,
} from '@siafoundation/design-system'
import {
  humanBytes,
  toHastings,
  humanSiacoin,
  humanDate,
} from '@siafoundation/sia-js'
import { Chart } from '../contexts/data'
import { TableColumn } from '../components/Table'
import { countBy, upperFirst, values } from 'lodash'
import { ContractTimeline } from '../components/ContractTimeline'
import { useCallback, useMemo } from 'react'
import { allDatesMap, contractsData, contractsTimeRange } from './mockContracts'
import BigNumber from 'bignumber.js'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import useLocalStorageState from 'use-local-storage-state'

type ContractColumn =
  | 'overview'
  | 'timeline'
  | 'startDate'
  | 'expirationDate'
  | 'payoutDate'
  | 'estDataSize'
  | 'lockedCollateral'
  | 'riskedCollateral'
  | 'returnedCollateral'
  | 'lostCollateral'
  | 'contractFee'
  | 'accountFunding'
  | 'estStorageRevenue'
  | 'estIngressRevenue'
  | 'estEgressRevenue'
  | 'potentialRevenue'
  | 'earnedRevenue'
  | 'lostRevenue'
  | 'contractPayout'
  | 'revenue'
  | 'costBasis'
  | 'baseExchangeRate'
  | 'gainLoss'

export type Row = {
  id: string
  key: string
  status: 'active' | 'successful' | 'failed'
  renewed: boolean
  startDate: number
  expirationDate: number
  payoutDate: number
  estDataSize: number
  lockedCollateral: BigNumber
  riskedCollateral: BigNumber
  returnedCollateral: BigNumber
  lostCollateral: BigNumber
  contractFee: BigNumber
  accountFunding: BigNumber
  estStorageRevenue: BigNumber
  estIngressRevenue: BigNumber
  estEgressRevenue: BigNumber
  potentialRevenue: BigNumber
  earnedRevenue: BigNumber
  lostRevenue: BigNumber
  contractPayout: BigNumber
  revenue: BigNumber
  costBasis: BigNumber
  baseExchangeRate: BigNumber
  gainLoss: number
}

export type ContractFilter = {
  key: string
  timeRange?: [number, number]
  values?: string[]
  value?: string
}

const defaultColumns: ContractColumn[] = ['timeline', 'revenue']

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
  const contractsChart = useMemo<Chart>(
    () => ({
      data: values(
        contractsData.reduce((acc, row) => {
          const accDate = acc[row.payoutDate]
          return {
            ...acc,
            [row.payoutDate]: {
              ...accDate,
              total: (accDate.total || 0) + row.contractPayout.toNumber(),
            },
          }
        }, allDatesMap)
      ),
      stats: {},
      config: {
        data: {},
        format: (v) => humanSiacoin(v),
        disableAnimations: true,
      },
    }),
    []
  )

  const [enabledColumns, setEnabledColumns] = useLocalStorageState<string[]>(
    'v0/contracts/enabledColumns',
    {
      defaultValue: defaultColumns,
    }
  )

  const [sortColumn, setSortColumn] = useLocalStorageState<ContractColumn>(
    'v0/contracts/sortColumn',
    {
      defaultValue: 'expirationDate',
    }
  )

  const [sortDirection, setSortDirection] = useLocalStorageState<
    'desc' | 'asc'
  >('v0/contracts/sortDirection', {
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
  >('v0/contracts/filters', {
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
            const { startDate, expirationDate, payoutDate } = row
            const { color } = getStatus(row)
            return (
              <ContractTimeline
                start={startDate}
                end={expirationDate}
                payout={payoutDate}
                color={color}
                range={contractsTimeRange}
              />
            )
          },
          summary: () => (
            <Box css={{ width: '100%', p: '0 $3' }}>
              <ChartXY
                variant="ghost"
                id="contracts"
                data={contractsChart.data}
                config={contractsChart.config}
                chartType="barstack"
                height={80}
              />
            </Box>
          ),
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
          key: 'payoutDate',
          label: 'Payout date',
          sortable: 'time',
          render: ({ payoutDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(payoutDate)}
            </Text>
          ),
          props: {
            justify: 'end',
          },
        },
        {
          key: 'estDataSize',
          label: 'Est. data size',
          props: {
            justify: 'end',
          },
          sortable: 'data',
          render: ({ estDataSize }) => (
            <ValueNum
              value={new BigNumber(estDataSize)}
              format={(val) => humanBytes(val.toNumber())}
              variant="value"
            />
          ),
          summary: () => (
            <Text font="mono" ellipsis>
              {humanBytes(5_323_000_300_000)}
            </Text>
          ),
        },
        {
          key: 'lockedCollateral',
          label: 'Locked collateral',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ lockedCollateral }) => (
            <ValueSc value={lockedCollateral} />
          ),
        },
        {
          key: 'riskedCollateral',
          label: 'Risked collateral',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ riskedCollateral }) => (
            <ValueSc value={riskedCollateral} />
          ),
        },
        {
          key: 'returnedCollateral',
          label: 'Returned collateral',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ returnedCollateral }) => (
            <ValueSc value={returnedCollateral} />
          ),
        },
        {
          key: 'lostCollateral',
          label: 'Lost collateral',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ lostCollateral }) => <ValueSc value={lostCollateral} />,
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
        {
          key: 'accountFunding',
          label: 'Account funding',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ accountFunding }) => <ValueSc value={accountFunding} />,
        },
        {
          key: 'estStorageRevenue',
          label: 'Est. storage revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ estStorageRevenue }) => (
            <ValueSc value={estStorageRevenue} />
          ),
        },
        {
          key: 'estIngressRevenue',
          label: 'Est. ingress revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ estIngressRevenue }) => (
            <ValueSc value={estIngressRevenue} />
          ),
        },
        {
          key: 'estEgressRevenue',
          label: 'Est. egress revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ estEgressRevenue }) => (
            <ValueSc value={estEgressRevenue} />
          ),
        },
        {
          key: 'potentialRevenue',
          label: 'Potential revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ potentialRevenue }) => (
            <ValueSc value={potentialRevenue} />
          ),
        },
        {
          key: 'earnedRevenue',
          label: 'Earned revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ earnedRevenue }) => <ValueSc value={earnedRevenue} />,
        },
        {
          key: 'lostRevenue',
          label: 'Lost revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ lostRevenue }) => <ValueSc value={lostRevenue} />,
        },
        {
          key: 'contractPayout',
          label: 'Contract Payout',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ contractPayout }) => <ValueSc value={contractPayout} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          key: 'revenue',
          label: 'Revenue',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ revenue }) => <ValueSc value={revenue} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          key: 'costBasis',
          label: 'Cost Basis',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ costBasis }) => <ValueSc value={costBasis} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          key: 'gainLoss',
          label: 'Gain / Loss',
          sortable: 'financial',
          props: {
            justify: 'end',
          },
          render: ({ gainLoss }) => (
            <Text font="mono" ellipsis>
              {gainLoss.toFixed(2)}%
            </Text>
          ),
          summary: () => (
            <Text font="mono" ellipsis>
              {(34).toFixed(2)}%
            </Text>
          ),
        },
        {
          key: 'baseExchangeRate',
          label: 'Base exchange rate',
          props: {
            justify: 'end',
          },
          render: ({ baseExchangeRate }) => (
            <ValueSc value={baseExchangeRate} />
          ),
          sortable: 'financial',
        },
      ] as TableColumn<Row>[],
    [contractsChart, filteredContracts]
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
