import {
  Badge,
  Box,
  ChartXY,
  Flex,
  Text,
  ValueNum,
  ValueSc,
} from '@siafoundation/design-system'
import {
  humanBytes,
  toHastings,
  humanSiacoin,
  humanDate,
} from '@siafoundation/sia-js'
import { Chart } from '../contexts/data'
import { TableColumn } from '../components/Table'
import { upperFirst, values } from 'lodash'
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
  const contracts = useMemo<Chart>(
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

  const sortedContracts = useMemo(
    () =>
      contractsData.sort((a, b) => {
        if (sortDirection === 'desc') {
          return a[sortColumn] < b[sortColumn] ? 1 : -1
        }
        return a[sortColumn] > b[sortColumn] ? 1 : -1
      }),
    [sortColumn, sortDirection]
  )

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
          summary: () => (
            <Flex direction="row" gap="1" css={{ width: '100%' }}>
              <Text size="12" css={{ color: '$amber9' }}>
                32 active
              </Text>
              <Text size="12" css={{ color: '$green9' }}>
                120 successful
              </Text>
              <Text size="12" css={{ color: '$red11' }}>
                3 failed
              </Text>
            </Flex>
          ),
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
                data={contracts.data}
                config={contracts.config}
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
    [contracts]
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
    sortedContracts,
    configurableColumns,
    enabledColumns,
    toggleColumn,
    setSortDirection,
    setSortColumn,
    sortColumn,
    sortDirection,
    sortOptions,
    resetDefaultColumns,
  }
}
