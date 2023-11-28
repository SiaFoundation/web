import {
  EntityListItemProps,
  getTransactionType,
  useDatasetEmptyState,
} from '@siafoundation/design-system'
import {
  useWalletPending,
  useWalletTransactions,
} from '@siafoundation/react-renterd'
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
      // Endpoint currently returns wrong end of txn list
      limit,
      offset,
    },
    config: {
      swr: {
        refreshInterval: 60_000,
        revalidateOnFocus: false,
      },
    },
  })

  const pending = useWalletPending()

  const { openDialog } = useDialog()

  const dataset: EntityListItemProps[] | null = useMemo(() => {
    if (!pending.data || !transactions.data) {
      return null
    }
    return [
      ...(pending.data || []).map((t): EntityListItemProps => {
        return {
          type: 'transaction',
          txType: getTransactionType(t),
          // hash: t.ID,
          // timestamp: new Date(t.Timestamp).getTime(),
          // onClick: () => openDialog('transactionDetails', t.ID),
          // sc: totals.sc,
          unconfirmed: true,
        }
      }),
      ...(transactions.data || [])
        .map((t): EntityListItemProps => {
          return {
            type: 'transaction',
            txType: getTransactionType(t.raw),
            hash: t.id,
            timestamp: new Date(t.timestamp).getTime(),
            onClick: () => openDialog('transactionDetails', t.id),
            sc: new BigNumber(t.inflow).minus(t.outflow),
          }
        })
        .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)),
    ]
  }, [pending.data, transactions.data, openDialog])

  // // This now works but the visx chart has an issue where the tooltip does not
  // // find the correct nearest datum when the data is not at a consistent
  // // interval due to axis scale issues. renterd needs to return clean data
  // // like hostd or we need to wait for this issue to be fixed:
  // // https://github.com/airbnb/visx/issues/1533
  // // until then renterd will use a line graph which does not have the issue.
  // const balances = useMemo(
  //   () =>
  //     transactions.data
  //       ?.sort((a, b) => (a.timestamp > b.timestamp ? 1 : -1))
  //       .reduce((acc, t, i) => {
  //         if (i === 0) {
  //           return acc.concat({
  //             sc: new BigNumber(t.inflow).minus(t.outflow).toNumber(),
  //             timestamp: new Date(t.timestamp).getTime(),
  //           })
  //         }
  //         return acc.concat({
  //           sc: new BigNumber(acc[i - 1].sc)
  //             .plus(t.inflow)
  //             .minus(t.outflow)
  //             .toNumber(),
  //           timestamp: new Date(t.timestamp).getTime(),
  //         })
  //       }, []),
  //   [transactions.data]
  // )
  const error = transactions.error
  const dataState = useDatasetEmptyState(
    dataset,
    transactions.isValidating,
    error,
    filters
  )

  return {
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
