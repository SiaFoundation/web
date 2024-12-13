import {
  useDatasetState,
  useServerFilters,
  useTableState,
} from '@siafoundation/design-system'
import {
  useMetricsPeriod,
  useWalletEvents,
  useWalletPending,
} from '@siafoundation/hostd-react'
import { createContext, useContext, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useSiascanUrl } from '../../hooks/useSiascanUrl'
import { defaultDatasetRefreshInterval } from '../../config/swr'
import { useSyncStatus } from '../../hooks/useSyncStatus'
import { columns } from './columns'
import {
  calculateScValue,
  getEventContractId,
  getEventFee,
  getEventTxType,
  daysInMilliseconds,
} from '@siafoundation/units'
import {
  CellContext,
  EventData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { Maybe } from '@siafoundation/types'

const defaultPageSize = 50

function useTransactionsMain() {
  const router = useRouter()
  const limit = Number(router.query.limit || defaultPageSize)
  const offset = Number(router.query.offset || 0)
  const events = useWalletEvents({
    params: {
      limit,
      offset,
    },
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })
  const pending = useWalletPending({
    config: {
      swr: {
        refreshInterval: defaultDatasetRefreshInterval,
      },
    },
  })

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()

  const syncStatus = useSyncStatus()
  const datasetPage = useMemo<Maybe<EventData[]>>(() => {
    if (!events.data || !pending.data) {
      return null
    }
    const dataPending: EventData[] = pending.data.map((e) => {
      const amountSc = calculateScValue(e)
      const fee = getEventFee(e)
      const event: EventData = {
        id: e.id,
        timestamp: 0,
        pending: true,
        type: e.type,
        txType: getEventTxType(e),
        isMature: false,
        amountSc,
        fee,
      }
      return event
    })
    const dataEvents: EventData[] = events.data.map((e) => {
      const amountSc = calculateScValue(e)
      const fee = getEventFee(e)
      const contractId = getEventContractId(e)
      const isMature = e.maturityHeight <= syncStatus.nodeBlockHeight
      const res: EventData = {
        id: e.id,
        type: e.type,
        txType: getEventTxType(e),
        timestamp: new Date(e.timestamp).getTime(),
        maturityHeight: e.maturityHeight,
        isMature,
        height: e.index.height,
        pending: false,
        amountSc,
        fee,
        contractId,
      }
      return res
    })
    if (offset === 0) {
      return [...dataPending.reverse(), ...dataEvents]
    } else {
      return [...dataEvents]
    }
  }, [events.data, pending.data, syncStatus.nodeBlockHeight, offset])

  const {
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
  } = useTableState('hostd/v0/events', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const siascanUrl = useSiascanUrl()
  const cellContext = useMemo<CellContext>(
    () => ({
      siascanUrl,
    }),
    [siascanUrl]
  )

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
            sc: Number(t.wallet.balance),
            timestamp: new Date(t.timestamp).getTime(),
          }
        })
        .sort((a, b) => (a.timestamp >= b.timestamp ? 1 : -1)),
    [metrics.data]
  )

  const isValidating = events.isValidating || pending.isValidating
  const error = events.error || pending.error
  const datasetState = useDatasetState({
    datasetPage,
    isValidating,
    error,
    filters,
    offset,
  })

  return {
    balances,
    metrics,
    datasetPage,
    error,
    datasetState,
    offset,
    limit,
    datasetPageTotal: datasetPage?.length || 0,
    defaultPageSize,
    cellContext,
    configurableColumns,
    enabledColumns,
    sortableColumns,
    toggleColumnVisibility,
    setColumnsVisible,
    setColumnsHidden,
    toggleSort,
    setSortDirection,
    setSortField,
    sortField,
    sortDirection,
    resetDefaultColumnVisibility,
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    filteredTableColumns,
    columns,
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
