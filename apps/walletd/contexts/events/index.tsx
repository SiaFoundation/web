import {
  useTableState,
  useDatasetEmptyState,
  useClientFilters,
  useClientFilteredDataset,
} from '@siafoundation/design-system'
import {
  useWalletEvents,
  useWalletSubscribe,
  useWalletTxPool,
} from '@siafoundation/react-walletd'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from 'react'
import {
  EventData,
  columnsDefaultVisible,
  defaultSortField,
  sortOptions,
} from './types'
import { columns } from './columns'
import { useRouter } from 'next/router'
import BigNumber from 'bignumber.js'

export function useEventsMain() {
  const router = useRouter()
  const id = router.query.id as string
  const responseTxPool = useWalletTxPool({
    disabled: !id,
    params: {
      id,
    },
  })
  const responseEvents = useWalletEvents({
    disabled: !id,
    params: {
      id,
    },
  })

  const walletSub = useWalletSubscribe()
  const subscribe = useCallback(async () => {
    // do not handle error because the common case of
    // already being subscribed returns a 500.
    walletSub.post({
      params: {
        id,
      },
      payload: 0,
    })
  }, [walletSub, id])

  // Make sure the wallet is subscribed
  useEffect(() => {
    if (id) {
      subscribe()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const dataset = useMemo<EventData[] | null>(() => {
    if (!responseEvents.data || !responseTxPool.data) {
      return null
    }
    const dataTxPool: EventData[] = responseTxPool.data.map((e) => ({
      id: e.ID,
      timestamp: 0,
      pending: true,
      blockHeight: 0,
      type: e.Type,
      amount: new BigNumber(e.Received).minus(e.Sent),
      // onClick: () => router.push(routes.wallet.view.replace(':id', name)),
    }))
    const dataEvents: EventData[] = responseEvents.data.map((e) => {
      let amount = new BigNumber(0)
      if (e.Type === 'siacoin transfer') {
        const inputsTotal =
          e.Val?.Inputs?.reduce(
            (acc, o) => acc.plus(o.value),
            new BigNumber(0)
          ) || new BigNumber(0)
        const outputsTotal =
          e.Val?.Outputs?.reduce(
            (acc, o) => acc.plus(o.value),
            new BigNumber(0)
          ) || new BigNumber(0)
        amount = inputsTotal.minus(outputsTotal)
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const id = (e.Val as any).TransactionID || (e.Val as any).OutputID
      return {
        id,
        timestamp: new Date(e.Timestamp).getTime(),
        blockHeight: e.Index.height,
        pending: false,
        amount,
        type: e.Type,
        // onClick: () => router.push(routes.wallet.view.replace(':id', name)),
      }
    })
    return [...dataTxPool, ...dataEvents]
  }, [responseEvents.data, responseTxPool.data])

  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useClientFilters<EventData>()

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
  } = useTableState('walletd/v0/events', {
    columns,
    columnsDefaultVisible,
    sortOptions,
    defaultSortField,
  })

  const datasetFiltered = useClientFilteredDataset({
    dataset,
    filters,
    sortField,
    sortDirection,
  })

  const filteredTableColumns = useMemo(
    () =>
      columns.filter(
        (column) => column.fixed || enabledColumns.includes(column.id)
      ),
    [enabledColumns]
  )

  const isValidating =
    responseEvents.isValidating || responseTxPool.isValidating
  const error = responseEvents.error || responseTxPool.error

  const dataState = useDatasetEmptyState(dataset, isValidating, error, filters)

  return {
    dataState,
    error: responseEvents.error,
    datasetCount: datasetFiltered?.length || 0,
    columns: filteredTableColumns,
    dataset: datasetFiltered,
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
    filters,
    setFilter,
    removeFilter,
    removeLastFilter,
    resetFilters,
    sortDirection,
    resetDefaultColumnVisibility,
  }
}

type State = ReturnType<typeof useEventsMain>

const EventsContext = createContext({} as State)
export const useEvents = () => useContext(EventsContext)

type Props = {
  children: React.ReactNode
}

export function EventsProvider({ children }: Props) {
  const state = useEventsMain()
  return (
    <EventsContext.Provider value={state}>{children}</EventsContext.Provider>
  )
}
