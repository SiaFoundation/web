import {
  Badge,
  Box,
  Button,
  Calendar20,
  ChartXY,
  Flex,
  getDaysInMs,
  Panel,
  Text,
  ValueSc,
} from '@siafoundation/design-system'
import { AuthedLayout } from '../../components/AuthedLayout'
import BigNumber from 'bignumber.js'
import { humanBytes, toHastings, humanSiacoin } from '@siafoundation/sia-js'
import { Chart, useData } from '../../contexts/data'
import { Table, TableColumn } from '../../components/Table'
import { random, upperFirst, values } from 'lodash'
import { ContractTimeline } from '../../components/ContractTimeline'
import { useMemo } from 'react'

type Row = {
  id: string
  key: string
  status: 'active' | 'successful' | 'failed'
  renewed: boolean
  startDate: number
  expirationDate: number
  payoutDate: number
  estimatedDataSize: number
  contractPayout: BigNumber
  revenue: BigNumber
  costBasis: BigNumber
  gainLoss: number
}

function buildRow(start: string): Row {
  const i = random(0, 1_000_000)
  const startDate = new Date(start).getTime()
  const expirationDate = startDate + getDaysInMs(60)
  const payoutDate = expirationDate + getDaysInMs(3)
  const now = new Date().getTime()
  const active = payoutDate > now

  return {
    id: i + '0x9u2f923fuewij',
    key: i + '0x9u2f923fuewij',
    status: active ? 'active' : random(0, 10) < 3 ? 'failed' : 'successful',
    renewed: active && random(0, 1) === 0,
    startDate,
    expirationDate,
    payoutDate,
    estimatedDataSize: 5_000_000 + (i + 1e6),
    contractPayout: toHastings(50_000 + (i + 1e6)),
    revenue: toHastings(30_00 + (i + 1e6)),
    costBasis: toHastings(1_000 + (i + 1e6)),
    gainLoss: 5,
  }
}

const contractsData: Row[] = [
  buildRow('04/04/2022'),
  buildRow('04/05/2022'),
  buildRow('04/06/2022'),
  buildRow('04/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  // buildRow('05/07/2020'),
  // buildRow('05/07/2019'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('05/07/2022'),
  buildRow('07/08/2022'),
  buildRow('07/07/2022'),
  buildRow('07/27/2022'),
  buildRow('07/17/2022'),
]

const range = contractsData.reduce(
  (acc, item) => {
    let start = acc.start
    let end = acc.end
    if (item.startDate < start) {
      start = item.startDate
    }
    if (item.payoutDate > end) {
      end = item.payoutDate
    }
    return {
      start,
      end,
    }
  },
  {
    start: new Date().getTime() + getDaysInMs(50),
    end: 0,
  }
)

const allDates = []

let current = range.start
while (current <= range.end) {
  allDates.push(current)
  current += getDaysInMs(1)
}
const allDatesMap = allDates.reduce((acc, date) => ({
  ...acc,
  [date]: {
    total: null,
    timestamp: date,
  },
}))

const defaultSize = 3

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

export default function ContractsPage() {
  const {
    timeSpan,
    setTimeSpan,
    // contracts
  } = useData()

  const sortedContracts = useMemo(
    () => contractsData.sort((a, b) => (a.payoutDate < b.payoutDate ? 1 : -1)),
    []
  )

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

  const columns: TableColumn<Row>[] = [
    {
      key: 'overview',
      label: 'Overview',
      size: 4,
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
      size: 8,
      render: (row) => {
        const { startDate, expirationDate, payoutDate } = row
        const { color } = getStatus(row)
        return (
          <ContractTimeline
            start={startDate}
            end={expirationDate}
            payout={payoutDate}
            color={color}
            range={range}
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
      key: 'estDataSize',
      label: 'Est Data Size',
      size: 2,
      props: {
        justify: 'end',
      },
      render: ({ estimatedDataSize }) => (
        <Text font="mono" ellipsis>
          {humanBytes(estimatedDataSize)}
        </Text>
      ),
      summary: () => (
        <Text font="mono" ellipsis>
          {humanBytes(5_323_000_300_000)}
        </Text>
      ),
    },
    {
      key: 'contractPayout',
      label: 'Contract Payout',
      props: {
        justify: 'end',
      },
      size: defaultSize,
      render: ({ contractPayout }) => <ValueSc value={contractPayout} />,
      summary: () => <ValueSc value={toHastings(5e9)} />,
    },
    {
      key: 'revenue',
      label: 'Revenue',
      props: {
        justify: 'end',
      },
      size: defaultSize,
      render: ({ revenue }) => <ValueSc value={revenue} />,
      summary: () => <ValueSc value={toHastings(5e9)} />,
    },
    {
      key: 'costBasis',
      label: 'Cost Basis',
      props: {
        justify: 'end',
      },
      size: defaultSize,
      render: ({ costBasis }) => <ValueSc value={costBasis} />,
      summary: () => <ValueSc value={toHastings(5e9)} />,
    },
    {
      key: 'gainLoss',
      label: 'Gain / Loss',
      props: {
        justify: 'end',
      },
      size: 3,
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
  ]

  return (
    <AuthedLayout
      title={'Contracts'}
      actions={
        <>
          <Panel css={{ p: '$0-5', backgroundColor: '$slate5' }}>
            <Flex gap="1">
              <Button
                size="1"
                onClick={() => setTimeSpan(7)}
                ghost={timeSpan !== 7}
              >
                Active
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan(365)}
                ghost={timeSpan !== 365}
              >
                Successful
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan(365)}
                ghost={timeSpan !== 365}
              >
                Failed
              </Button>
              {/* <Button
            size="1"
                onClick={() => setTimeSpan(7)}
                ghost={timeSpan !== 7}
              >
                YTD
              </Button> */}
              <Button
                size="1"
                onClick={() => setTimeSpan('all')}
                ghost={timeSpan !== 'all'}
              >
                All
              </Button>
              <Button
                size="1"
                onClick={() => setTimeSpan('all')}
                ghost={timeSpan !== 'all'}
              >
                <Calendar20 />
              </Button>
            </Flex>
          </Panel>
          {/* <Tooltip content="Accept contracts">
            <Switch size="2" />
          </Tooltip>
          <Button size="2">Announce</Button> */}
        </>
      }
    >
      <Table data={sortedContracts} columns={columns} summary />
    </AuthedLayout>
  )
}
