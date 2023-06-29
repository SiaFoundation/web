import {
  useTableState,
  useDatasetEmptyState,
  useServerFilters,
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

const defaultLimit = 100

export function useEventsMain() {
  const router = useRouter()
  const id = router.query.id as string
  const limit = Number(router.query.limit || defaultLimit)
  const offset = Number(router.query.offset || 0)
  const { filters, setFilter, removeFilter, removeLastFilter, resetFilters } =
    useServerFilters()
  const responseTxPool = useWalletTxPool({
    disabled: !id,
    params: {
      id,
    },
  })
  const responseEvents = useWalletEvents({
    disabled: !id,
    params: {
      limit,
      offset,
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
      type: e.Type,
      amount: new BigNumber(e.Received).minus(e.Sent),
    }))
    const dataEvents: EventData[] = responseEvents.data.map((e, index) => {
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
        amount = outputsTotal.minus(inputsTotal)
      }

      const id = String(index)
      const res: EventData = {
        id,
        type: e.Type,
        timestamp: new Date(e.Timestamp).getTime(),
        height: e.Index.height,
        pending: false,
        amount,
      }
      if ('MaturityHeight' in e.Val) {
        res.maturityHeight = e.Val.MaturityHeight
      }
      if ('Fee' in e.Val) {
        res.fee = new BigNumber(e.Val.Fee)
      }
      if ('ContractID' in e.Val) {
        res.contractId = e.Val.ContractID
      }
      if ('TransactionID' in e.Val) {
        res.id += e.Val.TransactionID
        res.transactionId = e.Val.TransactionID
      }
      if ('OutputID' in e.Val) {
        res.id += e.Val.OutputID
        res.outputId = e.Val.OutputID
      }
      if ('NetAddress' in e.Val) {
        res.netAddress = e.Val.NetAddress
      }
      if ('PublicKey' in e.Val) {
        res.publicKey = e.Val.PublicKey
      }
      return res
    })
    return [...dataTxPool.reverse(), ...dataEvents]
  }, [responseEvents.data, responseTxPool.data])

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
    pageCount: dataset?.length || 0,
    columns: filteredTableColumns,
    dataset,
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
    offset,
    limit,
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
