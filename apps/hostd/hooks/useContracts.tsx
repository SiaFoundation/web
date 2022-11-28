import {
  Badge,
  ChartXY,
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
import {
  humanBytes,
  toHastings,
  humanSiacoin,
  humanDate,
} from '@siafoundation/sia-js'
import { Chart } from '../contexts/data'
import { countBy, upperFirst, values } from 'lodash'
import { useCallback, useMemo } from 'react'
import { allDatesMap, contractsData, contractsTimeRange } from './mockContracts'
import BigNumber from 'bignumber.js'
import groupBy from 'lodash/groupBy'
import filter from 'lodash/filter'
import useLocalStorageState from 'use-local-storage-state'

export type ContractColumn =
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
              <div className="flex flex-col gap-2 w-full">
                <Text font="mono" ellipsis>
                  {id}
                </Text>
                <div className="flex gap-2 items-center">
                  <Badge color={color}>{label}</Badge>
                  {renewed && <Badge color="gray">Renewed</Badge>}
                </div>
              </div>
            )
          },
          summary: () => {
            const counts = countBy(filteredContracts, 'status')
            return (
              <div className="flex gap-2 w-full">
                <Text size="12" color="amber">
                  {counts.active || 0} active
                </Text>
                <Text size="12" color="green">
                  {counts.successful || 0} successful
                </Text>
                <Text size="12" color="red">
                  {counts.failed || 0} failed
                </Text>
              </div>
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
            <div className="w-full px-6">
              <ChartXY
                variant="ghost"
                id="contracts"
                data={contractsChart.data}
                config={contractsChart.config}
                chartType="barstack"
                height={80}
              />
            </div>
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
          className: 'justify-end',
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
          className: 'justify-end',
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
          className: 'justify-end',
        },
        {
          key: 'estDataSize',
          label: 'Est. data size',
          className: 'justify-end',
          sortable: 'data',
          render: ({ estDataSize }) => (
            <ValueNum
              value={new BigNumber(estDataSize)}
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
          key: 'lockedCollateral',
          label: 'Locked collateral',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ lockedCollateral }) => (
            <ValueSc value={lockedCollateral} />
          ),
        },
        {
          key: 'riskedCollateral',
          label: 'Risked collateral',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ riskedCollateral }) => (
            <ValueSc value={riskedCollateral} />
          ),
        },
        {
          key: 'returnedCollateral',
          label: 'Returned collateral',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ returnedCollateral }) => (
            <ValueSc value={returnedCollateral} />
          ),
        },
        {
          key: 'lostCollateral',
          label: 'Lost collateral',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ lostCollateral }) => <ValueSc value={lostCollateral} />,
        },
        {
          key: 'contractFee',
          label: 'Contract fee',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ contractFee }) => <ValueSc value={contractFee} />,
        },
        {
          key: 'accountFunding',
          label: 'Account funding',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ accountFunding }) => <ValueSc value={accountFunding} />,
        },
        {
          key: 'estStorageRevenue',
          label: 'Est. storage revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ estStorageRevenue }) => (
            <ValueSc value={estStorageRevenue} />
          ),
        },
        {
          key: 'estIngressRevenue',
          label: 'Est. ingress revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ estIngressRevenue }) => (
            <ValueSc value={estIngressRevenue} />
          ),
        },
        {
          key: 'estEgressRevenue',
          label: 'Est. egress revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ estEgressRevenue }) => (
            <ValueSc value={estEgressRevenue} />
          ),
        },
        {
          key: 'potentialRevenue',
          label: 'Potential revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ potentialRevenue }) => (
            <ValueSc value={potentialRevenue} />
          ),
        },
        {
          key: 'earnedRevenue',
          label: 'Earned revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ earnedRevenue }) => <ValueSc value={earnedRevenue} />,
        },
        {
          key: 'lostRevenue',
          label: 'Lost revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ lostRevenue }) => <ValueSc value={lostRevenue} />,
        },
        {
          key: 'contractPayout',
          label: 'Contract Payout',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ contractPayout }) => <ValueSc value={contractPayout} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          key: 'revenue',
          label: 'Revenue',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ revenue }) => <ValueSc value={revenue} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          key: 'costBasis',
          label: 'Cost Basis',
          sortable: 'financial',
          className: 'justify-end',
          render: ({ costBasis }) => <ValueSc value={costBasis} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          key: 'gainLoss',
          label: 'Gain / Loss',
          sortable: 'financial',
          className: 'justify-end',
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
          className: 'justify-end',
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
