import {
  EntityListItemProps,
  daysInMilliseconds,
  getTransactionType,
  secondsInMilliseconds,
  useDatasetEmptyState,
} from '@siafoundation/design-system'
import {
  useMetricsPeriod,
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-hostd'
import { createContext, useContext, useMemo } from 'react'
import { useDialog } from '../dialog'
import BigNumber from 'bignumber.js'
import { useRouter } from 'next/router'

const defaultLimit = 50
const filters = []

function useTransactionsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const transactions = useWalletTransactions({
    params: {
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

  const dataset: EntityListItemProps[] | null = useMemo(() => {
    if (!pending.data || !transactions.data) {
      return null
    }
    return [
      ...(pending.data || []).map((t): EntityListItemProps => {
        return {
          type: 'transaction',
          txType: getTransactionType(t.transaction, t.source),
          hash: t.ID,
          timestamp: new Date(t.timestamp).getTime(),
          sc: new BigNumber(t.inflow).minus(t.outflow),
          unconfirmed: true,
        }
      }),
      ...(transactions.data || [])
        .map((t): EntityListItemProps => {
          return {
            type: 'transaction',
            txType: getTransactionType(t.transaction, t.source),
            hash: t.ID,
            timestamp: new Date(t.timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.ID),
            sc: new BigNumber(t.inflow).minus(t.outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ]
  }, [pending, transactions, openDialog])

  const dayPeriods = 30
  const start = useMemo(() => {
    const today = new Date().getTime()
    const periodsInMs = daysInMilliseconds(dayPeriods)
    const periodsAgo = today - periodsInMs
    return new Date(periodsAgo).toISOString()
  }, [])

  const metrics = useMetricsPeriod({
    params: {
      interval: 'daily',
      start,
    },
  })
  const balances = useMemo(
    () =>
      (metrics.data || [])
        .map((t) => {
          return {
            sc: Number(t.balance),
            timestamp: new Date(t.timestamp).getTime(),
          }
        })
        .sort((a, b) => (a.timestamp >= b.timestamp ? 1 : -1)),
    [metrics.data]
  )

  const error = transactions.error
  const dataState = useDatasetEmptyState(
    dataset,
    transactions.isValidating,
    error,
    filters
  )

  return {
    balances,
    metrics,
    dataset,
    error,
    dataState,
    offset,
    limit,
    pageCount: dataset?.length || 0,
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
