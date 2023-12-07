import {
  TxType,
  daysInMilliseconds,
  getTransactionType,
  secondsInMilliseconds,
  stripPrefix,
  useDatasetEmptyState,
} from '@siafoundation/design-system'
import {
  useMetricsWallet,
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-renterd'
import { createContext, useContext, useMemo } from 'react'
import { useDialog } from '../dialog'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/router'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { Transaction } from '@siafoundation/react-core'

const defaultLimit = 50
const filters = []

export type TransactionDataPending = {
  type: 'transaction'
  txType: TxType
  siascanUrl: string
}

export type TransactionDataConfirmed = {
  type: 'transaction'
  txType: TxType
  hash: string
  timestamp: number
  onClick: () => void
  raw: Transaction
  inflow: string
  outflow: string
  unconfirmed: boolean
  sc: BigNumber
  siascanUrl: string
}

export type TransactionData = TransactionDataPending | TransactionDataConfirmed

function useTransactionsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const transactions = useWalletTransactions({
    params: {
      // Endpoint currently returns wrong end of txn list
      limit,
      offset,
    },
    config: {
      swr: {
        refreshInterval: secondsInMilliseconds(60),
      },
    },
  })

  const pending = useWalletPending({
    config: {
      swr: {
        refreshInterval: secondsInMilliseconds(60),
      },
    },
  })

  const { openDialog } = useDialog()

  const siascanUrl = useSiascanUrl()

  const dataset: TransactionData[] | null = useMemo(() => {
    if (!pending.data || !transactions.data) {
      return null
    }
    return [
      ...(pending.data || []).map((t): TransactionData => {
        return {
          type: 'transaction',
          txType: getTransactionType(t),
          // hash: t.id,
          // timestamp: new Date(t.Timestamp).getTime(),
          // onClick: () => openDialog('transactionDetails', t.id),
          // sc: totals.sc,
          unconfirmed: true,
          siascanUrl,
        }
      }),
      ...(transactions.data || [])
        .map((t): TransactionData => {
          return {
            type: 'transaction',
            txType: getTransactionType(t.raw),
            hash: stripPrefix(t.id),
            timestamp: new Date(t.timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', stripPrefix(t.id)),
            raw: t.raw,
            inflow: t.inflow,
            outflow: t.outflow,
            sc: new BigNumber(t.inflow).minus(t.outflow),
            siascanUrl,
          }
        })
        .sort((a, b) => (a['timestamp'] < b['timestamp'] ? 1 : -1)),
    ]
  }, [pending.data, transactions.data, openDialog, siascanUrl])

  const error = transactions.error
  const dataState = useDatasetEmptyState(
    dataset,
    transactions.isValidating,
    error,
    filters
  )

  const periods = 30
  const intervalMs = daysInMilliseconds(1)
  const start = useMemo(() => {
    const today = new Date().getTime()
    const periodsInMs = periods * intervalMs
    const periodsAgo = today - periodsInMs
    return new Date(periodsAgo).toISOString()
  }, [periods, intervalMs])

  const metrics = useMetricsWallet({
    params: {
      start,
      interval: intervalMs,
      n: periods,
    },
  })
  // This now works but the visx chart has an issue where the tooltip does not
  // find the correct nearest datum when the data is not at a consistent
  // interval due to axis scale issues. renterd needs to return clean data
  // like hostd or we need to wait for this issue to be fixed:
  // https://github.com/airbnb/visx/issues/1533
  // until then renterd will use a line graph which does not have the issue.
  const balances = useMemo(
    () =>
      (metrics.data || [])
        .map((t) => {
          return {
            sc: new BigNumber(t.spendable).plus(t.unconfirmed).toNumber(),
            timestamp: new Date(t.timestamp).getTime(),
          }
        })
        .sort((a, b) => (a.timestamp >= b.timestamp ? 1 : -1)),
    [metrics.data]
  )

  return {
    dataset,
    error,
    dataState,
    offset,
    limit,
    pageCount: dataset?.length || 0,
    balances,
    metrics,
  }
}

type State = ReturnType<typeof useTransactionsMain>

const TransactionsContext = createContext({} as State)
export const useTransactions = () => useContext(TransactionsContext)

type Props = {
  children: React.ReactNode
}

export function TransactionsProvider({ children }: Props) {
  const state = useTransactionsMain()
  return (
    <TransactionsContext.Provider value={state}>
      {children}
    </TransactionsContext.Provider>
  )
}
