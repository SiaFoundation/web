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
import { allDatesMap, contractsData } from './mockContracts'
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
  color: 'red' | 'amber' | 'green'
} {
  const label = upperFirst(status)
  const color =
    status === 'active' ? 'amber' : status === 'successful' ? 'green' : 'red'

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
          id: 'overview',
          label: 'Overview',
          type: 'fixed',
          render: (row) => {
            const { id, renewed } = row
            const { label, color } = getStatus(row)
            return (
              <div className="flex flex-col gap-2 w-full">
                <Text font="mono" ellipsis>
                  {id}
                </Text>
                <div className="flex gap-2 items-center">
                  <Badge variant={color}>{label}</Badge>
                  {renewed && <Badge variant="gray">Renewed</Badge>}
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
          id: 'timeline',
          label: 'Timeline',
          render: (row) => {
            // const { startDate, expirationDate, payoutDate } = row
            // const { color } = getStatus(row)
            return null
            // TODO: sync up to latest timeline API
            // <ContractTimeline
            //   start={startDate}
            //   end={expirationDate}
            //   payout={payoutDate}
            //   color={color}
            //   range={contractsTimeRange}
            // />
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
          id: 'startDate',
          label: 'Start date',
          sortable: 'time',
          render: ({ startDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(startDate)}
            </Text>
          ),
          contentClassName: 'justify-end',
        },
        {
          id: 'expirationDate',
          label: 'Expiration date',
          sortable: 'time',
          render: ({ expirationDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(expirationDate)}
            </Text>
          ),
          contentClassName: 'justify-end',
        },
        {
          id: 'payoutDate',
          label: 'Payout date',
          sortable: 'time',
          render: ({ payoutDate }) => (
            <Text font="mono" ellipsis>
              {humanDate(payoutDate)}
            </Text>
          ),
          contentClassName: 'justify-end',
        },
        {
          id: 'estDataSize',
          label: 'Est. data size',
          contentClassName: 'justify-end',
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
          id: 'lockedCollateral',
          label: 'Locked collateral',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ lockedCollateral }) => (
            <ValueSc value={lockedCollateral} />
          ),
        },
        {
          id: 'riskedCollateral',
          label: 'Risked collateral',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ riskedCollateral }) => (
            <ValueSc value={riskedCollateral} />
          ),
        },
        {
          id: 'returnedCollateral',
          label: 'Returned collateral',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ returnedCollateral }) => (
            <ValueSc value={returnedCollateral} />
          ),
        },
        {
          id: 'lostCollateral',
          label: 'Lost collateral',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ lostCollateral }) => <ValueSc value={lostCollateral} />,
        },
        {
          id: 'contractFee',
          label: 'Contract fee',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ contractFee }) => <ValueSc value={contractFee} />,
        },
        {
          id: 'accountFunding',
          label: 'Account funding',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ accountFunding }) => <ValueSc value={accountFunding} />,
        },
        {
          id: 'estStorageRevenue',
          label: 'Est. storage revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ estStorageRevenue }) => (
            <ValueSc value={estStorageRevenue} />
          ),
        },
        {
          id: 'estIngressRevenue',
          label: 'Est. ingress revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ estIngressRevenue }) => (
            <ValueSc value={estIngressRevenue} />
          ),
        },
        {
          id: 'estEgressRevenue',
          label: 'Est. egress revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ estEgressRevenue }) => (
            <ValueSc value={estEgressRevenue} />
          ),
        },
        {
          id: 'potentialRevenue',
          label: 'Potential revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ potentialRevenue }) => (
            <ValueSc value={potentialRevenue} />
          ),
        },
        {
          id: 'earnedRevenue',
          label: 'Earned revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ earnedRevenue }) => <ValueSc value={earnedRevenue} />,
        },
        {
          id: 'lostRevenue',
          label: 'Lost revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ lostRevenue }) => <ValueSc value={lostRevenue} />,
        },
        {
          id: 'contractPayout',
          label: 'Contract Payout',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ contractPayout }) => <ValueSc value={contractPayout} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          id: 'revenue',
          label: 'Revenue',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ revenue }) => <ValueSc value={revenue} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          id: 'costBasis',
          label: 'Cost Basis',
          sortable: 'financial',
          contentClassName: 'justify-end',
          render: ({ costBasis }) => <ValueSc value={costBasis} />,
          summary: () => <ValueSc value={toHastings(5e9)} />,
        },
        {
          id: 'gainLoss',
          label: 'Gain / Loss',
          sortable: 'financial',
          contentClassName: 'justify-end',
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
          id: 'baseExchangeRate',
          label: 'Base exchange rate',
          contentClassName: 'justify-end',
          render: ({ baseExchangeRate }) => (
            <ValueSc value={baseExchangeRate} />
          ),
          sortable: 'financial',
        },
      ] as TableColumn<ContractColumn, Row>[],
    [contractsChart, filteredContracts]
  )

  // TODO: migrate to useTableState
  const configurableColumns = useMemo(() => columns, [columns])

  const filteredColumns = useMemo(
    () => columns.filter((column) => enabledColumns.includes(column.id)),
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
